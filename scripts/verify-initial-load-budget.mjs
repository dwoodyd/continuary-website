import { chromium } from "playwright";

const baseUrl = process.env.CONTINUARY_PREVIEW_URL ?? "http://127.0.0.1:3000/";
const maxInitialBytes = 3 * 1024 * 1024;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function formatMiB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(3)} MiB`;
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
});

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const responses = new Map();

  page.on("response", (response) => {
    if (response.status() < 200 || response.status() >= 300) return;

    const headers = response.headers();
    const contentLength = Number.parseInt(headers["content-length"] ?? "0", 10);
    const contentType = headers["content-type"] ?? "";
    responses.set(response.url(), {
      url: response.url(),
      contentLength: Number.isFinite(contentLength) ? contentLength : 0,
      contentType,
    });
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const report = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource").map((entry) => ({
      name: entry.name,
      initiatorType: entry.initiatorType,
      transferSize: entry.transferSize,
      encodedBodySize: entry.encodedBodySize,
    }));

    return {
      navigationTransferSize: navigation?.transferSize ?? 0,
      resources,
      totalTransferSize:
        (navigation?.transferSize ?? 0) +
        resources.reduce((total, entry) => total + entry.transferSize, 0),
    };
  });

  const observedResponses = [...responses.values()];
  const observedResponseBytes = observedResponses.reduce((total, response) => total + response.contentLength, 0);
  const initialVideoRequests = observedResponses.filter((response) => /video\/mp4/i.test(response.contentType) || /\.mp4(?:$|[?#])/.test(response.url));
  const largestResources = observedResponses
    .filter((response) => response.contentLength > 0)
    .sort((a, b) => b.contentLength - a.contentLength)
    .slice(0, 10)
    .map((response) => `${formatMiB(response.contentLength)} ${response.contentType || "unknown"} ${response.url}`);

  console.log(`Initial observed transfer: ${formatMiB(observedResponseBytes)} (${observedResponses.length} responses, 0 MP4 requests).`);
  console.log("Largest resources:\n" + largestResources.join("\n"));

  assert(initialVideoRequests.length === 0, `Initial page load requested MP4 media: ${initialVideoRequests.map((entry) => entry.url).join(", ")}`);
  assert(observedResponseBytes < maxInitialBytes, `Initial observed transfer ${formatMiB(observedResponseBytes)} exceeds the 3 MiB budget`);
} finally {
  await browser.close();
}

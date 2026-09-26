const siteUrl = (process.env.CONTINUARY_SITE_URL ?? "https://continuary.app").replace(/\/$/, "");
const videoPaths = [
  "/manus-storage/wren-hero-luminous_d6a61523.mp4",
  "/manus-storage/wren-nothing-broken_f2f06651.mp4",
  "/manus-storage/wren-reentry-thread_4a142e47.mp4",
  "/manus-storage/wren-evidence-log_e0d6321f.mp4",
  "/manus-storage/wren-adhd-guide_8d0338e1.mp4",
  "/manus-storage/wren-book-companion_aeea218b.mp4",
  "/manus-storage/wren-footer-thread_25f35d34.mp4",
];
const maxVideoBytes = 400 * 1024;
const maxCombinedBytes = 1.5 * 1024 * 1024;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

let totalBytes = 0;
for (const path of videoPaths) {
  const response = await fetch(`${siteUrl}${path}`, { redirect: "follow" });
  const contentType = response.headers.get("content-type") ?? "";
  const contentLength = Number.parseInt(response.headers.get("content-length") ?? "0", 10);
  const acceptRanges = response.headers.get("accept-ranges") ?? "";

  assert(response.ok, `${path}: expected an OK response, received ${response.status}`);
  assert(contentType.toLowerCase().startsWith("video/mp4"), `${path}: expected Content-Type video/mp4, received ${contentType || "none"}`);
  assert(acceptRanges.toLowerCase().includes("bytes"), `${path}: expected byte-range support, received ${acceptRanges || "none"}`);
  assert(contentLength > 0 && contentLength <= maxVideoBytes, `${path}: expected a file below 400 KiB, received ${contentLength} bytes`);

  totalBytes += contentLength;
  console.log(`${path}: ${contentLength} bytes, ${contentType}, ${acceptRanges}`);
}

assert(totalBytes <= maxCombinedBytes, `Combined Wren media ${totalBytes} bytes exceeds the 1.5 MiB delivery budget`);
console.log(`Verified ${videoPaths.length} CDN MP4 files totaling ${totalBytes} bytes.`);

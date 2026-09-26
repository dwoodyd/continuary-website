import { chromium, devices } from "playwright";

const baseUrl = process.env.CONTINUARY_PREVIEW_URL ?? "http://127.0.0.1:3000/";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForPlaying(video, name) {
  const deadline = Date.now() + 5_000;
  while (Date.now() < deadline) {
    const state = await video.evaluate((element) => ({
      paused: element.paused,
      currentSrc: element.currentSrc,
      readyState: element.readyState,
    }));
    if (!state.paused && state.currentSrc && state.readyState >= 2) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`${name} did not autoplay inline`);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
});

try {
  const context = await browser.newContext({
    ...devices["iPhone 13"],
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  const hero = page.locator("#hero-wren-container video");
  await waitForPlaying(hero, "Hero Wren");
  const heroAttributes = await hero.evaluate((video) => ({
    muted: video.muted,
    playsInline: video.playsInline,
    loop: video.loop,
    autoplay: video.autoplay,
    currentSrc: video.currentSrc,
  }));
  assert(heroAttributes.muted, "Hero Wren is not muted for iOS autoplay");
  assert(heroAttributes.playsInline, "Hero Wren is not configured to play inline");
  assert(heroAttributes.loop, "Hero Wren is not configured to loop");
  assert(heroAttributes.autoplay, "Hero Wren is not configured to autoplay");
  assert(heroAttributes.currentSrc.includes("wren-hero-luminous"), "Hero did not load the optimized MP4");

  const evidence = page.locator("#evidence-wren video");
  await evidence.scrollIntoViewIfNeeded();
  await waitForPlaying(evidence, "Evidence Wren");
  const evidenceAttributes = await evidence.evaluate((video) => ({
    muted: video.muted,
    playsInline: video.playsInline,
    loop: video.loop,
    autoplay: video.autoplay,
    currentSrc: video.currentSrc,
  }));
  assert(evidenceAttributes.muted && evidenceAttributes.playsInline && evidenceAttributes.loop && evidenceAttributes.autoplay, "Below-fold Wren lacks iOS inline-autoplay attributes");
  assert(evidenceAttributes.currentSrc.includes("wren-evidence-log"), "Evidence scene did not load its optimized MP4 on viewport entry");

  console.log("iPhone-sized autoplay emulation verified for hero and a lower Wren scene.");
} finally {
  await browser.close();
}

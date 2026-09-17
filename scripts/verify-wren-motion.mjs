import { chromium } from "playwright";

const baseUrl = process.env.CONTINUARY_PREVIEW_URL ?? "http://127.0.0.1:3000/";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForPausedState(video, expectedPaused, name) {
  const deadline = Date.now() + 3_000;
  while (Date.now() < deadline) {
    const paused = await video.evaluate((element) => element.paused);
    if (paused === expectedPaused) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(`${name}: video did not reach the expected ${expectedPaused ? "paused" : "playing"} state`);
}

async function waitForControlLabel(control, expectedLabel, name) {
  const deadline = Date.now() + 1_000;
  while (Date.now() < deadline) {
    if (await control.getAttribute("aria-label") === expectedLabel) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  throw new Error(`${name}: control did not announce ${expectedLabel}`);
}

async function verifyToggle(control, video, name) {
  const wasPaused = await video.evaluate((element) => element.paused);
  await control.click();
  await waitForPausedState(video, !wasPaused, name);

  const afterFirstClickPaused = await video.evaluate((element) => element.paused);
  const afterFirstClickLabel = await control.getAttribute("aria-label");

  if (wasPaused) {
    assert(!afterFirstClickPaused, `${name}: Play action did not start the video`);
    await waitForControlLabel(control, "Pause Wren motion", name);
  } else {
    assert(afterFirstClickPaused, `${name}: Pause action did not stop the video`);
    await waitForControlLabel(control, "Play Wren motion", name);
  }

  await control.click();
  await waitForPausedState(video, wasPaused, name);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
});

try {
  const standardPage = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await standardPage.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await standardPage.locator(".wren-motion-control").first().waitFor({ state: "visible" });
  await standardPage.waitForTimeout(650);

  const controlCount = await standardPage.locator(".wren-motion-control").count();
  assert(controlCount === 7, `Expected 7 looping-video controls, received ${controlCount}`);

  const heroControl = standardPage.locator("#hero-wren-container .wren-motion-control");
  const heroVideo = standardPage.locator("#hero-wren-container video");
  await verifyToggle(heroControl, heroVideo, "hero Wren");

  const evidenceControl = standardPage.locator("#evidence-wren .wren-motion-control");
  const evidenceVideo = standardPage.locator("#evidence-wren video");
  await evidenceControl.scrollIntoViewIfNeeded();
  await standardPage.waitForTimeout(300);
  await verifyToggle(evidenceControl, evidenceVideo, "evidence-log Wren");

  const reducedMotionPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await reducedMotionPage.emulateMedia({ reducedMotion: "reduce" });
  await reducedMotionPage.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await reducedMotionPage.locator("#hero-wren-container .wren-motion-control").waitFor({ state: "visible" });
  await reducedMotionPage.waitForTimeout(650);

  const reducedMotionHero = await reducedMotionPage.locator("#hero-wren-container").evaluate((container) => {
    const video = container.querySelector("video");
    const poster = container.querySelector("img");
    return {
      paused: video?.paused,
      posterOpacity: poster ? Number.parseFloat(getComputedStyle(poster).opacity) : 0,
    };
  });
  assert(reducedMotionHero.paused === true, "Reduced-motion hero video started automatically");
  assert(reducedMotionHero.posterOpacity > 0.9, "Reduced-motion hero poster is not visible");

  const reducedMotionControl = reducedMotionPage.locator("#hero-wren-container .wren-motion-control");
  const reducedMotionVideo = reducedMotionPage.locator("#hero-wren-container video");
  await reducedMotionControl.click();
  await reducedMotionPage.waitForTimeout(250);
  assert(await reducedMotionVideo.evaluate((element) => !element.paused), "Explicit Play did not override the reduced-motion default");

  console.log("Wren motion controls and reduced-motion behavior verified.");
} finally {
  await browser.close();
}

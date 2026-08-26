# Navigation Logo Asset Findings

- `ContinuaryDark-backgroundstackedlockup.png` is a stacked logo on an opaque light background and is not appropriate for the dark navigation bar.
- `DarkBackgroundMonochrome.svg` is a compact transparent mark with a dark rounded-square field and light Wren icon; it is suitable as a fallback app mark but does not include the Continuary wordmark.
- The navigation currently references a missing `/manus-storage/ContinuaryDark-backgroundstackedlockup_7bdc9a09.svg` object, which causes the broken-image icon.

## Repair Verification

The repaired PNG reference was visually verified in desktop preview on both `/` and `/404`: the actual Continuary stacked logo renders in place of the broken-image icon in each shared use of `LOGOS.stackedDark`.

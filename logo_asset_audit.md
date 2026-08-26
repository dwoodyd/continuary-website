# Navigation Logo Asset Findings

- `ContinuaryDark-backgroundstackedlockup.png` is a stacked logo on an opaque light background and is not appropriate for the dark navigation bar.
- `DarkBackgroundMonochrome.svg` is a compact transparent mark with a dark rounded-square field and light Wren icon; it is suitable as a fallback app mark but does not include the Continuary wordmark.
- The navigation currently references a missing `/manus-storage/ContinuaryDark-backgroundstackedlockup_7bdc9a09.svg` object, which causes the broken-image icon.

## Repair Verification

The repaired PNG reference was visually verified in desktop preview on both `/` and `/404`: the actual Continuary stacked logo renders in place of the broken-image icon in each shared use of `LOGOS.stackedDark`.

## Official Asset Placement Verification

The navigation now uses the user-supplied `DarkBackgroundMonochrome` app icon at compact desktop scale. The final footer CTA uses the user-supplied `ContinuaryStackedFullLogo` in a larger branding context. Full-page and top-of-page previews show no broken-image icon at either of these placements.

The browser-rendered homepage now exposes the navigation image as `/manus-storage/DarkBackgroundMonochrome_8f514114.png`, confirming that the supplied official icon is the active compact mark.

Direct footer inspection confirms the formerly broken visual was the obsolete `Continuary_logo_transparent_1c533370.svg` footer logo. It now renders the supplied full `ContinuaryStackedFullLogo` lockup, visibly and without a missing-image icon.

The final desktop navigation preview was inspected at full scale: the enlarged monochrome icon no longer has a white outer border or halo, while the white Wren linework remains legible against the dark navy square.

# Marketing Mobile Fix Verification

The 390px mobile viewport now displays the Wren mascot in the hero rather than leaving an empty visual void. The bottom CTA is rendered in a solid navy bar and includes safe-area-aware padding.

Initial visual review showed the opening re-entry card still extending too close to the fixed CTA in the first viewport. The hero is being tightened further at mobile widths so the full opening panel remains comfortably clear of the bar.

After the final mobile spacing adjustment, the 390px viewport shows the full Wren, headline, re-entry preview, and “Show me where I was” control above the fixed Apply bar. The desktop 1280px hero preserves its original two-column composition, full-scale Wren scene, and desktop navigation without the hamburger control.

The app-screen grid switches to a single column on screens 640px and narrower, replacing the old clipped horizontal carousel. The mobile menu is implemented as a solid navy fixed overlay with document scroll lock, and active source contains no legacy health-score or needs-attention wording. The full test suite passes 21 tests and TypeScript has no errors.

The open menu state was also checked directly in the browser: it is fixed from 64px below the nav to the viewport bottom, fully opaque (`rgb(8, 15, 38)`), above the CTA layer (`z-index: 55`), and sets both document and body overflow to `hidden`.

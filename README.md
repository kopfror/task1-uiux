# Training 2026 – Grid Layout Task

Open `index.html` with VS Code **Live Server** (the 3D libraries load from a CDN, so an internet connection is needed).

## What it does
- Page shell is a single CSS Grid: header / resizable sidebar / main / footer.
- Only the sidebar and the main area scroll; the page itself never scrolls, the header and footer stay fixed.
- The footer sits under the main area only, not under the sidebar.
- Drag the right edge of the sidebar to resize it (left edge in Arabic mode).
- **العربية / English** switches language and direction (RTL/LTR).
- **Add content** (or the red + button) adds a line to the header dynamically; **Clear content** removes them.
- Left hero panel: pure CSS animation, title always centered.
- Right hero panel: 3D human heart (Three.js). Drag to rotate, scroll/pinch to zoom.

## 3D model credit
"Human Heart" by Rudy (https://sketchfab.com/Rudy27), licensed under CC-BY-4.0:
https://sketchfab.com/3d-models/human-heart-2edbedffae6b49ee97f919a8528329ba
The license requires keeping this credit. Do not delete it.

The model is loaded from `assets/heart.glb`, so the page must be opened through Live Server (not by double-clicking the file).

# Card Show Cashbook

A small, dependency-free PWA for card show vendors. All values use Canadian dollars.

## Use

Start a show with its name, date, starting cash and table fee. Record sales and purchases by cash, card or e-transfer. Tap an entry to correct or delete it. Finish a show to save its recap; reopen it to make changes. Start another show and switch between saved shows below the activity list.

Expected cash = starting cash + cash sales - cash purchases - table fee if paid from cash box. Enter starting cash BEFORE the table fee. Net = all sales - all purchases - table fee. Net is not card profit; original inventory cost is not tracked.

Data stays in localStorage in the current browser on the current device. Use the top-right menu to download or restore JSON backups. Restore replaces all shows after confirmation. Browser data clearing removes local records. Moving to another URL or device requires exporting and restoring a backup.

## GitHub Pages

The files in the ZIP root are the complete app. Upload them to your repository root, enable GitHub Pages from that branch, and open the HTTPS URL. Relative paths support repository subdirectories. There is no build step and no dependency installation.

For local preview, run `python3 -m http.server 8080` in the extracted folder, then open `http://localhost:8080`. ES modules and service workers require HTTP/HTTPS; double-clicking index.html is not supported.

## Install and offline

The Install app button uses the browser install prompt when available, with instructions as a fallback. Android Chrome also offers Install app / Add to Home screen from its menu. On iPhone, use Safari > Share > Add to Home Screen. Icons include ordinary and maskable PNGs.

The service worker stores app assets after the first successful visit. Open once online before relying on offline use. Increment the CACHE value in sw.js when changing cached assets.

## Files

- index.html: app shell
- style.css: responsive light/dark interface
- app.js: UI, show storage, backups, installation
- model.js: cents parsing, cash/net calculations, backup validation
- sw.js: offline asset cache
- manifest.webmanifest: install metadata
- icons/: 192px, 512px and maskable app icons

## Verification

Checked mixed cash/digital totals, table fees by payment method, decimal precision, invalid amount handling and backup validation. Browser-reviewed creating a show, e-transfer sale, cash purchase, reload persistence, show recap and 390px responsive layout. Physical-device installation and airplane-mode launch have not been tested.

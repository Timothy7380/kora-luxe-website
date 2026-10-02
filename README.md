# Kora Luxe Strands

Website for **Kora Luxe Strands** — premium SDD and Vietnam human hair wigs. *Luxury in every strand.*

Static site: plain HTML, CSS and JavaScript. No build step.

## Run locally
Open `index.html` in a browser.

## Structure
- `index.html` — page markup
- `css/styles.css` — all styles (brand colours and fonts are variables at the top)
- `js/main.js` — product list, shopping bag, WhatsApp ordering, signup form, scroll animations
- `images/` — product and brand photos from [@kora_luxe1](https://www.instagram.com/kora_luxe1/)

## Editing products
Products and prices are in the `PRODUCTS` list at the top of `js/main.js`. Add a photo to `images/` and a new line to the list.

## Orders & contact
The bag sends the customer's order to WhatsApp (+234 816 224 4057) with the items and total pre-filled.

## Still to connect
- Email signup is not linked to a mailing service yet (e.g. Mailchimp, Brevo).
- Online payment (e.g. Paystack, Flutterwave) if card checkout is wanted.

## Hosting
Hosted with GitHub Pages from the `main` branch (root folder).

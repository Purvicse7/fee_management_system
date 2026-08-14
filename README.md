# Navkis — Student Fee Management System

![Hero](docs/images/hero.png)

A lightweight fee management application for engineering colleges (students, admins) with support for multiple online payment methods, payment history, receipts and analytics.

## Key features

- Student management (records, branch/semester)
- Configurable fee structures
- Payments: 5 online methods (Credit Card, Debit Card, Net Banking, UPI, Digital Wallet)
- Dynamic payment form with method-specific validation
- Payment history, printable receipts and audit trail
- Admin dashboard with reports and charts

## Stack

- Language: JavaScript (Node.js for backend, Vanilla JS for frontend)
- Framework / runtime: Node.js + Express
- Database: MySQL
- Notable libraries: chart.js (frontend charts), bcryptjs, jsonwebtoken (JWT)

## Project layout (top-level)

```
frontend/                # Frontend static files (index.html, app.js, style.css)
backend/                 # Backend Node/Express routes and DB helpers
package.json             # Node project manifest
VISUAL_GUIDE.md          # Visual diagrams and UI flow (ASCII)
FINAL_SUMMARY.md         # Implementation summary and quick start
README_IMPLEMENTATION.md # Detailed implementation notes
TESTING_GUIDE.md         # Test scenarios
PROJECT_STRUCTURE.md     # Project inventory & file descriptions
QUICK_REFERENCE.md       # User & admin quick reference
DOCUMENTATION_INDEX.md   # Documentation index
```

## Quick start (local)

1. Create database and run schema:

```bash
# from project root
mysql -u root -p your_database < backend/schema.sql
```

2. Create a `.env` in project root with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fee_management_system
JWT_SECRET=your_secret_key
PORT=3000
```

3. Install dependencies and run server:

```bash
npm install
npm start
```

4. Open the app:

http://localhost:3000

Default student credentials used in docs: `rahul.kumar@gmail.com / student123` (use only in local/test environments).

## Payment methods supported

- Credit Card — Card Number, Expiry, CVV, Name
- Debit Card — Card Number, Expiry, CVV, Name
- Net Banking — Select Bank (HDFC, ICICI, SBI, Axis, Kotak)
- UPI — UPI ID
- Digital Wallet — Select Wallet (Google Pay, PhonePe, Paytm, Amazon Pay)

Notes: The project records `payment_method` in the payments table and shows it in payment history and receipts. For production you must integrate a payment gateway (Razorpay/Stripe) and follow PCI guidelines.

## Screenshots / Images

You said you want to add pictures. I added image placeholders in this README that point to `docs/images/`. To add your pictures and have them appear in the README, follow one of these options:

Option A — Add images using Git (recommended)

```bash
# create the images directory
mkdir -p docs/images
# copy your screenshots into that folder, for example:
cp /path/to/screenshot1.png docs/images/payment_gateway.png
cp /path/to/screenshot2.png docs/images/payment_history.png

# stage and commit
git add docs/images/payment_gateway.png docs/images/payment_history.png README.md
git commit -m "Add screenshots and update README"
git push
```

Option B — Use GitHub web UI

1. Go to the repository on GitHub
2. Click Add file → Upload files
3. Upload images to `docs/images/`
4. Edit README.md in the web UI (or keep the existing placeholders) and commit the change

How to reference images in the README

- Use relative paths so the images load correctly on GitHub:

```markdown
![Payment Gateway](docs/images/payment_gateway.png)
![Payment History](docs/images/payment_history.png)
```

Recommended image settings

- Format: PNG or JPEG
- Width: 900–1400 px for full-width screenshots; 600–900 px for inline images
- Use transparent backgrounds for UI components when appropriate (PNG)
- Compress images (optipng / jpegoptim) to keep the repo small

Accessibility

- Add alt text describing the image: `![Payment gateway modal showing UPI option](docs/images/payment_gateway.png)`

Captions and linking

If you want captions or lightboxed images, use a small HTML snippet inside the README (GitHub will render basic HTML) or link images to larger versions:

```markdown
[![Payment Gateway small](docs/images/payment_gateway_thumb.png)](docs/images/payment_gateway.png)
```

## Where I put placeholders

This README references these placeholder files (please add these image files to the repository):

- docs/images/hero.png
- docs/images/payment_gateway.png
- docs/images/payment_history.png
- docs/images/receipt.png

If you want, I can create scaled thumbnail files and commit them for you if you provide the original images (attach them here or give URLs).

## Development notes

- Frontend: `frontend/index.html`, `frontend/app.js` — UI, modals, dynamic payment form
- Backend: `backend/routes/payments.js` — accepts `paymentMethod` and stores `payment_method` in DB
- DB schema: `backend/schema.sql` — contains `payments` table with `payment_method` column

## Testing

Follow `TESTING_GUIDE.md` for 10 manual scenarios. Key endpoints to exercise with Postman/Thunder Client:

- POST /api/payments — create payment (include `paymentMethod` in body)
- GET /api/payments/history — list payments (returns method)

## Contribution

If you want me to commit the README.md to the repository (I just added it), I can also:

- Add the `docs/images/` folder and commit your images if you upload them here or provide URLs
- Create a PR with screenshots added and the README updated

Tell me which images you'd like to add (upload them here or share links) and I will add them to `docs/images/` and update the README to show them.

## License

Add your preferred license file (e.g. MIT) at the project root if you want this to be open-source.

---

If you'd like, I can now:

1. Commit example thumbnails (I will need the images or URLs).
2. Open a PR that adds the README and any images you provide.

Which would you like me to do next?
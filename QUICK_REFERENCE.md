# Fee Management System - Quick Reference Guide

## 📋 User Guide: Online Payments for Students

### Making a Payment

1. **Login** with your student credentials
2. Click **"Make Payment"** in the student dashboard
3. Select **Fee Type**:
   - Full Semester Fee
   - Partial Payment
   - Hostel Fee
   - Examination Fee
4. Enter **Amount** in rupees
5. Click **"Proceed to Payment"**

### Payment Method Selection

6. **Select Payment Method**:
   - **💳 Credit Card** - Enter card number, expiry, CVV, name
   - **💳 Debit Card** - Same fields as credit card
   - **🏦 Net Banking** - Select your bank from dropdown
   - **📱 UPI** - Enter your UPI ID (e.g., yourname@upi)
   - **💰 Digital Wallet** - Choose wallet (Google Pay, PhonePe, Paytm, Amazon Pay)

7. Fill in the required fields for your chosen method
8. Click **"Pay Now"**
9. You'll see a confirmation notification with your Transaction ID

### After Payment

- **View Receipt**: Go to Payment History → Click Receipt button
- **Check Status**: Payment History shows all your transactions with dates and methods
- **Track Fees**: Fee Details shows your outstanding balance

---

## 👨‍💼 Admin Guide: Payment Management

### Process a Payment

1. Go to **Payment Management**
2. Click **"Process Payment"**
3. Enter:
   - Student name or roll number
   - Fee type
   - Amount
4. Click **"Process"**

### View Payment Reports

- **Dashboard**: See total revenue, completed and pending payments
- **Payment Management**: List all payments with transaction details
- **Payment History by Student**: Filter by branch and semester

---

## 🗄️ Database Schema

### Payments Table
```sql
CREATE TABLE payments (
    id INT PRIMARY KEY,
    student_id INT,
    fee_structure_id INT,
    amount DECIMAL(10, 2),
    payment_method VARCHAR(50),           -- NEW: Stores selected method
    transaction_id VARCHAR(100) UNIQUE,
    status ENUM('Pending', 'Completed', 'Failed'),
    payment_date TIMESTAMP,
    created_at TIMESTAMP
);
```

**Supported payment_method values:**
- `Credit Card`
- `Debit Card`
- `Net Banking`
- `UPI`
- `Wallet`

---

## 🛠️ Technical Setup

### Environment Variables (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fee_management_system
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Initialize Database
```bash
mysql -u root -p fee_management_system < backend/schema.sql
```

### Start Backend
```bash
npm install
npm start
```

### Access Application
- **Frontend**: http://localhost:3000 (if served via backend)
- **Or Open**: `frontend/index.html` directly in browser

---

## 🔐 Security Checklist

- [ ] Use HTTPS in production
- [ ] Never store raw card numbers (use tokenization)
- [ ] Validate all inputs server-side
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add PCI DSS compliance
- [ ] Encrypt sensitive data in database
- [ ] Use parameterized queries (already implemented with prepared statements)

---

## 🐛 Troubleshooting

### Payment Method Not Showing
- Clear browser cache
- Refresh the page
- Check console for JavaScript errors

### Payment Processing Error
- Verify all required fields for selected method
- Check database connectivity
- Ensure JWT token is valid

### Database Connection Issues
```bash
# Test MySQL connection
mysql -h localhost -u root -p
USE fee_management_system;
SHOW TABLES;
```

---

## 📊 API Reference

### Make Payment (Student)
```
POST /api/payments
Authorization: Bearer {token}
Content-Type: application/json

{
  "studentId": 1,
  "feeStructureId": 1,
  "amount": 50000,
  "paymentMethod": "UPI",
  "transactionId": "TXN1234567890"
}

Response: 201 Created
{
  "message": "Payment recorded",
  "id": 5
}
```

### Get Payment History
```
GET /api/payments/history
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 5,
    "student_id": 1,
    "amount": 50000,
    "payment_method": "UPI",
    "transaction_id": "TXN1234567890",
    "status": "Completed",
    "payment_date": "2024-01-15"
  }
]
```

---

## 📈 Next Steps

- [ ] Integrate with payment gateway (Razorpay, Stripe)
- [ ] Add email notifications for payments
- [ ] Implement payment analytics dashboard
- [ ] Add automatic fee reminders
- [ ] Set up automated reconciliation
- [ ] Add refund processing
- [ ] Implement payment plans for installments

---

## 📞 Support

For issues or questions:
1. Check logs: `backend/logs/` (if configured)
2. Review console errors (F12 in browser)
3. Check database connectivity
4. Verify API endpoints are running

---

**Last Updated**: 2024
**Version**: 2.0 (Online Payments)

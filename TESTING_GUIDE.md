# Payment Methods Testing Guide

## 🧪 Test Scenarios

### Scenario 1: Credit Card Payment

**Steps:**
1. Login as student (rahul.kumar@gmail.com / student123)
2. Click "Make Payment"
3. Select Fee Type: "Full Semester Fee"
4. Enter Amount: 50000
5. Click "Proceed to Payment"
6. **Select "Credit Card"**
7. Fill in:
   - Card Number: 4532 1234 5678 9010
   - Expiry Date: 12/25
   - CVV: 123
   - Cardholder Name: Rahul Kumar
8. Click "Pay Now"

**Expected Result:**
✅ Success notification with Transaction ID
✅ Payment appears in Payment History
✅ Payment method shows "Credit Card" in receipt

---

### Scenario 2: Debit Card Payment

**Steps:**
1. Repeat steps 1-6 from Scenario 1
2. **Select "Debit Card"**
3. Same card fields appear
4. Fill in details (different card)
5. Click "Pay Now"

**Expected Result:**
✅ Success notification
✅ Payment shows "Debit Card" as method
✅ Receipt displays payment method

---

### Scenario 3: Net Banking Payment

**Steps:**
1. Login and navigate to payment
2. Select Fee Type and Amount
3. Click "Proceed to Payment"
4. **Select "Net Banking"**
5. Select Bank: "HDFC" (from dropdown)
6. Click "Pay Now"

**Expected Result:**
✅ Card fields hidden, bank selector visible
✅ Success notification
✅ Payment history shows "Net Banking" method

---

### Scenario 4: UPI Payment

**Steps:**
1. Login and navigate to payment
2. Select Fee Type and Amount
3. Click "Proceed to Payment"
4. **Select "UPI"**
5. Enter UPI ID: "rahul.kumar@hdfc"
6. Click "Pay Now"

**Expected Result:**
✅ Only UPI ID field visible
✅ Success notification with method
✅ Receipt shows UPI as payment method

---

### Scenario 5: Digital Wallet Payment

**Steps:**
1. Login and navigate to payment
2. Select Fee Type and Amount
3. Click "Proceed to Payment"
4. **Select "Wallet"**
5. Choose Wallet: "Google Pay"
6. Click "Pay Now"

**Expected Result:**
✅ Wallet selector visible
✅ Success notification
✅ Payment shows "Wallet" method with provider

---

### Scenario 6: Form Validation - Missing Card Details

**Steps:**
1. Navigate to payment gateway
2. Select "Credit Card"
3. Enter only Card Number: "4532 1234 5678 9010"
4. Leave other fields empty
5. Click "Pay Now"

**Expected Result:**
❌ Error notification: "Please fill all card details!"
❌ Payment NOT recorded
❌ Modal stays open for correction

---

### Scenario 7: Form Validation - Missing Bank Selection

**Steps:**
1. Navigate to payment gateway
2. Select "Net Banking"
3. Leave bank selector as default (-- Choose Bank --)
4. Click "Pay Now"

**Expected Result:**
❌ Error notification: "Please select a bank!"
❌ Payment NOT recorded

---

### Scenario 8: Form Validation - Missing UPI ID

**Steps:**
1. Navigate to payment gateway
2. Select "UPI"
3. Leave UPI ID field empty
4. Click "Pay Now"

**Expected Result:**
❌ Error notification: "Please enter UPI ID!"
❌ Payment NOT recorded

---

### Scenario 9: Payment History Display

**Steps:**
1. Complete 2-3 payments with different methods
2. Click "Payment History"
3. View payment list

**Expected Result:**
✅ Each payment shows:
   - Fee Type
   - Transaction ID
   - Date
   - **Payment Method** (newly displayed)
   - Status
✅ Different methods visible for different payments

---

### Scenario 10: Payment Receipt

**Steps:**
1. After making payment, go to Payment History
2. Click "Receipt" button
3. Print preview opens

**Expected Result:**
✅ Receipt window opens with details:
   - Transaction ID
   - Student Name & Roll Number
   - Fee Type
   - **Payment Method** (newly included)
   - Date
   - Amount Paid
✅ Print dialog appears automatically

---

## 🔄 Form Field Visibility Tests

### Test Case 1: Credit Card Selected
```
Expected Visibility:
✅ Card Number field
✅ Expiry Date field
✅ CVV field
✅ Cardholder Name field
❌ Bank selector hidden
❌ UPI field hidden
❌ Wallet selector hidden
```

### Test Case 2: Net Banking Selected
```
Expected Visibility:
❌ Card fields hidden
✅ Bank selector
❌ UPI field hidden
❌ Wallet selector hidden
```

### Test Case 3: UPI Selected
```
Expected Visibility:
❌ Card fields hidden
❌ Bank selector hidden
✅ UPI ID field
❌ Wallet selector hidden
```

### Test Case 4: Wallet Selected
```
Expected Visibility:
❌ Card fields hidden
❌ Bank selector hidden
❌ UPI field hidden
✅ Wallet selector
```

---

## 🚀 Backend Testing (Using Thunder Client / Curl)

### Test: Create Payment with Payment Method

**Request:**
```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "feeStructureId": 1,
    "amount": 50000,
    "paymentMethod": "UPI",
    "transactionId": "TXN1234567890"
  }'
```

**Expected Response:**
```json
{
  "message": "Payment recorded",
  "id": 5
}
```

### Test: Get Payment History with Method

**Request:**
```bash
curl -X GET http://localhost:3000/api/payments/history \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

**Expected Response:**
```json
[
  {
    "id": 5,
    "student_id": 1,
    "fee_structure_id": 1,
    "amount": 50000,
    "payment_method": "UPI",
    "transaction_id": "TXN1234567890",
    "status": "Completed",
    "payment_date": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## ✅ Test Checklist

### UI Tests
- [ ] Payment method dropdown appears on payment gateway
- [ ] All 5 payment methods are listed
- [ ] Field visibility changes correctly for each method
- [ ] Form fields clear when method changes
- [ ] Required field validation works
- [ ] Error messages display correctly
- [ ] Success notifications show payment method
- [ ] Payment history shows payment method
- [ ] Receipt includes payment method

### Functional Tests
- [ ] Credit Card payment processes successfully
- [ ] Debit Card payment processes successfully
- [ ] Net Banking payment processes successfully
- [ ] UPI payment processes successfully
- [ ] Wallet payment processes successfully
- [ ] Incomplete form submission is rejected
- [ ] Payment data saved to database
- [ ] Payment method persists in database

### API Tests
- [ ] POST /api/payments accepts paymentMethod parameter
- [ ] GET /api/payments/history returns paymentMethod field
- [ ] Missing paymentMethod returns 400 error
- [ ] Invalid paymentMethod still processes (future validation)

### Database Tests
- [ ] payments table has payment_method column
- [ ] payment_method column accepts all method types
- [ ] Data persists correctly across sessions
- [ ] Receipt queries work with payment_method field

---

## 🐛 Common Issues & Solutions

### Issue: Payment method dropdown not showing
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check console for errors (F12)
- Verify app.js is loaded

### Issue: Form fields not hiding/showing
**Solution:**
- Check browser console for JavaScript errors
- Verify updatePaymentForm() function exists
- Check that onchange event is firing
- Test in different browser

### Issue: Payment not saving to database
**Solution:**
- Verify MySQL connection
- Check database schema has payment_method column
- Run: `ALTER TABLE payments ADD COLUMN payment_method VARCHAR(50) DEFAULT 'Credit Card';`
- Verify JWT token is valid

### Issue: Receipt not showing payment method
**Solution:**
- Verify payment object includes paymentMethod field
- Check that sample payments have paymentMethod defined
- Verify viewPaymentReceipt() includes paymentMethod line

---

## 📝 Test Results Template

```
Date: ___________
Tester: _________
Build Version: __

| Test Case | Status | Notes |
|-----------|--------|-------|
| Scenario 1: Credit Card | ☐ Pass ☐ Fail | |
| Scenario 2: Debit Card | ☐ Pass ☐ Fail | |
| Scenario 3: Net Banking | ☐ Pass ☐ Fail | |
| Scenario 4: UPI | ☐ Pass ☐ Fail | |
| Scenario 5: Wallet | ☐ Pass ☐ Fail | |
| Validation Tests | ☐ Pass ☐ Fail | |
| API Tests | ☐ Pass ☐ Fail | |
| Database Tests | ☐ Pass ☐ Fail | |

Overall Status: ☐ Ready for Production ☐ Needs Fixes
```

---

## 🎯 Success Criteria

✅ All payment methods are accessible
✅ Form validation prevents incomplete submissions
✅ Payment method is captured and stored
✅ Payment history displays payment method
✅ Receipts include payment method
✅ API returns payment method in responses
✅ No JavaScript errors in console
✅ Responsive on mobile devices
✅ Works across browsers (Chrome, Firefox, Safari, Edge)

---

**Test Environment**: Windows PowerShell / Browser DevTools
**Database**: MySQL 8.0+
**Backend**: Node.js/Express
**Frontend**: Vanilla JavaScript

Good luck with testing! 🚀

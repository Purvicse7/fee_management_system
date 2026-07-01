// Application State
let currentUser = null;
let currentPage = 'landing-page';
let students = [];
let feeStructures = [];
let payments = [];
let users = [];

// Sample Data from the provided JSON
const sampleData = {
    sampleStudents: [
        {
            id: "ST001",
            name: "Rahul Kumar",
            email: "rahulkumar@gmail.com",
            rollNumber: "4YG23CS029",
            branch: "Computer Science Engineering",
            semester: 5,
            year: 3,
            contactNumber: "9876543210",
            address: "123 MG Road, Bangalore",
            hostelResident: true
        },
        {
            id: "ST002",
            name: "Priya Sharma",
            email: "priyasharma@gmail.com",
            rollNumber: "4YG24EC019",
            branch: "Electronics & Communication",
            semester: 3,
            year: 2,
            contactNumber: "9876543211",
            address: "456 Brigade Road, Bangalore",
            hostelResident: false
        },
        {
            id: "ST003",
            name: "Arjun Patel",
            email: "arjunpatel@gmail.com",
            rollNumber: "4YG22ME001",
            branch: "Mechanical Engineering",
            semester: 7,
            year: 4,
            contactNumber: "9876543212",
            address: "789 Commercial Street, Bangalore",
            hostelResident: true
        },
        {
            id: "ST004",
            name: "Liya Guptha",
            email: "liyaguptha@gmail.com",
            rollNumber: "4YG23CS079",
            branch: "Computer Science Engineering",
            semester: 5,
            year: 3,
            contactNumber: "9876543299",
            address: "bangalore",
            hostelResident: false
        },
        {
            id: "ST005",
            name: "Surya Raj",
            email: "suryaraj@gmail.com",
            rollNumber: "4YG22CE080",
            branch: "Civil Engineering",
            semester: 7,
            year: 3,
            contactNumber: "9876543300",
            address: "Hassan",
            hostelResident: false
        }
    ],
    feeStructures: [
        {
            branch: "Computer Science Engineering",
            semester: 5,
            tuitionFee: 75000,
            labFee: 15000,
            libraryFee: 5000,
            hostelFee: 25000,
            examFee: 3000,
            developmentFee: 10000
        },
        {
            branch: "Electronics & Communication",
            semester: 3,
            tuitionFee: 70000,
            labFee: 12000,
            libraryFee: 5000,
            hostelFee: 25000,
            examFee: 3000,
            developmentFee: 10000
        },
        {
            branch: "Mechanical Engineering",
            semester: 7,
            tuitionFee: 65000,
            labFee: 10000,
            libraryFee: 5000,
            hostelFee: 25000,
            examFee: 3000,
            developmentFee: 10000
        },
         {
            branch: "Civil Engineering",
            semester: 7,
            tuitionFee: 65000,
            labFee: 10000,
            libraryFee: 5000,
            hostelFee: 25000,
            examFee: 3000,
            developmentFee: 10000
        }
    ],
    samplePayments: [
        {
            id: "PAY001",
            studentId: "ST001",
            amount: 105000,
            feeType: "Semester Fee",
            paymentDate: "2024-01-15",
            transactionId: "TXN123456789",
            status: "Completed"
        },
        {
            id: "PAY002",
            studentId: "ST002",
            amount: 50000,
            feeType: "Partial Payment",
            paymentDate: "2024-02-10",
            transactionId: "TXN123456790",
            status: "Completed"
        }
    ],
    branches: [
        "Computer Science Engineering",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Civil Engineering"
    ],
    feeTypes: [
        "Tuition Fee",
        "Lab Fee",
        "Library Fee",
        "Hostel Fee",
        "Examination Fee",
        "Development Fee",
        "Sports Fee",
        "Transport Fee"
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    initializeEventListeners();
    showLanding();
});

function initializeData() {
    // Initialize sample data
    students = [...sampleData.sampleStudents];
    feeStructures = [...sampleData.feeStructures];
    payments = [...sampleData.samplePayments];
    
    // Initialize sample users
    users = [
        { id: 'U001', name: 'Admin User', email: 'admin@gmail.com', role: 'admin', password: 'admin123' },
        { id: 'U002', name: 'Rahul Kumar', email: 'rahul.kumar@gmail.com', role: 'student', password: 'student123' },
        { id: 'U003', name: 'Priya Sharma', email: 'priya.sharma@gmail.com', role: 'student', password: 'student123' },
        { id: 'U004', name: 'Arjun Patel', email: 'arjun.patel@gmail.com', role: 'student', password: 'student123' }
    ];
    
    // Populate branch filters
    populateBranchOptions();
}

function initializeEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    
    // Add student form
    document.getElementById('add-student-form').addEventListener('submit', function(e) {
        e.preventDefault();
    });
    
    // Student payment form
    document.getElementById('student-payment-form').addEventListener('submit', handleStudentPayment);
    
    // Payment gateway form
    document.getElementById('payment-gateway-form').addEventListener('submit', function(e) {
        e.preventDefault();
    });
    
    // Search functionality
    document.getElementById('student-search').addEventListener('input', filterStudents);
    document.getElementById('branch-filter').addEventListener('change', filterStudents);
}

// Navigation Functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    currentPage = pageId;
}

function showLanding() {
    showPage('landing-page');
}

function showLogin() {
    showPage('login-page');
    document.getElementById('login-form').reset();
}

function showRegister() {
    showPage('register-page');
    document.getElementById('register-form').reset();
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Authentication Functions
/*function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;
    
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    
    if (user) {
        currentUser = user;
        if (role === 'admin') {
            showAdminDashboard();
        } else {
            showStudentDashboard();
        }
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid credentials!', 'error');
    }
}*/







async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const role = document.getElementById('register-role').value;

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    const result = await response.json();
    if (response.ok) {
      showNotification('Registration successful! Please login.', 'success');
      showLogin();
    } else {
      showNotification('Registration failed: ' + result.message, 'error');
    }
  } catch (err) {
    showNotification('Network error: ' + err.message, 'error');
  }
}






async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const role = document.getElementById('login-role').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('authToken', result.token);  // Save JWT
      currentUser = result.user||{email, name: result.name, role };
      showNotification('Login successful!', 'success');
      // Redirect to dashboard, decide by role
      if (role === 'admin') showAdminDashboard();
      else showStudentDashboard();
    } else {
      showNotification('Login failed: ' + result.message, 'error');
    }
  } catch (err) {
    showNotification('Network error: ' + err.message, 'error');
  }
}







/*function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showNotification('User already exists!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: 'U' + String(users.length + 1).padStart(3, '0'),
        name,
        email,
        role,
        password
    };
    
    users.push(newUser);
    
    // If registering as student, create student record
    if (role === 'student') {
        const studentId = 'ST' + String(students.length + 1).padStart(3, '0');
        const rollNumber = new Date().getFullYear().toString().slice(-2) + 'CS' + String(students.length + 1).padStart(3, '0');
        
        const newStudent = {
            id: studentId,
            name,
            email,
            rollNumber,
            branch: 'Computer Science Engineering',
            semester: 1,
            year: 1,
            contactNumber: '',
            address: '',
            hostelResident: false
        };
        
        students.push(newStudent);
    }
    
    showNotification('Registration successful! Please login.', 'success');
    showLogin();
}*/

function logout() {
    currentUser = null;
    showLanding();
    showNotification('Logged out successfully!', 'info');
}

// Admin Dashboard Functions
function showAdminDashboard() {
    showPage('admin-dashboard');
    document.getElementById('admin-user-name').textContent = currentUser.name;
    showAdminOverview();
}

function showAdminOverview() {
    hideAllDashboardContent();
    document.getElementById('admin-overview').classList.remove('hidden');
    updateNavButtons('admin-overview');
    updateAdminStats();
    updateRecentActivities();
    initializeRevenueChart();
}

function showStudentManagement() {
    hideAllDashboardContent();
    document.getElementById('student-management').classList.remove('hidden');
    updateNavButtons('student-management');
    renderStudentsTable();
}

function showFeeManagement() {
    hideAllDashboardContent();
    document.getElementById('fee-management').classList.remove('hidden');
    updateNavButtons('fee-management');
    renderFeeStructures();
}

function showPaymentManagement() {
    hideAllDashboardContent();
    document.getElementById('payment-management').classList.remove('hidden');
    updateNavButtons('payment-management');
    renderPaymentsTable();
}

function showReports() {
    hideAllDashboardContent();
    document.getElementById('reports-section').classList.remove('hidden');
    updateNavButtons('reports-section');
    initializeBranchRevenueChart();
    initializePaymentStatusChart();
}
// Student Dashboard Functions
function showStudentDashboard() {
    showPage('student-dashboard');
    document.getElementById('student-user-name').textContent = currentUser.name;
    showStudentOverview();
}

function showStudentOverview() {
    hideAllStudentDashboardContent();
    document.getElementById('student-overview').classList.remove('hidden');
    updateStudentNavButtons('student-overview');
    renderStudentDetails();
}

function showStudentFees() {
    hideAllStudentDashboardContent();
    document.getElementById('student-fees').classList.remove('hidden');
    updateStudentNavButtons('student-fees');
    renderStudentFeeDetails();
}

function showPaymentHistory() {
    hideAllStudentDashboardContent();
    document.getElementById('payment-history').classList.remove('hidden');
    updateStudentNavButtons('payment-history');
    renderPaymentHistory();
}

function showMakePayment() {
    hideAllStudentDashboardContent();
    document.getElementById('make-payment').classList.remove('hidden');
    updateStudentNavButtons('make-payment');
}

// Helper Functions
function hideAllDashboardContent() {
    document.querySelectorAll('#admin-dashboard .dashboard-content').forEach(content => {
        content.classList.add('hidden');
    });
}

function hideAllStudentDashboardContent() {
    document.querySelectorAll('#student-dashboard .dashboard-content').forEach(content => {
        content.classList.add('hidden');
    });
}

function updateNavButtons(activeId) {
    document.querySelectorAll('#admin-dashboard .nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const buttonMap = {
        'admin-overview': 0,
        'student-management': 1,
        'fee-management': 2,
        'payment-management': 3,
        'reports-section': 4
    };
    
    if (buttonMap[activeId] !== undefined) {
        document.querySelectorAll('#admin-dashboard .nav-btn')[buttonMap[activeId]].classList.add('active');
    }
}

function updateStudentNavButtons(activeId) {
    document.querySelectorAll('#student-dashboard .nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const buttonMap = {
        'student-overview': 0,
        'student-fees': 1,
        'payment-history': 2,
        'make-payment': 3
    };
    
    if (buttonMap[activeId] !== undefined) {
        document.querySelectorAll('#student-dashboard .nav-btn')[buttonMap[activeId]].classList.add('active');
    }
}

// Data Rendering Functions
function updateAdminStats() {
    document.getElementById('total-students').textContent = students.length;
    
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    document.getElementById('total-revenue').textContent = '₹' + totalRevenue.toLocaleString();
    
    const completedPayments = payments.filter(p => p.status === 'Completed').length;
    document.getElementById('completed-payments').textContent = completedPayments;
    
    const pendingPayments = students.length - completedPayments;
    document.getElementById('pending-payments').textContent = Math.max(0, pendingPayments);
}

function updateRecentActivities() {
    const activitiesContainer = document.getElementById('recent-activities');
    const recentActivities = [
        {
            title: 'New student registration',
            meta: 'Priya Sharma - Electronics & Communication',
            time: '2 hours ago'
        },
        {
            title: 'Payment received',
            meta: '₹50,000 - Rahul Kumar',
            time: '4 hours ago'
        },
        {
            title: 'Fee structure updated',
            meta: 'Computer Science Engineering - Semester 5',
            time: '1 day ago'
        }
    ];
    
    activitiesContainer.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-title">${activity.title}</div>
            <div class="activity-meta">${activity.meta} • ${activity.time}</div>
        </div>
    `).join('');
}

function renderStudentsTable() {
    const tableBody = document.getElementById('students-table-body');
    const filteredStudents = getFilteredStudents();
    
    tableBody.innerHTML = filteredStudents.map(student => `
        <tr>
            <td>${student.rollNumber}</td>
            <td>${student.name}</td>
            <td>${student.branch}</td>
            <td>${student.semester}</td>
            <td>${student.contactNumber}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn--outline btn--sm" onclick="showStudentFeeSummaryModal('${student.id}')">Fee Summary</button>
                    <button class="btn btn--outline btn--sm" onclick="editStudent('${student.id}')">Edit</button>
                    <button class="btn btn--outline btn--sm" onclick="deleteStudent('${student.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderFeeStructures() {
    const container = document.getElementById('fee-structures-grid');
    
    container.innerHTML = feeStructures.map((structure, idx) => {
        // Exclude hostel fee from the fee-structure "total" since hostel is optional
        const total = (structure.tuitionFee || 0) + (structure.labFee || 0) + (structure.libraryFee || 0) +
                          (structure.developmentFee || 0); // Exclude optional fees (hostel, exam) from the displayed core total
        // compute overdue status for any of the optional/core parts
        const now = new Date();
        const semDue = structure.semesterDueDate ? new Date(structure.semesterDueDate) : null;
        const examDue = structure.examDueDate ? new Date(structure.examDueDate) : null;
        const hostelDue = structure.hostelDueDate ? new Date(structure.hostelDueDate) : null;
        const isOverdue = (d => d && !isNaN(d.getTime()) && d < now)(semDue) || (d => d && !isNaN(d.getTime()) && d < now)(examDue) || (d => d && !isNaN(d.getTime()) && d < now)(hostelDue);

        // find nearest overdue date (if any)
        const dueDates = [];
        if (semDue) dueDates.push({ type: 'Semester', date: semDue });
        if (examDue) dueDates.push({ type: 'Exam', date: examDue });
        if (hostelDue) dueDates.push({ type: 'Hostel', date: hostelDue });
        let nearestOverdueText = '';
        if (isOverdue) {
            const overdueOn = dueDates.filter(d => d.date < now).sort((a,b) => a.date - b.date)[0];
            if (overdueOn) nearestOverdueText = `${overdueOn.type} overdue ${formatDateISO(overdueOn.date)}`;
        }

        return `
            <div class="fee-structure-card ${isOverdue ? 'fee-overdue' : ''}">
                <div class="fee-structure-header">
                    <h3>${structure.branch}${isOverdue ? `<span class="due-label">Overdue</span>` : ''}</h3>
                    <div class="semester-info">Semester ${structure.semester}</div>
                </div>
                ${isOverdue && nearestOverdueText ? `<div style="padding:6px 12px; color:#dc3545; font-weight:600">${nearestOverdueText}</div>` : ''}
                <div class="fee-breakdown">
                    <div class="fee-item">
                        <span class="fee-label">Tuition Fee</span>
                        <span class="fee-amount">₹${structure.tuitionFee.toLocaleString()}</span>
                    </div>
                    <div class="fee-item">
                        <span class="fee-label">Lab Fee</span>
                        <span class="fee-amount">₹${structure.labFee.toLocaleString()}</span>
                    </div>
                    <div class="fee-item">
                        <span class="fee-label">Library Fee</span>
                        <span class="fee-amount">₹${structure.libraryFee.toLocaleString()}</span>
                    </div>
                    <div class="fee-item">
                        <span class="fee-label">Hostel Fee <small>(Optional)</small></span>
                        <span class="fee-amount">₹${(structure.hostelFee||0).toLocaleString()}</span>
                    </div>
                    <div class="fee-item">
                            <span class="fee-label">Exam Fee <small>(during exam)</small></span>
                            <span class="fee-amount">₹${(structure.examFee||0).toLocaleString()}</span>
                        </div>
                    <div class="fee-item">
                        <span class="fee-label">Development Fee</span>
                        <span class="fee-amount">₹${structure.developmentFee.toLocaleString()}</span>
                    </div>
                    <div class="fee-item fee-total">
                        <span class="fee-label">Total (excluding optional hostel)</span>
                        <span class="fee-amount">₹${total.toLocaleString()}</span>
                    </div>
                </div>
                <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px">
                    <button class="btn btn--outline btn--sm" onclick="showEditFeeStructureModal(${idx})">Edit</button>
                </div>
            </div>
        `;
    }).join('');
}

// Show an edit modal for a fee structure at index
function showEditFeeStructureModal(index) {
    const structure = feeStructures[index];
    if (!structure) { showNotification('Fee structure not found', 'error'); return; }

    const modalId = 'edit-fee-structure-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content modal--fee-edit">
                <h3>Edit Fee Structure</h3>
                <div class="form-row"><label>Branch</label><input id="edit-fee-branch" type="text" /></div>
                <div class="form-row"><label>Semester</label><input id="edit-fee-semester" type="number" min="1" /></div>
                <div class="form-row"><label>Tuition Fee (₹)</label><input id="edit-fee-tuition" type="number" min="0" /></div>
                <div class="form-row"><label>Lab Fee (₹)</label><input id="edit-fee-lab" type="number" min="0" /></div>
                <div class="form-row"><label>Library Fee (₹)</label><input id="edit-fee-library" type="number" min="0" /></div>
                <div class="form-row"><label>Hostel Fee (Optional) (₹)</label><input id="edit-fee-hostel" type="number" min="0" /></div>
                <div class="form-row"><label>Exam Fee (Optional) (₹)</label><input id="edit-fee-exam" type="number" min="0" /></div>
                <div class="form-row"><label>Semester Due Date</label><input id="edit-fee-semester-due" type="date" /></div>
                <div class="form-row"><label>Exam Due Date</label><input id="edit-fee-exam-due" type="date" /></div>
                <div class="form-row"><label>Hostel Due Date</label><input id="edit-fee-hostel-due" type="date" /></div>
                <div class="form-row"><label><input id="edit-fee-auto-notify" type="checkbox" /> Auto-notify when overdue (email/SMS placeholder)</label></div>
                <div class="form-row"><label>Development Fee (₹)</label><input id="edit-fee-development" type="number" min="0" /></div>
                <div class="modal-actions"><button id="edit-fee-cancel" class="btn">Cancel</button><button id="edit-fee-save" class="btn btn--primary">Save</button></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#edit-fee-cancel').addEventListener('click', () => closeModal(modalId));
    modal.querySelector('#edit-fee-save').addEventListener('click', async () => {
            // read values and save back
            const branch = document.getElementById('edit-fee-branch').value.trim();
            const sem = parseInt(document.getElementById('edit-fee-semester').value, 10);
            const tuition = parseFloat(document.getElementById('edit-fee-tuition').value) || 0;
            const lab = parseFloat(document.getElementById('edit-fee-lab').value) || 0;
            const lib = parseFloat(document.getElementById('edit-fee-library').value) || 0;
            const hostel = parseFloat(document.getElementById('edit-fee-hostel').value) || 0;
            const exam = parseFloat(document.getElementById('edit-fee-exam').value) || 0;
            const semDue = document.getElementById('edit-fee-semester-due').value || null;
            const examDue = document.getElementById('edit-fee-exam-due').value || null;
            const hostelDue = document.getElementById('edit-fee-hostel-due').value || null;
            const dev = parseFloat(document.getElementById('edit-fee-development').value) || 0;

            if (!branch) { showNotification('Branch required', 'error'); return; }
            if (!sem || isNaN(sem)) { showNotification('Valid semester required', 'error'); return; }

            // update
            structure.branch = branch;
            structure.semester = sem;
            structure.tuitionFee = tuition;
            structure.labFee = lab;
            structure.libraryFee = lib;
            structure.hostelFee = hostel;
            structure.examFee = exam;
            structure.developmentFee = dev;
            structure.semesterDueDate = semDue;
            structure.examDueDate = examDue;
            structure.hostelDueDate = hostelDue;
            structure.autoNotify = !!document.getElementById('edit-fee-auto-notify').checked;

            // attempt to persist to backend if available
            const token = localStorage.getItem('authToken');
            try {
                const resp = await fetch(`http://localhost:3000/api/fee-structures/${index}`, {
                    method: 'PUT',
                    headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { 'Authorization': `Bearer ${token}` } : {}),
                    body: JSON.stringify(structure)
                });
                if (!resp.ok) {
                    let errMsg = 'Server error while updating fee structure.';
                    try { const body = await resp.json(); if (body && body.message) errMsg = body.message; } catch (e) {}
                    showNotification(`Updated locally. ${errMsg}`, 'error');
                }
            } catch (err) {
                showNotification('Updated locally. Could not reach backend: ' + err.message, 'error');
            }

            closeModal(modalId);
            renderFeeStructures();
            showNotification('Fee structure updated', 'success');
            // If student fee summary modal is open, refresh its display so due dates update
            const summaryModal = document.getElementById('admin-student-fee-summary-modal');
            if (summaryModal && !summaryModal.classList.contains('hidden')) {
                const input = summaryModal.querySelector('#summary-student-input');
                if (input && summaryModal._renderSummaryFor) summaryModal._renderSummaryFor(input.value);
            }
        });
    }

    // prefill
    document.getElementById('edit-fee-branch').value = structure.branch || '';
    document.getElementById('edit-fee-semester').value = structure.semester || '';
    document.getElementById('edit-fee-tuition').value = structure.tuitionFee || 0;
    document.getElementById('edit-fee-lab').value = structure.labFee || 0;
    document.getElementById('edit-fee-library').value = structure.libraryFee || 0;
    document.getElementById('edit-fee-hostel').value = structure.hostelFee || 0;
    document.getElementById('edit-fee-exam').value = structure.examFee || 0;
    document.getElementById('edit-fee-development').value = structure.developmentFee || 0;
    document.getElementById('edit-fee-semester-due').value = structure.semesterDueDate || '';
    document.getElementById('edit-fee-exam-due').value = structure.examDueDate || '';
    document.getElementById('edit-fee-hostel-due').value = structure.hostelDueDate || '';
    // ensure auto-notify checkbox exists and is set
    const editAuto = document.getElementById('edit-fee-auto-notify');
    if (editAuto) editAuto.checked = !!structure.autoNotify;

    showModal(modalId);
}

function renderPaymentsTable() {
    const tableBody = document.getElementById('payments-table-body');
    
    tableBody.innerHTML = payments.map(payment => {
        const student = students.find(s => s.id === payment.studentId);
        return `
            <tr>
                <td>${payment.transactionId}</td>
                <td>${student ? student.name : 'Unknown'}</td>
                <td>₹${payment.amount.toLocaleString()}</td>
                <td>${payment.feeType}</td>
                <td>${new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td><span class="status status--success">${payment.status}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn--outline btn--sm" onclick="viewPaymentReceipt('${payment.id}')">Receipt</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderStudentDetails() {
    const student = students.find(s => s.email === currentUser.email);
    if (!student) return;
    
    document.getElementById('student-welcome').textContent = `Welcome back, ${student.name}!`;
    
    const detailsContainer = document.getElementById('student-details');
    detailsContainer.innerHTML = `
        <h3>Personal Information</h3>
        <div class="student-details-grid">
            <div class="student-detail-item">
                <span class="detail-label">Name</span>
                <span class="detail-value">${student.name}</span>
            </div>
            <div class="student-detail-item">
                <span class="detail-label">Roll Number</span>
                <span class="detail-value">${student.rollNumber}</span>
            </div>
            <div class="student-detail-item">
                <span class="detail-label">Branch</span>
                <span class="detail-value">${student.branch}</span>
            </div>
            <div class="student-detail-item">
                <span class="detail-label">Semester</span>
                <span class="detail-value">${student.semester}</span>
            </div>
            <div class="student-detail-item">
                <span class="detail-label">Year</span>
                <span class="detail-value">${student.year}</span>
            </div>
            <div class="student-detail-item">
                <span class="detail-label">Email</span>
                <span class="detail-value">${student.email}</span>
            </div>
        </div>
    `;
    
    // Render fee summary
    const feeStructure = feeStructures.find(f => f.branch === student.branch && f.semester === student.semester);
    const summaryContainer = document.getElementById('fee-summary');
    if (feeStructure) {
        const totalFee = feeStructure.tuitionFee + feeStructure.labFee + feeStructure.libraryFee + 
                        (student.hostelResident ? feeStructure.hostelFee : 0) + 
                        feeStructure.examFee + feeStructure.developmentFee;

        const studentPayments = payments.filter(p => p.studentId === student.id);
        const paidAmount = studentPayments.reduce((sum, p) => sum + p.amount, 0);
        const pendingAmount = totalFee - paidAmount;

        if (summaryContainer) {
            summaryContainer.innerHTML = `
                <div class="fee-summary-item">
                    <div class="fee-summary-amount total">₹${totalFee.toLocaleString()}</div>
                    <div class="fee-summary-label">Total Fee</div>
                </div>
                <div class="fee-summary-item">
                    <div class="fee-summary-amount paid">₹${paidAmount.toLocaleString()}</div>
                    <div class="fee-summary-label">Paid</div>
                </div>
                <div class="fee-summary-item">
                    <div class="fee-summary-amount pending">₹${Math.max(0, pendingAmount).toLocaleString()}</div>
                    <div class="fee-summary-label">Pending</div>
                </div>
            `;
        }
    } else {
        // No fee structure found for this student's branch/semester — show a helpful message
        if (summaryContainer) {
            summaryContainer.innerHTML = '<p class="muted">Fee structure not available for your branch/semester.</p>';
        }
    }
}

function renderStudentFeeDetails() {
    const student = students.find(s => s.email === currentUser.email);
    if (!student) return;
    
    const feeStructure = feeStructures.find(f => f.branch === student.branch && f.semester === student.semester);
    if (!feeStructure) return;
    
    // Compute core total excluding optional exam and optional hostel (hostel added per-student below)
    const totalFee = (feeStructure.tuitionFee || 0) + (feeStructure.labFee || 0) + (feeStructure.libraryFee || 0) + (feeStructure.developmentFee || 0);
    
    const container = document.getElementById('fee-breakdown');
    // compute due dates (use fee structure fields if present)
    const semDue = computeDueDate(feeStructure, 'semester');
    const examDue = computeDueDate(feeStructure, 'exam');
    const hostelDue = computeDueDate(feeStructure, 'hostel');

    container.innerHTML = `
        <h3>Fee Structure - Semester ${student.semester}</h3>
        <div class="fee-breakdown">
            <div class="fee-item">
                <span class="fee-label">Tuition Fee</span>
                <span class="fee-amount">₹${feeStructure.tuitionFee.toLocaleString()}</span>
            </div>
            <div class="fee-item">
                <span class="fee-label">Lab Fee</span>
                <span class="fee-amount">₹${feeStructure.labFee.toLocaleString()}</span>
            </div>
            <div class="fee-item">
                <span class="fee-label">Library Fee</span>
                <span class="fee-amount">₹${feeStructure.libraryFee.toLocaleString()}</span>
            </div>
            ${student.hostelResident ? `
                <div class="fee-item">
                    <span class="fee-label">Hostel Fee <small>(Optional)</small></span>
                    <span class="fee-amount">₹${feeStructure.hostelFee.toLocaleString()}</span>
                    <div style="font-size:0.9em;color:var(--color-text-secondary); margin-top:4px">Due: ${hostelDue}</div>
                </div>
            ` : ''}
            <div class="fee-item">
                <span class="fee-label">Exam Fee <small>(Optional)</small></span>
                <span class="fee-amount">₹${feeStructure.examFee.toLocaleString()}</span>
                <div style="font-size:0.9em;color:var(--color-text-secondary); margin-top:4px">Due: ${examDue}</div>
            </div>
            <div class="fee-item">
                <span class="fee-label">Development Fee</span>
                <span class="fee-amount">₹${feeStructure.developmentFee.toLocaleString()}</span>
            </div>
            <div class="fee-item fee-total">
                <span class="fee-label">Total (excluding optional exam & hostel)</span>
                <span class="fee-amount">₹${totalFee.toLocaleString()}</span>
                <div style="font-size:0.9em;color:var(--color-text-secondary); margin-top:6px">Semester Due Date: ${semDue}</div>
            </div>
        </div>
    `;
}

function renderPaymentHistory() {
    const student = students.find(s => s.email === currentUser.email);
    if (!student) return;
    
    const studentPayments = payments.filter(p => p.studentId === student.id);
    const container = document.getElementById('payment-history-list');
    
    if (studentPayments.length === 0) {
        container.innerHTML = '<p>No payments found.</p>';
        return;
    }
    
    container.innerHTML = studentPayments.map(payment => `
        <div class="payment-history-item">
            <div class="payment-info">
                <h4>${payment.feeType}</h4>
                <div class="payment-meta">
                    Transaction ID: ${payment.transactionId} • 
                    Date: ${new Date(payment.paymentDate).toLocaleDateString()} • 
                    Method: ${payment.paymentMethod || 'Not specified'} • 
                    Status: ${payment.status}
                </div>
            </div>
            <div class="payment-amount">₹${payment.amount.toLocaleString()}</div>
        </div>
    `).join('');
}

// Modal Functions
// Modal Functions
function showModal(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.classList.remove('hidden');
    // Clear any inline 'display: none' so the modal's inline styles (like display:flex)
    // or CSS rules can take effect. Useful for dynamically-created modals which set
    // inline display during creation.
    try { el.style.display = 'flex'; } catch (e) {}
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.classList.add('hidden');
    // Force inline display none to ensure it is hidden even if element had inline
    // display styles set earlier (inline styles have higher priority than CSS classes).
    try { el.style.display = 'none'; } catch (e) {}
}

function showAddStudentModal() {
    populateBranchOptions();
    showModal('add-student-modal');
}

function submitAddStudent() {
    const name = document.getElementById('new-student-name').value;
    const email = document.getElementById('new-student-email').value;
    const rollNumber = document.getElementById('new-student-roll').value;
    const branch = document.getElementById('new-student-branch').value;
    const semester = parseInt(document.getElementById('new-student-semester').value);
    const contactNumber = document.getElementById('new-student-contact').value;
    const address = document.getElementById('new-student-address').value;
    const hostelResident = document.getElementById('new-student-hostel').checked;
    
    if (!name || !email || !rollNumber || !branch || !semester || !contactNumber || !address) {
        showNotification('Please fill all required fields!', 'error');
        return;
    }
    
    // Check if roll number already exists
    if (students.find(s => s.rollNumber === rollNumber)) {
        showNotification('Roll number already exists!', 'error');
        return;
    }
    
    const newStudent = {
        id: 'ST' + String(students.length + 1).padStart(3, '0'),
        name,
        email,
        rollNumber,
        branch,
        semester,
        year: Math.ceil(semester / 2),
        contactNumber,
        address,
        hostelResident
    };
    
    students.push(newStudent);
    closeModal('add-student-modal');
    renderStudentsTable();
    showNotification('Student added successfully!', 'success');
}

// Payment Functions
function handleStudentPayment(e) {
    e.preventDefault();
    
    const paymentType = document.getElementById('payment-type').value;
    const amount = parseFloat(document.getElementById('payment-amount').value);
    
    if (!paymentType || !amount) {
        showNotification('Please fill all fields!', 'error');
        return;
    }
    
    // Show payment gateway modal
    const summaryContainer = document.getElementById('payment-summary');
    summaryContainer.innerHTML = `
        <h4>Payment Summary</h4>
        <div class="payment-summary-item">
            <span>Fee Type:</span>
            <span>${paymentType}</span>
        </div>
        <div class="payment-summary-item">
            <span>Amount:</span>
            <span>₹${amount.toLocaleString()}</span>
        </div>
        <div class="payment-summary-item payment-summary-total">
            <span>Total:</span>
            <span>₹${amount.toLocaleString()}</span>
        </div>
    `;
    
    showModal('payment-gateway-modal');
}

// Update payment form fields based on selected payment method
function processPayment() {
    const student = students.find(s => s.email === currentUser.email);
    if (!student) return;
    
    const paymentType = document.getElementById('payment-type').value;
    const amount = parseFloat(document.getElementById('payment-amount').value);
    const upiId = document.getElementById('upi-id').value.trim();
    
    if (!upiId) {
        showNotification('Please enter UPI ID!', 'error');
        return;
    }
    
    // Generate transaction ID
    const transactionId = 'TXN' + Date.now();
    
    const newPayment = {
        id: 'PAY' + String(payments.length + 1).padStart(3, '0'),
        studentId: student.id,
        amount: amount,
        feeType: paymentType,
        paymentMethod: 'UPI',
        paymentDate: new Date().toISOString().split('T')[0],
        transactionId: transactionId,
        status: 'Completed'
    };
    
    payments.push(newPayment);
    
    // Send payment to backend database
    const token = localStorage.getItem('authToken');
    if (token) {
        fetch('http://localhost:3000/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                studentId: student.id,
                feeStructureId: 1, // You may need to fetch this based on payment type
                amount: amount,
                paymentMethod: 'UPI',
                transactionId: transactionId
            })
        }).catch(error => console.error('Error saving payment to database:', error));
    }
    
    closeModal('payment-gateway-modal');
    document.getElementById('student-payment-form').reset();
    document.getElementById('upi-id').value = '';
    
    showNotification(`Payment of ₹${amount.toLocaleString()} completed successfully via UPI! Transaction ID: ${transactionId}`, 'success');
    
    // Refresh student dashboard
    renderStudentDetails();
}

// Filter Functions
function getFilteredStudents() {
    const searchTerm = document.getElementById('student-search').value.toLowerCase();
    const branchFilter = document.getElementById('branch-filter').value;
    
    return students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                            student.rollNumber.toLowerCase().includes(searchTerm) ||
                            student.email.toLowerCase().includes(searchTerm);
        
        const matchesBranch = !branchFilter || student.branch === branchFilter;
        
        return matchesSearch && matchesBranch;
    });
}

function filterStudents() {
    renderStudentsTable();
}

function populateBranchOptions() {
    const branchSelects = ['new-student-branch', 'branch-filter'];
    
    branchSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            const currentValue = select.value;
            select.innerHTML = selectId === 'branch-filter' ? '<option value="">All Branches</option>' : '<option value="">Select Branch</option>';
            
            sampleData.branches.forEach(branch => {
                const option = document.createElement('option');
                option.value = branch;
                option.textContent = branch;
                select.appendChild(option);
            });
            
            select.value = currentValue;
        }
    });
}

// Chart Functions
function initializeRevenueChart() {
    const ctx = document.getElementById('revenue-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue (₹)',
                data: [150000, 180000, 220000, 200000, 250000, 280000],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function initializeBranchRevenueChart() {
    const ctx = document.getElementById('branch-revenue-chart');
    if (!ctx) {
        console.warn('branch-revenue-chart canvas not found');
        return;
    }
    
    if (!payments || payments.length === 0) {
        console.warn('No payment data available for chart');
        ctx.style.display = 'block';
        return;
    }
    
    // Calculate revenue per branch from payments
    const branchRevenue = {};
    
    payments.forEach(payment => {
        const student = students.find(s => s.id === payment.studentId);
        if (student) {
            if (!branchRevenue[student.branch]) {
                branchRevenue[student.branch] = 0;
            }
            branchRevenue[student.branch] += payment.amount;
        }
    });
    
    // Get branches from data (excluding Electrical)
    const branches = ['Computer Science Engineering', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering'];
    const labels = ['CSE', 'ECE', 'Mechanical', 'Civil'];
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'];
    
    // Get corresponding revenue values
    const data = branches.map(branch => branchRevenue[branch] || 0);
    
    console.log('Branch Revenue Data:', branchRevenue);
    console.log('Chart Data:', data);
    
    try {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue (₹)',
                    data: data,
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        console.log('Branch Revenue Chart initialized successfully');
    } catch (error) {
        console.error('Error initializing Branch Revenue Chart:', error);
    }
}

function initializePaymentStatusChart() {
    const ctx = document.getElementById('payment-status-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Pending', 'Overdue'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Utility Functions
// Format an ISO date or Date into DD-MM-YYYY
function formatDateISO(d) {
    if (!d) return '—';
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date.getTime())) return '—';
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

// Compute a due date for a fee type. Priority: feeStructure.<type>DueDate -> default offsets
function computeDueDate(fs, type) {
    // If fee structure provides explicit due dates (ISO strings), use them
    if (fs) {
        if (type === 'semester' && fs.semesterDueDate) return formatDateISO(fs.semesterDueDate);
        if (type === 'exam' && fs.examDueDate) return formatDateISO(fs.examDueDate);
        if (type === 'hostel' && fs.hostelDueDate) return formatDateISO(fs.hostelDueDate);
    }

    // Defaults: semester & hostel -> 30 days from now, exam -> 60 days from now
    const now = Date.now();
    const days = type === 'exam' ? 60 : 30;
    return formatDateISO(new Date(now + days * 24 * 60 * 60 * 1000));
}
function editStudent(studentId) {
    const modalId = 'edit-student-modal';
    let modal = document.getElementById(modalId);

    // Find student to edit
    const student = students.find(s => s.id === studentId);
    if (!student) { showNotification('Student not found.', 'error'); return; }

    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        // Build markup so backdrop and content have predictable stacking and pointer-events
        modal.innerHTML = `
            <div class="modal-backdrop" style="position:absolute; inset:0; background:rgba(0,0,0,0.45);"></div>
            <div class="modal-content modal--edit-student" style="position:relative; z-index:1001; pointer-events:auto;">
                <div class="modal-header"><h3>Edit Student</h3></div>
                <div class="modal-body">
                    <div class="form-row"><label>Name</label><input id="edit-name" type="text" /></div>
                    <div class="form-row"><label>Email</label><input id="edit-email" type="email" /></div>
                    <div class="form-row"><label>Roll Number</label><input id="edit-roll" type="text" /></div>
                    <div class="form-row"><label>Branch</label><input id="edit-branch" type="text" /></div>
                    <div class="form-row"><label>Semester</label><input id="edit-semester" type="number" min="1" /></div>
                    <div class="form-row"><label>Contact Number</label><input id="edit-contact" type="text" /></div>
                    <div class="form-row"><label>Address</label><input id="edit-address" type="text" /></div>
                    <div class="form-row"><label><input id="edit-hostel" type="checkbox" /> Hostel Resident</label></div>
                </div>
                <div class="modal-footer modal-actions" style="display:flex; justify-content:flex-end; gap:8px; margin-top:12px;">
                    <button id="edit-cancel" class="btn" type="button">Cancel</button>
                    <button id="edit-save" class="btn btn--primary" type="button">Save</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        // start hidden until explicitly shown
        modal.classList.add('hidden');
        // ensure modal is on top and that modal-content sits above backdrop so buttons receive clicks
        try {
            // Place modal full screen and make sure backdrop covers entire viewport
            modal.style.position = 'fixed';
            modal.style.left = '0';
            modal.style.top = '0';
            modal.style.right = '0';
            modal.style.bottom = '0';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '99999';
            // Backdrop should sit behind content but be clickable to close
            const backdropEl = modal.querySelector('.modal-backdrop');
            const contentEl = modal.querySelector('.modal-content');
            if (backdropEl) {
                backdropEl.style.zIndex = '99998';
                backdropEl.style.pointerEvents = 'auto';
                backdropEl.style.position = 'absolute';
                backdropEl.style.left = '0';
                backdropEl.style.top = '0';
                backdropEl.style.right = '0';
                backdropEl.style.bottom = '0';
            }
            if (contentEl) {
                contentEl.style.zIndex = '99999';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'relative';
                // give content a max-width so it doesn't overflow
                contentEl.style.maxWidth = '95%';
                contentEl.style.boxSizing = 'border-box';
            }
        } catch (e) {}

        // Styles for this modal moved to frontend/style.css (scoped by #edit-student-modal)

        // Cancel handler - attach with addEventListener and stop propagation
        const cancelBtn = modal.querySelector('#edit-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                try { console.log('edit-cancel clicked'); } catch (e) {}
                closeModal(modalId);
            });
        }

        // Close when clicking on the overlay (outside modal-content)
        modal.addEventListener('click', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('modal-backdrop')) {
                closeModal(modalId);
            }
            if (e.target === modal) closeModal(modalId);
        });

        // Close on Escape key
        document.addEventListener('keydown', function escListener(e) {
            if (e.key === 'Escape') {
                if (modal && !modal.classList.contains('hidden')) closeModal(modalId);
            }
        });

        // Attach a persistent save handler that reads the student id from the modal's
        // dataset when clicked. This avoids cloning nodes while still preventing stale
        // closures when the modal is reused for different students.
        const saveBtn = modal.querySelector('#edit-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', function (ev) {
                ev.stopPropagation();
                try { console.log('edit-save clicked'); } catch (e) {}
                const sid = modal.dataset.editingStudent;
                const studentIdNow = sid || null;
                if (!studentIdNow) {
                    showNotification('No student selected to save.', 'error');
                    return;
                }

                // Resolve the student fresh by id
                const targetStudent = students.find(s => s.id === studentIdNow);
                if (!targetStudent) { showNotification('Student not found.', 'error'); return; }

                const nameEl = modal.querySelector('#edit-name');
                const emailEl = modal.querySelector('#edit-email');
                const rollEl = modal.querySelector('#edit-roll');
                const branchEl = modal.querySelector('#edit-branch');
                const semesterEl = modal.querySelector('#edit-semester');
                const contactEl = modal.querySelector('#edit-contact');
                const addressEl = modal.querySelector('#edit-address');
                const hostelElInner = modal.querySelector('#edit-hostel');

                const name = nameEl ? nameEl.value.trim() : '';
                const email = emailEl ? emailEl.value.trim() : '';
                const roll = rollEl ? rollEl.value.trim() : '';
                const branch = branchEl ? branchEl.value.trim() : '';
                const semester = semesterEl ? parseInt(semesterEl.value, 10) : NaN;
                const contact = contactEl ? contactEl.value.trim() : '';
                const address = addressEl ? addressEl.value.trim() : '';
                const hostel = hostelElInner ? hostelElInner.checked : false;

                if (!name || !email || !roll || !branch || !semester) {
                    showNotification('Please fill required fields (name, email, roll, branch, semester).', 'error');
                    return;
                }

                // Check roll number uniqueness (allow same roll for this student)
                const otherWithRoll = students.find(s => s.rollNumber === roll && s.id !== studentIdNow);
                if (otherWithRoll) {
                    showNotification('Roll number already exists for another student.', 'error');
                    return;
                }

                // Apply changes
                targetStudent.name = name;
                targetStudent.email = email;
                targetStudent.rollNumber = roll;
                targetStudent.branch = branch;
                targetStudent.semester = semester;
                targetStudent.contactNumber = contact;
                targetStudent.address = address;
                targetStudent.hostelResident = hostel;

                // If the edited student is the current user, update currentUser fields
                if (currentUser && currentUser.email === email) {
                    currentUser.name = name;
                    currentUser.email = email;
                }

                // Close and refresh
                const modalEl = document.getElementById(modalId);
                if (modalEl) modalEl.classList.add('hidden');
                renderStudentsTable();
                showNotification('Student updated successfully.', 'success');
                try { renderStudentDetails(); } catch (e) {}
                try { updateAdminStats(); } catch (e) {}
            });
        }
    }

    // Prefill fields
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setVal('edit-name', student.name || '');
    setVal('edit-email', student.email || '');
    setVal('edit-roll', student.rollNumber || '');
    setVal('edit-branch', student.branch || '');
    setVal('edit-semester', student.semester || '');
    setVal('edit-contact', student.contactNumber || '');
    setVal('edit-address', student.address || '');
    const hostelEl = document.getElementById('edit-hostel'); if (hostelEl) hostelEl.checked = !!student.hostelResident;

    // Set the current editing student id onto the modal so the persistent save
    // listener (attached at creation) reads the correct id when clicked.
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
        modalEl.dataset.editingStudent = studentId;
    }

    // Use showModal so inline display is set (some codepaths/setters depend on inline styles)
    showModal(modalId);
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== studentId);
        renderStudentsTable();
        showNotification('Student deleted successfully!', 'success');
    }
}

function viewPaymentReceipt(paymentId) {
    // Find the payment
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) {
        showNotification('Payment not found.', 'error');
        return;
    }

    const student = students.find(s => s.id === payment.studentId) || { name: 'Unknown', rollNumber: '' };

    // Build receipt HTML
    const receiptHtml = `
        <html>
        <head>
            <title>Payment Receipt - ${payment.transactionId}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .receipt { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; }
                .row { display: flex; justify-content: space-between; margin: 6px 0; }
                .total { font-size: 1.25em; font-weight: bold; margin-top: 12px; }
            </style>
        </head>
        <body>
            <div class="receipt">
                <div class="header">
                    <h2>College Fee Management</h2>
                    <div>Payment Receipt</div>
                </div>
                <div class="row"><div>Transaction ID:</div><div>${payment.transactionId}</div></div>
                <div class="row"><div>Payment ID:</div><div>${payment.id}</div></div>
                <div class="row"><div>Student:</div><div>${student.name} (${student.rollNumber})</div></div>
                <div class="row"><div>Fee Type:</div><div>${payment.feeType}</div></div>
                <div class="row"><div>Payment Method:</div><div>${payment.paymentMethod || 'Not specified'}</div></div>
                <div class="row"><div>Date:</div><div>${new Date(payment.paymentDate).toLocaleDateString()}</div></div>
                <div class="row total"><div>Amount Paid:</div><div>₹${payment.amount.toLocaleString()}</div></div>
                <div style="margin-top:18px; font-size:0.9em; color:#666">This is a system generated receipt.</div>
            </div>
            <script>
                window.onload = function() { window.print(); };
            </script>
        </body>
        </html>
    `;

    const receiptWindow = window.open('', '_blank', 'width=700,height=800');
    if (!receiptWindow) {
        showNotification('Unable to open receipt window. Please allow popups for this site.', 'error');
        return;
    }
    receiptWindow.document.open();
    receiptWindow.document.write(receiptHtml);
    receiptWindow.document.close();
}

function showProcessPaymentModal() {
    // Build a simple in-page modal form dynamically to process a payment by admin
    const modalId = 'admin-process-payment-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Process Payment</h3>
                <div class="form-row">
                    <label>Student (type roll number or name)</label>
                    <input id="proc-student-input" list="proc-student-datalist" placeholder="Type roll number or name..." />
                    <datalist id="proc-student-datalist"></datalist>
                </div>
                <div class="form-row">
                    <label>Fee Type</label>
                    <select id="proc-fee-type" class="form-control">
                        <option value="">Select Fee Type</option>
                        <option value="Semester Fee">Semester Fee</option>
                        <option value="Partial Payment">Partial Payment</option>
                        <option value="Exam Fee">Exam Fee</option>
                        <option value="Hostel Fee">Hostel Fee</option>
                    </select>
                </div>
                <div class="form-row">
                    <label>Amount (₹)</label>
                    <input id="proc-amount" type="number" min="0" />
                </div>
                <div class="modal-actions">
                    <button id="proc-cancel" class="btn">Cancel</button>
                    <button id="proc-submit" class="btn btn--primary">Process</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Styles for this modal moved to frontend/style.css (scoped by #admin-process-payment-modal)
    }

    // Populate searchable datalist for students (include roll numbers so admins
    // can search by roll number as well as by ID or name)
    const studentInput = document.getElementById('proc-student-input');
    const studentDatalist = document.getElementById('proc-student-datalist');
    studentDatalist.innerHTML = '';
    students.forEach(s => {
        // If a roll number exists, show a single "ROLL - Name" suggestion so the
        // user can search by roll; otherwise fall back to name-only suggestion.
        if (s.rollNumber) {
            const optRoll = document.createElement('option');
            optRoll.value = `${s.rollNumber} - ${s.name}`;
            studentDatalist.appendChild(optRoll);
        } else {
            const optName = document.createElement('option');
            optName.value = s.name;
            studentDatalist.appendChild(optName);
        }
    });
    studentInput.value = '';

    // Show modal using shared helper so inline display is set correctly
    showModal(modalId);

    document.getElementById('proc-cancel').onclick = () => {
        // Use shared helper to ensure both class and inline styles are cleared
        closeModal(modalId);
        // clear inputs for next time
        try {
            document.getElementById('proc-student-input').value = '';
            document.getElementById('proc-fee-type').value = '';
            document.getElementById('proc-amount').value = '';
        } catch (e) {}
    };

    document.getElementById('proc-submit').onclick = () => {
        const raw = studentInput.value.trim();
        const feeType = document.getElementById('proc-fee-type').value.trim();
        const amount = parseFloat(document.getElementById('proc-amount').value);

        // Resolve student id from input which may contain "ROLL - Name" or just name/roll.
        // This intentionally does NOT match by internal student ID so admins can search
        // by roll number or by name only.
        const resolveStudentId = (input) => {
            if (!input) return null;
            // If input contains " - ", treat the left side as roll number
            if (input.includes(' - ')) {
                const parts = input.split(' - ');
                const maybeRoll = parts[0].trim();
                const byRollMaybe = students.find(s => s.rollNumber && s.rollNumber === maybeRoll);
                if (byRollMaybe) return byRollMaybe.id;
            }

            const lowered = input.toLowerCase();

            // Match by rollNumber exact
            const byRoll = students.find(s => s.rollNumber && s.rollNumber.toLowerCase() === lowered);
            if (byRoll) return byRoll.id;

            // Match by exact name (case-insensitive)
            const byNameExact = students.find(s => s.name && s.name.toLowerCase() === lowered);
            if (byNameExact) return byNameExact.id;

            // Partial name match (first match)
            const byNamePartial = students.find(s => s.name && s.name.toLowerCase().includes(lowered));
            if (byNamePartial) return byNamePartial.id;

            // No match
            return null;
        };

        const studentId = resolveStudentId(raw);

        if (!studentId) {
            showNotification('Student not found. Type name and pick from suggestions.', 'error');
            return;
        }

        if (!feeType || !amount || isNaN(amount) || amount <= 0) {
            showNotification('Please provide valid fee type and amount.', 'error');
            return;
        }

        const transactionId = 'TXN' + Date.now();
        const newPayment = {
            id: 'PAY' + String(payments.length + 1).padStart(3, '0'),
            studentId,
            amount,
            feeType,
            paymentDate: new Date().toISOString().split('T')[0],
            transactionId,
            status: 'Completed'
        };

        payments.push(newPayment);
        // Close using shared helper which also clears inline display styles
        closeModal(modalId);
        // Clear inputs
        try {
            studentInput.value = '';
            document.getElementById('proc-fee-type').value = '';
            document.getElementById('proc-amount').value = '';
        } catch (e) {}
        renderPaymentsTable();
        updateAdminStats();
        showNotification(`Processed payment ₹${amount.toLocaleString()} (ID: ${transactionId})`, 'success');
    };
}

function showAddFeeStructureModal() {
    const modalId = 'add-fee-structure-modal';
    let modal = document.getElementById(modalId);

    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content modal--fee">
                <h3>Add Fee Structure</h3>
                <div class="form-row">
                    <label>Branch</label>
                    <input id="fee-branch" type="text" placeholder="e.g. Computer Science Engineering" />
                </div>
                <div class="form-row">
                    <label>Semester</label>
                    <input id="fee-semester" type="number" min="1" />
                </div>
                <div class="form-row">
                    <label>Tuition Fee (₹)</label>
                    <input id="fee-tuition" type="number" min="0" />
                </div>
                <div class="form-row">
                    <label>Lab Fee (₹)</label>
                    <input id="fee-lab" type="number" min="0" />
                </div>
                <div class="form-row">
                    <label>Library Fee (₹)</label>
                    <input id="fee-library" type="number" min="0" />
                </div>
                <div class="form-row">
                    <label>Hostel Fee (Optional) (₹)</label>
                    <input id="fee-hostel" type="number" min="0" />
                </div>
                <div class="form-row">
                    <label>Exam Fee (Optional) (₹)</label>
                    <input id="fee-exam" type="number" min="0" />
                </div>
                <div class="form-row">
                    <label>Semester Due Date</label>
                    <input id="fee-semester-due" type="date" />
                </div>
                <div class="form-row">
                    <label>Exam Due Date</label>
                    <input id="fee-exam-due" type="date" />
                </div>
                <div class="form-row">
                    <label>Hostel Due Date</label>
                    <input id="fee-hostel-due" type="date" />
                </div>
                <div class="form-row">
                    <label><input id="fee-auto-notify" type="checkbox" /> Auto-notify when overdue (email/SMS placeholder)</label>
                </div>
                <div class="form-row">
                    <label>Development Fee (₹)</label>
                    <input id="fee-development" type="number" min="0" />
                </div>
                <div class="modal-actions">
                    <button id="fee-cancel" class="btn">Cancel</button>
                    <button id="fee-save" class="btn btn--primary">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Styles for this modal moved to frontend/style.css (scoped by #add-fee-structure-modal)

        // Wire up buttons
        document.getElementById('fee-cancel').addEventListener('click', () => {
            // Use shared helper so we also set inline display to 'none' which
            // has higher precedence than the ID-based CSS rule injected for this modal.
            closeModal(modalId);
            clearFeeModalInputs();
        });

        document.getElementById('fee-save').addEventListener('click', async () => {
            // Read and validate inputs
            const branch = document.getElementById('fee-branch').value.trim();
            const semester = parseInt(document.getElementById('fee-semester').value, 10);
            const tuitionFee = parseFloat(document.getElementById('fee-tuition').value) || 0;
            const labFee = parseFloat(document.getElementById('fee-lab').value) || 0;
            const libraryFee = parseFloat(document.getElementById('fee-library').value) || 0;
            const hostelFee = parseFloat(document.getElementById('fee-hostel').value) || 0;
            const examFee = parseFloat(document.getElementById('fee-exam').value) || 0;
            const semesterDueDate = document.getElementById('fee-semester-due').value || null;
            const examDueDate = document.getElementById('fee-exam-due').value || null;
            const hostelDueDate = document.getElementById('fee-hostel-due').value || null;
            const autoNotify = !!document.getElementById('fee-auto-notify').checked;
            const developmentFee = parseFloat(document.getElementById('fee-development').value) || 0;

            if (!branch) { showNotification('Branch is required.', 'error'); return; }
            if (!semester || isNaN(semester) || semester < 1) { showNotification('Valid semester is required.', 'error'); return; }

            const newStructure = { branch, semester, tuitionFee, labFee, libraryFee, hostelFee, examFee, developmentFee, semesterDueDate, examDueDate, hostelDueDate, autoNotify };

            // Optimistically add locally
            feeStructures.push(newStructure);
            renderFeeStructures();

            // Prepare payload for backend: compute total amount and a description
            // Hostel and Exam fees are optional and therefore excluded from the
            // total amount sent to the server; we still include them in the
            // description for reference.
            const amount = tuitionFee + labFee + libraryFee + developmentFee;
            const description = `Tuition:${tuitionFee}, Lab:${labFee}, Library:${libraryFee}, Hostel(Optional):${hostelFee}, Exam(Optional):${examFee}, Dev:${developmentFee}, SemesterDue:${semesterDueDate || ''}, ExamDue:${examDueDate || ''}, HostelDue:${hostelDueDate || ''}`;

            // Attempt to POST to backend if available
            const token = localStorage.getItem('authToken');
            try {
                const resp = await fetch('http://localhost:3000/api/fee-structures', {
                    method: 'POST',
                    headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { 'Authorization': `Bearer ${token}` } : {}),
                    body: JSON.stringify({ branch, semester, amount, description, semesterDueDate, examDueDate, hostelDueDate, autoNotify })
                });

                if (resp.ok) {
                    const data = await resp.json();
                    showNotification('Fee structure saved to server and added locally.', 'success');
                } else {
                    // server returned error - keep local copy but inform user
                    let errMsg = 'Server error while saving fee structure.';
                    try { const body = await resp.json(); if (body && body.message) errMsg = body.message; } catch (e) {}
                    showNotification(`Saved locally. ${errMsg}`, 'error');
                }
            } catch (err) {
                // Network error or backend down - keep local copy and inform
                showNotification('Saved locally. Could not reach backend: ' + err.message, 'error');
            }

            // Close via helper to ensure it is hidden even when an ID selector
            // sets display:flex in the injected styles.
            closeModal(modalId);
            clearFeeModalInputs();
        });
    }

    // Show modal and focus first field. Use showModal so inline display is set
    // consistently (some CSS uses an ID selector with display:flex which would
    // otherwise override the .hidden class).
    showModal(modalId);
    setTimeout(() => {
        const first = document.getElementById('fee-branch');
        if (first) first.focus();
    }, 50);

    function clearFeeModalInputs() {
        ['fee-branch','fee-semester','fee-tuition','fee-lab','fee-library','fee-hostel','fee-exam','fee-development','fee-semester-due','fee-exam-due','fee-hostel-due']
            .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Admin: show per-student fee summary (breakdown across categories)
function showStudentFeeSummaryModal(prefillStudentId) {
    const modalId = 'admin-student-fee-summary-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Student Fee Summary</h3>
                <div class="form-row">
                    <label>Student (roll or name)</label>
                    <input id="summary-student-input" list="summary-student-datalist" placeholder="Type roll or name..." />
                    <datalist id="summary-student-datalist"></datalist>
                </div>
                <div id="summary-result" style="margin-top:12px;"></div>
                <div class="modal-actions">
                    <button id="summary-close" class="btn">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // populate datalist
        const list = modal.querySelector('#summary-student-datalist');
        students.forEach(s => {
            const opt = document.createElement('option');
            if (s.rollNumber) opt.value = `${s.rollNumber} - ${s.name}`;
            else opt.value = s.name;
            list.appendChild(opt);
        });

        modal.querySelector('#summary-close').addEventListener('click', () => closeModal(modalId));

        // when selection/input changes, render summary
        const input = modal.querySelector('#summary-student-input');
        const renderForInput = (value) => {
            const raw = (value||'').trim().toLowerCase();
            const out = document.getElementById('summary-result');
            if (!raw) { out.innerHTML = ''; return; }
            // resolve by roll or name
            const student = students.find(s => (s.rollNumber && (s.rollNumber.toLowerCase() === raw || `${s.rollNumber} - ${s.name}`.toLowerCase() === raw)) || s.name.toLowerCase() === raw || s.name.toLowerCase().includes(raw));
            if (!student) { out.innerHTML = '<p class="muted">Student not found.</p>'; return; }

            // find fee structure
            const fs = feeStructures.find(f => f.branch === student.branch && f.semester === student.semester);
            // Define Semester Fee as the core mandatory components (tuition + lab + library + development).
            // Hostel is optional and therefore excluded here.
            const semesterTotal = fs ? ((fs.tuitionFee || 0) + (fs.labFee || 0) + (fs.libraryFee || 0) + (fs.developmentFee || 0)) : 0;
            const exam = fs ? (fs.examFee || 0) : 0;
            const hostel = (fs && student.hostelResident) ? (fs.hostelFee || 0) : 0;
            const studentPayments = payments.filter(p => p.studentId === student.id);
            // Partial payments are treated as installments toward the semester fee
            const partialPaid = studentPayments.filter(p => p.feeType === 'Partial Payment').reduce((s,p) => s + p.amount, 0);
            const semesterPaidDirect = studentPayments.filter(p => p.feeType === 'Semester Fee').reduce((s,p) => s + p.amount, 0);
            const semesterPaid = semesterPaidDirect + partialPaid; // include partials toward semester
            // Be tolerant when matching exam payments (some records may use 'Examination Fee' etc.)
            const examPaid = studentPayments.filter(p => p.feeType && /exam/i.test(p.feeType)).reduce((s,p) => s + p.amount, 0);
            const hostelPaid = studentPayments.filter(p => p.feeType === 'Hostel Fee').reduce((s,p) => s + p.amount, 0);

            const semesterPending = Math.max(0, semesterTotal - semesterPaid);
            const totalPaid = studentPayments.reduce((s,p) => s + p.amount, 0);

            // compute due dates (from fee structure if available, otherwise defaults)
            const semesterDue = computeDueDate(fs, 'semester');
            const examDue = computeDueDate(fs, 'exam');
            const hostelDue = computeDueDate(fs, 'hostel');

            out.innerHTML = `
                <div class="fee-summary-item"><strong>Student:</strong> ${student.name} (${student.rollNumber || '—'})</div>
                <div class="fee-summary-item"><strong>Semester Fee:</strong> ₹${semesterTotal.toLocaleString()} (Paid: ₹${semesterPaid.toLocaleString()} • Pending: ₹${semesterPending.toLocaleString()}) <div style="font-size:0.9em; color:rgba(255,255,255,0.9); margin-top:4px">Due: ${semesterDue}</div></div>
                <div class="fee-summary-item"><strong>Exam Fee:</strong> ₹${exam.toLocaleString()} (Paid: ₹${examPaid.toLocaleString()}) <div style="font-size:0.9em; color:rgba(255,255,255,0.9); margin-top:4px">Due: ${examDue}</div></div>
                <div class="fee-summary-item"><strong>Hostel Fee:</strong> ₹${hostel.toLocaleString()} (Paid: ₹${hostelPaid.toLocaleString()}) <div style="font-size:0.9em; color:rgba(255,255,255,0.9); margin-top:4px">Due: ${hostelDue}</div></div>
                <div class="fee-summary-item"><strong>Total Paid:</strong> ₹${totalPaid.toLocaleString()}</div>
            `;
        };

        input.addEventListener('input', () => renderForInput(input.value));
        // expose helper on modal to render programmatically when prefilled
        modal._renderSummaryFor = renderForInput;
    }
    showModal(modalId);

    // If caller provided a studentId, try to prefill the input and render result
    if (prefillStudentId) {
        try {
            const modalEl = document.getElementById(modalId);
            const input = modalEl.querySelector('#summary-student-input');
            const student = students.find(s => s.id === prefillStudentId);
            if (student && input) {
                const val = student.rollNumber ? `${student.rollNumber} - ${student.name}` : student.name;
                input.value = val;
                // use the attached render helper if available
                if (modalEl._renderSummaryFor) modalEl._renderSummaryFor(val);
            }
        } catch (e) {}
    }
}

// Admin: show list of students with pending fees (any pending amount > 0)
function showPendingStudentsReport() {
    const modalId = 'admin-pending-students-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Pending Students</h3>
                <div id="pending-list" style="max-height:400px; overflow:auto; margin-top:8px;"></div>
                <div class="modal-actions"><button id="pending-close" class="btn">Close</button></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#pending-close').addEventListener('click', () => closeModal(modalId));
    }

    // Build pending list
    const container = modal.querySelector('#pending-list');
    container.innerHTML = '';

    students.forEach(student => {
        // compute expected fees for this student
        const fs = feeStructures.find(f => f.branch === student.branch && f.semester === student.semester);
        
        // Semester fee includes tuition, lab, library, development
        const semesterFee = fs ? (fs.tuitionFee + fs.labFee + fs.libraryFee + fs.developmentFee) : 0;
        
        // Exam fee
        const examFee = fs ? fs.examFee : 0;
        
        // Hostel fee (only if student is hostel resident)
        const hostelFee = (fs && student.hostelResident) ? fs.hostelFee : 0;
        
        // Total expected
        const totalExpected = semesterFee + examFee + hostelFee;
        
        // Get paid amount
        const studentPayments = payments.filter(p => p.studentId === student.id);
        const totalPaid = studentPayments.reduce((s,p) => s + p.amount, 0);
        
        // Calculate pending
        const pending = Math.max(0, totalExpected - totalPaid);
        
        if (pending > 0) {
            // Determine which fees are pending
            let pendingFeesText = [];
            if (semesterFee > 0 && totalPaid < semesterFee) {
                pendingFeesText.push('Semester Fee (Tuition+Lab+Library+Development)');
            }
            if (examFee > 0 && totalPaid < (semesterFee + examFee)) {
                pendingFeesText.push('Exam Fee');
            }
            if (hostelFee > 0 && totalPaid < totalExpected) {
                pendingFeesText.push('Hostel Fee');
            }
            
            const div = document.createElement('div');
            div.className = 'payment-history-item';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px; border-bottom:1px solid #eee;">
                    <div>
                        <div><strong>${student.name}</strong> (${student.rollNumber || '—'})</div>
                        <div style="font-size:0.9em; color:#666">Branch: ${student.branch} • Semester: ${student.semester}</div>
                        <div style="font-size:0.85em; color:#d9534f; margin-top:4px;"><strong>Pending Fees:</strong> ${pendingFeesText.join(', ')}</div>
                    </div>
                    <div style="text-align:right">
                        <div>Pending: <strong>₹${pending.toLocaleString()}</strong></div>
                        <div style="font-size:0.9em;color:#666">Paid: ₹${totalPaid.toLocaleString()}</div>
                    </div>
                </div>
            `;
            container.appendChild(div);
        }
    });

    showModal(modalId);
}
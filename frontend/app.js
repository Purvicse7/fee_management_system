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
            email: "rahul.kumar@college.edu",
            rollNumber: "21CS001",
            branch: "Computer Science Engineering",
            semester: 6,
            year: 3,
            contactNumber: "9876543210",
            address: "123 MG Road, Bangalore",
            hostelResident: true
        },
        {
            id: "ST002",
            name: "Priya Sharma",
            email: "priya.sharma@college.edu",
            rollNumber: "21EC001",
            branch: "Electronics & Communication",
            semester: 4,
            year: 2,
            contactNumber: "9876543211",
            address: "456 Brigade Road, Bangalore",
            hostelResident: false
        },
        {
            id: "ST003",
            name: "Arjun Patel",
            email: "arjun.patel@college.edu",
            rollNumber: "21ME001",
            branch: "Mechanical Engineering",
            semester: 8,
            year: 4,
            contactNumber: "9876543212",
            address: "789 Commercial Street, Bangalore",
            hostelResident: true
        },
        {
            id: "ST004",
            name: "Liya Guptha",
            email: "liyaguptha@college.edu",
            rollNumber: "4YG23CS079",
            branch: "Computer Science Engineering",
            semester: 5,
            year: 3,
            contactNumber: "9876543299",
            address: "bangalore",
            hostelResident: false
        }
    ],
    feeStructures: [
        {
            branch: "Computer Science Engineering",
            semester: 6,
            tuitionFee: 75000,
            labFee: 15000,
            libraryFee: 5000,
            hostelFee: 25000,
            examFee: 3000,
            developmentFee: 10000
        },
        {
            branch: "Electronics & Communication",
            semester: 4,
            tuitionFee: 70000,
            labFee: 12000,
            libraryFee: 5000,
            hostelFee: 25000,
            examFee: 3000,
            developmentFee: 10000
        },
        {
            branch: "Mechanical Engineering",
            semester: 8,
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
            amount: 133000,
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
        { id: 'U001', name: 'Admin User', email: 'admin@college.edu', role: 'admin', password: 'admin123' },
        { id: 'U002', name: 'Rahul Kumar', email: 'rahul.kumar@college.edu', role: 'student', password: 'student123' },
        { id: 'U003', name: 'Priya Sharma', email: 'priya.sharma@college.edu', role: 'student', password: 'student123' },
        { id: 'U004', name: 'Arjun Patel', email: 'arjun.patel@college.edu', role: 'student', password: 'student123' }
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
                    <button class="btn btn--outline btn--sm" onclick="editStudent('${student.id}')">Edit</button>
                    <button class="btn btn--outline btn--sm" onclick="deleteStudent('${student.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderFeeStructures() {
    const container = document.getElementById('fee-structures-grid');
    
    container.innerHTML = feeStructures.map(structure => {
        const total = structure.tuitionFee + structure.labFee + structure.libraryFee + 
                     structure.hostelFee + structure.examFee + structure.developmentFee;
        
        return `
            <div class="fee-structure-card">
                <div class="fee-structure-header">
                    <h3>${structure.branch}</h3>
                    <div class="semester-info">Semester ${structure.semester}</div>
                </div>
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
                        <span class="fee-label">Hostel Fee</span>
                        <span class="fee-amount">₹${structure.hostelFee.toLocaleString()}</span>
                    </div>
                    <div class="fee-item">
                        <span class="fee-label">Exam Fee</span>
                        <span class="fee-amount">₹${structure.examFee.toLocaleString()}</span>
                    </div>
                    <div class="fee-item">
                        <span class="fee-label">Development Fee</span>
                        <span class="fee-amount">₹${structure.developmentFee.toLocaleString()}</span>
                    </div>
                    <div class="fee-item fee-total">
                        <span class="fee-label">Total Amount</span>
                        <span class="fee-amount">₹${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
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
    if (feeStructure) {
        const totalFee = feeStructure.tuitionFee + feeStructure.labFee + feeStructure.libraryFee + 
                        (student.hostelResident ? feeStructure.hostelFee : 0) + 
                        feeStructure.examFee + feeStructure.developmentFee;
        
        const studentPayments = payments.filter(p => p.studentId === student.id);
        const paidAmount = studentPayments.reduce((sum, p) => sum + p.amount, 0);
        const pendingAmount = totalFee - paidAmount;
        
        const summaryContainer = document.getElementById('fee-summary');
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
}

function renderStudentFeeDetails() {
    const student = students.find(s => s.email === currentUser.email);
    if (!student) return;
    
    const feeStructure = feeStructures.find(f => f.branch === student.branch && f.semester === student.semester);
    if (!feeStructure) return;
    
    const totalFee = feeStructure.tuitionFee + feeStructure.labFee + feeStructure.libraryFee + 
                    (student.hostelResident ? feeStructure.hostelFee : 0) + 
                    feeStructure.examFee + feeStructure.developmentFee;
    
    const container = document.getElementById('fee-breakdown');
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
                    <span class="fee-label">Hostel Fee</span>
                    <span class="fee-amount">₹${feeStructure.hostelFee.toLocaleString()}</span>
                </div>
            ` : ''}
            <div class="fee-item">
                <span class="fee-label">Exam Fee</span>
                <span class="fee-amount">₹${feeStructure.examFee.toLocaleString()}</span>
            </div>
            <div class="fee-item">
                <span class="fee-label">Development Fee</span>
                <span class="fee-amount">₹${feeStructure.developmentFee.toLocaleString()}</span>
            </div>
            <div class="fee-item fee-total">
                <span class="fee-label">Total Amount</span>
                <span class="fee-amount">₹${totalFee.toLocaleString()}</span>
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

function processPayment() {
    const student = students.find(s => s.email === currentUser.email);
    if (!student) return;
    
    const paymentType = document.getElementById('payment-type').value;
    const amount = parseFloat(document.getElementById('payment-amount').value);
    
    // Generate transaction ID
    const transactionId = 'TXN' + Date.now();
    
    const newPayment = {
        id: 'PAY' + String(payments.length + 1).padStart(3, '0'),
        studentId: student.id,
        amount: amount,
        feeType: paymentType,
        paymentDate: new Date().toISOString().split('T')[0],
        transactionId: transactionId,
        status: 'Completed'
    };
    
    payments.push(newPayment);
    
    closeModal('payment-gateway-modal');
    document.getElementById('student-payment-form').reset();
    
    showNotification(`Payment of ₹${amount.toLocaleString()} completed successfully! Transaction ID: ${transactionId}`, 'success');
    
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
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical'],
            datasets: [{
                label: 'Revenue (₹)',
                data: [500000, 450000, 400000, 350000, 300000],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
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

        const style = document.createElement('style');
        style.id = 'edit-student-styles';
        style.textContent = `
            #${modalId} { position: fixed; left:0; top:0; right:0; bottom:0; background: rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:9999; }
            #${modalId} .modal-content { background:#fff; padding:18px; width:480px; border-radius:8px; box-shadow:0 6px 18px rgba(0,0,0,0.12); }
            #${modalId} .form-row { display:flex; flex-direction:column; margin:8px 0; }
            #${modalId} .form-row label { font-size:0.9em; margin-bottom:6px; color:#333; }
            #${modalId} .form-row input[type=text], #${modalId} .form-row input[type=email], #${modalId} .form-row input[type=number] { padding:8px 10px; border:1px solid #ddd; border-radius:4px; }
            #${modalId} .modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:12px; }
            #${modalId} .btn--primary { background:#1FB8CD; color:#fff; border-color:transparent; }
        `;
        document.head.appendChild(style);

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
                    <label>Student (type to search by ID or name)</label>
                    <input id="proc-student-input" list="proc-student-datalist" placeholder="Type student name..." />
                    <datalist id="proc-student-datalist"></datalist>
                </div>
                <div class="form-row">
                    <label>Fee Type</label>
                    <input id="proc-fee-type" type="text" placeholder="Fee Type (e.g. Semester Fee)" />
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

        // Basic styles (only added once)
        const style = document.createElement('style');
        style.textContent = `
            .modal { position: fixed; left:0; top:0; right:0; bottom:0; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999; }
            .modal-content { background:#fff; padding:20px; width:360px; border-radius:6px; }
            .form-row { margin:8px 0; display:flex; flex-direction:column; }
            .modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:12px; }
        `;
        document.head.appendChild(style);
    }

    // Populate searchable datalist for students
    const studentInput = document.getElementById('proc-student-input');
    const studentDatalist = document.getElementById('proc-student-datalist');
    studentDatalist.innerHTML = '';
    students.forEach(s => {
        const opt = document.createElement('option');
        // value shown to user; include id and name for clarity
        opt.value = `${s.id} - ${s.name}`;
        studentDatalist.appendChild(opt);
    });
    studentInput.value = '';

    // Show modal
    modal.classList.remove('hidden');

    document.getElementById('proc-cancel').onclick = () => {
        modal.classList.add('hidden');
    };

    document.getElementById('proc-submit').onclick = () => {
        const raw = studentInput.value.trim();
        const feeType = document.getElementById('proc-fee-type').value.trim();
        const amount = parseFloat(document.getElementById('proc-amount').value);

        // Resolve student id from input which may contain "ID - Name" or just name/id
        const resolveStudentId = (input) => {
            if (!input) return null;
            // If input contains " - " and starts with an ID like ST001, extract it
            if (input.includes(' - ')) {
                const parts = input.split(' - ');
                const maybeId = parts[0].trim();
                if (students.find(s => s.id === maybeId)) return maybeId;
            }

            // Exact ID match
            const byId = students.find(s => s.id.toLowerCase() === input.toLowerCase());
            if (byId) return byId.id;

            // Match by rollNumber
            const byRoll = students.find(s => s.rollNumber && s.rollNumber.toLowerCase() === input.toLowerCase());
            if (byRoll) return byRoll.id;

            // Match by exact name (case-insensitive)
            const byNameExact = students.find(s => s.name.toLowerCase() === input.toLowerCase());
            if (byNameExact) return byNameExact.id;

            // Partial name match (first match)
            const byNamePartial = students.find(s => s.name.toLowerCase().includes(input.toLowerCase()));
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
        modal.classList.add('hidden');
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
                    <label>Hostel Fee (₹)</label>
                    <input id="fee-hostel" type="number" min="0" />
                </div>
                <div class="form-row">
                    <label>Exam Fee (₹)</label>
                    <input id="fee-exam" type="number" min="0" />
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

        // Inject styles (scoped minimal styles)
        const style = document.createElement('style');
        style.id = 'fee-modal-styles';
        style.textContent = `
            #${modalId} { position: fixed; left:0; top:0; right:0; bottom:0; background: rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:9999; }
            #${modalId} .modal-content { background:#fff; padding:18px; width:420px; border-radius:8px; box-shadow:0 6px 18px rgba(0,0,0,0.12); }
            #${modalId} h3 { margin:0 0 12px 0; }
            #${modalId} .form-row { display:flex; flex-direction:column; margin:8px 0; }
            #${modalId} .form-row label { font-size:0.9em; margin-bottom:6px; color:#333; }
            #${modalId} .form-row input { padding:8px 10px; border:1px solid #ddd; border-radius:4px; }
            #${modalId} .modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:12px; }
            #${modalId} .btn { padding:8px 12px; border-radius:4px; border:1px solid #ccc; background:#f5f5f5; cursor:pointer; }
            #${modalId} .btn--primary { background:#1FB8CD; color:#fff; border-color:transparent; }
        `;
        document.head.appendChild(style);

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
            const developmentFee = parseFloat(document.getElementById('fee-development').value) || 0;

            if (!branch) { showNotification('Branch is required.', 'error'); return; }
            if (!semester || isNaN(semester) || semester < 1) { showNotification('Valid semester is required.', 'error'); return; }

            const newStructure = { branch, semester, tuitionFee, labFee, libraryFee, hostelFee, examFee, developmentFee };

            // Optimistically add locally
            feeStructures.push(newStructure);
            renderFeeStructures();

            // Prepare payload for backend: compute total amount and a description
            const amount = tuitionFee + labFee + libraryFee + hostelFee + examFee + developmentFee;
            const description = `Tuition:${tuitionFee}, Lab:${labFee}, Library:${libraryFee}, Hostel:${hostelFee}, Exam:${examFee}, Dev:${developmentFee}`;

            // Attempt to POST to backend if available
            const token = localStorage.getItem('authToken');
            try {
                const resp = await fetch('http://localhost:3000/api/fee-structures', {
                    method: 'POST',
                    headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { 'Authorization': `Bearer ${token}` } : {}),
                    body: JSON.stringify({ branch, semester, amount, description })
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
        ['fee-branch','fee-semester','fee-tuition','fee-lab','fee-library','fee-hostel','fee-exam','fee-development']
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
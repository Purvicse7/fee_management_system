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
            name: "POORVI",
            email: "poorvi@college.edu",
            rollNumber: "4YG23CS079",
            branch: "CSE",
            semester: 5,
            year: 3,
            contactNumber: "9876543299",
            address: "456 Brigade Road, Bangalore",
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
        "Civil Engineering",
        "Electrical Engineering",
        "Information Technology",
        "Aeronautical Engineering",
        "Chemical Engineering"
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
            meta: 'Computer Science Engineering - Semester 6',
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
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
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
    showNotification('Edit student functionality would be implemented here.', 'info');
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== studentId);
        renderStudentsTable();
        showNotification('Student deleted successfully!', 'success');
    }
}

function viewPaymentReceipt(paymentId) {
    showNotification('Receipt download functionality would be implemented here.', 'info');
}

function showProcessPaymentModal() {
    showNotification('Process payment functionality would be implemented here.', 'info');
}

function showAddFeeStructureModal() {
    showNotification('Add fee structure functionality would be implemented here.', 'info');
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
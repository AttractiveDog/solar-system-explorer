// API Configuration
const API_BASE_URL = window.location.origin + '/api/v1';

// State Management
const state = {
    isLoggedIn: false,
    adminUsername: '',
    currentSection: 'dashboard',
    currentPage: {
        users: 1,
        clubs: 1,
        events: 1,
    },
};

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const sectionTitle = document.getElementById('sectionTitle');
const adminUsernameEl = document.getElementById('adminUsername');
const editModal = document.getElementById('editModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');
const addClubBtn = document.getElementById('addClubBtn');
const addEventBtn = document.getElementById('addEventBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    setupEventListeners();
});

// Check if user is already logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const adminUsername = localStorage.getItem('adminUsername');
    
    if (isLoggedIn && adminUsername) {
        state.isLoggedIn = true;
        state.adminUsername = adminUsername;
        showDashboard();
    }
}

// Setup Event Listeners
function setupEventListeners() {
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    if(addClubBtn) addClubBtn.addEventListener('click', showAddClubModal);
    if(addEventBtn) addEventBtn.addEventListener('click', showAddEventModal);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            switchSection(section);
        });
    });

    // Modal Events
    modalClose.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Event Delegation for dynamic buttons
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.btn-action');
        if (!btn) return;

        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (!action || !id) return;

        console.log(`Action triggered: ${action} on ID: ${id}`);

        switch (action) {
            case 'editUser':
                await editUser(id);
                break;
            case 'deleteUser':
                await deleteUser(id);
                break;
            case 'editClub':
                editClub(id);
                break;
            case 'deleteClub':
                await deleteClub(id);
                break;
            case 'editEvent':
                editEvent(id);
                break;
            case 'deleteEvent':
                await deleteEvent(id);
                break;
        }
    });
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    showButtonLoading(loginBtn, true);
    hideError();
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (data.success) {
            state.isLoggedIn = true;
            state.adminUsername = data.data.username;
            
            // Save to localStorage
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', data.data.username);
            
            showDashboard();
        } else {
            showError(data.message || 'Login failed');
        }
    } catch (error) {
        showError('Network error. Please try again.');
        console.error('Login error:', error);
    } finally {
        showButtonLoading(loginBtn, false);
    }
}

// Handle Logout
function handleLogout() {
    state.isLoggedIn = false;
    state.adminUsername = '';
    
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    
    loginScreen.style.display = 'flex';
    adminDashboard.style.display = 'none';
    
    loginForm.reset();
}

// Show Dashboard
function showDashboard() {
    loginScreen.style.display = 'none';
    adminDashboard.style.display = 'flex';
    
    adminUsernameEl.textContent = state.adminUsername;
    
    loadDashboardStats();
}

// Switch Section
function switchSection(section) {
    state.currentSection = section;
    
    // Update navigation
    navLinks.forEach(link => {
        if (link.dataset.section === section) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update sections
    sections.forEach(sec => {
        if (sec.id === `${section}Section`) {
            sec.classList.add('active');
        } else {
            sec.classList.remove('active');
        }
    });
    
    // Update title
    const titles = {
        dashboard: 'Dashboard',
        users: 'User Management',
        clubs: 'Club Management',
        events: 'Event Management',
    };
    sectionTitle.textContent = titles[section] || section;
    
    // Load section data
    if (section === 'dashboard') {
        loadDashboardStats();
    } else if (section === 'users') {
        loadUsers();
    } else if (section === 'clubs') {
        loadClubs();
    } else if (section === 'events') {
        loadEvents();
    }
}

// Load Dashboard Stats
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/stats`);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('totalUsers').textContent = data.data.totalUsers;
            document.getElementById('totalClubs').textContent = data.data.totalClubs;
            document.getElementById('totalEvents').textContent = data.data.totalEvents;
            document.getElementById('totalAchievements').textContent = data.data.totalAchievements;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load Users
async function loadUsers(page = 1) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading...</td></tr>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users?page=${page}&limit=10`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
            tbody.innerHTML = data.data.map(user => `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.stats?.rank || 'N/A'}</td>
                    <td>${user.stats?.points || 0}</td>
                    <td>${formatDate(user.joinedDate)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-edit" data-action="editUser" data-id="${user._id}">Edit</button>
                            <button class="btn-action btn-delete" data-action="deleteUser" data-id="${user._id}">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            renderPagination('users', data.page, data.pages);
        } else {
            tbody.innerHTML = '<tr><td colspan="6" class="loading">No users found</td></tr>';
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">Error loading users</td></tr>';
        console.error('Error loading users:', error);
    }
}

// Load Clubs
async function loadClubs(page = 1) {
    const tbody = document.getElementById('clubsTableBody');
    tbody.innerHTML = '<tr><td colspan="5" class="loading">Loading...</td></tr>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/clubs?page=${page}&limit=10`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
            tbody.innerHTML = data.data.map(club => `
                <tr>
                    <td>${club.name}</td>
                    <td>${club.category || 'N/A'}</td>
                    <td>${club.memberCount || 0}</td>
                    <td>${formatDate(club.createdAt)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-edit" data-action="editClub" data-id="${club._id}">Edit</button>
                            <button class="btn-action btn-delete" data-action="deleteClub" data-id="${club._id}">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            renderPagination('clubs', data.page, data.pages);
        } else {
            tbody.innerHTML = '<tr><td colspan="5" class="loading">No clubs found</td></tr>';
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">Error loading clubs</td></tr>';
        console.error('Error loading clubs:', error);
    }
}

// Load Events
async function loadEvents(page = 1) {
    const tbody = document.getElementById('eventsTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading...</td></tr>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/events?page=${page}&limit=10`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
            tbody.innerHTML = data.data.map(event => `
                <tr>
                    <td>${event.title}</td>
                    <td>${event.club?.name || 'N/A'}</td>
                    <td>${formatDate(event.date)}</td>
                    <td><span class="status-badge ${event.status}">${event.status}</span></td>
                    <td>${event.participantCount || 0}/${event.maxParticipants || 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-edit" data-action="editEvent" data-id="${event._id}">Edit</button>
                            <button class="btn-action btn-delete" data-action="deleteEvent" data-id="${event._id}">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            renderPagination('events', data.page, data.pages);
        } else {
            tbody.innerHTML = '<tr><td colspan="6" class="loading">No events found</td></tr>';
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">Error loading events</td></tr>';
        console.error('Error loading events:', error);
    }
}

// Delete Functions
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
            method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('User deleted successfully');
            loadUsers(state.currentPage.users);
            loadDashboardStats();
        } else {
            alert('Error deleting user: ' + data.message);
        }
    } catch (error) {
        alert('Error deleting user');
        console.error('Error:', error);
    }
}

async function deleteClub(id) {
    if (!confirm('Are you sure you want to delete this club?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/clubs/${id}`, {
            method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Club deleted successfully');
            loadClubs(state.currentPage.clubs);
            loadDashboardStats();
        } else {
            alert('Error deleting club: ' + data.message);
        }
    } catch (error) {
        alert('Error deleting club');
        console.error('Error:', error);
    }
}

async function deleteEvent(id) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
            method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Event deleted successfully');
            loadEvents(state.currentPage.events);
            loadDashboardStats();
        } else {
            alert('Error deleting event: ' + data.message);
        }
    } catch (error) {
        alert('Error deleting event');
        console.error('Error:', error);
    }
}

// Edit Functions
async function editUser(id) {
    console.log('editUser called with ID:', id);
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users/${id}`);
        const data = await response.json();

        if (data.success) {
            const user = data.data;
            modalTitle.textContent = 'Edit User';
            modalBody.innerHTML = `
                <form id="editUserForm" class="edit-form">
                    <div class="form-group">
                        <label for="editUsername">Username</label>
                        <input type="text" id="editUsername" name="username" value="${user.username}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editEmail">Email</label>
                        <input type="email" id="editEmail" name="email" value="${user.email}" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="editPoints">Points</label>
                            <input type="number" id="editPoints" name="points" value="${user.stats?.points || 0}">
                        </div>
                        
                        <div class="form-group">
                            <label for="editRank">Rank</label>
                            <select id="editRank" name="rank">
                                <option value="Voyager" ${user.stats?.rank === 'Voyager' ? 'selected' : ''}>Voyager</option>
                                <option value="Explorer" ${user.stats?.rank === 'Explorer' ? 'selected' : ''}>Explorer</option>
                                <option value="Navigator" ${user.stats?.rank === 'Navigator' ? 'selected' : ''}>Navigator</option>
                                <option value="Pioneer" ${user.stats?.rank === 'Pioneer' ? 'selected' : ''}>Pioneer</option>
                                <option value="Legend" ${user.stats?.rank === 'Legend' ? 'selected' : ''}>Legend</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('editModal').style.display='none'">Cancel</button>
                        <button type="submit" class="btn-primary">Save Changes</button>
                    </div>
                </form>
            `;
            
            editModal.style.display = 'block';

            // Handle form submission
            document.getElementById('editUserForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Saving...';
                submitBtn.disabled = true;

                const formData = {
                    username: document.getElementById('editUsername').value,
                    email: document.getElementById('editEmail').value,
                    stats: {
                        points: parseInt(document.getElementById('editPoints').value),
                        rank: document.getElementById('editRank').value,
                        contributions: user.stats?.contributions || 0,
                        projects: user.stats?.projects || 0
                    }
                };

                try {
                    const updateResponse = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    const updateData = await updateResponse.json();
                    
                    if (updateData.success) {
                        alert('User updated successfully');
                        editModal.style.display = 'none';
                        loadUsers(state.currentPage.users);
                    } else {
                        alert('Error updating user: ' + updateData.message);
                    }
                } catch (error) {
                    console.error('Error updating user:', error);
                    alert('Error updating user');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Failed to load user details');
    }
}

// Edit Club
async function editClub(id) {
    console.log('editClub called with ID:', id);
    try {
        // Fetch club details
        const clubResponse = await fetch(`${API_BASE_URL}/admin/clubs/${id}`);
        const clubData = await clubResponse.json();

        if (!clubData.success) {
            throw new Error(clubData.message || 'Failed to fetch club details');
        }
        
        const club = clubData.data;

        // Fetch users for owner selection
        let usersOptions = '<option value="">Select Owner...</option>';
        try {
            const usersReponse = await fetch(`${API_BASE_URL}/admin/users?limit=100`);
            const usersData = await usersReponse.json();
            if (usersData.success) {
                usersOptions += usersData.data.map(u => 
                    `<option value="${u._id}" ${club.createdBy?._id === u._id ? 'selected' : ''}>${u.username} (${u.email})</option>`
                ).join('');
            }
        } catch (e) {
            console.error('Error fetching users for select', e);
            usersOptions += '<option value="" disabled>Error loading users</option>';
        }

        modalTitle.textContent = 'Edit Club';
        modalBody.innerHTML = `
            <form id="editClubForm" class="edit-form">
                <div class="form-group">
                    <label for="editClubName">Club Name</label>
                    <input type="text" id="editClubName" name="name" value="${club.name}" required>
                </div>
                
                <div class="form-group">
                    <label for="editClubDescription">Description</label>
                    <textarea id="editClubDescription" name="description" required>${club.description}</textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="editClubCategory">Category</label>
                        <select id="editClubCategory" name="category" required>
                             <option value="development" ${club.category === 'development' ? 'selected' : ''}>Development</option>
                            <option value="design" ${club.category === 'design' ? 'selected' : ''}>Design</option>
                            <option value="data" ${club.category === 'data' ? 'selected' : ''}>Data</option>
                            <option value="business" ${club.category === 'business' ? 'selected' : ''}>Business</option>
                            <option value="other" ${club.category === 'other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                     <div class="form-group">
                        <label for="editClubOwner">Owner (Admin)</label>
                        <select id="editClubOwner" name="createdBy" required>
                            ${usersOptions}
                        </select>
                    </div>
                </div>

                <div class="form-row">
                     <div class="form-group">
                        <label for="editClubIcon">Icon (Emoji)</label>
                        <input type="text" id="editClubIcon" name="icon" value="${club.icon}" required>
                    </div>
                    <div class="form-group">
                        <label for="editClubColor">Color (Hex)</label>
                        <input type="color" id="editClubColor" name="color" value="${club.color}" required style="height: 40px;">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="editClubGradient">Gradient (CSS)</label>
                    <input type="text" id="editClubGradient" name="gradient" required value="${club.gradient}">
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="document.getElementById('editModal').style.display='none'">Cancel</button>
                    <button type="submit" class="btn-primary">Save Changes</button>
                </div>
            </form>
        `;
        
        editModal.style.display = 'block';

        // Handle form submission
        document.getElementById('editClubForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Saving...';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('editClubName').value,
                description: document.getElementById('editClubDescription').value,
                category: document.getElementById('editClubCategory').value,
                createdBy: document.getElementById('editClubOwner').value,
                icon: document.getElementById('editClubIcon').value,
                color: document.getElementById('editClubColor').value,
                gradient: document.getElementById('editClubGradient').value
            };

            try {
                const updateResponse = await fetch(`${API_BASE_URL}/admin/clubs/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const updateData = await updateResponse.json();
                
                if (updateData.success) {
                    alert('Club updated successfully');
                    editModal.style.display = 'none';
                    loadClubs(state.currentPage.clubs);
                } else {
                    alert('Error updating club: ' + updateData.message);
                }
            } catch (error) {
                console.error('Error updating club:', error);
                alert('Error updating club');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

    } catch (error) {
        console.error('Error fetching club details:', error);
        alert('Failed to load club details');
    }
}

async function editEvent(id) {
    console.log('editEvent called with ID:', id);
    try {
        // Fetch event details
        const eventResponse = await fetch(`${API_BASE_URL}/admin/events/${id}`);
        const eventData = await eventResponse.json();

        if (!eventData.success) {
            throw new Error(eventData.message || 'Failed to fetch event details');
        }
        
        const event = eventData.data;

        // Fetch clubs for selection
        let clubsOptions = '<option value="">Select Club...</option>';
        try {
            const clubsRes = await fetch(`${API_BASE_URL}/admin/clubs?limit=100`);
            const clubsData = await clubsRes.json();
            
            if (clubsData.success) {
                clubsOptions += clubsData.data.map(c => 
                    `<option value="${c._id}" ${event.club?._id === c._id ? 'selected' : ''}>${c.name}</option>`
                ).join('');
            }
        } catch (e) {
            console.error('Error fetching data for select', e);
            clubsOptions += '<option value="" disabled>Error loading clubs</option>';
        }

        // Fetch users for participants selection
        let usersOptions = '';
        try {
            const usersRes = await fetch(`${API_BASE_URL}/admin/users?limit=1000`);
            const usersData = await usersRes.json();
            
            if (usersData.success) {
                const currentParticipantEmails = new Set((event.participants || []).map(p => p.email));
                usersOptions = usersData.data.map(u => 
                    `<option value="${u.email}" ${currentParticipantEmails.has(u.email) ? 'selected' : ''}>${u.username} (${u.email})</option>`
                ).join('');
            }
        } catch (e) {
            console.error('Error fetching users for select', e);
            usersOptions = '<option value="" disabled>Error loading users</option>';
        }

        modalTitle.textContent = 'Edit Event';
        
        // Format date for date input (YYYY-MM-DD)
        const dateObj = new Date(event.date);
        const dateStr = dateObj.toISOString().split('T')[0];

        modalBody.innerHTML = `
            <form id="editEventForm" class="edit-form">
                <div class="form-group">
                    <label for="editEventTitle">Event Title</label>
                    <input type="text" id="editEventTitle" name="title" required value="${event.title}">
                </div>
                
                <div class="form-group">
                    <label for="editEventDescription">Description</label>
                    <textarea id="editEventDescription" name="description" required>${event.description}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="editEventClub">Club</label>
                    <select id="editEventClub" name="club" required>
                        ${clubsOptions}
                    </select>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="editEventDate">Date</label>
                        <input type="date" id="editEventDate" name="date" required value="${dateStr}">
                    </div>
                    <div class="form-group">
                        <label for="editEventTime">Time</label>
                        <input type="time" id="editEventTime" name="time" required value="${event.time}">
                    </div>
                    <div class="form-group">
                        <label for="editEventDuration">Duration (min)</label>
                        <input type="number" id="editEventDuration" name="duration" value="${event.duration || 60}">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="editEventLocation">Location Type</label>
                        <select id="editEventLocation" name="location" onchange="toggleLocationFields(this.value)">
                            <option value="online" ${event.location === 'online' ? 'selected' : ''}>Online</option>
                            <option value="offline" ${event.location === 'offline' ? 'selected' : ''}>Offline</option>
                            <option value="hybrid" ${event.location === 'hybrid' ? 'selected' : ''}>Hybrid</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editEventStatus">Status</label>
                        <select id="editEventStatus" name="status">
                            <option value="upcoming" ${event.status === 'upcoming' ? 'selected' : ''}>Upcoming</option>
                            <option value="ongoing" ${event.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                            <option value="completed" ${event.status === 'completed' ? 'selected' : ''}>Completed</option>
                            <option value="cancelled" ${event.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="editEventMaxParticipants">Max Participants</label>
                        <input type="number" id="editEventMaxParticipants" name="maxParticipants" placeholder="Leave empty for unlimited" value="${event.maxParticipants || ''}">
                    </div>
                </div>

                <div class="form-group">
                    <label for="editEventParticipants">Participants (Hold Ctrl/Cmd to select multiple)</label>
                    <select multiple id="editEventParticipants" name="participants" style="height: 150px; width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        ${usersOptions}
                    </select>
                </div>

                <div class="form-group">
                    <label for="editEventImages">Event Images (Max 5)</label>
                    <input type="file" id="editEventImages" name="images" multiple accept="image/*" onchange="previewImages(this, 'editImagePreviewContainer')">
                     <div id="editImagePreviewContainer" style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;"></div>
                </div>
                
                <div class="form-group" id="meetingLinkGroup" style="${event.location === 'offline' ? 'display:none;' : 'display:block;'}">
                    <label for="editEventMeetingLink">Meeting Link</label>
                    <input type="url" id="editEventMeetingLink" name="meetingLink" placeholder="https://..." value="${event.meetingLink || ''}">
                </div>
                
                <div class="form-group" id="venueGroup" style="${event.location === 'online' ? 'display:none;' : 'display:block;'}">
                    <label for="editEventVenue">Venue Address</label>
                    <input type="text" id="editEventVenue" name="venue" placeholder="Physical address..." value="${event.venue || ''}">
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="document.getElementById('editModal').style.display='none'">Cancel</button>
                    <button type="submit" class="btn-primary">Save Changes</button>
                </div>
            </form>
        `;
        
        // Helper to toggle fields
        window.toggleLocationFields = function(val) {
            const linkGroup = document.getElementById('meetingLinkGroup');
            const venueGroup = document.getElementById('venueGroup');
            
            if (val === 'online') {
                linkGroup.style.display = 'block';
                venueGroup.style.display = 'none';
            } else if (val === 'offline') {
                linkGroup.style.display = 'none';
                venueGroup.style.display = 'block';
            } else {
                linkGroup.style.display = 'block';
                venueGroup.style.display = 'block';
            }
        };
        
        editModal.style.display = 'block';

        document.getElementById('editEventForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Saving...';
            submitBtn.disabled = true;

            const formData = {
                title: document.getElementById('editEventTitle').value,
                description: document.getElementById('editEventDescription').value,
                club: document.getElementById('editEventClub').value,
                date: document.getElementById('editEventDate').value,
                time: document.getElementById('editEventTime').value,
                duration: parseInt(document.getElementById('editEventDuration').value) || 60,
                location: document.getElementById('editEventLocation').value,
                status: document.getElementById('editEventStatus').value,
                meetingLink: document.getElementById('editEventMeetingLink').value,
                venue: document.getElementById('editEventVenue').value,
                maxParticipants: document.getElementById('editEventMaxParticipants').value ? parseInt(document.getElementById('editEventMaxParticipants').value) : null,
                meetingLink: document.getElementById('editEventMeetingLink').value,
                venue: document.getElementById('editEventVenue').value,
                maxParticipants: document.getElementById('editEventMaxParticipants').value ? parseInt(document.getElementById('editEventMaxParticipants').value) : null,
            participants: Array.from(document.getElementById('editEventParticipants').selectedOptions).map(opt => opt.value)
            };

            const formDataToSend = new FormData();
            for (const key in formData) {
                if (formData[key] !== null && formData[key] !== undefined) {
                    if (Array.isArray(formData[key])) {
                        formData[key].forEach(val => formDataToSend.append(key, val));
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                }
            }

            const imageInput = document.getElementById('editEventImages');
            if (imageInput.files.length > 5) {
                alert('You can only upload a maximum of 5 images.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }

            for (let i = 0; i < imageInput.files.length; i++) {
                formDataToSend.append('images', imageInput.files[i]);
            }

            try {
                const updateResponse = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
                    method: 'PUT',
                    body: formDataToSend
                });
                
                const updateData = await updateResponse.json();
                
                if (updateData.success) {
                    alert('Event updated successfully');
                    editModal.style.display = 'none';
                    loadEvents(state.currentPage.events);
                } else {
                    alert('Error updating event: ' + updateData.message);
                }
            } catch (error) {
                console.error('Error updating event:', error);
                alert('Error updating event');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

    } catch (error) {
        console.error('Error fetching event details:', error);
        alert('Failed to load event details');
    }
}

// Show Add Club Modal
async function showAddClubModal() {
    modalTitle.textContent = 'Add New Club';
    
    // Fetch potential owners
    let usersOptions = '<option value="">Select Owner...</option>';
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users?limit=100`);
        const data = await response.json();
        if (data.success) {
            usersOptions += data.data.map(u => `<option value="${u._id}">${u.username} (${u.email})</option>`).join('');
        }
    } catch (e) {
        console.error('Error fetching users for select', e);
        usersOptions += '<option value="" disabled>Error loading users</option>';
    }

    modalBody.innerHTML = `
        <form id="addClubForm" class="edit-form">
            <div class="form-group">
                <label for="clubName">Club Name</label>
                <input type="text" id="clubName" name="name" required placeholder="e.g. AstroCoders">
            </div>
            
            <div class="form-group">
                <label for="clubDescription">Description</label>
                <textarea id="clubDescription" name="description" required placeholder="Club description..."></textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="clubCategory">Category</label>
                    <select id="clubCategory" name="category" required>
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="data">Data</option>
                        <option value="business">Business</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                 <div class="form-group">
                    <label for="clubOwner">Owner (Admin)</label>
                    <select id="clubOwner" name="createdBy" required>
                        ${usersOptions}
                    </select>
                </div>
            </div>

            <div class="form-row">
                 <div class="form-group">
                    <label for="clubIcon">Icon (Emoji)</label>
                    <input type="text" id="clubIcon" name="icon" required placeholder="e.g. 🚀">
                </div>
                <div class="form-group">
                    <label for="clubColor">Color (Hex)</label>
                    <input type="color" id="clubColor" name="color" value="#667eea" required style="height: 40px;">
                </div>
            </div>
            
            <div class="form-group">
                <label for="clubGradient">Gradient (CSS)</label>
                <input type="text" id="clubGradient" name="gradient" required value="linear-gradient(to right, #667eea, #764ba2)" placeholder="linear-gradient(...)">
            </div>

            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="document.getElementById('editModal').style.display='none'">Cancel</button>
                <button type="submit" class="btn-primary">Create Club</button>
            </div>
        </form>
    `;
    
    editModal.style.display = 'block';

    document.getElementById('addClubForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('clubName').value,
            description: document.getElementById('clubDescription').value,
            category: document.getElementById('clubCategory').value,
            createdBy: document.getElementById('clubOwner').value,
            icon: document.getElementById('clubIcon').value,
            color: document.getElementById('clubColor').value,
            gradient: document.getElementById('clubGradient').value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/admin/clubs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Club created successfully');
                editModal.style.display = 'none';
                loadClubs(state.currentPage.clubs);
                loadDashboardStats();
            } else {
                alert('Error creating club: ' + data.message);
            }
        } catch (error) {
            console.error('Error creating club:', error);
            alert('Error creating club');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Show Add Event Modal
async function showAddEventModal() {
    modalTitle.textContent = 'Add New Event';
    
    // Fetch data for selects
    let clubsOptions = '<option value="">Select Club...</option>';
    
    try {
        const clubsRes = await fetch(`${API_BASE_URL}/admin/clubs?limit=100`);
        const clubsData = await clubsRes.json();
        
        if (clubsData.success) {
            clubsOptions += clubsData.data.map(c => `<option value="${c._id}">${c.name}</option>`).join('');
        }
    } catch (e) {
        console.error('Error fetching data for select', e);
        clubsOptions += '<option value="" disabled>Error loading clubs</option>';
    }

    // Fetch users for participants selection
    let usersOptions = '';
    try {
        const usersRes = await fetch(`${API_BASE_URL}/admin/users?limit=1000`);
        const usersData = await usersRes.json();
        
        if (usersData.success) {
            usersOptions = usersData.data.map(u => 
                `<option value="${u.email}">${u.username} (${u.email})</option>`
            ).join('');
        }
    } catch (e) {
        console.error('Error fetching users for select', e);
        usersOptions = '<option value="" disabled>Error loading users</option>';
    }

    modalBody.innerHTML = `
        <form id="addEventForm" class="edit-form">
            <div class="form-group">
                <label for="eventTitle">Event Title</label>
                <input type="text" id="eventTitle" name="title" required placeholder="Event title...">
            </div>
            
            <div class="form-group">
                <label for="eventDescription">Description</label>
                <textarea id="eventDescription" name="description" required placeholder="Event details..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="eventClub">Club</label>
                <select id="eventClub" name="club" required>
                    ${clubsOptions}
                </select>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="eventDate">Date</label>
                    <input type="date" id="eventDate" name="date" required>
                </div>
                <div class="form-group">
                    <label for="eventTime">Time</label>
                    <input type="time" id="eventTime" name="time" required>
                </div>
                <div class="form-group">
                    <label for="eventDuration">Duration (min)</label>
                    <input type="number" id="eventDuration" name="duration" value="60">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="eventLocation">Location Type</label>
                    <select id="eventLocation" name="location" onchange="toggleLocationFields(this.value)">
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="eventMaxParticipants">Max Participants</label>
                    <input type="number" id="eventMaxParticipants" name="maxParticipants" placeholder="Leave empty for unlimited">
                </div>
            </div>

            <div class="form-group">
                <label for="eventParticipants">Participants (Hold Ctrl/Cmd to select multiple)</label>
                <select multiple id="eventParticipants" name="participants" style="height: 150px; width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    ${usersOptions}
                </select>
            </div>

            <div class="form-group">
                <label for="eventImages">Event Images (Max 5)</label>
                <input type="file" id="eventImages" name="images" multiple accept="image/*" onchange="previewImages(this)">
                <div id="imagePreviewContainer" style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;"></div>
            </div>
            
            <div class="form-group" id="meetingLinkGroup">
                <label for="eventMeetingLink">Meeting Link</label>
                <input type="url" id="eventMeetingLink" name="meetingLink" placeholder="https://...">
            </div>
            
            <div class="form-group" id="venueGroup" style="display:none;">
                <label for="eventVenue">Venue Address</label>
                <input type="text" id="eventVenue" name="venue" placeholder="Physical address...">
            </div>

            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="document.getElementById('editModal').style.display='none'">Cancel</button>
                <button type="submit" class="btn-primary">Create Event</button>
            </div>
        </form>
    `;
    
    // Helper to toggle fields
    window.toggleLocationFields = function(val) {
        const linkGroup = document.getElementById('meetingLinkGroup');
        const venueGroup = document.getElementById('venueGroup');
        
        if (val === 'online') {
            linkGroup.style.display = 'block';
            venueGroup.style.display = 'none';
        } else if (val === 'offline') {
            linkGroup.style.display = 'none';
            venueGroup.style.display = 'block';
        } else {
            linkGroup.style.display = 'block';
            venueGroup.style.display = 'block';
        }
    };
    
    editModal.style.display = 'block';

    document.getElementById('addEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating...';
        submitBtn.disabled = true;

        const formData = {
            title: document.getElementById('eventTitle').value,
            description: document.getElementById('eventDescription').value,
            club: document.getElementById('eventClub').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            duration: parseInt(document.getElementById('eventDuration').value) || 60,
            location: document.getElementById('eventLocation').value,
            meetingLink: document.getElementById('eventMeetingLink').value,
            venue: document.getElementById('eventVenue').value,
            maxParticipants: document.getElementById('eventMaxParticipants').value ? parseInt(document.getElementById('eventMaxParticipants').value) : null,
            participants: Array.from(document.getElementById('eventParticipants').selectedOptions).map(opt => opt.value)
        };

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach(val => formDataToSend.append(key, val));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
        }

        const imageInput = document.getElementById('eventImages');
        if (imageInput.files.length > 5) {
            alert('You can only upload a maximum of 5 images.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        for (let i = 0; i < imageInput.files.length; i++) {
            formDataToSend.append('images', imageInput.files[i]);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/admin/events`, {
                method: 'POST',
                // Content-Type header should be omitted for FormData, the browser sets it automatically with boundary
                body: formDataToSend
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Event created successfully');
                editModal.style.display = 'none';
                loadEvents(state.currentPage.events);
                loadDashboardStats();
            } else {
                alert('Error creating event: ' + data.message);
            }
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Expose functions to global scope for HTML onclick attributes
window.editUser = editUser;
window.deleteUser = deleteUser;
window.editClub = editClub;
window.editEvent = editEvent;
window.loadUsers = loadUsers;
window.loadClubs = loadClubs;
window.loadEvents = loadEvents;

// Render Pagination
function renderPagination(type, currentPage, totalPages) {
    const paginationEl = document.getElementById(`${type}Pagination`);
    
    if (totalPages <= 1) {
        paginationEl.innerHTML = '';
        return;
    }
    
    let html = '';
    
    html += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="load${capitalize(type)}(${currentPage - 1})">Previous</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<button class="active">${i}</button>`;
        } else if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<button onclick="load${capitalize(type)}(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<button disabled>...</button>`;
        }
    }
    
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="load${capitalize(type)}(${currentPage + 1})">Next</button>`;
    
    paginationEl.innerHTML = html;
    state.currentPage[type] = currentPage;
}

// Utility Functions
function showButtonLoading(button, show) {
    const text = button.querySelector('.btn-text');
    const loader = button.querySelector('.btn-loader');
    
    if (show) {
        text.style.display = 'none';
        loader.style.display = 'block';
        button.disabled = true;
    } else {
        text.style.display = 'block';
        loader.style.display = 'none';
        button.disabled = false;
    }
}

function showError(message) {
    loginError.textContent = message;
    loginError.style.display = 'block';
}

function hideError() {
    loginError.style.display = 'none';
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function previewImages(input, containerId = 'imagePreviewContainer') {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (input.files && input.files.length > 0) {
        if (input.files.length > 5) {
            alert('Maximum 5 images allowed');
             input.value = ''; // Clear selection
            return;
        }

        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100px';
                img.style.height = '100px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '4px';
                container.appendChild(img);
            }
            reader.readAsDataURL(file);
        });
    }
}

// Team Management Functions
// Store all team members for filtering
let allTeamMembers = [];

// Load Team Members
async function loadTeamMembers() {
    const grid = document.getElementById('teamMembersGrid');
    grid.innerHTML = '<div class="loading">Loading team members...</div>';

    try {
        const response = await fetch(`${API_BASE_URL}/team`);
        const data = await response.json();

        if (data.success) {
            // Flatten all members and store globally
            allTeamMembers = [
                ...data.data.founders,
                ...data.data.mentors,
                ...data.data.collegeSupport,
                ...data.data.coreTeam,
                ...data.data.graphics,
                ...data.data.management,
                ...data.data.members.year1,
                ...data.data.members.year2,
                ...data.data.members.year3,
                ...data.data.members.year4,
            ];

            // Apply current filters
            filterTeamMembers();

            // Setup filter and search listeners
            setupTeamFilters();
        }
    } catch (error) {
        grid.innerHTML = '<div class="loading">Error loading team members</div>';
        console.error('Error loading team members:', error);
    }
}

// Filter and display team members
function filterTeamMembers() {
    const grid = document.getElementById('teamMembersGrid');
    const searchTerm = (document.getElementById('teamSearch')?.value || '').toLowerCase();
    const categoryFilter = document.getElementById('teamCategoryFilter')?.value || 'all';

    let filteredMembers = allTeamMembers.filter(member => {
        // Category filter
        if (categoryFilter !== 'all' && member.category !== categoryFilter) {
            return false;
        }

        // Search filter
        if (searchTerm) {
            const matchesName = member.name.toLowerCase().includes(searchTerm);
            const matchesRole = member.role.toLowerCase().includes(searchTerm);
            const matchesBranch = member.branch?.toLowerCase().includes(searchTerm);
            if (!matchesName && !matchesRole && !matchesBranch) {
                return false;
            }
        }

        return true;
    });

    if (filteredMembers.length > 0) {
        grid.innerHTML = filteredMembers.map(member => `
            <div class="team-card">
                <img src="/uploads/team-images/${member.image || 'placeholder.jpg'}" alt="${member.name}" class="team-member-img" onerror="this.src='/uploads/team-images/placeholder.jpg'">
                <div class="team-card-content">
                    <h3>${member.name}</h3>
                    <p class="role">${member.role}</p>
                    <p class="category"><span class="badge">${formatCategory(member.category)}</span></p>
                    ${member.year ? `<p class="year">${member.year}</p>` : ''}
                    ${member.branch ? `<p class="branch">${member.branch}</p>` : ''}
                    <div class="action-buttons">
                        <button class="btn-action btn-edit btn-edit-team" data-id="${member._id}">Edit</button>
                        <button class="btn-action btn-delete btn-delete-team" data-id="${member._id}">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners after rendering
        setupTeamEventListeners();
    } else {
        grid.innerHTML = '<div class="loading">No team members found matching your criteria</div>';
    }
}

// Setup filter and search listeners
function setupTeamFilters() {
    const searchInput = document.getElementById('teamSearch');
    const categoryFilter = document.getElementById('teamCategoryFilter');

    if (searchInput) {
        searchInput.removeEventListener('input', filterTeamMembers);
        searchInput.addEventListener('input', filterTeamMembers);
    }

    if (categoryFilter) {
        categoryFilter.removeEventListener('change', filterTeamMembers);
        categoryFilter.addEventListener('change', filterTeamMembers);
    }
}

// Format category for display
function formatCategory(category) {
    const map = {
        'founder': 'Founder',
        'mentor': 'Mentor',
        'college-support': 'College Support',
        'core-team': 'Core Team',
        'graphics': 'Graphics',
        'management': 'Management',
        'member': 'Member'
    };
    return map[category] || category;
}

// Show Add Team Member Modal
function showAddTeamMemberModal() {
    modalTitle.textContent = 'Add Team Member';
    modalBody.innerHTML = `
        <form id="addTeamMemberForm" class="edit-form" enctype="multipart/form-data">
            <div class="form-group">
                <label for="teamMemberName">Name *</label>
                <input type="text" id="teamMemberName" name="name" required>
            </div>
            
            <div class="form-group">
                <label for="teamMemberRole">Role *</label>
                <input type="text" id="teamMemberRole" name="role" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="teamMemberCategory">Category *</label>
                    <select id="teamMemberCategory" name="category" required onchange="toggleYearField(this.value)">
                        <option value="founder">Founder</option>
                        <option value="mentor">Mentor</option>
                        <option value="college-support">College Support</option>
                        <option value="core-team">Core Team</option>
                        <option value="graphics">Graphics</option>
                        <option value="management">Management</option>
                        <option value="member">Member</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="teamMemberBranch">Branch</label>
                    <input type="text" id="teamMemberBranch" name="branch">
                </div>
            </div>
            
            <div class="form-group" id="yearFieldGroup" style="display:none;">
                <label for="teamMemberYear">Year</label>
                <select id="teamMemberYear" name="year">
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="teamMemberBio">Bio</label>
                <textarea id="teamMemberBio" name="bio" rows="3"></textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="teamMemberEmail">Email</label>
                    <input type="email" id="teamMemberEmail" name="email">
                </div>
                
                <div class="form-group">
                    <label for="teamMemberLinkedIn">LinkedIn</label>
                    <input type="text" id="teamMemberLinkedIn" name="linkedin">
                </div>
            </div>
            
            <div class="form-group">
                <label for="teamMemberGitHub">GitHub</label>
                <input type="text" id="teamMemberGitHub" name="github">
            </div>
            
            <div class="form-group">
                <label for="teamMemberImage">Profile Image</label>
                <input type="file" id="teamMemberImage" name="image" accept="image/*">
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="document.getElementById('editModal').style.display='none'">Cancel</button>
                <button type="submit" class="btn-primary">Add Member</button>
            </div>
        </form>
    `;

    editModal.style.display = 'block';

    // Handle form submission
    document.getElementById('addTeamMemberForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Adding...';
        submitBtn.disabled = true;

        const formData = new FormData(e.target);

        try {
            const response = await fetch(`${API_BASE_URL}/admin/team`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                alert('Team member added successfully');
                editModal.style.display = 'none';
                loadTeamMembers();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error adding team member:', error);
            alert('Error adding team member');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Edit Team Member
async function editTeamMember(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/team/${id}`);
        const data = await response.json();

        if (data.success) {
            const member = data.data;
            modalTitle.textContent = 'Edit Team Member';
            modalBody.innerHTML = `
                <form id="editTeamMemberForm" class="edit-form" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="editTeamMemberName">Name *</label>
                        <input type="text" id="editTeamMemberName" name="name" value="${member.name}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editTeamMemberRole">Role *</label>
                        <input type="text" id="editTeamMemberRole" name="role" value="${member.role}" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="editTeamMemberCategory">Category *</label>
                            <select id="editTeamMemberCategory" name="category" required onchange="toggleYearField(this.value)">
                                <option value="founder" ${member.category === 'founder' ? 'selected' : ''}>Founder</option>
                                <option value="mentor" ${member.category === 'mentor' ? 'selected' : ''}>Mentor</option>
                                <option value="college-support" ${member.category === 'college-support' ? 'selected' : ''}>College Support</option>
                                <option value="core-team" ${member.category === 'core-team' ? 'selected' : ''}>Core Team</option>
                                <option value="graphics" ${member.category === 'graphics' ? 'selected' : ''}>Graphics</option>
                                <option value="management" ${member.category === 'management' ? 'selected' : ''}>Management</option>
                                <option value="member" ${member.category === 'member' ? 'selected' : ''}>Member</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="editTeamMemberBranch">Branch</label>
                            <input type="text" id="editTeamMemberBranch" name="branch" value="${member.branch || ''}">
                        </div>
                    </div>
                    
                    <div class="form-group" id="editYearFieldGroup" style="display:${member.category === 'member' ? 'block' : 'none'};">
                        <label for="editTeamMemberYear">Year</label>
                        <select id="editTeamMemberYear" name="year">
                            <option value="">Select Year</option>
                            <option value="1st Year" ${member.year === '1st Year' ? 'selected' : ''}>1st Year</option>
                            <option value="2nd Year" ${member.year === '2nd Year' ? 'selected' : ''}>2nd Year</option>
                            <option value="3rd Year" ${member.year === '3rd Year' ? 'selected' : ''}>3rd Year</option>
                            <option value="4th Year" ${member.year === '4th Year' ? 'selected' : ''}>4th Year</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="editTeamMemberBio">Bio</label>
                        <textarea id="editTeamMemberBio" name="bio" rows="3">${member.bio || ''}</textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="editTeamMemberEmail">Email</label>
                            <input type="email" id="editTeamMemberEmail" name="email" value="${member.email || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label for="editTeamMemberLinkedIn">LinkedIn</label>
                            <input type="text" id="editTeamMemberLinkedIn" name="linkedin" value="${member.linkedin || ''}">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="editTeamMemberGitHub">GitHub</label>
                        <input type="text" id="editTeamMemberGitHub" name="github" value="${member.github || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label for="editTeamMemberImage">Change Profile Image</label>
                        <input type="file" id="editTeamMemberImage" name="image" accept="image/*">
                        ${member.image ? `<p style="margin-top: 5px; font-size: 12px; color: #999;">Current: ${member.image}</p>` : ''}
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('editModal').style.display='none'">Cancel</button>
                        <button type="submit" class="btn-primary">Update Member</button>
                    </div>
                </form>
            `;

            editModal.style.display = 'block';

            // Handle form submission
            document.getElementById('editTeamMemberForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Updating...';
                submitBtn.disabled = true;

                const formData = new FormData(e.target);

                try {
                    const response = await fetch(`${API_BASE_URL}/admin/team/${id}`, {
                        method: 'PUT',
                        body: formData,
                    });

                    const data = await response.json();

                    if (data.success) {
                        alert('Team member updated successfully');
                        editModal.style.display = 'none';
                        loadTeamMembers();
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error updating team member:', error);
                    alert('Error updating team member');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    } catch (error) {
        console.error('Error fetching team member details:', error);
        alert('Failed to load team member details');
    }
}

// Delete Team Member
async function deleteTeamMember(id) {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/admin/team/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
            alert('Team member deleted successfully');
            loadTeamMembers();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error deleting team member:', error);
        alert('Error deleting team member');
    }
}

// Toggle year field based on category
function toggleYearField(category) {
    const yearGroup = document.getElementById('yearFieldGroup') || document.getElementById('editYearFieldGroup');
    if (yearGroup) {
        yearGroup.style.display = category === 'member' ? 'block' : 'none';
    }
}

// Setup event listeners for team cards
function setupTeamEventListeners() {
    // Edit buttons
    document.querySelectorAll('.btn-edit-team').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (id) {
                editTeamMember(id);
            }
        });
    });

    // Delete buttons
    document.querySelectorAll('.btn-delete-team').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (id) {
                deleteTeamMember(id);
            }
        });
    });
}

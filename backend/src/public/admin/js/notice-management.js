// Notice Board Management
const API_BASE_URL = window.location.origin;
const API_VERSION = 'v1';

// State
let notices = [];
let currentNotice = null;
let isEditing = false;

// DOM Elements
let noticeForm, noticeList, noticeModal, modalTitle, cancelBtn, addNoticeBtn;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Notice management script loaded');
    initializeElements();

    // Listen for section changes
    const originalSwitchSection = window.switchSection;
    if (typeof originalSwitchSection === 'function') {
        window.switchSection = function (section) {
            originalSwitchSection.call(this, section);
            if (section === 'notices') {
                setTimeout(() => {
                    initializeElements();
                    if (noticeList) {
                        loadNotices();
                    }
                }, 100);
            }
        };
    }
});

function initializeElements() {
    noticeForm = document.getElementById('noticeForm');
    noticeList = document.getElementById('noticeList');
    noticeModal = document.getElementById('noticeModal');
    modalTitle = document.getElementById('modalTitle');
    cancelBtn = document.getElementById('cancelNoticeBtn');
    addNoticeBtn = document.getElementById('addNoticeBtn');

    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    if (noticeForm) {
        noticeForm.addEventListener('submit', handleSubmit);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    if (addNoticeBtn) {
        addNoticeBtn.addEventListener('click', () => openModal());
    }
}

// Load all notices
async function loadNotices() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/${API_VERSION}/notices/all`);
        const data = await response.json();

        if (data.success) {
            notices = data.data;
            renderNotices();
        } else {
            showNotification('Failed to load notices', 'error');
        }
    } catch (error) {
        console.error('Error loading notices:', error);
        showNotification('Error loading notices', 'error');
    }
}

// Render notices
function renderNotices() {
    if (!noticeList) return;

    if (notices.length === 0) {
        noticeList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bullhorn fa-3x"></i>
                <p>No notices yet. Create your first notice!</p>
            </div>
        `;
        return;
    }

    noticeList.innerHTML = notices.map(notice => `
        <div class="notice-card ${notice.isActive ? 'active' : 'inactive'}" data-id="${notice._id}">
            <div class="notice-header">
                <div class="notice-badge-group">
                    <span class="notice-color-badge" style="background-color: var(--color-${notice.color || 'purple'})"></span>
                    <span class="notice-priority-badge">Priority: ${notice.priority}</span>
                    ${!notice.isActive ? '<span class="notice-status-badge inactive">Inactive</span>' : ''}
                    ${isExpired(notice) ? '<span class="notice-status-badge expired">Expired</span>' : ''}
                </div>
                <div class="notice-actions">
                    <button onclick="toggleNoticeStatus('${notice._id}')" class="btn-icon" title="${notice.isActive ? 'Deactivate' : 'Activate'}">
                        <i class="fas fa-${notice.isActive ? 'eye-slash' : 'eye'}"></i>
                    </button>
                    <button onclick="editNotice('${notice._id}')" class="btn-icon" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteNotice('${notice._id}')" class="btn-icon btn-danger" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="notice-content">
                <h3>${escapeHtml(notice.title)}</h3>
                <p>${escapeHtml(notice.description)}</p>
                ${notice.link ? `<p class="notice-link"><i class="fas fa-link"></i> <a href="${escapeHtml(notice.link)}" target="_blank">${escapeHtml(notice.link)}</a></p>` : ''}
            </div>
            <div class="notice-footer">
                <span class="notice-date">
                    <i class="fas fa-calendar"></i> ${formatDate(notice.createdAt)}
                </span>
                ${notice.expiresAt ? `
                    <span class="notice-expires">
                        <i class="fas fa-clock"></i> Expires: ${formatDate(notice.expiresAt)}
                    </span>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Open modal
function openModal(notice = null) {
    isEditing = !!notice;
    currentNotice = notice;

    if (modalTitle) {
        modalTitle.textContent = isEditing ? 'Edit Notice' : 'Add New Notice';
    }

    if (noticeForm) {
        noticeForm.reset();

        if (isEditing && notice) {
            document.getElementById('noticeTitle').value = notice.title;
            document.getElementById('noticeDescription').value = notice.description;
            document.getElementById('noticeColor').value = notice.color || 'purple';
            document.getElementById('noticePriority').value = notice.priority || 0;
            document.getElementById('noticeLink').value = notice.link || '';
            document.getElementById('noticeOrder').value = notice.order || 0;
            document.getElementById('noticeActive').checked = notice.isActive;

            if (notice.expiresAt) {
                const expiryDate = new Date(notice.expiresAt);
                document.getElementById('noticeExpiresAt').value = expiryDate.toISOString().slice(0, 16);
            }
        }
    }

    if (noticeModal) {
        noticeModal.style.display = 'flex';
    }
}

// Close modal
function closeModal() {
    if (noticeModal) {
        noticeModal.style.display = 'none';
    }
    currentNotice = null;
    isEditing = false;
    if (noticeForm) {
        noticeForm.reset();
    }
}

// Handle form submit
async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
        title: document.getElementById('noticeTitle').value.trim(),
        description: document.getElementById('noticeDescription').value.trim(),
        color: document.getElementById('noticeColor').value,
        priority: parseInt(document.getElementById('noticePriority').value),
        link: document.getElementById('noticeLink').value.trim(),
        order: parseInt(document.getElementById('noticeOrder').value),
        isActive: document.getElementById('noticeActive').checked,
        expiresAt: document.getElementById('noticeExpiresAt').value || null
    };

    try {
        const url = isEditing
            ? `${API_BASE_URL}/api/${API_VERSION}/notices/${currentNotice._id}`
            : `${API_BASE_URL}/api/${API_VERSION}/notices`;

        const method = isEditing ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            showNotification(
                isEditing ? 'Notice updated successfully' : 'Notice created successfully',
                'success'
            );
            closeModal();
            loadNotices();
        } else {
            showNotification(data.message || 'Operation failed', 'error');
        }
    } catch (error) {
        console.error('Error saving notice:', error);
        showNotification('Error saving notice', 'error');
    }
}

// Edit notice
window.editNotice = function (id) {
    const notice = notices.find(n => n._id === id);
    if (notice) {
        openModal(notice);
    }
};

// Delete notice
window.deleteNotice = async function (id) {
    if (!confirm('Are you sure you want to delete this notice?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/${API_VERSION}/notices/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Notice deleted successfully', 'success');
            loadNotices();
        } else {
            showNotification(data.message || 'Delete failed', 'error');
        }
    } catch (error) {
        console.error('Error deleting notice:', error);
        showNotification('Error deleting notice', 'error');
    }
};

// Toggle notice status
window.toggleNoticeStatus = async function (id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/${API_VERSION}/notices/${id}/toggle`, {
            method: 'PATCH'
        });

        const data = await response.json();

        if (data.success) {
            showNotification(data.message, 'success');
            loadNotices();
        } else {
            showNotification(data.message || 'Toggle failed', 'error');
        }
    } catch (error) {
        console.error('Error toggling notice:', error);
        showNotification('Error toggling notice status', 'error');
    }
};

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function isExpired(notice) {
    return notice.expiresAt && new Date(notice.expiresAt) < new Date();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === noticeModal) {
        closeModal();
    }
});

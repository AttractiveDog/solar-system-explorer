(function() {
    // Notice Board Management - Scoped to avoid conflicts
    const NOTICE_API_BASE = window.location.origin;
    const NOTICE_API_VER = 'v1';

    // State
    let notices = [];
    let currentNotice = null;
    let isEditing = false;

    // DOM Elements - scoped
    let noticeForm, noticeList, noticeModal, modalTitle, cancelBtn, addNoticeBtn, closeXBtn;

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Notice management script loaded');
        // Initial setup
        initializeElements();

        // Hook into the global switchSection function defined in admin.js
        if (typeof window.switchSection === 'function') {
            const originalSwitchSection = window.switchSection;
            window.switchSection = function (section) {
                // Call the original function
                originalSwitchSection.call(this, section);
                
                // Add our custom logic
                if (section === 'notices') {
                    console.log('Switched to notices section, initializing...');
                    setTimeout(() => {
                        // Re-grab elements in case of dynamic changes (though unlikely for these)
                        initializeElements();
                        if (noticeList) {
                            loadNotices();
                        }
                    }, 100);
                }
            };
        } else {
            console.error('window.switchSection is not defined. Notice management navigation hook failed.');
        }

        // Check if we are already in the notices section on page load
        const noticesSection = document.getElementById('noticesSection');
        if (noticesSection && noticesSection.classList.contains('active')) {
            console.log('Notices section active on load');
            loadNotices();
        }
    });

    function initializeElements() {
        noticeForm = document.getElementById('noticeForm');
        noticeList = document.getElementById('noticeList');
        noticeModal = document.getElementById('noticeModal');
        modalTitle = document.getElementById('noticeModalTitle'); 
        cancelBtn = document.getElementById('cancelNoticeBtn');
        addNoticeBtn = document.getElementById('addNoticeBtn');
        
        // Find the X button in noticeModal
        if (noticeModal) {
            closeXBtn = noticeModal.querySelector('.modal-close');
        }

        setupEventListeners();
    }
    
    let listenersAttached = false;
    function setupEventListeners() {
        // We can't rely on a simple flag if elements are re-created (unlikely here but possible).
        // Best approach for idempotency is to remove before add, or rely on the fact that
        // initializeElements is usually safe.
        // However, we'll strip old listeners if we could, but we can't easily.
        // So we will stick to the flag but reset it if we detect elements changed (too complex).
        // Let's just use the flag for now, assuming DOM elements are static.
        if (listenersAttached && noticeForm) return; 
        
        if (noticeForm) {
            console.log('Attaching submit listener to noticeForm');
            noticeForm.addEventListener('submit', handleSubmit);
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeModal);
        }
        
        if (closeXBtn) {
             closeXBtn.addEventListener('click', (e) => {
                 e.preventDefault();
                 closeModal();
             });
        }

        if (addNoticeBtn) {
            console.log('Attaching click listener to addNoticeBtn');
            addNoticeBtn.addEventListener('click', (e) => {
                 e.preventDefault();
                 console.log('Add Notice Clicked');
                 openModal();
            });
        }

        // Event Delegation for Notice List Buttons
        if (noticeList) {
            console.log('Attaching delegation listener to noticeList');
            noticeList.addEventListener('click', handleNoticeListClick);
        }
        
        listenersAttached = true;
    }
    
    // Override initialize function to include listener setup
    const originalInit = initializeElements;
    initializeElements = function() {
        noticeForm = document.getElementById('noticeForm');
        noticeList = document.getElementById('noticeList');
        noticeModal = document.getElementById('noticeModal');
        modalTitle = document.getElementById('noticeModalTitle'); 
        cancelBtn = document.getElementById('cancelNoticeBtn');
        addNoticeBtn = document.getElementById('addNoticeBtn');
        
        if (noticeModal) {
            closeXBtn = noticeModal.querySelector('.modal-close');
        }
        
        setupEventListeners();
    }

    // Delegation Handler
    function handleNoticeListClick(e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        
        const id = btn.dataset.id;
        if (!id) return;

        if (btn.classList.contains('toggle-status-btn') || btn.closest('.toggle-status-btn')) {
            noticeManager.toggleNoticeStatus(id);
        } else if (btn.classList.contains('edit-notice-btn') || btn.closest('.edit-notice-btn')) {
            noticeManager.editNotice(id);
        } else if (btn.classList.contains('delete-notice-btn') || btn.closest('.delete-notice-btn')) {
            noticeManager.deleteNotice(id);
        }
    }

    // Load all notices
    async function loadNotices() {
        console.log('Loading notices...');
        try {
            const response = await fetch(`${NOTICE_API_BASE}/api/${NOTICE_API_VER}/notices/all`);
            const data = await response.json();

            if (data.success) {
                notices = data.data;
                console.log(`Loaded ${notices.length} notices`);
                renderNotices();
            } else {
                console.error('Failed to load notices:', data.message);
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

        // Using data attributes and classes for delegation instead of onclick
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
                        <button class="btn-icon toggle-status-btn" data-id="${notice._id}" title="${notice.isActive ? 'Deactivate' : 'Activate'}">
                            <i class="fas fa-${notice.isActive ? 'eye-slash' : 'eye'}"></i>
                        </button>
                        <button class="btn-icon edit-notice-btn" data-id="${notice._id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete-notice-btn" data-id="${notice._id}" title="Delete">
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
        console.log('Opening modal', notice);
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
            currentNotice = null;
            isEditing = false;
            if (noticeForm) noticeForm.reset();
            if (modalTitle) modalTitle.textContent = 'Add New Notice';
        }
    }

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        console.log('Submitting notice form...');

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
                ? `${NOTICE_API_BASE}/api/${NOTICE_API_VER}/notices/${currentNotice._id}`
                : `${NOTICE_API_BASE}/api/${NOTICE_API_VER}/notices`;

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

    // --- Exposed Functions for External Calls (Scoped in window.noticeManager) ---
    // We retain these to allow inline calls if needed, but primary interaction is now delegation
    
    const noticeManager = {
        editNotice: function (id) {
            const notice = notices.find(n => n._id === id);
            if (notice) {
                openModal(notice);
            }
        },
        
        deleteNotice: async function (id) {
            if (!confirm('Are you sure you want to delete this notice?')) {
                return;
            }

            try {
                const response = await fetch(`${NOTICE_API_BASE}/api/${NOTICE_API_VER}/notices/${id}`, {
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
        },
        
        toggleNoticeStatus: async function (id) {
            try {
                const response = await fetch(`${NOTICE_API_BASE}/api/${NOTICE_API_VER}/notices/${id}/toggle`, {
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
        }
    };

    // Utility functions (Locally scoped)
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatDate(dateString) {
        if (!dateString) return '';
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
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Global Expose
    window.noticeManager = noticeManager;
    window.closeModal = closeModal; 
    
    // Handle outside click for closing
    window.addEventListener('click', (e) => {
        if (e.target === noticeModal) {
            closeModal();
        }
    });

})();

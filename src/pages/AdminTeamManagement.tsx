import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, X, Save, Upload, Search } from 'lucide-react';
import './AdminTeamManagement.css';

interface TeamMember {
    _id?: string;
    name: string;
    role: string;
    category: 'founder' | 'mentor' | 'college-support' | 'core-team' | 'graphics' | 'management' | 'member';
    year?: string;
    branch?: string;
    image?: string;
    bio?: string;
    email?: string;
    linkedin?: string;
    github?: string;
    status?: 'online' | 'away' | 'offline';
    order?: number;
    isActive?: boolean;
}

const API_BASE = 'http://localhost:5000/api/v1';

const AdminTeamManagement: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('founder');
    const [showForm, setShowForm] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    // Form state
    const [formData, setFormData] = useState<TeamMember>({
        name: '',
        role: '',
        category: 'founder',
        year: '',
        branch: '',
        bio: '',
        email: '',
        linkedin: '',
        github: '',
        status: 'offline',
    });

    const categories = [
        { id: 'founder', label: 'Founders' },
        { id: 'mentor', label: 'Mentors' },
        { id: 'college-support', label: 'College Support' },
        { id: 'core-team', label: 'Core Team' },
        { id: 'graphics', label: 'Graphics' },
        { id: 'management', label: 'Management' },
        { id: 'member', label: 'Members' },
    ];

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/team`);
            const data = await response.json();

            if (data.success) {
                // Flatten the grouped data
                const allMembers: TeamMember[] = [
                    ...data.data.founders,
                    ...data.data.mentors,
                    ...data.data.collegeSupport,
                    ...data.data.coreTeam,
                    ...data.data.graphics,
                    ...data.data.management,
                    ...Object.values(data.data.members).flat(),
                ];
                setMembers(allMembers);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            category: 'founder',
            year: '',
            branch: '',
            bio: '',
            email: '',
            linkedin: '',
            github: '',
            status: 'offline',
        });
        setImageFile(null);
        setImagePreview('');
        setEditingMember(null);
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) formDataToSend.append(key, value.toString());
        });

        if (imageFile) {
            formDataToSend.append('image', imageFile);
        }

        try {
            const url = editingMember
                ? `${API_BASE}/admin/team/${editingMember._id}`
                : `${API_BASE}/admin/team`;

            const method = editingMember ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'x-admin-username': 'admin', // Replace with actual admin auth
                    'x-admin-password': 'admin', // Replace with actual admin auth
                },
                body: formDataToSend,
            });

            const data = await response.json();

            if (data.success) {
                alert(editingMember ? 'Member updated successfully!' : 'Member added successfully!');
                resetForm();
                fetchMembers();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error saving member:', error);
            alert('Error saving member');
        }
    };

    const handleEdit = (member: TeamMember) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            category: member.category,
            year: member.year || '',
            branch: member.branch || '',
            bio: member.bio || '',
            email: member.email || '',
            linkedin: member.linkedin || '',
            github: member.github || '',
            status: member.status || 'offline',
        });
        if (member.image) {
            setImagePreview(`http://localhost:5000/uploads/team-images/${member.image}`);
        }
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return;

        try {
            const response = await fetch(`${API_BASE}/admin/team/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-username': 'admin',
                    'x-admin-password': 'admin',
                },
            });

            const data = await response.json();

            if (data.success) {
                alert('Member deleted successfully!');
                fetchMembers();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Error deleting member');
        }
    };

    const filteredMembers = members
        .filter(m => m.category === activeCategory)
        .filter(m =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.role.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="admin-team-management">
            <div className="admin-header">
                <div>
                    <h1>Team Management</h1>
                    <p>Manage team members across all categories</p>
                </div>
                <button className="btn-add" onClick={() => setShowForm(true)}>
                    <Plus size={20} />
                    Add Member
                </button>
            </div>

            {/* Search and Filter */}
            <div className="admin-controls">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Members List */}
            <div className="members-grid">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : filteredMembers.length === 0 ? (
                    <div className="empty-state">
                        <Users size={48} />
                        <p>No members found in this category</p>
                    </div>
                ) : (
                    filteredMembers.map(member => (
                        <div key={member._id} className="member-card">
                            <img
                                src={`http://localhost:5000/uploads/team-images/${member.image || 'placeholder.jpg'}`}
                                alt={member.name}
                                className="member-image"
                            />
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="role">{member.role}</p>
                                {member.branch && <p className="branch">{member.branch}</p>}
                                {member.year && <p className="year">{member.year}</p>}
                            </div>
                            <div className="member-actions">
                                <button className="btn-edit" onClick={() => handleEdit(member)}>
                                    <Edit size={16} />
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(member._id!)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={() => resetForm()}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
                            <button className="btn-close" onClick={resetForm}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="member-form">
                            {/* Image Upload */}
                            <div className="form-group image-upload">
                                <label>Profile Image</label>
                                <div className="image-preview-container">
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="image-preview" />
                                    )}
                                    <label className="upload-button">
                                        <Upload size={20} />
                                        Choose Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            hidden
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Role *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category *</label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Branch</label>
                                    <input
                                        type="text"
                                        value={formData.branch}
                                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                    />
                                </div>
                            </div>

                            {formData.category === 'member' && (
                                <div className="form-group">
                                    <label>Year</label>
                                    <select
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                    </select>
                                </div>
                            )}

                            <div className="form-group">
                                <label>Bio</label>
                                <textarea
                                    rows={3}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>LinkedIn</label>
                                    <input
                                        type="text"
                                        value={formData.linkedin}
                                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>GitHub</label>
                                <input
                                    type="text"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-save">
                                    <Save size={20} />
                                    {editingMember ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTeamManagement;

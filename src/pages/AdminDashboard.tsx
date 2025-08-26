import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '@/components/ui/neu-card';
import { NeuButton } from '@/components/ui/neu-button';
import { NeuInput } from '@/components/ui/neu-input';
import { toast } from 'sonner';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
}

interface LoginAttempt {
  id: number;
  timestamp: string;
  username: string;
  sourceIp: string;
  isSuccess: boolean;
  reason: string;
}

interface AuditLog {
  id: number;
  username: string;
  timestamp: string;
  action: string;
  details: string;
  sourceIp: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  const username = localStorage.getItem('username') || 'Admin';

  useEffect(() => {
    // Check if user is logged in and is admin
    if (!localStorage.getItem('isLoggedIn') || localStorage.getItem('userRole') !== 'admin') {
      toast.error('Akses ditolak. Hanya admin yang dapat mengakses halaman ini.');
      navigate('/login');
    }
  }, [navigate]);

  // Mock data
  const users: User[] = [
    { id: 1, username: 'admin', email: 'admin@amanaja.com', role: 'admin', isEmailVerified: true, createdAt: '2024-01-15' },
    { id: 2, username: 'user', email: 'user@example.com', role: 'user', isEmailVerified: true, createdAt: '2024-01-16' },
    { id: 3, username: 'john_doe', email: 'john@example.com', role: 'user', isEmailVerified: false, createdAt: '2024-01-17' },
    { id: 4, username: 'jane_smith', email: 'jane@example.com', role: 'user', isEmailVerified: true, createdAt: '2024-01-18' },
  ];

  const loginAttempts: LoginAttempt[] = [
    { id: 1, timestamp: '2024-01-20 10:30:15', username: 'admin', sourceIp: '192.168.1.100', isSuccess: true, reason: 'Valid credentials & TOTP' },
    { id: 2, timestamp: '2024-01-20 10:25:42', username: 'user', sourceIp: '192.168.1.101', isSuccess: true, reason: 'Valid credentials & TOTP' },
    { id: 3, timestamp: '2024-01-20 09:15:33', username: 'hacker123', sourceIp: '203.45.67.89', isSuccess: false, reason: 'Invalid username' },
    { id: 4, timestamp: '2024-01-20 08:45:12', username: 'admin', sourceIp: '203.45.67.89', isSuccess: false, reason: 'Invalid TOTP code' },
    { id: 5, timestamp: '2024-01-20 08:30:55', username: 'john_doe', sourceIp: '192.168.1.102', isSuccess: false, reason: 'Account not verified' },
  ];

  const auditLogs: AuditLog[] = [
    { id: 1, username: 'admin', timestamp: '2024-01-20 10:30:20', action: 'LOGIN_SUCCESS', details: 'User logged in successfully', sourceIp: '192.168.1.100' },
    { id: 2, username: 'user', timestamp: '2024-01-20 10:25:50', action: 'LOGIN_SUCCESS', details: 'User logged in successfully', sourceIp: '192.168.1.101' },
    { id: 3, username: 'admin', timestamp: '2024-01-20 10:15:30', action: 'ADMIN_ACCESS', details: 'Accessed admin dashboard', sourceIp: '192.168.1.100' },
    { id: 4, username: 'jane_smith', timestamp: '2024-01-19 15:22:10', action: 'PROFILE_UPDATE', details: 'Updated email address', sourceIp: '192.168.1.103' },
    { id: 5, username: 'system', timestamp: '2024-01-19 14:00:00', action: 'SECURITY_SCAN', details: 'Daily security scan completed', sourceIp: 'localhost' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('mfaEnabled');
    
    toast.success('Logout berhasil!');
    navigate('/login');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const filteredLoginAttempts = loginAttempts.filter(attempt =>
    attempt.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attempt.sourceIp.includes(searchTerm)
  );

  const filteredAuditLogs = auditLogs.filter(log =>
    log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="neu-card rounded-none p-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="neu-card p-2 w-10 h-10 flex items-center justify-center">
              <div className="text-lg font-bold">
                <span className="text-bmw-blue">A</span>
                <span className="text-bmw-red">A</span>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-text-primary">Aman-Aja</h1>
              <p className="text-xs text-text-secondary">Admin Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-text-primary font-medium">
              Halo, {username}! 👨‍💼
            </span>
            <NeuButton
              onClick={handleLogout}
              variant="red"
              size="sm"
            >
              Logout
            </NeuButton>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Panel Admin
          </h2>
          <p className="text-text-secondary">
            Kelola sistem keamanan dan monitor aktivitas pengguna
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <NeuCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-bmw-blue mb-1">{users.length}</div>
              <div className="text-sm text-text-secondary">Total Users</div>
            </div>
          </NeuCard>
          <NeuCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {loginAttempts.filter(a => a.isSuccess).length}
              </div>
              <div className="text-sm text-text-secondary">Successful Logins</div>
            </div>
          </NeuCard>
          <NeuCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-bmw-red mb-1">
                {loginAttempts.filter(a => !a.isSuccess).length}
              </div>
              <div className="text-sm text-text-secondary">Failed Attempts</div>
            </div>
          </NeuCard>
          <NeuCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-bmw-blue mb-1">{auditLogs.length}</div>
              <div className="text-sm text-text-secondary">Audit Logs</div>
            </div>
          </NeuCard>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'users', label: 'Manajemen Pengguna', icon: '👥' },
            { id: 'logins', label: 'Log Login', icon: '🔐' },
            { id: 'audit', label: 'Log Aktivitas', icon: '📊' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`neu-button px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'btn-bmw-blue text-white' 
                  : 'bg-card-surface text-text-primary hover:bg-card-surface/80'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <NeuCard className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <NeuInput
                placeholder="Cari pengguna, IP, atau aktivitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab === 'users' && (
              <div className="md:w-48">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="neu-input w-full text-text-primary"
                >
                  <option value="all">Semua Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            )}
          </div>
        </NeuCard>

        {/* Content Tables */}
        <NeuCard>
          {activeTab === 'users' && (
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Data Pengguna ({filteredUsers.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-text-secondary">ID</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Username</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Email</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Role</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Status</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Terdaftar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b border-border/50">
                        <td className="py-3 px-2 text-text-primary">{user.id}</td>
                        <td className="py-3 px-2 text-text-primary font-medium">{user.username}</td>
                        <td className="py-3 px-2 text-text-secondary">{user.email}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-bmw-red/20 text-bmw-red' 
                              : 'bg-bmw-blue/20 text-bmw-blue'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.isEmailVerified 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.isEmailVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-text-secondary">{user.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'logins' && (
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Riwayat Login ({filteredLoginAttempts.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-text-secondary">Timestamp</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Username</th>
                      <th className="text-left py-3 px-2 text-text-secondary">IP Address</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Status</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLoginAttempts.map(attempt => (
                      <tr key={attempt.id} className="border-b border-border/50">
                        <td className="py-3 px-2 text-text-secondary font-mono text-xs">
                          {attempt.timestamp}
                        </td>
                        <td className="py-3 px-2 text-text-primary font-medium">{attempt.username}</td>
                        <td className="py-3 px-2 text-text-secondary font-mono">{attempt.sourceIp}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            attempt.isSuccess 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {attempt.isSuccess ? 'SUCCESS' : 'FAILED'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-text-secondary">{attempt.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Log Aktivitas ({filteredAuditLogs.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-text-secondary">Timestamp</th>
                      <th className="text-left py-3 px-2 text-text-secondary">User</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Action</th>
                      <th className="text-left py-3 px-2 text-text-secondary">Details</th>
                      <th className="text-left py-3 px-2 text-text-secondary">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAuditLogs.map(log => (
                      <tr key={log.id} className="border-b border-border/50">
                        <td className="py-3 px-2 text-text-secondary font-mono text-xs">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-2 text-text-primary font-medium">{log.username}</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-bmw-blue/20 text-bmw-blue">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-text-secondary">{log.details}</td>
                        <td className="py-3 px-2 text-text-secondary font-mono">{log.sourceIp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </NeuCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '@/components/ui/neu-card';
import { NeuButton } from '@/components/ui/neu-button';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('mfaEnabled');
    
    toast.success('Logout berhasil!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="neu-card rounded-none p-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="neu-card p-2 w-10 h-10 flex items-center justify-center">
              <div className="text-lg font-bold">
                <span className="text-bmw-blue">A</span>
                <span className="text-bmw-red">A</span>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-text-primary">Aman-Aja</h1>
              <p className="text-xs text-text-secondary">User Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-text-primary font-medium">
              Halo, {username}!
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
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Dashboard Pengguna
          </h2>
          <p className="text-text-secondary">
            Selamat datang di sistem keamanan Aman-Aja
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <NeuCard>
            <div className="text-center">
              <div className="w-16 h-16 bg-bmw-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Keamanan Aktif
              </h3>
              <p className="text-text-secondary">
                Akun Anda dilindungi dengan enkripsi tingkat enterprise dan autentikasi multi-faktor
              </p>
            </div>
          </NeuCard>

          <NeuCard>
            <div className="text-center">
              <div className="w-16 h-16 bg-bmw-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Monitoring Real-time
              </h3>
              <p className="text-text-secondary">
                Sistem memantau aktivitas akun Anda 24/7 untuk mendeteksi anomali keamanan
              </p>
            </div>
          </NeuCard>
        </div>

        <NeuCard>
          <div className="text-center py-8">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Pengembangan Dalam Progres
            </h3>
            <p className="text-text-secondary mb-6">
              Fitur-fitur advanced seperti manajemen profil, riwayat keamanan, dan pengaturan privasi 
              akan segera hadir untuk memberikan pengalaman keamanan yang lebih lengkap.
            </p>
            
            <div className="flex justify-center space-x-4">
              <div className="neu-card p-3 text-sm text-text-secondary">
                🔄 Profile Management
              </div>
              <div className="neu-card p-3 text-sm text-text-secondary">
                📈 Security Analytics
              </div>
              <div className="neu-card p-3 text-sm text-text-secondary">
                ⚙️ Privacy Settings
              </div>
            </div>
          </div>
        </NeuCard>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            Powered by <span className="font-semibold text-bmw-blue">Aman-Aja Security Framework</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
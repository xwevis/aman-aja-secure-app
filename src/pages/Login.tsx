import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '@/components/ui/neu-card';
import { NeuInput } from '@/components/ui/neu-input';
import { NeuButton } from '@/components/ui/neu-button';
import AmanAjaLogo from '@/components/AmanAjaLogo';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'credentials' | 'totp'>('credentials');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    totp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setErrors({
        username: !formData.username.trim() ? 'Username diperlukan' : '',
        password: !formData.password.trim() ? 'Password diperlukan' : ''
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call for credentials verification
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        toast.success('Kredensial valid! Masukkan kode TOTP');
        setStep('totp');
        setLoading(false);
      } else if (formData.username === 'user' && formData.password === 'user123') {
        toast.success('Kredensial valid! Masukkan kode TOTP');
        setStep('totp');
        setLoading(false);
      } else {
        toast.error('Username atau password salah');
        setLoading(false);
      }
    }, 1500);
  };

  const handleTotpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.totp.length !== 6) {
      setErrors({ totp: 'Masukkan kode TOTP 6 karakter' });
      return;
    }
    
    setLoading(true);
    
    // Simulate TOTP verification
    setTimeout(() => {
      if (formData.totp === 'X9R7Q2' || formData.totp === '123456') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', formData.username === 'admin' ? 'admin' : 'user');
        localStorage.setItem('username', formData.username);
        
        toast.success('Login berhasil!');
        
        if (formData.username === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error('Kode TOTP tidak valid');
        setLoading(false);
      }
    }, 1500);
  };

  const handleTotpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, totp: value }));
    if (errors.totp) {
      setErrors(prev => ({ ...prev, totp: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <AmanAjaLogo />
        
        <NeuCard>
          {step === 'credentials' ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Selamat Datang Kembali
                </h2>
                <p className="text-text-secondary">
                  Masuk ke akun Aman-Aja Anda
                </p>
              </div>

              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <NeuInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={errors.username}
                  disabled={loading}
                />

                <NeuInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  disabled={loading}
                />

                <div className="pt-4">
                  <NeuButton
                    type="submit"
                    variant="blue"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Memverifikasi...' : 'Lanjutkan'}
                  </NeuButton>
                </div>
              </form>

              <div className="mt-6 text-center space-y-2">
                <p className="text-text-secondary text-sm">
                  Demo: admin/admin123 (Admin) atau user/user123 (User)
                </p>
                <p className="text-text-secondary">
                  Belum punya akun?{' '}
                  <button
                    onClick={() => navigate('/register')}
                    className="text-bmw-blue font-medium hover:underline"
                  >
                    Daftar di sini
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Verifikasi Identitas Anda
                </h2>
                <p className="text-text-secondary">
                  Masukkan kode 6 karakter dari aplikasi authenticator Anda
                </p>
              </div>

              <form onSubmit={handleTotpSubmit} className="space-y-6">
                <div>
                  <NeuInput
                    label="Kode TOTP"
                    name="totp"
                    type="text"
                    placeholder="X9R7Q2"
                    value={formData.totp}
                    onChange={handleTotpChange}
                    error={errors.totp}
                    className="text-center text-2xl font-mono tracking-widest"
                    maxLength={6}
                    disabled={loading}
                  />
                  <p className="text-xs text-text-secondary mt-2 text-center">
                    Format: 6 karakter alphanumeric (A-Z, 0-9)
                  </p>
                  <p className="text-xs text-bmw-blue mt-1 text-center">
                    Demo: X9R7Q2 atau 123456
                  </p>
                </div>

                <NeuButton
                  type="submit"
                  variant="blue"
                  size="lg"
                  className="w-full"
                  disabled={loading || formData.totp.length !== 6}
                >
                  {loading ? 'Memverifikasi...' : 'Login'}
                </NeuButton>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep('credentials')}
                  className="text-text-secondary text-sm hover:underline"
                >
                  ← Kembali ke Login
                </button>
              </div>
            </>
          )}
        </NeuCard>
      </div>
    </div>
  );
};

export default Login;
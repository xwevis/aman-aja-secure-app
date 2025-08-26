import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '@/components/ui/neu-card';
import { NeuInput } from '@/components/ui/neu-input';
import { NeuButton } from '@/components/ui/neu-button';
import AmanAjaLogo from '@/components/AmanAjaLogo';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username diperlukan';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username minimal 3 karakter';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password diperlukan';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userEmail', formData.email);
      toast.success('Kode verifikasi telah dikirim ke email Anda!');
      navigate('/verify-email');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <AmanAjaLogo />
        
        <NeuCard>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Buat Akun Aman-Aja
            </h2>
            <p className="text-text-secondary">
              Daftar untuk memulai pengalaman keamanan terdepan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              label="Email"
              name="email"
              type="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
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
                {loading ? 'Memproses...' : 'Daftar & Kirim Kode Verifikasi'}
              </NeuButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Sudah punya akun?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-bmw-blue font-medium hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </NeuCard>
      </div>
    </div>
  );
};

export default Register;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '@/components/ui/neu-card';
import { NeuInput } from '@/components/ui/neu-input';
import { NeuButton } from '@/components/ui/neu-button';
import AmanAjaLogo from '@/components/AmanAjaLogo';
import { toast } from 'sonner';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Redirect if no email in storage (direct access)
    if (!localStorage.getItem('userEmail')) {
      navigate('/register');
    }
  }, [navigate]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Masukkan kode OTP 6 digit');
      return;
    }
    
    setLoading(true);
    
    // Simulate API verification
    setTimeout(() => {
      if (otp === '123456') {
        toast.success('Email berhasil diverifikasi!');
        navigate('/setup-mfa');
      } else {
        toast.error('Kode OTP tidak valid');
        setLoading(false);
      }
    }, 1500);
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    toast.success('Kode OTP baru telah dikirim!');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <AmanAjaLogo />
        
        <NeuCard>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Verifikasi Email Anda
            </h2>
            <p className="text-text-secondary mb-4">
              Kami telah mengirimkan kode 6 digit ke
            </p>
            <p className="text-bmw-blue font-medium">{userEmail}</p>
          </div>

          <div className="text-center mb-6">
            <div className="neu-card p-4 inline-block">
              <p className="text-sm text-text-secondary mb-1">Kode akan kedaluwarsa dalam:</p>
              <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-bmw-red pulse-glow' : 'text-bmw-blue'}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <NeuInput
                label="Kode OTP"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={handleOtpChange}
                className="text-center text-2xl font-mono tracking-widest"
                maxLength={6}
                disabled={loading}
              />
              <p className="text-xs text-text-secondary mt-2 text-center">
                Masukkan 6 digit kode yang dikirim ke email Anda
              </p>
            </div>

            <NeuButton
              type="submit"
              variant="blue"
              size="lg"
              className="w-full"
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Memverifikasi...' : 'Verifikasi Akun'}
            </NeuButton>
          </form>

          <div className="mt-6 text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-bmw-blue font-medium hover:underline"
              >
                Kirim Ulang Kode OTP
              </button>
            ) : (
              <p className="text-text-secondary text-sm">
                Belum menerima kode? Tunggu {formatTime(timeLeft)} untuk kirim ulang
              </p>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/register')}
              className="text-text-secondary text-sm hover:underline"
            >
              ← Kembali ke Registrasi
            </button>
          </div>
        </NeuCard>
      </div>
    </div>
  );
};

export default VerifyEmail;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '@/components/ui/neu-card';
import { NeuButton } from '@/components/ui/neu-button';
import AmanAjaLogo from '@/components/AmanAjaLogo';
import { toast } from 'sonner';

const SetupMFA = () => {
  const navigate = useNavigate();
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Simulated secret key for demo
  const secretKey = 'JBSWY3DPEHPK3PXP';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  
  // Generate QR code URL for demo
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Aman-Aja:${encodeURIComponent(userEmail)}?secret=${secretKey}&issuer=Aman-Aja`;

  useEffect(() => {
    // Redirect if no email in storage (direct access)
    if (!localStorage.getItem('userEmail')) {
      navigate('/register');
    }
  }, [navigate]);

  const handleContinue = () => {
    setLoading(true);
    
    // Simulate saving MFA setup
    setTimeout(() => {
      localStorage.setItem('mfaEnabled', 'true');
      toast.success('MFA berhasil diaktifkan!');
      navigate('/login');
    }, 1000);
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
    toast.success('Secret key berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <AmanAjaLogo />
        
        <NeuCard>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Amankan Akun Anda dengan MFA
            </h2>
            <p className="text-text-secondary">
              Aktifkan autentikasi 2 langkah untuk keamanan maksimal
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-text-secondary mb-4">
                Pindai QR Code ini dengan aplikasi Authenticator Anda<br />
                <span className="text-sm">(Google Authenticator, Authy, dll)</span>
              </p>
              
              <div className="neu-card p-6 inline-block">
                {!qrCodeLoaded && (
                  <div className="w-48 h-48 bg-card-surface animate-pulse rounded-lg flex items-center justify-center">
                    <div className="text-text-secondary">Loading QR...</div>
                  </div>
                )}
                <img
                  src={qrCodeUrl}
                  alt="QR Code untuk MFA"
                  className={`w-48 h-48 rounded-lg ${!qrCodeLoaded ? 'hidden' : ''}`}
                  onLoad={() => setQrCodeLoaded(true)}
                  onError={() => setQrCodeLoaded(true)}
                />
              </div>
            </div>

            <div className="neu-card p-4">
              <p className="text-sm text-text-secondary mb-2 text-center">
                Atau masukkan secret key ini secara manual:
              </p>
              <div className="flex items-center justify-between bg-card-surface/50 rounded-lg p-3">
                <code className="text-bmw-blue font-mono text-sm">
                  {secretKey}
                </code>
                <button
                  onClick={copySecretKey}
                  className="text-text-secondary hover:text-bmw-blue transition-colors"
                  title="Salin secret key"
                >
                  📋
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-yellow-600 text-xl mr-3">⚠️</div>
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 mb-1">Penting!</p>
                  <p className="text-yellow-700">
                    Simpan secret key ini di tempat yang aman sebagai backup. 
                    Anda akan memerlukan aplikasi authenticator untuk login selanjutnya.
                  </p>
                </div>
              </div>
            </div>

            <NeuButton
              onClick={handleContinue}
              variant="blue"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Selesai, Lanjut ke Login'}
            </NeuButton>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/verify-email')}
              className="text-text-secondary text-sm hover:underline"
            >
              ← Kembali ke Verifikasi Email
            </button>
          </div>
        </NeuCard>
      </div>
    </div>
  );
};

export default SetupMFA;
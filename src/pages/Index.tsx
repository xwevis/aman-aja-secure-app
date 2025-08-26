import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '@/components/ui/neu-card';
import { NeuButton } from '@/components/ui/neu-button';
import AmanAjaLogo from '@/components/AmanAjaLogo';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (isLoggedIn) {
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <AmanAjaLogo />
        
        <NeuCard>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Sistem Keamanan Terdepan
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Aman-Aja menghadirkan teknologi keamanan enterprise dengan autentikasi 
              multi-faktor, enkripsi tingkat bank, dan monitoring real-time untuk 
              melindungi data dan identitas digital Anda.
            </p>
            
            <div className="space-y-4">
              <NeuButton
                onClick={() => navigate('/register')}
                variant="blue"
                size="lg"
                className="w-full"
              >
                🚀 Mulai Dengan Daftar
              </NeuButton>
              
              <NeuButton
                onClick={() => navigate('/login')}
                variant="neutral"
                size="lg"
                className="w-full"
              >
                🔐 Masuk ke Akun
              </NeuButton>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-bmw-blue text-2xl font-bold">256-bit</div>
                  <div className="text-xs text-text-secondary">Enkripsi</div>
                </div>
                <div>
                  <div className="text-bmw-red text-2xl font-bold">2FA</div>
                  <div className="text-xs text-text-secondary">TOTP Auth</div>
                </div>
                <div>
                  <div className="text-bmw-blue text-2xl font-bold">24/7</div>
                  <div className="text-xs text-text-secondary">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </NeuCard>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-text-secondary">
            Powered by <span className="font-semibold text-bmw-blue">BMW-grade Security Architecture</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/pousada/Navbar';
import { Hero } from './components/pousada/Hero';
import { About } from './components/pousada/About';
import { Amenities } from './components/pousada/Amenities';
import { Gallery } from './components/pousada/Gallery';
import { Testimonials } from './components/pousada/Testimonials';
import { CtaBanner } from './components/pousada/CtaBanner';
import { LocationContact } from './components/pousada/LocationContact';
import { Footer } from './components/pousada/Footer';
import { BookingModal } from './components/pousada/BookingModal';
import { Lightbox } from './components/pousada/Lightbox';
import { PrivacyPage } from './components/pousada/PrivacyPage';
import { ReveillonPage } from './components/pousada/ReveillonPage';
import { CarnavalPage } from './components/pousada/CarnavalPage';
import { VeraoPage } from './components/pousada/VeraoPage';
import { DashboardPage } from './components/admin/DashboardPage';
import { 
  SiteSettings, 
  DEFAULT_SETTINGS, 
  initializeDatabaseIfEmpty, 
  subscribeToSiteSettings 
} from './services/settingsService';

export default function App() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [currentView, setCurrentView] = useState<'site' | 'dashboard' | 'privacy' | 'reveillon' | 'carnaval' | 'verao'>('site');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageTitle: string;
  }>({
    isOpen: false,
    imageSrc: '',
    imageTitle: '',
  });

  // Inicializa banco de dados e assina atualizações em tempo real
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupData = async () => {
      const initial = await initializeDatabaseIfEmpty();
      setSettings(initial);

      // Ouvir alterações do Firestore em tempo real
      unsubscribe = subscribeToSiteSettings((updatedSettings) => {
        setSettings(updatedSettings);
      });
    };

    setupData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleOpenPhoto = (imageSrc: string, imageTitle: string) => {
    setLightboxState({
      isOpen: true,
      imageSrc,
      imageTitle,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const openWhatsAppFloating = () => {
    const phone = settings.phoneClean || '5512997637182';
    const msg = settings.whatsappMessage || 'Olá! Gostaria de consultar disponibilidade e tarifas na Pousada Vila de Santa Marina.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Se o usuário clicou para entrar no Painel Admin
  if (currentView === 'dashboard') {
    return (
      <DashboardPage
        settings={settings}
        onSettingsUpdated={(newSettings) => setSettings(newSettings)}
        onBackToSite={() => setCurrentView('site')}
        onNavigateToPage={(page) => {
          setCurrentView(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // Se o usuário clicou para visualizar a Política de Privacidade
  if (currentView === 'privacy') {
    return (
      <PrivacyPage
        onBackToSite={() => {
          setCurrentView('site');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pousadaName={settings.pousadaName}
        phone={settings.phone}
        phoneClean={settings.phoneClean}
        address={settings.address}
      />
    );
  }

  // Se o usuário clicou para visualizar a página temática de FINAL DO ANO (Réveillon)
  if (currentView === 'reveillon') {
    return (
      <ReveillonPage
        onBackToSite={() => {
          setCurrentView('site');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenDashboard={() => setCurrentView('dashboard')}
        onOpenPhoto={handleOpenPhoto}
        phoneClean={settings.phoneClean}
        whatsappMessage={settings.whatsappMessage}
      />
    );
  }

  // Se o usuário clicou para visualizar a página temática de CARNAVAL
  if (currentView === 'carnaval') {
    return (
      <CarnavalPage
        onBackToSite={() => {
          setCurrentView('site');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenDashboard={() => setCurrentView('dashboard')}
        onOpenPhoto={handleOpenPhoto}
        phoneClean={settings.phoneClean}
        whatsappMessage={settings.whatsappMessage}
      />
    );
  }

  // Se o usuário clicou para visualizar a página temática de VERÃO & FÉRIAS
  if (currentView === 'verao') {
    return (
      <VeraoPage
        onBackToSite={() => {
          setCurrentView('site');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenDashboard={() => setCurrentView('dashboard')}
        onOpenPhoto={handleOpenPhoto}
        phoneClean={settings.phoneClean}
        whatsappMessage={settings.whatsappMessage}
      />
    );
  }

  // Visualização normal do site da pousada (Home Principal)
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#157347] selection:text-white">
      {/* 1. Barra de Navegação Superior com botão de acesso ao Painel Admin */}
      <Navbar 
        onOpenBooking={() => setIsBookingOpen(true)} 
        onOpenDashboard={() => setCurrentView('dashboard')}
        onOpenPrivacy={() => {
          setCurrentView('privacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReveillon={() => {
          setCurrentView('reveillon');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCarnaval={() => {
          setCurrentView('carnaval');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVerao={() => {
          setCurrentView('verao');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        menuItems={settings.menuItems}
      />

      {/* Conteúdo Principal da Landing Page Dinâmica */}
      <main className="flex-1">
        {/* 2. Hero Section: Conectada ao Firestore */}
        <Hero 
          onOpenBooking={() => setIsBookingOpen(true)} 
          settings={settings}
        />

        {/* 3. A Pousada: Coqueiros laterais e diferenciais com campanha de Ano Novo */}
        <About 
          onOpenPhoto={handleOpenPhoto} 
          palmBannerImage={settings.bgPalmBanner}
          onOpenBooking={() => setIsBookingOpen(true)}
          phoneClean={settings.phoneClean}
          whatsappMessage={settings.whatsappMessage}
        />

        {/* 4. Nossa Estrutura: 6 Comodidades */}
        <Amenities />

        {/* 5. Galeria da Pousada: Conheça nossos chalés */}
        <Gallery onOpenPhoto={handleOpenPhoto} />

        {/* 6. Depoimentos: Quem veio, quer voltar */}
        <Testimonials />

        {/* 7. Banner de Conversão */}
        <CtaBanner 
          bannerImage={settings.ctaBannerImage}
          phoneClean={settings.phoneClean}
          whatsappMessage={settings.whatsappMessage}
        />

        {/* 8. Localização e Contato: Endereço e Instagram atualizados */}
        <LocationContact />
      </main>

      {/* 9. Rodapé Oficial */}
      <Footer 
        onOpenDashboard={() => setCurrentView('dashboard')} 
        onOpenPrivacy={() => {
          setCurrentView('privacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Botão Flutuante do WhatsApp no Canto Inferior Direito */}
      <button
        onClick={openWhatsAppFloating}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#157347] hover:bg-[#115e3a] active:scale-90 text-white shadow-2xl shadow-emerald-950/40 flex items-center justify-center transition-all duration-200 cursor-pointer group"
        aria-label="Falar no WhatsApp"
        title="Fale no WhatsApp"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
        <MessageCircle className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Modal de Reserva */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Lightbox / Zoom das Fotos */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        imageSrc={lightboxState.imageSrc}
        imageTitle={lightboxState.imageTitle}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}

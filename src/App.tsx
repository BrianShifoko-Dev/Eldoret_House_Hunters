import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { BuyRentPage } from './components/BuyRentPage';
import { NeighborhoodsPage } from './components/NeighborhoodsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { GalleryPage, OfficesPage, CommunityPage, SellPage } from './components/OtherPages';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'buy':
        return <BuyRentPage mode="buy" />;
      case 'rent':
        return <BuyRentPage mode="rent" />;
      case 'sell':
        return <SellPage />;
      case 'neighborhoods':
        return <NeighborhoodsPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'offices':
        return <OfficesPage />;
      case 'community':
        return <CommunityPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main>
        {renderPage()}
      </main>

      <Footer />
      
      <WhatsAppButton />
      
      <Toaster />
    </div>
  );
}

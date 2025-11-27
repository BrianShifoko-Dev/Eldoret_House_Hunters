import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { TrendingPage } from "@/components/TrendingPage";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Trending() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="home" />
      <main>
        <TrendingPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

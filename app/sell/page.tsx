import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { SellPage } from "@/components/OtherPages";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Sell() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="sell" />
      <main>
        <SellPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

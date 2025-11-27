import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { OfficesPage } from "@/components/OtherPages";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Offices() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="offices" />
      <main>
        <OfficesPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

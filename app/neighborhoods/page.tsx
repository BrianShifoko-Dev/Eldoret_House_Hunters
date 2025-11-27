import { Navbar } from "@/components/Navbar";
import { NeighborhoodsPage } from "@/components/NeighborhoodsPage";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Neighborhoods() {
  return (
    <div className="min-h-screen">
      <Navbar currentPage="neighborhoods" />
      <main>
        <NeighborhoodsPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

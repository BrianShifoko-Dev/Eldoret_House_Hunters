import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { BuyRentPage } from "@/components/BuyRentPage";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function BuyPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="buy" />
      <main>
        <BuyRentPage mode="buy" />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

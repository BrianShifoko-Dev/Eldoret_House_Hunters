import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { BuyRentPage } from "@/components/BuyRentPage";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function RentPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="rent" />
      <main>
        <BuyRentPage mode="rent" />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

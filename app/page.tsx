import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { HomePage } from "@/components/HomePage";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="home" />
      <main>
        <HomePage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { CommunityPage } from "@/components/OtherPages";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Community() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="community" />
      <main>
        <CommunityPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { GalleryPage } from "@/components/OtherPages";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Gallery() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="gallery" />
      <main>
        <GalleryPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

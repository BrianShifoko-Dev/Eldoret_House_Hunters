import { Navbar } from "@/components/Navbar";
import { ResourcesPage } from "@/components/ResourcesPage";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Resources() {
  return (
    <div className="min-h-screen">
      <Navbar currentPage="resources" />
      <main>
        <ResourcesPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

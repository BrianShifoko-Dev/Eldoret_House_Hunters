import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { PropertyDetailPage } from "@/components/PropertyDetailPage";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function PropertyDetail({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar currentPage="home" />
      <main>
        <PropertyDetailPage propertyId={params.id} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

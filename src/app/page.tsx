"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import ServicesCarousel from "@/components/sections/services-carousel";
import MissionStatement from "@/components/sections/mission-statement";
import OurClients from "@/components/sections/Our-clients";
import StrategyAllies from "@/components/sections/strategy-allies";
import GlobalPresence from "@/components/sections/global-presence";
import SlidingTagsSection from "@/components/sections/sliding-tags-section";
import CTABottom from "@/components/sections/cta-bottom";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";
import ScrollProgress from "@/components/animations/scroll-progress";
import ContactModal from "@/components/sections/contact-modal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Navbar />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Hero />
      <GlobalPresence />
      <ServicesCarousel />
      <SlidingTagsSection />
      <MissionStatement />
      <OurClients />
      <CTABottom onConnectClick={() => setModalOpen(true)} />
      <StrategyAllies />
      <ContactSection />
      <Footer />
    </main>
  );
}

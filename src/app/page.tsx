"use client";

import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import OurProcess from "@/components/sections/OurProcess";
import LiveTerminal from "@/components/sections/LiveTerminal";
import TechUniverse from "@/components/sections/TechUniverse";
import InnovationGallery from "@/components/sections/InnovationGallery";
import Team from "@/components/sections/Team";
import IdeaVault from "@/components/sections/IdeaVault";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [vaultDescription, setVaultDescription] = useState("");

  const handleIntroFinished = () => {
    setShowNavbar(true);
  };

  const handleBlueprintCreated = (descriptionText: string) => {
    setVaultDescription(descriptionText);
  };

  const handleClearDescription = () => {
    setVaultDescription("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sticky Glassmorphic Header */}
      <Navbar show={showNavbar} />

      <main id="main-content" className="flex-grow">
        {/* Sections layout */}
        <Hero onIntroFinished={handleIntroFinished} />
        
        {showNavbar && (
          <>
            <Services />
            <OurProcess />
            <LiveTerminal />
            <TechUniverse />
            <InnovationGallery />
            <Team />
            <IdeaVault onBlueprintCreated={handleBlueprintCreated} />
            <Booking 
              initialDescription={vaultDescription} 
              onClearDescription={handleClearDescription} 
            />
            <Contact />
          </>
        )}
      </main>

      {showNavbar && <Footer />}
      {showNavbar && <BackToTop />}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer/Footer1";
import WaveBackground from "@/components/wave-background";
import {
  Activity,
  Download,
  FileText,
  PieChart,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

// Registrar plugins de GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Home() {
  // Referencias para elementos DOM
  const navRef = useRef(null);
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const agentsRef = useRef(null);
  
  // Estado para controlar visibilidad de navegación y sección activa
  const [showNav, setShowNav] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Memoizar features para evitar recreaciones en cada render
  const features = useMemo(() => [
    {
      title: "Multi-Agent System",
      description:
        "Advanced agent-based modeling for complex agricultural ecosystems simulation.",
      icon: Users,
    },
    {
      title: "Real-time Analysis",
      description:
        "Monitor and analyze crop behavior and environmental factors in real-time.",
      icon: Activity,
    },
    {
      title: "Predictive Insights",
      description:
        "AI-powered predictions to optimize crop yield and resource management.",
      icon: TrendingUp,
    },
    {
      title: "Custom Scenarios",
      description:
        "Create and simulate custom agricultural scenarios and conditions.",
      icon: Settings,
    },
    {
      title: "Data Visualization",
      description:
        "Comprehensive charts and visualizations for better decision making.",
      icon: PieChart,
    },
    {
      title: "Export & Reports",
      description: "Export simulation results and generate detailed reports.",
      icon: FileText,
    },
  ], []);

  // Función para navegar con desplazamiento suave
  const scrollToSection = useCallback((id) => {
    if (typeof window === "undefined") return;
    
    const element = document.getElementById(id);
    if (!element) return;
    
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: element, offsetY: 80 },
      ease: "power3.inOut"
    });
  }, []);

  // Manejo optimizado del evento scroll
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const currentScrollY = window.scrollY;
    // Mostrar nav al inicio o cuando se hace scroll hacia arriba
    const shouldShowNav = currentScrollY < 100 || currentScrollY < (handleScroll.lastScrollY || 0);
    
    setShowNav(shouldShowNav);
    handleScroll.lastScrollY = currentScrollY;
  }, []);

  // Actualizar sección activa
  const updateActiveSection = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const scrollPosition = window.scrollY + 300;
    
    // Comprobar cada sección
    const sections = [
      { id: "home", ref: homeRef },
      { id: "features", ref: featuresRef },
      { id: "agents", ref: agentsRef }
    ];
    
    for (const section of sections) {
      if (!section.ref.current) continue;
      
      const element = section.ref.current;
      const offsetTop = element.offsetTop;
      const height = element.offsetHeight;
      
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
        setActiveSection(section.id);
        break;
      }
    }
  }, []);

  // Configuración de animaciones y eventos
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Inicializar variables
    let heroTl;
    let featuresTl;
    let agentsTl;
    let navTl;
    
    // Configurar ScrollTrigger contexto limpio
    const ctx = gsap.context(() => {
      // Animación de navegación
      navTl = gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
        clearProps: "all"
      });
      
      // Animación de hero section
      heroTl = gsap.timeline();
      heroTl.from("#hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all"
      })
      .from("#hero-subtitle", {
        y: 30, 
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.6")
      .from("#hero-button", {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.7)",
        clearProps: "all"
      }, "-=0.4");
      
      // Animación de features section
      featuresTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#features",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
      
      featuresTl.from("#features-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }).from(".feature-card", {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        clearProps: "transform,opacity"
      }, "-=0.4");
      
      // Animación de agents section
      agentsTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#agents",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
      
      agentsTl.from(".agent-left", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      }).from(".agent-right", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.5");
    });
    
    // Configurar event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", updateActiveSection);
    
    // Inicializar valores
    handleScroll.lastScrollY = window.scrollY;
    updateActiveSection();
    
    // Limpieza al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", updateActiveSection);
      
      if (heroTl) heroTl.kill();
      if (featuresTl) featuresTl.kill();
      if (agentsTl) agentsTl.kill();
      if (navTl) navTl.kill();
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert(); // Limpiar contexto GSAP
    };
  }, [handleScroll, updateActiveSection]);

  return (
    <div className="relative overflow-x-hidden">
      <WaveBackground />

      {/* Navegación mejorada con indicador de sección activa */}
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-4 z-50 mx-auto w-11/12 max-w-5xl rounded-full bg-[#1d3d3c]/90 backdrop-blur-md transition-all duration-500 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container flex justify-center py-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Home", "Features", "Agents", "Download", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative px-2 text-lg font-semibold transition-all duration-300 sm:text-xl ${
                  activeSection === item.toLowerCase()
                    ? "text-green-300"
                    : "text-white hover:text-green-200"
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-green-300" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={homeRef}
        className="relative flex min-h-screen items-end pb-16"
      >
        <div className="container mx-auto px-4 flex flex-col items-start text-left">
          <h1 
            id="hero-title"
            className="mb-6 text-5xl font-extrabold tracking-tight text-[#1d3d3c] sm:text-7xl lg:text-8xl font-archivo"
          >
            Well Prod Simulator
          </h1>
          <p 
            id="hero-subtitle"
            className="mb-8 text-xl text-[#1d3d3c] sm:text-2xl lg:text-3xl max-w-3xl font-archivo"
          >
            Advanced simulation platform for modeling complex agricultural
            systems using multi-agent technology. Understand, predict, and
            optimize your crop management.
          </p>
          <Button
            id="hero-button"
            size="lg"
            className="bg-[#1d3d3c] text-white hover:bg-green-800 font-archivo transform transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => scrollToSection("download")}
          >
            <Download className="mr-2" size={24} />
            Download for Windows
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="py-16 bg-[#1d3d3c] text-white"
      >
        <div className="container mx-auto px-4">
          <h2 
            id="features-title"
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          >
            Powerful Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i} 
                  className="feature-card rounded-lg bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 h-16 w-16 rounded-full bg-[#f0f8f7] flex items-center justify-center shadow-md">
                      <Icon className="h-8 w-8 text-[#1d3d3c]" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-[#1d3d3c]">
                      {feature.title}
                    </h3>
                    <p className="text-center text-[#1d3d3c]/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section
        id="agents"
        ref={agentsRef}
        className="py-16 bg-[#1d3d3c] text-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="agent-left md:w-1/2 text-left">
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                What is an Agent?
              </h2>
              <p className="mb-4 text-lg text-white/90 sm:text-xl max-w-2xl">
                An agent in a multi-agent system is an autonomous entity that
                observes its environment, makes decisions, and interacts with
                other agents to achieve specific goals. These agents can model
                real-world behaviors and optimize complex systems.
              </p>
              <ul className="mb-6 list-disc ml-6 text-lg text-white/90">
                <li className="mb-2">Autonomous decision-making</li>
                <li className="mb-2">Adaptive interactions</li>
                <li className="mb-2">Real-time analysis</li>
                <li className="mb-2">Scalable collaboration</li>
              </ul>
              <button
                onClick={() => scrollToSection("features")}
                className="inline-block rounded bg-white text-[#1d3d3c] px-6 py-3 font-semibold transition-all duration-300 hover:bg-green-100 hover:shadow-md hover:-translate-y-1 active:translate-y-0"
              >
                Learn More
              </button>
            </div>
            <div className="agent-right md:w-1/2">
              <h3 className="mb-6 text-2xl font-bold text-white text-center">
                WellProdSim MAS interactions
              </h3>
              <div className="overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/MAS.JPG"
                  alt="Multi-Agent System Interactions"
                  width={500}
                  height={500}
                  className="w-full transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secciones adicionales (placeholder) para navegación completa */}
      <section id="download" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold text-[#1d3d3c]">Download Now</h2>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-gray-700">
            Get started with Well Prod Simulator today. Download our latest version
            compatible with Windows systems.
          </p>
          <Button 
            size="lg" 
            className="bg-[#1d3d3c] text-white hover:bg-green-800 font-archivo transition-all hover:scale-105"
          >
            <Download className="mr-2" size={20} />
            Download v1.2.5
          </Button>
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold text-[#1d3d3c]">Contact Us</h2>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-gray-700">
            Have questions about Well Prod Simulator? Our team is here to help.
            Reach out to us for support, feedback, or partnership opportunities.
          </p>
          <Button 
            variant="outline"
            className="border-[#1d3d3c] text-[#1d3d3c] hover:bg-[#1d3d3c] hover:text-white transition-all"
          >
            Get in Touch
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
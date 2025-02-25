"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Download,
  FileText,
  Github,
  MessageCircle,
  PieChart,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveBackground from "@/components/wave-background";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer/Footer1";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const sections = sectionsRef.current;

    sections.forEach((section) => {
      gsap.fromTo(
        section.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <WaveBackground />

      {/* Navigation */}
      <nav
        className={` bg-[#1d3d3c] fixed left-0 right-0 top-4 z-50 mx-auto w-11/12 max-w-5xl rounded-full bg-[rgba(27, 25, 50, 0.1)] backdrop-blur-md transition-transform duration-500 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex justify-center py-4 ">
          <div className="flex gap-8">
            {["Home", "Features", "Agents", "Download", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className=" text-lg sm:text-xl lg:text-2xl font-semibold transition-colors hover:text-green-800 text-white"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={(el) => {
          sectionsRef.current[0] = el as HTMLDivElement;
        }}
        className="relative flex min-h-screen items-end pb-16"
      >
        {/* Sin overlay para que se vea el fondo SVG */}
        <div className="container mx-auto px-4 flex flex-col items-start text-left">
          <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-[#1d3d3c] sm:text-7xl lg:text-8xl font-archivo">
            Well Prod Simulator
          </h1>
          <p className="mb-8 text-2xl text-[#1d3d3c] sm:text-3xl lg:text-4xl max-w-3xl font-archivo">
            Advanced simulation platform for modeling complex agricultural
            systems using multi-agent technology. Understand, predict, and
            optimize your crop management.
          </p>
          <Button
            size="lg"
            className="bg-[#1d3d3c] text-white hover:bg-green-900 font-archivo"
          >
            <Download className="mr-2 size-4 " />
            Download for Windows
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={(el) => {
          sectionsRef.current[1] = el as HTMLDivElement;
        }}
        className="py-16 bg-[#1d3d3c] text-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
            Powerful Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="rounded-lg bg-white p-5">
                  <div className="flex flex-col items-center">
                    <Icon className="w-8 h-8 text-[#1d3d3c] mb-2" />
                    <h3 className="mb-2 text-xl font-semibold text-[#1d3d3c]">
                      {feature.title}
                    </h3>
                    <p className="text-[#1d3d3c] text-center">
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
        ref={(el) => {
          sectionsRef.current[2] = el as HTMLDivElement;
        }}
        className="py-16 bg-[#1d3d3c] text-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Texto e información adicional */}
            <div className="md:w-1/2 text-left">
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                What is an Agent?
              </h2>
              <p className="mb-4 text-lg sm:text-xl max-w-2xl">
                An agent in a multi-agent system is an autonomous entity that
                observes its environment, makes decisions, and interacts with
                other agents to achieve specific goals. These agents can model
                real-world behaviors and optimize complex systems.
              </p>
              <ul className="mb-6 list-disc ml-6 text-lg">
                <li>Autonomous decision-making</li>
                <li>Adaptive interactions</li>
                <li>Real-time analysis</li>
                <li>Scalable collaboration</li>
              </ul>
              <a
                href="#learn-more"
                className="inline-block rounded bg-white text-[#1d3d3c] px-6 py-3 font-semibold transition-colors hover:bg-green-100"
              >
                Learn More
              </a>
            </div>
            {/* Imagen */}
            <div className="md:w-1/2 h-50">
              <h3 className="mb-4 text-2xl font-bold text-white text-center">
                WellProdSim MAS interactions
              </h3>
              <Image
                src="/MAS.JPG"
                alt="Agents"
                width={400}
                height={400}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const features = [
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
];

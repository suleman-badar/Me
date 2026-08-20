// app/page.tsx

import { Nav } from "../components/nav/Nav";
import { Hero } from "../components/hero/Hero";
import { Marquee } from "../components/marquee/Marquee";
import { Stack } from "../components/stack/Stack";
import { Projects } from "../components/projects/Projects";
import { OpenSource } from "../components/open-source/OpenSource";
import { Feedback } from "../components/feedback/Feedback";
import { Contact } from "../components/contact/Contact";



export default function Home() {
  return (
    <div className="dark relative w-full min-h-screen bg-[#07080a] text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 noise opacity-[0.4] mix-blend-overlay z-[1]" />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <Marquee />
        <Stack />
        <Projects />
        <OpenSource />
        <Feedback />
        <Contact />
      </main>
    </div>
  );
}




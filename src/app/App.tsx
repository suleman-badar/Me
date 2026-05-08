import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { Marquee } from "./components/marquee";
import { About } from "./components/about";
import { Stack } from "./components/stack";
import { Projects } from "./components/projects";
import { OpenSource } from "./components/oss";
import { Philosophy } from "./components/philosophy";
import { Contact } from "./components/contact";
import { Feedback } from "./components/feeback"

export default function App() {
  return (
    <div className="dark relative w-full min-h-screen bg-[#07080a] text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 noise opacity-[0.4] mix-blend-overlay z-[1]" />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Projects />
        <OpenSource />
        <Philosophy />
        <Feedback />
        <Contact />
      </main>
    </div>
  );
}

"use client";

import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { SecondaryProject } from "./Projects";

interface ProjectsInteractiveProps {
  projects: SecondaryProject[];
  categories: string[];
}

const INITIAL_SHOWN = 6;

export function ProjectsAnimations({
  projects,
  categories,
}: ProjectsInteractiveProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const allTabs = useMemo(
    () => ["All", ...categories],
    [categories]
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory, projects]);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_SHOWN);

  const hiddenCount = Math.max(
    filteredProjects.length - INITIAL_SHOWN,
    0
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShowAll(false);
  };

  return (
    <div className="mt-16">
      {/* Section divider + label */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
          / more work
        </span>

        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allTabs.map((tab) => {
          const active = activeCategory === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleCategoryChange(tab)}
              className={[
                "font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border transition-all duration-200",
                active
                  ? "border-[#c6ff3d]/50 text-[#c6ff3d] bg-[#c6ff3d]/[0.06]"
                  : "border-white/10 text-white/35 hover:text-white/60 hover:border-white/20",
              ].join(" ")}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-12 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              viewport={{
                once: true,
                margin: "-60px",
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.055,
              }}
              className="col-span-12 md:col-span-4 group relative glass rounded-2xl p-6 border border-white/[0.07] hover:border-[#c6ff3d]/20 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Accent glow */}
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-[0.14] group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: project.accent,
                }}
              />

              <div className="relative flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  <span>{project.tag}</span>

                  <div className="flex items-center gap-2.5">
                    {project.demo && (
                      <span className="flex items-center gap-1 text-[#c6ff3d]/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff3d] animate-pulse" />
                        live
                      </span>
                    )}

                    <span>{project.year}</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-display text-[1.35rem] mt-4 leading-tight text-white/90">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="mt-3 text-[13px] text-white/50 leading-relaxed flex-1">
                  {project.desc}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-white/45"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.07]">
                  {project.demo ? (
                    <>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/35 hover:text-white/65 transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        Source
                      </a>

                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#c6ff3d]/35 bg-[#c6ff3d]/[0.07] text-[#c6ff3d] hover:bg-[#c6ff3d]/15 hover:border-[#c6ff3d]/55 transition-all duration-200"
                      >
                        Live demo
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  ) : (
                    <>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 group-hover:text-[#c6ff3d] transition-colors duration-200">
                        view on github
                      </span>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="text-white/40 group-hover:text-[#c6ff3d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more / show less */}
      {(hiddenCount > 0 || showAll) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-10"
        >
          <button
            type="button"
            onClick={() => setShowAll((previous) => !previous)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 rounded-full border border-white/12 text-white/40 hover:border-[#c6ff3d]/35 hover:text-[#c6ff3d] transition-all duration-200"
          >
            {showAll
              ? "Show less"
              : `+${hiddenCount} more project${
                  hiddenCount !== 1 ? "s" : ""
                }`}
          </button>
        </motion.div>
      )}
    </div>
  );
}
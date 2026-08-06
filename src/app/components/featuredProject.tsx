import { GitBranch } from "lucide-react";
import { ArrowUpRight, Github, LucideIcon, Lock} from "lucide-react";
import type { ComponentType } from "react";



export type FeaturedProjectType = {
    title: string;
    badge: string;
    description: string;
    demo?: string;
    github?: string;
    systemFlow: string[];

    metrics: {
        key: string;
        value: string;
        icon: LucideIcon;
    }[];

    technologies: string[];
    actions: (
        | "demo"
        | "source"
        | "collaborate"
        | "private"
    )[];
    visual: ComponentType;
};


type FeaturedProjectProps = {
    project: FeaturedProjectType;
};


export default function FeaturedProject({ project }: FeaturedProjectProps) {
    const Visual = project.visual;

    return (
        <div className="relative glass rounded-3xl overflow-hidden mt-4">
            <div className="absolute inset-0 dot-bg opacity-30 mask-fade-y" />
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#c6ff3d]/12" />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full blur-[140px] bg-[#3d8bff]/10" />

            <div className="relative grid grid-cols-12 gap-0">
                {/* Left: meta */}
                <div className="col-span-12 lg:col-span-5 p-8 md:p-12">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#c6ff3d]">
                        <span className="w-2 h-2 rounded-full bg-[#c6ff3d] animate-pulse" />
                        {project.badge}
                    </div>
                    <h3 className="font-display text-5xl md:text-7xl leading-[0.92] mt-5">{project.title}</h3>
                    <p className="mt-5 text-white/65 leading-relaxed text-[15px]">
                        {project.description}
                    </p>

                    {/* Architecture mini-flow */}
                    <div className="mt-8 p-4 border border-white/10 rounded-xl bg-black/20">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mb-3">/ system flow</div>
                        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono">
                            {project.systemFlow.map((step, i) => (
                                <div key={step} className="flex items-center gap-2 flex-shrink-0">
                                    <div className="px-2 py-1.5 rounded-md border border-white/15 bg-white/5">{step}</div>
                                    {i < project.systemFlow.length - 1 && <div className="w-3 h-px bg-[#c6ff3d]/60" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        {project.metrics.map((metric) => {
                            const Icon = metric.icon;

                            return (
                                <div
                                    key={metric.key}
                                    className="border border-white/8 rounded-lg p-3"
                                >
                                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/45">
                                        <Icon className="w-3.5 h-3.5 text-[#c6ff3d]" />
                                        {metric.key}
                                    </div>

                                    <div className="font-mono text-sm mt-1">
                                        {metric.value}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 text-white/65"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">

                        {project.actions.includes("demo") && (
                            <a
                                href={project.demo}
                                className="inline-flex items-center gap-2 bg-[#c6ff3d] text-black px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider"
                            >
                                Live Demo
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        )}

                        {project.actions.includes("source") && (
                            <a
                                href={project.github}
                                className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider"
                            >
                                <Github className="w-3.5 h-3.5" />
                                Source
                            </a>
                        )}

                        {project.actions.includes("collaborate") && (
                            <a
                                href={`https://github.com/suleman-badar/${project.github?.split("/").pop()}/issues`}
                                className="group inline-flex items-center gap-2 border border-[#c6ff3d]/20 bg-[#c6ff3d]/[0.04] hover:bg-[#c6ff3d]/[0.08] hover:border-[#c6ff3d]/40 px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider text-[#c6ff3d] transition-all duration-300"
                            >
                                <GitBranch className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                                Collaborate
                            </a>
                        )}

                        {project.actions.includes("private") && (
                            <div className="inline-flex items-center gap-2 border border-amber-500/20 bg-amber-500/8 px-4 py-2.5 rounded-full">
                                <Lock className="w-3.5 h-3.5 text-amber-300" />

                                <div className="flex flex-col leading-none">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300">
                                        Source unavailable
                                    </span>

                                    <span className="text-[11px] text-white/45">
                                        Confidential client project
                                    </span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Right: cinematic mock */}
                <div className="col-span-12 lg:col-span-7">
                    <Visual />
                </div>

            </div>
        </div>
    );
}
import { SectionLabel } from "../section-label";
import { StackGraph } from "./StackGraph";
import { GROUP_COLOR, STACK_GROUPS } from "./stack-data";

export function Stack() {
  return (
    <section id="stack" className="relative py-8 md:py-20">
      <div className="absolute inset-0 grid-bg opacity-30 mask-fade-y" />

      <div className="relative mx-auto max-w-[1550px] px-6 md:px-10">
        <SectionLabel
          index="// 02 — stack"
          title="An ecosystem, &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;not a checklist."
          subtitle="Hover any node to surface its connected technologies. The graph reflects how the stack actually wires together in production."
        />

        <div className="grid grid-cols-12 gap-6">
          {/* Interactive graph */}
          <div className="col-span-12 lg:col-span-9 glass rounded-2xl relative aspect-[16/10] overflow-hidden">
            <StackGraph />
          </div>

          {/* Static side panel */}
          <div className="col-span-12 lg:col-span-3 space-y-3">
            {STACK_GROUPS.map((g) => (
              <div key={g.t} className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: g.c }}
                  />
                  {g.t}
                </div>

                <div className="mt-2 text-[13px] text-white/85">
                  {g.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
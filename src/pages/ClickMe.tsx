import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { PROFILE } from "../content";

type Props = {
  onBack: () => void;
};

type StageDetail = {
  title: string;
  body: string;
  copyText?: string;
};

type Stage = {
  id: "prompting" | "planning" | "building" | "qa" | "shipping";
  label: string;
  summary: string;
  details: StageDetail[];
};

function copyOrFallback(text: string) {
  return navigator.clipboard.writeText(text);
}

export function ClickMePage({ onBack }: Props) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<Stage["id"]>("building");
  const [copied, setCopied] = useState<string | null>(null);

  const stages = useMemo<Stage[]>(
    () => [
      {
        id: "prompting",
        label: "Prompting",
        summary: "Turn a fuzzy idea into clear instructions.",
        details: [
          {
            title: "What I asked",
            body:
              "Paste your real prompts here. Keep them short and specific (goal, constraints, style, performance rules).",
            copyText:
              "Build a clean, modern portfolio. Add subtle scroll-linked effects (no scroll-jacking). Keep it fast on mobile, respect prefers-reduced-motion, and use transform/opacity only.",
          },
          {
            title: "How I iterated",
            body:
              "Write 2-3 bullets about what you changed after seeing the first result: layout, content, motion, copy.",
          },
        ],
      },
      {
        id: "planning",
        label: "Planning",
        summary: "Pick sections, content model, and success criteria.",
        details: [
          {
            title: "Structure",
            body:
              "Single page flow: Hero -> Projects -> Skills -> Education -> About -> Hobbies -> Contact.",
          },
          {
            title: "Rules",
            body:
              "No heavy effects. Interactive accents only where they help scanning and clicks.",
            copyText:
              "Rules: mobile-first, no hover-only UX, no continuous scroll listeners, reduced motion supported, build must pass.",
          },
        ],
      },
      {
        id: "building",
        label: "Building",
        summary: "Implement UI, motion polish, and content.",
        details: [
          {
            title: "What AI did",
            body:
              "Describe what parts AI generated (components, CSS, animations) and what you reviewed/edited manually.",
          },
          {
            title: "What I edited",
            body:
              "Write what you personally changed: spacing, typography, real resume content, links, and fixes.",
          },
        ],
      },
      {
        id: "qa",
        label: "QA",
        summary: "Make it smooth across devices and settings.",
        details: [
          {
            title: "Performance & motion",
            body:
              "Transform-only animations, disable hover/cursor effects on touch, respect prefers-reduced-motion.",
          },
          {
            title: "Build checks",
            body: "Keep TypeScript clean and ensure production build succeeds.",
            copyText: "npm.cmd run build",
          },
        ],
      },
      {
        id: "shipping",
        label: "Shipping",
        summary: "Deploy and keep it updated.",
        details: [
          {
            title: "Deploy",
            body:
              "Write where you deployed (Netlify, Vercel, GitHub Pages) and how you set it up.",
          },
          {
            title: "Keep it fresh",
            body:
              "Add a note that you iterate, learn, and ship improvements regularly.",
          },
        ],
      },
    ],
    []
  );

  const activeIndex = Math.max(
    0,
    stages.findIndex((s) => s.id === activeId)
  );
  const active = stages[activeIndex]!;
  const progress = stages.length <= 1 ? 1 : activeIndex / (stages.length - 1);

  const onCopy = async (key: string, text?: string) => {
    if (!text) return;
    try {
      await copyOrFallback(text);
      setCopied(key);
      window.setTimeout(() => setCopied((prev) => (prev === key ? null : prev)), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="secret">
      <div className="container secret-top">
        <button className="btn btn-ghost" type="button" onClick={onBack} data-cursor="link">
          Back
        </button>
        <div className="secret-title">
          <div className="secret-kicker">Behind the scenes</div>
          <h1 className="h2">AI workflow: how {PROFILE.name} built this</h1>
        </div>
      </div>

      <div className="container timeline">
        <motion.aside
          className="glass card timeline-rail"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="timeline-rail-head">
            <div className="timeline-rail-title">Stages</div>
            <div className="muted small">Tap a stage to jump</div>
          </div>

          <div className="timeline-progress" aria-hidden="true">
            <motion.div
              className="timeline-progress-fill"
              style={{ scaleY: reduce ? 1 : progress }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
            />
          </div>

          <div className="timeline-stages" role="tablist" aria-label="Workflow stages">
            {stages.map((s, idx) => {
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`timeline-stage ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                  data-cursor="link"
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className={`timeline-dot dot-${idx}`} aria-hidden="true" />
                  <span className="timeline-stage-text">
                    <span className="timeline-stage-label">{s.label}</span>
                    <span className="timeline-stage-summary muted small">{s.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.aside>

        <motion.section
          className="glass card timeline-panel"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="timeline-panel-head">
                <div>
                  <div className="timeline-panel-title">{active.label}</div>
                  <div className="muted">{active.summary}</div>
                </div>
                <div className="timeline-badge" aria-hidden="true">
                  {activeIndex + 1}/{stages.length}
                </div>
              </div>

              <div className="timeline-details">
                {active.details.map((d) => {
                  const key = `${active.id}:${d.title}`;
                  return (
                    <details key={key} className="detail" open>
                      <summary className="detail-summary" data-cursor="link">
                        <span>{d.title}</span>
                        {d.copyText ? (
                          <button
                            type="button"
                            className="chip chip-link"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              void onCopy(key, d.copyText);
                            }}
                            data-cursor="link"
                          >
                            {copied === key ? "Copied" : "Copy"}
                          </button>
                        ) : null}
                      </summary>
                      <div className="detail-body muted">{d.body}</div>
                      {d.copyText ? (
                        <pre className="code">
                          <code>{d.copyText}</code>
                        </pre>
                      ) : null}
                    </details>
                  );
                })}
              </div>

              <div className="timeline-callout">
                <div className="timeline-callout-title">Make it real</div>
                <div className="muted small">
                  Replace the placeholders with your actual prompts and edits. That honesty is the point of this page.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      </div>
    </div>
  );
}


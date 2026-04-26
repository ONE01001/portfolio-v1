import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/Section";

export function AISkills() {
  const reduce = useReducedMotion();

  const skills = [
    {
      title: "Local AI Models",
      desc: "Running cutting-edge models on my own hardware — faster iteration, full privacy, zero limits.",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #93e2ff 0%, #c4b5fd 100%)",
      glow: "rgba(147, 226, 255, 0.15)",
    },
    {
      title: "Prompt Engineering",
      desc: "Turning complex ideas into precise instructions. The better the prompt, the better the output.",
      icon: "🧬",
      gradient: "linear-gradient(135deg, #c4b5fd 0%, #f0abfc 100%)",
      glow: "rgba(196, 181, 253, 0.15)",
    },
    {
      title: "AI-Driven Design",
      desc: "From generating assets to polishing interfaces — AI accelerates every pixel of my workflow.",
      icon: "✦",
      gradient: "linear-gradient(135deg, #f0abfc 0%, #93e2ff 100%)",
      glow: "rgba(240, 171, 252, 0.15)",
    },
  ];

  return (
    <Section id="ai-skills" eyebrow="Future" title="AI Capabilities">
      <p className="muted" style={{ maxWidth: 560, lineHeight: 1.7, marginBottom: 32, fontSize: 17 }}>
        I don't just use AI — I study it, run it locally, and push it to build things that feel impossible.
      </p>

      <div className="ai-grid">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.title}
            className="ai-card"
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: i * 0.12,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              reduce
                ? {}
                : {
                  y: -6,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }
            }
            style={{ "--card-glow": skill.glow } as React.CSSProperties}
          >
            {/* Glow orb behind card */}
            <div className="ai-card-glow" />

            {/* Icon with gradient background */}
            <div className="ai-icon-wrap">
              <span className="ai-icon">{skill.icon}</span>
            </div>

            {/* Title with gradient */}
            <h3 className="ai-title">
              <span
                style={{
                  background: skill.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {skill.title}
              </span>
            </h3>

            <p className="ai-desc">{skill.desc}</p>

            {/* Bottom shine line */}
            <div className="ai-card-shine" />
          </motion.div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ai-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .ai-card {
          position: relative;
          padding: 32px 28px 28px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          overflow: hidden;
          cursor: default;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
          box-shadow:
            0 4px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .ai-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(147, 226, 255, 0.25);
          box-shadow:
            0 0 0 1px rgba(147, 226, 255, 0.08),
            0 24px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(147, 226, 255, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .ai-card-glow {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: var(--card-glow);
          filter: blur(60px);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .ai-card:hover .ai-card-glow {
          opacity: 1;
        }

        .ai-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 20px;
          transition: background 0.3s, border-color 0.3s;
        }

        .ai-card:hover .ai-icon-wrap {
          background: rgba(147, 226, 255, 0.06);
          border-color: rgba(147, 226, 255, 0.12);
        }

        .ai-icon {
          font-size: 22px;
          line-height: 1;
        }

        .ai-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }

        .ai-desc {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .ai-card-shine {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(147, 226, 255, 0.2),
            rgba(196, 181, 253, 0.2),
            transparent
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .ai-card:hover .ai-card-shine {
          opacity: 1;
        }

        @media (max-width: 700px) {
          .ai-grid {
            grid-template-columns: 1fr;
          }
          .ai-card {
            padding: 24px 20px 20px;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(255, 255, 255, 0.06);
          }
        }
      `,
        }}
      />
    </Section>
  );
}

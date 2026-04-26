import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/Section";
import { SKILL_GROUPS, TECH_COLORS } from "../content";

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills">
      <motion.div
        className="skills-grid"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {SKILL_GROUPS.map((g) => (
          <div key={g.label} className="card skill-card">
            <div className="skill-label">{g.label}</div>
            <div className="tags">
              {g.items.map((i) => (
                <span key={i} className="chip" style={{ color: TECH_COLORS[i] }}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}


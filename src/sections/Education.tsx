import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/Section";
import { EDUCATION } from "../content";

export function Education() {
  const reduce = useReducedMotion();

  return (
    <Section id="education" eyebrow="Background" title="Education">
      <motion.div
        className="edu"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {EDUCATION.map((e) => (
          <article key={`${e.school}-${e.year}`} className="card edu-card">
            <div className="edu-top">
              <div className="edu-school">{e.school}</div>
              <div className="edu-year">{e.year}</div>
            </div>
            <div className="muted">{e.program}</div>
            <div className="muted small">{e.location}</div>
          </article>
        ))}
      </motion.div>
    </Section>
  );
}


import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/Section";
import { SUMMARY } from "../content";

export function About() {
  const reduce = useReducedMotion();

  return (
    <Section id="about" eyebrow="Story" title="About">
      <div className="about">
        <motion.div
          className="card about-card"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="about-bio">{SUMMARY}</p>
          <div className="about-mini muted small">
            Tip: Add 1 line here about what you want next (job role, internship, freelance).
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

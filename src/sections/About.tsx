import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/Section";
import { ABOUT_POINTS } from "../content";

export function About() {
  const reduce = useReducedMotion();

  return (
    <Section id="about" eyebrow="Story" title="About">
      <div className="about">
        <motion.div
          className="card bullets-card about-card"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul className="bullets">
            {ABOUT_POINTS.map((point, i) => (
              <li key={i} className="muted">
                {point}
              </li>
            ))}
          </ul>
          <div className="about-mini muted" style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', fontSize: '17px', lineHeight: '1.8', letterSpacing: '-0.01em' }}>
            I am available for <span style={{ color: 'var(--accent)' }}>job roles</span>, <span style={{ color: 'var(--accent)' }}>internships</span>, and <span style={{ color: 'var(--accent)' }}>freelance</span> work.
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

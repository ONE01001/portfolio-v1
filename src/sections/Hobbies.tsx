import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/Section";
import { HOBBIES } from "../content";

export function Hobbies() {
  const reduce = useReducedMotion();

  return (
    <Section id="hobbies" eyebrow="Outside Work" title="Hobbies & Interests">
      <motion.ul
        className="card bullets bullets-card"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {HOBBIES.map((h) => (
          <li key={h} className="muted">
            {h}
          </li>
        ))}
      </motion.ul>
    </Section>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: Props) {
  const reduce = useReducedMotion();

  return (
    <section id={id} className="section">
      <div className="container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-head">
            {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
            <h2 className="h2">{title}</h2>
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

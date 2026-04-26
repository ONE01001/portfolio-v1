import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS, TECH_COLORS } from "../content";
import { Section } from "../components/Section";

export function Projects() {
  const reduce = useReducedMotion();

  return (
    <Section id="projects" eyebrow="Work" title="Projects">
      <motion.div
        className="projects-grid"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {PROJECTS.map((p) => (
          <motion.article
            key={p.title}
            className="card project-card"
            whileHover={reduce ? {} : { y: -4 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            data-cursor="drag"
          >
            <div className="project-head">
              <h3 className="h3">{p.title}</h3>
              <div className="project-links">
                {p.liveUrl ? (
                  <a
                    className="chip chip-link"
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                  >
                    Live
                  </a>
                ) : null}
                {p.repoUrl ? (
                  <a
                    className="chip chip-link"
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                  >
                    Repo
                  </a>
                ) : null}
              </div>
            </div>
            <ul className="bullets">
              {p.description.map((d) => (
                <li key={d} className="muted">
                  {d}
                </li>
              ))}
            </ul>
            <div className="tags">
              {p.tech.map((t) => (
                <span className="chip" key={t} style={{ color: TECH_COLORS[t] }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

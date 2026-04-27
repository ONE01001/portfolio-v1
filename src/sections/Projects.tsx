import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PROJECTS, TECH_COLORS } from "../content";
import { Section } from "../components/Section";

export function Projects() {
  const reduce = useReducedMotion();
  const [activeProjectQr, setActiveProjectQr] = useState<string | null>(null);

  const activeProject = PROJECTS.find(p => p.title === activeProjectQr);

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
              <div className="project-links" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {p.liveUrl ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <a
                      className="chip chip-link"
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                    >
                      Live
                    </a>
                    <button 
                      className="chip chip-link"
                      onClick={() => setActiveProjectQr(p.title)}
                      data-cursor="link"
                      style={{ padding: '4px 6px', display: 'flex', alignItems: 'center' }}
                      title="Show QR Code"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    </button>
                  </div>
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

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProjectQr(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                background: 'var(--panel)',
                border: '1px solid var(--border)',
                padding: '32px',
                borderRadius: '32px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                maxWidth: '360px',
                width: '100%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ textAlign: 'center' }}>
                <h3 className="h3" style={{ marginBottom: '8px' }}>{activeProject.title}</h3>
                <p className="muted small">Scan to visit live project</p>
              </div>
              
              <div style={{ background: 'white', padding: '12px', borderRadius: '16px' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(activeProject.liveUrl || '')}`}
                  alt="Project QR Code"
                  style={{ width: '240px', height: '240px', display: 'block' }}
                />
              </div>

              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setActiveProjectQr(null)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}


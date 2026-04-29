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
            <div className="project-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <h3 className="h3" style={{ transition: 'color 0.4s ease', flex: 1 }}>{p.title}</h3>
              <div className="project-links" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {p.liveUrl ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <a
                      className="chip chip-link"
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      style={{ padding: '6px 12px' }}
                    >
                      Live
                    </a>
                    <button 
                      className="chip chip-link"
                      onClick={() => setActiveProjectQr(p.title)}
                      data-cursor="link"
                      style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Show QR Code"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>
                      </svg>
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
                    style={{ padding: '6px 12px' }}
                  >
                    Repo
                  </a>
                ) : null}
              </div>
            </div>
            <ul className="bullets">
              {p.description.map((d) => (
                <li key={d} className="muted" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  {d}
                </li>
              ))}
            </ul>
            <div className="tags" style={{ marginTop: 'auto', paddingTop: '16px' }}>
              {p.tech.map((t) => (
                <span className="chip" key={t} style={{ color: TECH_COLORS[t] || 'var(--muted)', background: 'rgba(255,255,255,0.02)' }}>
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
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(20px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              style={{
                background: 'rgba(15, 15, 20, 0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '40px',
                borderRadius: '32px',
                boxShadow: '0 40px 1000px rgba(0,0,0,0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                maxWidth: '380px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(147, 226, 255, 0.05), transparent)', pointerEvents: 'none' }} />
              
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <h3 className="h3" style={{ marginBottom: '8px', letterSpacing: '-0.02em' }}>{activeProject.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Scan to visit live project</p>
              </div>
              
              <div style={{ 
                background: 'white', 
                padding: '12px', 
                borderRadius: '20px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)', 
                position: 'relative', 
                zIndex: 1,
                width: '100%',
                maxWidth: '220px'
              }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(activeProject.liveUrl || '')}`}
                  alt="Project QR Code"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px', position: 'relative', zIndex: 1 }} onClick={() => setActiveProjectQr(null)}>
                Dismiss
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}


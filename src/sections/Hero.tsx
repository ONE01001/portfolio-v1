import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { PROFILE, TECH_COLORS } from "../content";
// import newHeadshot from "../assets/new_headshot.jpg";
import newHeadshotPng from "../assets/new_headshot.png";
import githubQr from "../assets/github-qr.png";
import linkedinQr from "../assets/linkedin-qr.png";
import { AsciiAvatar } from "../components/AsciiAvatar";

export function Hero() {
  const [isPopArtMode, setIsPopArtMode] = useState(false);
  const [activeQr, setActiveQr] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const accentRef = useRef<HTMLDivElement | null>(null);
  const accentScrollRef = useRef<HTMLDivElement | null>(null);
  const enableGsap = useMemo(() => {
    if (reduce) return false;
    if (typeof window === "undefined") return false;
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return fine && !rm;
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: accentScrollRef,
    offset: ["start end", "end start"],
  });
  const rollX = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const rollR = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  useEffect(() => {
    if (!enableGsap || !accentRef.current) return;

    const el = accentRef.current;
    const setX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 32;
      const dy = (e.clientY / window.innerHeight - 0.5) * 24;
      setX(dx);
      setY(dy);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enableGsap]);

  return (
    <section id="top" className="hero">
      <div ref={accentScrollRef} className="container hero-inner">
        <div className="hero-copy">
          <motion.div
            className="kicker"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {PROFILE.availability} / {PROFILE.location}
          </motion.div>

          <motion.h1
            className="h1"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={isPopArtMode ? 'water-flow-text' : ''}
              style={!isPopArtMode ? { color: 'var(--accent)' } : {}}
            >
              Hardik
            </span> Rana
          </motion.h1>

          <motion.p
            className="lead"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="role">{PROFILE.role}</span>
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <motion.a
                className="btn btn-primary"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}`}
                target="_blank"
                rel="noreferrer"
                title={PROFILE.email}
                whileHover={reduce ? {} : { y: -2 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                data-cursor="link"
                style={{ color: "#F5792A", padding: "11px 20px" }}
              >
                Let's Talk
              </motion.a>
              <motion.button
                className="btn btn-primary"
                onClick={() => setActiveQr('email')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: '10px', color: '#F5792A', borderRadius: '12px', background: 'rgba(245, 121, 42, 0.05)', borderColor: 'rgba(245, 121, 42, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Show QR Code"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>
                </svg>
              </motion.button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {PROFILE.socials.github ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <motion.a
                    className="btn btn-ghost"
                    href={PROFILE.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={reduce ? {} : { y: -2, background: 'rgba(255,255,255,0.03)' }}
                    whileTap={reduce ? {} : { scale: 0.99 }}
                    data-cursor="link"
                    style={{ color: "#A8A8A8" }}
                  >
                    GitHub
                  </motion.a>
                  <motion.button
                    className="btn btn-ghost"
                    onClick={() => setActiveQr('github')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ padding: '10px', color: '#A8A8A8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Show QR Code"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>
                    </svg>
                  </motion.button>
                </div>
              ) : null}
              {PROFILE.socials.linkedin ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <motion.a
                    className="btn btn-ghost"
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={reduce ? {} : { y: -2, background: 'rgba(255,255,255,0.03)' }}
                    whileTap={reduce ? {} : { scale: 0.99 }}
                    data-cursor="link"
                    style={{ color: "#0A66C2" }}
                  >
                    LinkedIn
                  </motion.a>
                  <motion.button
                    className="btn btn-ghost"
                    onClick={() => setActiveQr('linkedin')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ padding: '10px', color: '#0A66C2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Show QR Code"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>
                    </svg>
                  </motion.button>
                </div>
              ) : null}
            </div>

            <div
              onClick={() => setIsPopArtMode(!isPopArtMode)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '16px',
                cursor: 'pointer',
                userSelect: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                width: 'fit-content'
              }}
              data-cursor="link"
            >
              <span style={{ fontSize: '10px', letterSpacing: '1.5px', color: isPopArtMode ? 'rgba(255,255,255,0.3)' : 'var(--text)', fontWeight: 700, transition: 'color 0.3s' }}>STANDARD</span>
              <div style={{
                width: '36px',
                height: '18px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}>
                <motion.div
                  initial={false}
                  animate={{
                    x: isPopArtMode ? 16 : 0,
                    background: isPopArtMode ? 'linear-gradient(135deg, #ff6b6b, #c4b5fd)' : '#93e2ff',
                    boxShadow: isPopArtMode ? '0 0 10px rgba(255, 107, 107, 0.3)' : '0 0 10px rgba(147, 226, 255, 0.3)'
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <span style={{ fontSize: '10px', letterSpacing: '1.5px', color: isPopArtMode ? 'var(--text)' : 'rgba(255,255,255,0.3)', fontWeight: 700, transition: 'color 0.3s' }}>VIVID</span>
            </div>
          </motion.div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <div className="hero-panel">
            <motion.div
              ref={accentRef}
              className="hero-accent"
              style={
                enableGsap
                  ? undefined
                  : {
                    x: reduce ? 0 : rollX,
                    rotate: reduce ? 0 : rollR,
                  }
              }
            />
            <div className="hero-grid" />
            <div className="hero-panel-inner">
              <AsciiAvatar src={newHeadshotPng} alt={`${PROFILE.name} ASCII portrait`} isPopArtMode={isPopArtMode} />

              <div className="hero-stat-row">
                <div className="hero-stat" style={{ backdropFilter: 'blur(4px)' }}>
                  <div className="hero-stat-label">Focus</div>
                  <div className="hero-stat-value">
                    <span style={{ color: "var(--accent)" }}>Frontend</span> + <span style={{ color: "var(--accent-2)" }}>UX</span>
                  </div>
                </div>
                <div className="hero-stat" style={{ backdropFilter: 'blur(4px)' }}>
                  <div className="hero-stat-label">Stack</div>
                  <div className="hero-stat-value">
                    <span style={{ color: TECH_COLORS["React.js"] }}>React</span> /{" "}
                    <span style={{ color: TECH_COLORS["Node.js"] }}>Node</span> /{" "}
                    <span style={{ color: TECH_COLORS["Render"] }}>Deploy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-drift" />
      <AnimatePresence>
        {activeQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveQr(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(20px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '20px'
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
                boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
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
              
              <div style={{ background: 'white', padding: '12px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                <img
                  src={
                    activeQr === 'github' ? githubQr : 
                    activeQr === 'linkedin' ? linkedinQr : 
                    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=mailto:${PROFILE.email}`
                  }
                  alt="QR Code"
                  style={{ width: '220px', height: '220px', display: 'block' }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '22px', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                  {activeQr === 'github' ? 'GitHub Profile' : 
                   activeQr === 'linkedin' ? 'LinkedIn Connection' : 
                   'Direct Email'}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Scan with your phone camera</div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setActiveQr(null)}>
                Dismiss
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

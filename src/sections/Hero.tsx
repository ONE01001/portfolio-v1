import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
            {PROFILE.name}
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
          >
            <motion.a
              className="btn btn-primary"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}`}
              target="_blank"
              rel="noreferrer"
              title={PROFILE.email}
              whileHover={reduce ? {} : { y: -1 }}
              whileTap={reduce ? {} : { scale: 0.98 }}
              data-cursor="link"
              style={{ color: "#F5792A" }}
            >
              Let's Talk
            </motion.a>

            {PROFILE.socials.github ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <motion.a
                  className="btn btn-ghost"
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reduce ? {} : { y: -1 }}
                  whileTap={reduce ? {} : { scale: 0.99 }}
                  data-cursor="link"
                  style={{ color: "#A8A8A8" }}
                >
                  GitHub
                </motion.a>
                <motion.button
                  className="btn btn-ghost"
                  onClick={() => setActiveQr('github')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ padding: '8px', color: '#A8A8A8', borderRadius: '50%' }}
                  title="Show QR Code"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
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
                  whileHover={reduce ? {} : { y: -1 }}
                  whileTap={reduce ? {} : { scale: 0.99 }}
                  data-cursor="link"
                  style={{ color: "#0A66C2" }}
                >
                  LinkedIn
                </motion.a>
                <motion.button
                  className="btn btn-ghost"
                  onClick={() => setActiveQr('linkedin')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ padding: '8px', color: '#0A66C2', borderRadius: '50%' }}
                  title="Show QR Code"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </motion.button>
              </div>
            ) : null}
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
              {/* <AsciiAvatar src={headshot} alt={`${PROFILE.name} ASCII portrait`} /> */}
              {/* <AsciiAvatar src={newHeadshot} alt={`${PROFILE.name} ASCII portrait`} /> */}
              <AsciiAvatar src={newHeadshotPng} alt={`${PROFILE.name} ASCII portrait`} isPopArtMode={isPopArtMode} />
              
              <div 
                onClick={() => setIsPopArtMode(!isPopArtMode)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  zIndex: 10,
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: isPopArtMode ? 'var(--muted)' : 'var(--text)', fontWeight: 700, transition: 'color 0.3s' }}>COOL</span>
                <div style={{
                  width: '44px',
                  height: '24px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}>
                  <motion.div 
                    initial={false}
                    animate={{ 
                      x: isPopArtMode ? 18 : 0,
                      background: isPopArtMode ? 'linear-gradient(135deg, #ff6b6b, #4ecdc4)' : '#64ffda',
                      boxShadow: isPopArtMode ? '0 0 12px rgba(255, 107, 107, 0.4)' : '0 0 12px rgba(100, 255, 218, 0.4)'
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                    }}
                  />
                </div>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: isPopArtMode ? 'var(--text)' : 'var(--muted)', fontWeight: 700, transition: 'color 0.3s' }}>EXTRA COOL</span>
              </div>

              <div className="hero-stat-row">
                <div className="hero-stat">
                  <div className="hero-stat-label">Focus</div>
                  <div className="hero-stat-value">
                    <span style={{ color: "#F7DF1E" }}>Frontend</span> + <span style={{ color: "#a78bfa" }}>UX</span>
                  </div>
                </div>
                <div className="hero-stat">
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
      {activeQr && (
        <div 
          onClick={() => setActiveQr(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--border)',
              padding: '24px',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeQr === 'github' ? githubQr : linkedinQr} 
              alt="QR Code" 
              style={{ width: '240px', height: '240px', borderRadius: '12px', background: 'white', padding: '8px' }} 
            />
            <div style={{ fontWeight: 600, fontSize: '18px' }}>
              {activeQr === 'github' ? 'Scan for GitHub' : 'Scan for LinkedIn'}
            </div>
            <button className="btn btn-primary" onClick={() => setActiveQr(null)}>Close</button>
          </motion.div>
        </div>
      )}
    </section>
  );
}

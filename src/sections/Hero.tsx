import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { PROFILE, TECH_COLORS } from "../content";
import headshot from "../assets/headshot.jpeg";
// import newHeadshot from "../assets/new_headshot.jpg";
import newHeadshotPng from "../assets/new_headshot.png";
import { AsciiAvatar } from "../components/AsciiAvatar";

type Props = {
  onEmail: () => void;
};

export function Hero({ onEmail }: Props) {
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
            <motion.button
              className="btn btn-primary"
              type="button"
              onClick={onEmail}
              whileHover={reduce ? {} : { y: -1 }}
              whileTap={reduce ? {} : { scale: 0.98 }}
              data-cursor="link"
              style={{ color: "#F5792A" }}
            >
              Email me
            </motion.button>

            {PROFILE.socials.github ? (
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
            ) : null}
            {PROFILE.socials.linkedin ? (
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
              <AsciiAvatar src={newHeadshotPng} alt={`${PROFILE.name} ASCII portrait`} />
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
    </section>
  );
}

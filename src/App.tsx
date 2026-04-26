import { useEffect, useMemo, useRef, useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { Header } from "./components/Header";
import { useActiveSection } from "./hooks/useActiveSection";
import { PROFILE } from "./content";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Education } from "./sections/Education";
import { About } from "./sections/About";
import { Hobbies } from "./sections/Hobbies";
import { Contact } from "./sections/Contact";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { ClickMePage } from "./pages/ClickMe";

export default function App() {
  const reduce = useReducedMotion();
  const isTouch = useMediaQuery("(hover:none) and (pointer:coarse)", false);
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, [0, 1], [0, -48]);

  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const sections = useMemo(
    () => [
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" },
      { id: "about", label: "About" },
      { id: "hobbies", label: "Hobbies" },
      { id: "contact", label: "Contact" },
    ],
    []
  );
  const activeObserved = useActiveSection(sections.map((s) => s.id));
  const [activeManual, setActiveManual] = useState<string | null>(null);
  const manualTimer = useRef<number | null>(null);
  const active = activeManual ?? activeObserved;

  const onEmail = () => {
    window.location.href = `mailto:${PROFILE.email}`;
  };

  const onNavigate = (id: string) => {
    setActiveManual(id);
    if (manualTimer.current) window.clearTimeout(manualTimer.current);
    manualTimer.current = window.setTimeout(() => setActiveManual(null), 950);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (path === "/click-me") {
    return (
      <>
        <CustomCursor />
        <ClickMePage onBack={() => navigate("/")} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      {!reduce && !isTouch ? (
        <motion.div className="bg-drift" style={{ y: drift }} aria-hidden="true" />
      ) : null}
      <Header
        activeSection={active}
        sections={sections}
        onNavigate={onNavigate}
        onSecret={() => navigate("/click-me")}
      />
      <main>
        <Hero onEmail={onEmail} />
        <Projects />
        <Skills />
        <Education />
        <About />
        <Hobbies />
        <Contact />
        <footer className="footer">
          <div className="container footer-inner">
            <div className="muted small">
              {new Date().getFullYear()} · {PROFILE.name}
            </div>
            <div className="footer-links">
              <a href="/click-me" onClick={(e) => { e.preventDefault(); navigate("/click-me"); }} data-cursor="link">
                heyy 👀
              </a>
              {PROFILE.socials.github ? (
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" data-cursor="link">
                  GitHub
                </a>
              ) : null}
              {PROFILE.socials.linkedin ? (
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" data-cursor="link">
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

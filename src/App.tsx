import { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { Header } from "./components/Header";
import { useActiveSection } from "./hooks/useActiveSection";
import { PROFILE } from "./content";
import { Hero } from "./sections/Hero";
import { LoadingScreen } from "./components/LoadingScreen";

const AISkills = lazy(() => import("./sections/AISkills").then(m => ({ default: m.AISkills })));
const Projects = lazy(() => import("./sections/Projects").then(m => ({ default: m.Projects })));
const Skills = lazy(() => import("./sections/Skills").then(m => ({ default: m.Skills })));
const Education = lazy(() => import("./sections/Education").then(m => ({ default: m.Education })));
const About = lazy(() => import("./sections/About").then(m => ({ default: m.About })));
const Hobbies = lazy(() => import("./sections/Hobbies").then(m => ({ default: m.Hobbies })));
const Contact = lazy(() => import("./sections/Contact").then(m => ({ default: m.Contact })));
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { ClickMePage } from "./pages/ClickMe";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay removed. Site loads as soon as React is ready.
    setIsLoading(false);
  }, []);

  const reduce = useReducedMotion();
  const isTouch = useMediaQuery("(hover:none) and (pointer:coarse)", false);
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, [0, 1], [0, -48]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

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
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
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
        <Hero />
        <Suspense fallback={<div className="section-loader" style={{ height: '400px' }} />}>
          <AISkills />
          <Projects />
          <Skills />
          <About />
          <Hobbies />
          <Education />
          <Contact />
        </Suspense>
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

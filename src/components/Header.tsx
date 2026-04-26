import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
type Props = {
  activeSection: string;
  sections: { id: string; label: string }[];
  onNavigate: (id: string) => void;
  onSecret: () => void;
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header({ activeSection, sections, onNavigate, onSecret }: Props) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 320, damping: 40, mass: 0.8 });

  return (
    <header className="site-header">
      {!reduce ? <motion.div className="scroll-progress" style={{ scaleX: progress }} /> : null}
      <div className="container header-inner">
        <button
          className="brand"
          data-cursor="link"
          onClick={() => scrollToId("top")}
          type="button"
        >
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">Portfolio</span>
        </button>

        <nav className="nav" aria-label="Primary">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                className={`nav-link ${isActive ? "is-active" : ""}`}
                onClick={() => onNavigate(s.id)}
                type="button"
                data-cursor="link"
              >
                <span>{s.label}</span>
                {isActive ? (
                  <motion.span
                    className="nav-underline"
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 550, damping: 45 }}
                  />
                ) : null}
              </button>
            );
          })}
        </nav>

        <button className="secret-link" type="button" onClick={onSecret} data-cursor="link">
          heyy 👀
        </button>
      </div>
    </header>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { Section } from "../components/Section";
import { PROFILE } from "../content";

export function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const mailto = useMemo(() => `mailto:${PROFILE.email}`, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      window.location.href = mailto;
    }
  }, [mailto]);

  return (
    <Section id="contact" eyebrow="Next" title="Contact">
      <div className="card contact">
        <p className="muted">
          The fastest way to reach me is email. I’m happy to share more details about any project
          and how I can help.
        </p>

        <div className="contact-actions">
          <motion.a
            className="btn btn-primary"
            href={mailto}
            whileHover={reduce ? {} : { y: -1 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            data-cursor="link"
          >
            {PROFILE.email}
          </motion.a>
          <motion.button
            className="btn btn-ghost"
            type="button"
            onClick={copy}
            whileHover={reduce ? {} : { y: -1 }}
            whileTap={reduce ? {} : { scale: 0.99 }}
            data-cursor="link"
          >
            {copied ? "Copied" : "Copy email"}
          </motion.button>
        </div>
        <div className="muted small contact-meta">
          <span>{PROFILE.phone}</span>
          <span className="sep" aria-hidden="true">
            ·
          </span>
          <span>{PROFILE.location}</span>
        </div>
      </div>
    </Section>
  );
}

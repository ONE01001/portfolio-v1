import { motion, useReducedMotion } from "framer-motion";

type Props = {
  onBack: () => void;
};

export function ClickMePage({ onBack }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="secret">
      <div className="container secret-top">
        <button className="btn btn-ghost" type="button" onClick={onBack} data-cursor="link">
          Back
        </button>
      </div>

      <div className="container">
        <motion.div
          className="glass card"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: '40px', textAlign: 'center', marginTop: '20px' }}
        >
          <h1 className="h2" style={{ marginBottom: '16px' }}>Fresh Start</h1>
          <p className="muted">This page has been cleared. We are ready to build something new here!</p>
        </motion.div>
      </div>
    </div>
  );
}


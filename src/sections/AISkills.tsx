import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../components/Section";

export function AISkills() {
  const reduce = useReducedMotion();

  const skills = [
    {
      title: "Local AI Mastering",
      desc: "Running state-of-the-art models locally to build faster and more securely.",
      icon: "💻"
    },
    {
      title: "Prompt Engineering",
      desc: "Architecting complex systems by communicating effectively with AI.",
      icon: "🧠"
    },
    {
      title: "AI-Driven Design",
      desc: "Using AI to generate assets, polish UI, and optimize performance.",
      icon: "✨"
    }
  ];

  return (
    <Section id="ai-skills" eyebrow="Future" title="AI Capabilities">
      <div className="ai-grid">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.title}
            className="glass card ai-card"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ai-icon">{skill.icon}</div>
            <h3 className="h3" style={{ margin: '12px 0 8px', color: '#7dd3fc' }}>{skill.title}</h3>
            <p className="muted small" style={{ lineHeight: 1.6 }}>{skill.desc}</p>
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ai-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .ai-card {
          padding: 24px;
          border: 1px solid rgba(125, 211, 252, 0.1);
          transition: border-color 0.3s;
        }
        .ai-card:hover {
          border-color: rgba(125, 211, 252, 0.3);
        }
        .ai-icon {
          font-size: 24px;
        }
      `}} />
    </Section>
  );
}

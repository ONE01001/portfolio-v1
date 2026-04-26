import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { AsciiAvatar } from "../components/AsciiAvatar";

// I'll assume these will be uploaded soon
import secretAvatar from "../assets/secret-avatar.png"; 
import secretPhoto from "../assets/secret-photo.png";

type Props = {
  onBack: () => void;
};

export function ClickMePage({ onBack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPhotoVibe, setIsPhotoVibe] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Solo Leveling style text reveal transforms
  // Slide 1: Introduction
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [20, 0, -20]);

  // Slide 2: Building with Antigravity
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [20, 0, -20]);

  // Slide 3: Inspiration & Motivation
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [20, 0, -20]);

  // Slide 4: AI & Future
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95], [0, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95], [20, 0, -20]);

  // Pointer events logic to prevent invisible blocks from blocking clicks
  const pe1 = useTransform(opacity1, (v) => v > 0.1 ? "auto" as const : "none" as const);
  const pe2 = useTransform(opacity2, (v) => v > 0.1 ? "auto" as const : "none" as const);
  const pe3 = useTransform(opacity3, (v) => v > 0.1 ? "auto" as const : "none" as const);
  const pe4 = useTransform(opacity4, (v) => v > 0.1 ? "auto" as const : "none" as const);

  // Scroll Hint Text Logic
  const scrollText = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 0.95],
    ["Scroll Down", "Keep Scrolling", "Almost There", "Scroll Up"]
  );
  const scrollY = useTransform(scrollYProgress, [0, 0.1], [0, -40]);

  // Background progress effect
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  return (
    <div ref={containerRef} className="secret-page" style={{ height: '500vh', background: '#050505' }}>
      {/* Sticky Background Effect */}
      <motion.div 
        className="secret-bg"
        style={{
          position: 'fixed',
          inset: 0,
          opacity: bgOpacity,
          background: 'radial-gradient(circle at center, #7dd3fc22 0%, transparent 70%)',
          zIndex: 0
        }}
      />

      <div className="secret-content-container">
        {/* Navigation */}
        <div className="secret-nav">
          <button className="btn btn-ghost" onClick={onBack} data-cursor="link">
            ← Back to Portfolio
          </button>
          
          {/* Vibe Toggle */}
          <div 
            onClick={() => setIsPhotoVibe(!isPhotoVibe)}
            className="vibe-toggle"
            data-cursor="link"
          >
            <span className={!isPhotoVibe ? 'active' : ''}>COOL</span>
            <div className="vibe-switch">
              <motion.div 
                className="vibe-thumb"
                animate={{ x: isPhotoVibe ? 20 : 0 }}
                style={{
                  background: isPhotoVibe ? 'linear-gradient(135deg, #ff6b6b, #ffce6b)' : '#64ffda',
                  boxShadow: isPhotoVibe ? '0 0 15px #ff6b6b' : '0 0 15px #64ffda'
                }}
              />
            </div>
            <span className={isPhotoVibe ? 'active' : ''}>PHOTO</span>
          </div>
        </div>

        <div className="secret-main-layout">
          {/* Sticky Left: The Avatar */}
          <div className="secret-avatar-sticky">
            <div className="avatar-wrapper">
              {isPhotoVibe ? (
                <motion.img 
                  src={secretPhoto} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="original-photo"
                  alt="Hardik Rana Original"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <AsciiAvatar src={secretAvatar} alt="Hardik Rana Secret Avatar" />
              )}
            </div>
          </div>

          {/* Sticky Right: The Text Narrative */}
          <div className="secret-narrative-sticky">
            <motion.div style={{ opacity: opacity1, y: y1, pointerEvents: pe1 }} className="narrative-block">
              <h2 className="h1 gradient-text">This is a secret.</h2>
              <p className="lead">You found the personal side of this portfolio. This isn't just a site; it's a reflection of my growth and passion.</p>
            </motion.div>

            <motion.div style={{ opacity: opacity2, y: y2, pointerEvents: pe2 }} className="narrative-block">
              <h3 className="gradient-text-2">Human + AI Collaboration</h3>
              <p>I built this entire experience leveraging the power of **Cursor** and **Antigravity**. Beyond just using web-based AI, I've mastered running AI models **locally** on my own hardware to push the boundaries of what I can create, securely and efficiently.</p>
            </motion.div>

            <motion.div style={{ opacity: opacity3, y: y3, pointerEvents: pe3 }} className="narrative-block">
              <h3 className="gradient-text">Her Inspiration</h3>
              <p>Deeply inspired by the incredible work of <a href="https://www.gazijarin.com/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }} title="https://www.gazijarin.com/">Gazi Jarin</a>. **Her** unique approach to storytelling through code and design motivated me to build something more than just a typical resume.</p>
            </motion.div>

            <motion.div style={{ opacity: opacity4, y: y4, pointerEvents: pe4 }} className="narrative-block">
              <h3 className="gradient-text-2">The Motivation</h3>
              <p>Web development is my focus, but 3D modeling in Blender is where I let my creativity run wild. I'm constantly learning, evolving, and using AI to become a more versatile developer every single day.</p>
              <div className="btn-row" style={{ marginTop: '24px' }}>
                <button className="btn btn-primary" onClick={onBack}>Back to Reality</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        className="scroll-hint"
        style={{ y: scrollY }}
      >
        <motion.span>{scrollText}</motion.span>
        <div className="scroll-line" />
      </motion.div>
    </div>
  );
}

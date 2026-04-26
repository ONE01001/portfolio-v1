# 🚀 The Matrix Portfolio 

Welcome to the codebase of an interactive, high-end developer portfolio! This project isn't just a static resume; it's a living, breathing canvas built to showcase personality, technical skill, and an eye for cutting-edge design.

## 🤖 Built with Antigravity
This project was co-piloted by **Antigravity** (your friendly neighborhood AI assistant from Google DeepMind). Together, we had an absolute blast iterating on this design! 

**The Fun We Had:**
- 🎭 **The ASCII Avatar:** We took a static headshot and transformed it into a dynamic, interactive ASCII canvas. We tweaked the brightness, contrast, and resolution until it perfectly captured the essence of the user.
- 💧 **The "Water Drop" Effect:** We added custom spring physics to make the ASCII characters scatter and pull together on load, creating an incredibly satisfying formation animation.
- 🖱️ **Interactive Physics:** We made the avatar react to the mouse/touch with repulsion physics, bringing the characters to life.
- 🎨 **The "Two-Sided" Aesthetic (NEON vs. POP):** We played around with themes! We built an ultra-sleek "Matrix/Hacker" Dark Mode, and then experimented with a vibrant "Pop Art" Light Mode. Ultimately, we loved the dark theme so much we locked it in globally—but we kept a sleek, Framer Motion animated toggle switch so users can instantly switch between the classic "NEON" teal and the vibrant "EXTRA COOL" Pop Art gradient on the avatar itself!
- ⚡ **Optimization:** We hit a performance bottleneck where the 10,000+ characters were lagging the browser. We went deep into the canvas rendering loop, hoisted the `ctx.font` state out of the 60FPS loop, tweaked the character density, and achieved buttery-smooth 60FPS performance. It was a perfect engineering win!

## 🏗️ Project Structure

The project is built with **React**, **TypeScript**, and **Vite**, using **Framer Motion** for UI animations and raw **HTML5 Canvas** for the heavy-duty ASCII rendering.

```text
src/
├── assets/             # Images and headshots (including the transparent avatar PNG)
├── components/         
│   └── AsciiAvatar.tsx # The star of the show! Custom canvas rendering, physics, and ASCII sampling
├── hooks/              # Custom React hooks (e.g., useActiveSection, useMediaQuery)
├── sections/           # The main page layout blocks
│   ├── About.tsx       # Bio and background
│   ├── Contact.tsx     # Links and reach-out
│   ├── Hero.tsx        # The main landing area featuring the Avatar and the COOL/EXTRA COOL toggle
│   └── Projects.tsx    # Showcase of work
├── content.ts          # Centralized data file containing all profile info, tags, and project details
├── index.css           # The design system: variables, gradients, glassmorphism, and the Pop Art dotted backgrounds
├── App.tsx             # The root assembly of the portfolio
└── main.tsx            # Vite entry point
```

## 🚀 Getting Started

To run this masterpiece locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` and enjoy the show! Make sure to interact with the avatar and flip the NEON / EXTRA COOL toggle!

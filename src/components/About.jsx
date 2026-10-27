import { memo } from "react";
import { FiCpu, FiLayers, FiCheckCircle, FiGitPullRequest } from "react-icons/fi";
import { PERSONAL_INFO } from "../data/portfolio";

const About = memo(function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-bar" />
            <span>About Me</span>
          </div>
          <h2 className="section-title">Engineering Mindset & Background</h2>
          <p className="section-description">
            A grounded approach to building reliable software systems, from typed frontend interfaces to systems-level concurrency primitives.
          </p>
        </div>

        <div className="about-grid">
          {/* Narrative */}
          <div className="about-narrative">
            <p>
              I am a Computer Science undergraduate at <strong>Graphic Era Hill University</strong>, Dehradun (CGPA: 8.25/10), with foundational roots from <strong>Rashtriya Military School, Belgaum</strong>. My focus is on software engineering that balances real-world usability with clean, maintainable architecture.
            </p>
            <p>
              Rather than treating frameworks as black boxes, I enjoy exploring how systems function beneath the surface. That curiosity led me to build a <strong>Distributed Lock Manager in C++</strong> to implement row-level concurrency control with mutexes and condition variables, as well as a <strong>fintech marketplace for 1Fi</strong> with strictly typed React and TypeScript custom hooks.
            </p>
            <p>
              I believe in practical implementation as the fastest way to master core computer science principles. Whether structuring an object-oriented booking application using SOLID principles or debugging asynchronous state machines, I prioritize code clarity, predictable error handling, and robust design.
            </p>
            <p>
              I am actively seeking software engineering internships and junior developer opportunities where I can contribute to production codebases and continue growing alongside experienced engineering teams.
            </p>
          </div>

          {/* Pillars */}
          <div className="about-pillars">
            <div className="pillar-card">
              <div className="pillar-title">
                <FiCpu className="pillar-icon" size={20} />
                <span>Systems & Concurrency</span>
              </div>
              <p className="pillar-desc">
                Exploring thread synchronization, mutual exclusion, condition variables, and deadlock cycle detection through hands-on C++ implementations.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-title">
                <FiLayers className="pillar-icon" size={20} />
                <span>Typed Frontend Architecture</span>
              </div>
              <p className="pillar-desc">
                Building accessible, modular web experiences using React, TypeScript, and Vite with clean separation of UI components and asynchronous service layers.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-title">
                <FiCheckCircle className="pillar-icon" size={20} />
                <span>Algorithmic Problem Solving</span>
              </div>
              <p className="pillar-desc">
                Solved 250+ data structures and algorithms challenges across LeetCode and GeeksforGeeks to maintain sharp analytical rigor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;

import React, { useState, useEffect } from 'react';


const WhoAmI = () => {
  const codeString = `const aditya = {
  role: "Full-Stack Developer",
  focus: "MERN Stack",
  interests: ["AI/ML", "Embedded Systems (ESP32)"],
  passion: "Competitive Programming",
  projects: ["ClauseWise", "Space Portfolio"],
  status: "Ready to build."
};`;

  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    setText(''); // Reset text on mount to fix StrictMode ghosting
    
    const typingInterval = setInterval(() => {
      setText(codeString.slice(0, index + 1));
      index++;
      if (index >= codeString.length) clearInterval(typingInterval);
    }, 25);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <pre><code>{text}<span className="cursor">|</span></code></pre>
  );
};

const TechStack = () => {
  const techStack = ["React", "Node.js", "Express", "MongoDB", "C++", "Python", "ESP32", "Git"];
  return (
    <div className="tech-terminal-grid">
      <div className="system-msg"> {'>'} Executing module: tech_stack.sh...</div>
      <div className="tech-tags">
        {techStack.map((tech, index) => (
          <span key={index} className="tech-tag animate-pop" style={{ animationDelay: `${index * 0.1}s` }}>
            {tech}
          </span>
        ))}
      </div>
      <div className="cursor-line">{'>'} <span className="cursor">|</span></div>
    </div>
  );
};

const Metrics = () => {
  return (
    <div className="metrics-terminal">
      <div className="system-msg"> {'>'} Fetching problem_solving_stats.json...</div>
      
      <div className="ascii-table">
        <div className="table-row header">
          <span>PLATFORM</span>
          <span>METRIC</span>
          <span>VALUE</span>
        </div>
        <div className="table-row leetcode-row">
          <span>[🔶] LeetCode</span>
          <span>Solved</span>
          <span className="highlight">600+</span>
        </div>
        <div className="table-row leetcode-row">
          <span></span>
          <span>Rating</span>
          <span className="highlight">1750</span>
        </div>
        <div className="table-divider">--------------------------------------</div>
        <div className="table-row codechef-row">
          <span>[🟤] CodeChef</span>
          <span>Max Rating</span>
          <span className="highlight">1430</span>
        </div>
        <div className="table-row codechef-row">
          <span></span>
          <span>Stars</span>
          <span className="highlight">★★</span>
        </div>
      </div>
      <div className="cursor-line">{'>'} <span className="cursor">|</span></div>
    </div>
  );
};

const About = () => {
  const [activeTab, setActiveTab] = useState('whoami');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 400); 
  };

  return (
    <section className="about-section">
      <div className="master-terminal">
        
        <div className="terminal-header">
          <div className="mac-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-tabs">
            <button className={`tab-btn ${activeTab === 'whoami' ? 'active' : ''}`} onClick={() => handleTabChange('whoami')}>./whoami</button>
            <button className={`tab-btn ${activeTab === 'tech_stack' ? 'active' : ''}`} onClick={() => handleTabChange('tech_stack')}>./tech_stack</button>
            <button className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`} onClick={() => handleTabChange('metrics')}>./metrics</button>
          </div>
        </div>

        {/* The body area that holds the content */}
        <div className="terminal-body">
          {isTransitioning ? (
            <div className="clearing-text">{'>'} clear...</div>
          ) : (
            <div className="tab-content" key={activeTab}> 
              {activeTab === 'whoami' && <WhoAmI />}
              {activeTab === 'tech_stack' && <TechStack />}
              {activeTab === 'metrics' && <Metrics />}
            </div>
          )}
        </div>

        <div className="terminal-footer">
          <span className="status-indicator"></span>
          <span>STATUS: ONLINE</span>
          <span className="divider">|</span>
          <span>PORT: 5173</span>
          <span className="divider">|</span>
          <span>{isTransitioning ? 'FETCHING DATA...' : 'WAITING FOR INPUT...'}</span>
        </div>

      </div>
    </section>
  );
};

export default About;
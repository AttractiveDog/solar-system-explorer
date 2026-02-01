import React, { useEffect, useState } from 'react';
import ShaderBackground from '@/components/ui/shader-background';
import './Stratathon.css';

const Stratathon: React.FC = () => {
    const [systemBooted, setSystemBooted] = useState(false);

    useEffect(() => {
        setTimeout(() => setSystemBooted(true), 300);
    }, []);

    return (
        <div className="stratathon-container">
            {/* WebGL Shader Background */}
            <ShaderBackground />

            {/* Animated Background */}
            <div className="matrix-bg"></div>
            <div className="grid-overlay"></div>

            {/* System Status Bar */}
            <div className="system-bar">
                <span className="system-text">● SYSTEM_BROADCAST :: EVENT REGISTRATION LIVE // CHECK THE TIMELINE SECTION</span>
            </div>

            {/* Navigation */}
            <nav className="stratathon-nav">
                <div className="nav-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">STRATATHON</span>
                </div>
                <div className="nav-links">
                    <a href="#about">[ABOUT]</a>
                    <a href="#timeline">[TIMELINE]</a>
                    <a href="#guidelines">[GUIDELINES]</a>
                    <a href="#criteria">[CRITERIA]</a>
                    <a href="#team">[TEAM]</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={`hero-section ${systemBooted ? 'booted' : ''}`}>
                <div className="system-header">[ SYSTEM: STRATATHON_2026_INITIALIZED ]</div>
                <h1 className="glitch-text" data-text="⚡ STRAT-A-THON">⚡ STRAT-A-THON</h1>
                <div className="event-date">24 HRS • INNOVATION SPRINT</div>
                <p className="tagline">IGNITE_INNOVATION_THROUGH_COLLABORATION</p>
                <div className="prize-pool">
                    <span className="pool-label">TOTAL OPPORTUNITY</span>
                    <div className="prize-amount">BUILD THE NEXT UNICORN</div>
                </div>
                <div className="hero-badges">
                    <span className="badge badge-active">● REGISTRATION OPEN</span>
                    <span className="badge">◉ projectX.iotpathshala.com</span>
                    <span className="badge">⚡ ALL INNOVATORS WELCOME</span>
                </div>
                <a href="https://projectX.iotpathshala.com" className="cta-button" target="_blank" rel="noopener noreferrer">
                    REGISTER NOW →
                    <span className="button-glow"></span>
                </a>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="section-header">
                    <span className="section-tag">{'>'} DISCOVER THE MISSION...</span>
                </div>
                <h2 className="section-title">ABOUT_STRATATHON</h2>

                <div className="about-content">
                    <div className="about-main">
                        <h3 className="subsection-title">[ What is a Start-A-Thon? ]</h3>
                        <p>
                            A Start-A-Thon is akin to a hackathon but with a <span className="highlight">broader focus beyond just technology</span>.
                            It encompasses various domains such as business, design, social innovation, and more. Participants form teams to
                            brainstorm, develop, and present their projects, all within a <span className="highlight">limited 24-hour timeframe</span>.
                        </p>
                    </div>

                    <div className="objectives-grid">
                        <div className="objective-card">
                            <div className="card-icon">🚀</div>
                            <h4>INNOVATION</h4>
                            <p>Encourage the development of novel ideas and solutions</p>
                        </div>
                        <div className="objective-card">
                            <div className="card-icon">🤝</div>
                            <h4>COLLABORATION</h4>
                            <p>Foster teamwork across diverse fields and expertise</p>
                        </div>
                        <div className="objective-card">
                            <div className="card-icon">📚</div>
                            <h4>SKILL DEVELOPMENT</h4>
                            <p>Provide opportunities for learning and skill enhancement</p>
                        </div>
                        <div className="objective-card">
                            <div className="card-icon">🌐</div>
                            <h4>NETWORKING</h4>
                            <p>Connect with mentors, investors, and innovators</p>
                        </div>
                        <div className="objective-card">
                            <div className="card-icon">💡</div>
                            <h4>REAL-WORLD IMPACT</h4>
                            <p>Promote projects with tangible positive effects</p>
                        </div>
                    </div>
                </div>

                {/* Key Features */}
                <div className="features-section">
                    <h3 className="subsection-title">[ KEY_FEATURES ]</h3>
                    <div className="features-grid">
                        <div className="feature-item">
                            <span className="feature-bullet">▸</span>
                            <div>
                                <strong>Workshops and Mentorship:</strong> Access to workshops and expert mentors to guide you through development
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-bullet">▸</span>
                            <div>
                                <strong>Pitch Sessions:</strong> Present to judges and receive valuable feedback with funding opportunities
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-bullet">▸</span>
                            <div>
                                <strong>Resource Availability:</strong> Access to tools, technologies, and resources for development
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-bullet">▸</span>
                            <div>
                                <strong>Awards and Recognition:</strong> Prizes and accolades for outstanding projects
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Can Participate */}
            <section className="participants-section">
                <h2 className="section-title">WHO_CAN_PARTICIPATE?</h2>
                <div className="section-header">
                    <span className="section-tag">{'>'} THE START-A-THON IS OPEN TO ANYONE WITH A PASSION FOR INNOVATION</span>
                </div>

                <div className="participants-grid">
                    <div className="participant-card">
                        <div className="participant-icon">🎓</div>
                        <h4>Toppers & BackBenchers</h4>
                    </div>
                    <div className="participant-card">
                        <div className="participant-icon">💼</div>
                        <h4>Entrepreneurs & Engineers</h4>
                    </div>
                    <div className="participant-card">
                        <div className="participant-icon">🎨</div>
                        <h4>Designers & Developers</h4>
                    </div>
                    <div className="participant-card">
                        <div className="participant-icon">💭</div>
                        <h4>Daydreamers & Introverts</h4>
                    </div>
                </div>
            </section>

            {/* How to Get Involved */}
            <section className="involvement-section">
                <h2 className="section-title">HOW_TO_GET_INVOLVED</h2>
                <div className="steps-container">
                    <div className="step-item">
                        <div className="step-number">01</div>
                        <div className="step-content">
                            <h4>REGISTER</h4>
                            <p>Sign up for the event through the official projectX website <a href="https://projectX.iotpathshala.com" target="_blank" rel="noopener noreferrer">projectX.iotpathshala.com</a></p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-number">02</div>
                        <div className="step-content">
                            <h4>FORM A TEAM</h4>
                            <p>Collaborate with others through required skills and form a team suitable for one project/vision</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-number">03</div>
                        <div className="step-content">
                            <h4>DEVELOP YOUR IDEA</h4>
                            <p>Your team gets 24 hrs to vibe code your idea and build it into a business with marketing campaigns, growth and sales strategy ready to pitch</p>
                            <div className="note">NOTE: Do thorough research on business size & competitors</div>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-number">04</div>
                        <div className="step-content">
                            <h4>PITCH YOUR PROJECT</h4>
                            <p>Present yourself like a confident Company ready to dive in market</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="benefits-section">
                <h2 className="section-title">BENEFITS_OF_PARTICIPATING</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-icon">🧩</div>
                        <h4>Enhanced Problem-Solving Skills</h4>
                        <p>Tackle real-world challenges and devise creative solutions</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🔗</div>
                        <h4>Expanded Network</h4>
                        <p>Meet and collaborate with peers from various fields of skill, creativity and innovation</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">👁️</div>
                        <h4>Increased Visibility</h4>
                        <p>Gain exposure for your ideas and projects</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">📈</div>
                        <h4>Potential for Growth</h4>
                        <p>Opportunities to secure funding or partnerships for future development</p>
                    </div>
                </div>
            </section>

            {/* Fits Nowhere Section */}
            <section className="fits-nowhere-section">
                <h2 className="section-title glitch-effect" data-text="FITS_NOWHERE?">FITS_NOWHERE?</h2>
                <div className="fits-content">
                    <p className="fits-intro">
                        If you are <span className="highlight">must try everything mindset</span> and ready to face challenges with <span className="highlight">Patience</span>,
                        then promise yourself <span className="quote">"I will do it"</span> and:
                    </p>
                    <div className="fits-steps">
                        <div className="fits-step">
                            <span className="step-marker">1.</span>
                            <p>Visit our website and register for the event</p>
                        </div>
                        <div className="fits-step">
                            <span className="step-marker">2.</span>
                            <p>Select any two chosen skills, fill the details and hit the submit button</p>
                        </div>
                        <div className="fits-step">
                            <span className="step-marker">3.</span>
                            <p><strong>To aim small is a crime. Go for the big Sharks</strong></p>
                        </div>
                        <div className="fits-step">
                            <span className="step-marker">4.</span>
                            <p>Be prepared for the events according to guidelines and schedule</p>
                        </div>
                    </div>
                    <div className="wisdom-quote">
                        <div className="quote-mark">"</div>
                        <p>It is a very difficult job to make smart people work together. If you can make smart people work together you'll build the next unicorn.</p>
                        <div className="quote-mark">"</div>
                    </div>
                </div>
            </section>

            {/* Event Guidelines */}
            <section id="guidelines" className="guidelines-section">
                <h2 className="section-title">EVENT_GUIDELINES</h2>
                <div className="section-header">
                    <span className="section-tag">{'>'} READ CAREFULLY BEFORE REGISTRATION</span>
                </div>
                <div className="guidelines-container">
                    <div className="guideline-item">
                        <span className="guideline-num">[1]</span>
                        <p>Every participant has to register for the event individually and report at the venue to mark the physical presence</p>
                    </div>
                    <div className="guideline-item">
                        <span className="guideline-num">[2]</span>
                        <p>Projects will be released with requirements of members and skills</p>
                    </div>
                    <div className="guideline-item">
                        <span className="guideline-num">[3]</span>
                        <p>In the crowd of hustle you have to find or build the team with your idea</p>
                    </div>
                    <div className="guideline-item">
                        <span className="guideline-num">[4]</span>
                        <p>Register with team and book your slots on the spot</p>
                    </div>
                    <div className="guideline-item">
                        <span className="guideline-num">[5]</span>
                        <p>Use all the resources and vibe code your idea into real business within the time frame</p>
                    </div>
                    <div className="guideline-item">
                        <span className="guideline-num">[6]</span>
                        <p>Timelines & Schedule of the event will be notified</p>
                    </div>
                </div>
            </section>

            {/* Judgment Criteria */}
            <section id="criteria" className="criteria-section">
                <h2 className="section-title">JUDGEMENT_CRITERIA</h2>
                <div className="criteria-grid">
                    <div className="criteria-card">
                        <div className="criteria-percentage">25%</div>
                        <div className="criteria-bar" style={{ '--percentage': '25%' } as React.CSSProperties}></div>
                        <h4>Tech & Innovation</h4>
                        <p>Technology delivered by developer & innovation in design</p>
                    </div>
                    <div className="criteria-card">
                        <div className="criteria-percentage">25%</div>
                        <div className="criteria-bar" style={{ '--percentage': '25%' } as React.CSSProperties}></div>
                        <h4>Business Strategy</h4>
                        <p>Market research & campaigns. Clarity of business fundamentals, growth and sales strategy</p>
                    </div>
                    <div className="criteria-card">
                        <div className="criteria-percentage">25%</div>
                        <div className="criteria-bar" style={{ '--percentage': '25%' } as React.CSSProperties}></div>
                        <h4>Teamwork & Presentation</h4>
                        <p>Co-operation, teamwork and quality of presentation</p>
                    </div>
                    <div className="criteria-card">
                        <div className="criteria-percentage">25%</div>
                        <div className="criteria-bar" style={{ '--percentage': '25%' } as React.CSSProperties}></div>
                        <h4>Responsibility Distribution</h4>
                        <p>Responsibility distributed with percentage of company provided</p>
                    </div>
                </div>
                <div className="info-box">
                    <div className="info-icon">ℹ️</div>
                    <div className="info-content">
                        <strong>INFO:</strong> Individual performance will be also noted and after few changes a final team will be formed of each project
                        and will be nourished thereafter. This has nothing to do with the results.
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section id="timeline" className="timeline-section">
                <h2 className="section-title">EVENT_TIMELINE</h2>
                <div className="section-header">
                    <span className="section-tag">{'>'} THE START-A-THON ROADMAP</span>
                </div>
                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    <div className="timeline-item">
                        <div className="timeline-dot active"></div>
                        <div className="timeline-content">
                            <div className="timeline-time">[ DAY 1 (00:00 - 04:00) ]</div>
                            <h4>REGISTRATION & TEAM FORMATION</h4>
                            <p>{'>'} Register your team. The portal is open. Find your co-innovators and form your dream team.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="timeline-time">[ DAY 1 (04:00 - 05:00) ]</div>
                            <h4>PROJECT BRIEFING & IDEATION</h4>
                            <p>{'>'} Projects are revealed. Brainstorm with your team. Define your vision and strategy.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="timeline-time">[ DAY 1 (05:00 - 22:00) ]</div>
                            <h4>DEVELOPMENT SPRINT</h4>
                            <p>{'>'} Build your solution. Code, design, strategize. Access mentors and resources. Make it real.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="timeline-time">[ DAY 2 (22:00 - 02:00) ]</div>
                            <h4>FINAL POLISH & PRESENTATION PREP</h4>
                            <p>{'>'} Perfect your pitch deck. Refine your business model. Prepare to impress the judges.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="timeline-time">[ DAY 2 (02:00 - 06:00) ]</div>
                            <h4>PITCH SESSION & JUDGING</h4>
                            <p>{'>'} Present your startup. Demonstrate your solution. Defend your business strategy. Win big.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="timeline-time">[ DAY 2 (06:00+) ]</div>
                            <h4>RESULTS & AWARDS</h4>
                            <p>{'>'} Winners announced. Recognition and prizes awarded. Begin your journey to unicorn status.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="footer-cta">
                <div className="cta-content">
                    <h2 className="cta-title">READY_TO_BUILD_THE_NEXT_UNICORN?</h2>
                    <p className="cta-subtitle">Join innovators, creators, and dreamers in the ultimate startup challenge</p>
                    <a href="https://projectX.iotpathshala.com" className="cta-button large" target="_blank" rel="noopener noreferrer">
                        REGISTER NOW →
                        <span className="button-glow"></span>
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="stratathon-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>STRATATHON 2026</h4>
                        <p>Powered by projectX • iotpathshala.com</p>
                    </div>
                    <div className="footer-section">
                        <h4>CONNECT</h4>
                        <div className="social-links">
                            <a href="#">[DISCORD]</a>
                            <a href="#">[TWITTER]</a>
                            <a href="#">[LINKEDIN]</a>
                        </div>
                    </div>
                    <div className="footer-section">
                        <h4>QUICK LINKS</h4>
                        <a href="#about">About</a>
                        <a href="#guidelines">Guidelines</a>
                        <a href="#criteria">Criteria</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>[ SYSTEM: ALL_RIGHTS_RESERVED © 2026 STRATATHON ]</p>
                </div>
            </footer>
        </div>
    );
};

export default Stratathon;

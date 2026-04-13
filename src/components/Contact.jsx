import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { SOCIAL_LINKS } from '../data/portfolio';

const Contact = memo(function Contact() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const sendMsg = () => {
    if (!form.name || !form.email || !form.msg) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', msg: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1000);
  };

  return (
    <section id="Contact" className="section section-alt">
      <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
        <ScrollReveal>
          <div
            className="section-label"
            style={{ justifyContent: 'center' }}
          >
            <div className="section-label-line" />
            <span className="section-label-text">Contact</span>
            <div className="section-label-line" />
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Let's Build Together
          </h2>
          <p
            className="section-desc"
            style={{ textAlign: 'center', margin: '0 auto 48px', maxWidth: 500 }}
          >
            I'm actively seeking internships and collaborations. Whether you have a project
            idea, a job opportunity, or just want to say hi — my inbox is always open.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="contact-form">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="success-animation"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="success-icon">🚀</div>
                  <div className="success-title">Message Sent!</div>
                  <div className="success-text">I'll get back to you very soon.</div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                    }}
                  >
                    <div>
                      <label className="form-label">Name</label>
                      <input
                        className="input"
                        value={form.name}
                        onChange={handleChange('name')}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        className="input"
                        value={form.email}
                        onChange={handleChange('email')}
                        placeholder="your@email.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Message</label>
                    <textarea
                      className="textarea input"
                      rows={5}
                      value={form.msg}
                      onChange={handleChange('msg')}
                      placeholder="Tell me about the opportunity or project..."
                    />
                  </div>

                  <motion.button
                    className="btn btn-primary"
                    onClick={sendMsg}
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    style={{
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? 'wait' : 'pointer',
                    }}
                  >
                    {loading ? (
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'spin 0.8s linear infinite',
                        }}
                      />
                    ) : (
                      <FiSend size={16} />
                    )}
                    {loading ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.25}>
          <div className="social-links-row">
            {SOCIAL_LINKS.map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="social-link-icon">{l.icon}</span>
                {l.label}
              </motion.a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

export default Contact;

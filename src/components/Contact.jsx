import { useState, memo } from "react";
import { FiMail, FiGithub, FiLinkedin, FiCopy, FiCheck, FiSend, FiMapPin, FiPhone } from "react-icons/fi";
import { PERSONAL_INFO } from "../data/portfolio";

const Contact = memo(function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    subject: "Software Engineering Opportunity / Collaboration",
    message: "",
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // Fallback
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectEncoded = encodeURIComponent(
      form.subject || `Inquiry from ${form.name || "Portfolio Visitor"}`
    );
    const bodyEncoded = encodeURIComponent(
      `Hi Krishna,\n\n${form.message}\n\nBest regards,\n${form.name || "Sender"}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-bar" />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">Connect & Collaborate</h2>
          <p className="section-description">
            I am currently open to software development internships, junior engineering roles, and technical discussions.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contact Info */}
          <div className="contact-info-col">
            <div className="contact-card">
              <div className="contact-item">
                <div className="contact-item-left">
                  <FiMail className="contact-icon" />
                  <div>
                    <div className="contact-label">Email Address</div>
                    <div className="contact-val">{PERSONAL_INFO.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="btn btn-outline btn-sm"
                  title="Copy email to clipboard"
                  style={{ gap: "4px" }}
                >
                  {copied ? <FiCheck size={14} style={{ color: "var(--accent)" }} /> : <FiCopy size={14} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-item-left">
                  <FiPhone className="contact-icon" />
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-val">{PERSONAL_INFO.phone}</div>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-left">
                  <FiMapPin className="contact-icon" />
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-val">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                Verified Professional Profiles
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-outline"
                  style={{ justifyContent: "flex-start" }}
                >
                  <FiGithub size={16} />
                  <span>GitHub: github.com/krishnanegi-06</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-outline"
                  style={{ justifyContent: "flex-start" }}
                >
                  <FiLinkedin size={16} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Message Composer */}
          <div className="contact-form-card">
            <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>Send a Direct Message</h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
              Composes an authentic message that launches directly into your default email client.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Internship opportunity / project discussion"
                  className="form-input"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Hi Krishna, I'd like to discuss an opportunity..."
                  className="form-textarea"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                <FiSend size={15} />
                <span>Open in Email Client</span>
              </button>

              <p className="form-notice">
                ℹ️ Clicking "Open in Email Client" uses your mail provider (Gmail, Outlook, Apple Mail) with all fields pre-filled.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;

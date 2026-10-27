import { useState, memo } from "react";
import { FiDownload, FiExternalLink, FiFileText } from "react-icons/fi";
import { PERSONAL_INFO } from "../data/portfolio";

const Resume = memo(function Resume() {
  const [loadError, setLoadError] = useState(false);

  return (
    <section id="resume" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-bar" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="section-title">Verified Resume</h2>
          <p className="section-description">
            Complete academic and project background formatted for recruiters and hiring managers.
          </p>
        </div>

        <div className="resume-container">
          <div className="resume-toolbar">
            <div className="resume-toolbar-title">
              <FiFileText size={16} style={{ color: "var(--accent)" }} />
              <span>Krishna_Negi_Resume.pdf</span>
              <span className="tag" style={{ marginLeft: "8px", fontSize: "11px" }}>PDF Document</span>
            </div>

            <div className="resume-toolbar-actions">
              <a
                href={PERSONAL_INFO.resumePdf}
                download="Krishna_Negi_Resume.pdf"
                className="btn btn-primary btn-sm"
              >
                <FiDownload size={14} />
                <span>Download PDF</span>
              </a>

              <a
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-outline btn-sm"
              >
                <FiExternalLink size={14} />
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>

          <div className="resume-frame-wrap">
            {!loadError ? (
              <iframe
                src={`${PERSONAL_INFO.resumePdf}#toolbar=0&navpanes=0`}
                title="Krishna Negi Resume Preview"
                className="resume-iframe"
                onError={() => setLoadError(true)}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  color: "#ffffff",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <FiFileText size={48} style={{ color: "var(--accent)" }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: "16px", marginBottom: "6px" }}>
                    PDF Preview
                  </p>
                  <p style={{ fontSize: "14px", color: "#9ca3af" }}>
                    Click below to open or download Krishna's complete resume.
                  </p>
                </div>
                <a
                  href={PERSONAL_INFO.resumePdf}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-primary"
                >
                  <FiExternalLink size={16} /> Open Resume PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Resume;

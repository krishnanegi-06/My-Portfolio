import { useState } from 'react';

export default function Resume() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <section id="resume" className="py-20 bg-gray-900 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full px-4 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-1 bg-emerald-500 rounded-full"></div>
          <span className="text-sm text-emerald-500 font-bold tracking-widest uppercase">Resume</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">My Resume</h2>
        <p className="text-gray-400 max-w-lg text-center mb-10">
          Browse my full résumé below — or grab a copy to keep.
        </p>

        {/* PDF Viewer Container */}
        <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl relative">
          
          {/* Top Bar (Browser/macOS style) */}
          <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-gray-400 tracking-wide">krishna_negi_resume.pdf</span>
          </div>

          {/* Embed Area */}
          <div className="w-full h-[60vh] md:h-[70vh] min-h-[400px] bg-gray-950 flex flex-col items-center justify-center relative">
            
            {/* Loading State */}
            {loading && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-gray-900">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-sm text-gray-300 font-medium">Loading resume...</p>
                  <p className="text-xs text-gray-500 mt-1">This may take a moment</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-gray-900 px-4 text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-3xl">📄</div>
                <p className="text-gray-300 font-semibold text-lg">Preview unavailable</p>
                <p className="text-gray-400 text-sm">Your browser blocked the PDF preview.<br/>Please download it using the button below.</p>
              </div>
            )}

            {/* PDF iframe */}
            <iframe
              src="/resume.pdf#toolbar=0&view=FitH&navpanes=0"
              title="Resume Preview"
              onLoad={() => setLoading(false)}
              onError={() => { setLoading(false); setError(true); }}
              className={`w-full h-full border-none transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
            ></iframe>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a 
            href="/resume.pdf" 
            download="Krishna_Negi_Resume.pdf"
            className="group flex items-center gap-3 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white px-6 py-3 rounded-xl font-bold tracking-wide shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
          
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-emerald-500 border border-gray-700 hover:border-emerald-500/50 px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
          >
            ↗ Open in new tab
          </a>
        </div>

      </div>
    </section>
  );
}

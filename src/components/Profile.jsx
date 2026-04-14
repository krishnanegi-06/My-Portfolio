import { useState } from 'react';

export default function Profile() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="profile" className="py-20 bg-gray-950 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full px-4 flex flex-col items-center gap-8">
        <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
        
        {/* Profile Picture Container */}
        <div 
          className="relative w-64 h-64 cursor-pointer group perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Inner Flip Container */}
          <div className={`relative w-full h-full duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : 'group-hover:scale-105 group-hover:-rotate-3'}`}>
            
            {/* Front Side: Image */}
            <div className="absolute w-full h-full backface-hidden shadow-2xl rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-emerald-500 transition-colors duration-500">
              <img 
                src="/profile.jpg" 
                alt="Krishna Negi" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1000&auto=format&fit=crop"; // Placeholder fallback
                }}
              />
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-500" />
            </div>

            {/* Back Side: Info */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-4 border-emerald-500/50 flex flex-col items-center justify-center p-6 text-center shadow-xl">
              <span className="text-4xl mb-2">👨‍💻</span>
              <h3 className="text-xl font-bold text-emerald-400">Krishna Negi</h3>
              <p className="text-sm text-gray-400 mt-2">Full Stack Dev &<br/>Blockchain Enthusiast</p>
            </div>
            
          </div>
          
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {isFlipped ? 'Click to flip back ↩' : 'Click to flip 🔄'}
          </div>
        </div>

      </div>
    </section>
  );
}

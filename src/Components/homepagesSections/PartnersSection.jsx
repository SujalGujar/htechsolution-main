import React, { useEffect, useRef } from "react";

// ── Partner data (replace icons/names to match your backend data) ──
const PARTNERS = [
  { name: "Midland Microfin Limited", sub: "PAN India", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  )},
  { name: "AMD Aerospace LLP", sub: "", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  )},
  { name: "CEX Webuy Entertainment", sub: "Pvt Ltd", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M8 14l-2 7h12l-2-7"/>
    </svg>
  )},
  { name: "Access Point India Limited", sub: "", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  )},
  { name: "Punjab & Sind Bank", sub: "", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="1"/><path d="M3 10l9-6 9 6"/><line x1="12" y1="12" x2="12" y2="20"/>
    </svg>
  )},
  { name: "Skyways Air Services", sub: "Limited", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><path d="M12 3l3 4H9l3-4z"/><line x1="12" y1="7" x2="12" y2="10"/>
    </svg>
  )},
  { name: "Technocraft Texmach", sub: "Pvt Ltd", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  )},
  { name: "Omkar Limited", sub: "", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { name: "Success Technologies", sub: "", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )},
  { name: "Ijanani Codebots Lab", sub: "Private Limited", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  )},
  { name: "Microlab Instruments", sub: "Private Limited", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h4m6-8v8m0 0h-4m4 0a2 2 0 01-2 2H5a2 2 0 01-2-2"/>
    </svg>
  )},
  { name: "OPTIMA POLYPLAST LLP", sub: "", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )},
];

// Duplicate for seamless infinite loop
const TRACK = [...PARTNERS, ...PARTNERS];

const PartnersSection = () => {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const SPEED = 0.6; // px per frame
    const track = trackRef.current;
    if (!track) return;

    const totalW = track.scrollWidth / 2; // half = one set

    const step = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= totalW) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        .partners-root {
          font-family: 'Poppins', sans-serif;
          background: #f8fafc;
          padding: 72px 0 80px;
          overflow: hidden;
          position: relative;
        }

        /* soft grid dots */
        .partners-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(31,110,140,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        /* fade edges */
        .partners-fade-left, .partners-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 140px;
          z-index: 2;
          pointer-events: none;
        }
        .partners-fade-left  { left: 0;  background: linear-gradient(to right, #f8fafc, transparent); }
        .partners-fade-right { right: 0; background: linear-gradient(to left,  #f8fafc, transparent); }

        /* card */
        .partner-card {
          flex-shrink: 0;
          width: 210px;
          background: #ffffff;
          border: 1px solid #e5edf2;
          border-radius: 16px;
          padding: 22px 20px 20px;
          margin-right: 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          cursor: default;
        }
        .partner-card:hover {
          box-shadow: 0 8px 32px rgba(31,110,140,0.13);
          transform: translateY(-4px);
          border-color: rgba(31,110,140,0.3);
        }

        .partner-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #1F6E8C18, #2AA8D025);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1F6E8C;
          flex-shrink: 0;
        }
        .partner-icon-wrap svg { width: 22px; height: 22px; }

        .partner-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1a2b3c;
          line-height: 1.4;
        }
        .partner-sub {
          font-size: 0.72rem;
          font-weight: 400;
          color: #7a9aac;
          margin-top: 1px;
        }

        .partners-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1F6E8C;
          background: rgba(31,110,140,0.08);
          border: 1px solid rgba(31,110,140,0.18);
          padding: 5px 14px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .partners-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #1F6E8C;
          animation: blink 1.4s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .partners-count {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #7a9aac;
          margin-top: 8px;
        }
        .partners-count-line {
          width: 28px; height: 1.5px;
          background: #c5d8e2;
          border-radius: 2px;
        }
      `}</style>

      <section className="partners-root">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 1, padding: "0 24px" }}>
          <div className="partners-badge">
            <span className="partners-badge-dot" />
            Trusted By
          </div>

          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "#0d1f2d",
            lineHeight: 1.1,
            marginBottom: 12,
          }}>
            Our <span style={{ color: "#1F6E8C" }}>Partners</span>
          </h2>

          <p style={{ color: "#7a9aac", fontSize: "0.95rem", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Supporting large-scale enterprises with hardware and digital solutions across India.
          </p>

          <div className="partners-count">
            <span className="partners-count-line" />
            {PARTNERS.length}+ Corporate Partners
            <span className="partners-count-line" />
          </div>
        </div>

        {/* Slider */}
        <div style={{ position: "relative" }}>
          <div className="partners-fade-left" />
          <div className="partners-fade-right" />

          <div style={{ overflow: "hidden", paddingBottom: 6 }}>
            <div
              ref={trackRef}
              style={{ display: "flex", willChange: "transform" }}
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
            >
              {TRACK.map((p, i) => (
                <div key={i} className="partner-card">
                  <div className="partner-icon-wrap">{p.icon}</div>
                  <div>
                    <div className="partner-name">{p.name}</div>
                    {p.sub && <div className="partner-sub">{p.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default PartnersSection;
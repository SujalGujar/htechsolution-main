import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../Utils/axiosIntance";

/* ── Helpers ─────────────────────────────────────────────────────── */
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const getDaysLeft = (endDate) => {
  if (!endDate) return 0;
  return Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
};

const getWarrantyProgress = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const total = new Date(endDate) - new Date(startDate);
  const elapsed = new Date() - new Date(startDate);
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
};

const getSnapshot = (snap = {}) => ({
  company: snap.companyname  || snap.company_name  || "—",
  model:   snap.modelnumber  || snap.model_number  || "—",
  serial:  snap.serialnumber || snap.serial_numebr || snap.serial_number || "—",
});

/* ── Main Component ──────────────────────────────────────────────── */
const WarrantyCheckSection = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [status, setStatus]             = useState(null);
  const [result, setResult]             = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    const query = ticketNumber.trim().toUpperCase();
    if (!query) return;

    setStatus("loading");
    setResult(null);

    try {
      const res = await axiosInstance.get("/customerDetails/registrations");
      const allRegistrations = res.data?.data || [];

      let foundCustomer = null;
      let foundProduct  = null;

      for (const customer of allRegistrations) {
        const match = customer.products?.find(
          (p) => p.ticketNumber?.toUpperCase() === query
        );
        if (match) {
          foundCustomer = customer;
          foundProduct  = match;
          break;
        }
      }

      if (foundCustomer && foundProduct) {
        setResult({ customer: foundCustomer, product: foundProduct });
        setStatus("found");
      } else {
        setStatus("not_found");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setTicketNumber("");
    setStatus(null);
    setResult(null);
  };

  const daysLeft = result ? getDaysLeft(result.product.warrEndDate)                            : null;
  const isActive = daysLeft !== null && daysLeft > 0;
  const progress = result  ? getWarrantyProgress(result.product.warrStartDate, result.product.warrEndDate) : 0;
  const snap     = result  ? getSnapshot(result.product.configSnapshot)                        : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .warr-root { font-family: 'Poppins', sans-serif; }

        .warr-input {
          width: 100%;
          padding: 11px 44px 11px 14px;
          font-size: 0.88rem;
          font-weight: 600;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 2px solid #e2eaf0;
          border-radius: 10px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          background: #fff;
          color: #0d1f2d;
        }
        .warr-input::placeholder {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
          text-transform: none;
          color: #b0c4ce;
          font-size: 0.8rem;
        }
        .warr-input:focus {
          border-color: #1F6E8C;
          box-shadow: 0 0 0 3px rgba(31,110,140,0.1);
        }

        .warr-result-active  { border: 1.5px solid rgba(34,197,94,0.3);  background: linear-gradient(135deg,#f0fdf4,#f8fffe); }
        .warr-result-expired { border: 1.5px solid rgba(239,68,68,0.3);  background: linear-gradient(135deg,#fff1f2,#fff8f8); }

        .warr-progress-track { height: 6px; border-radius: 99px; background: #e5eef2; overflow: hidden; }
        .warr-progress-fill  { height: 100%; border-radius: 99px; }

        @keyframes warr-spin { to { transform: rotate(360deg); } }
        .warr-spin { animation: warr-spin 0.8s linear infinite; }

        .warr-badge-active  { background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; }
        .warr-badge-expired { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
        .warr-badge-dot-active  { background: #22c55e; }
        .warr-badge-dot-expired { background: #ef4444; }

        .warr-detail-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 7px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .warr-detail-row:last-child { border-bottom: none; }
      `}</style>

      <section className="warr-root py-14 px-4 md:px-8 lg:px-16 bg-[#f8fafc] relative overflow-hidden">

        {/* bg texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(31,110,140,0.055) 1.5px, transparent 1.5px)",
            backgroundSize: "34px 34px",
          }} />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(31,110,140,0.07), transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(42,168,208,0.06), transparent 70%)" }} />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 text-[#1F6E8C] text-xs font-semibold tracking-widest uppercase bg-[#1F6E8C]/10 px-4 py-1.5 rounded-full border border-[#1F6E8C]/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F6E8C] animate-pulse" />
              Product Protection
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
              Check Your{" "}
              <span style={{ color: "#1F6E8C" }}>Warranty Status</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Every product purchased from <strong className="text-gray-600">HTechSolution</strong> comes with a unique{" "}
              <strong className="text-[#1F6E8C]">Ticket Number</strong>. Enter it below to instantly verify your warranty coverage — no login required.
            </p>
          </motion.div>

          {/* ── Centered compact form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

              {/* Card header */}
              <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center gap-3"
                style={{ background: "linear-gradient(135deg, rgba(31,110,140,0.04), rgba(42,168,208,0.04))" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #1F6E8C, #2AA8D0)" }}>
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Warranty Checker</h3>
                  <p className="text-xs text-gray-400">Instant product warranty lookup</p>
                </div>
              </div>

              <div className="px-6 py-5">

                {/* ── Input form ── */}
                <form onSubmit={handleCheck}>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Ticket Number <span className="text-[#1F6E8C]">*</span>
                  </label>
                  <p className="text-[11px] text-gray-400 mb-2">
                    Format: <span className="font-mono font-semibold text-[#1F6E8C]">PRD-YYYYMMDD-XXXXX</span>
                  </p>

                  <div className="relative mb-3">
                    <input
                      type="text"
                      className="warr-input"
                      placeholder="e.g. PRD-20260311-33474"
                      value={ticketNumber}
                      onChange={(e) => setTicketNumber(e.target.value)}
                      disabled={status === "loading"}
                      spellCheck={false}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1F6E8C]/40">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </span>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "loading" || !ticketNumber.trim()}
                    whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(31,110,140,0.28)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #1F6E8C, #2AA8D0)" }}
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="w-4 h-4 warr-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" opacity="0.4" />
                          <path strokeLinecap="round" d="M12 3a9 9 0 019 9" />
                        </svg>
                        Checking...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Check Warranty
                      </>
                    )}
                  </motion.button>
                </form>

                {/* ── Results ── */}
                <AnimatePresence mode="wait">

                  {/* NOT FOUND */}
                  {status === "not_found" && (
                    <motion.div
                      key="not_found"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="mt-4 p-4 rounded-xl border border-orange-200 bg-orange-50 text-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-orange-700 mb-1">Ticket Not Found</p>
                      <p className="text-xs text-orange-500 mb-3">
                        No product registered with{" "}
                        <span className="font-mono font-bold">{ticketNumber.toUpperCase()}</span>. Please double-check and try again.
                      </p>
                      <button onClick={handleReset} className="text-xs font-semibold text-orange-600 underline underline-offset-2">
                        Try another ticket
                      </button>
                    </motion.div>
                  )}

                  {/* ERROR */}
                  {status === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-4 rounded-xl border border-red-200 bg-red-50 text-center"
                    >
                      <p className="text-sm font-bold text-red-600 mb-1">Something went wrong</p>
                      <p className="text-xs text-red-400 mb-2">Unable to connect. Please try again later.</p>
                      <button onClick={handleReset} className="text-xs font-semibold text-red-500 underline underline-offset-2">
                        Retry
                      </button>
                    </motion.div>
                  )}

                  {/* FOUND */}
                  {status === "found" && result && (
                    <motion.div
                      key="found"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`mt-4 rounded-xl overflow-hidden ${isActive ? "warr-result-active" : "warr-result-expired"}`}
                    >
                      {/* Result header */}
                      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${isActive ? "warr-badge-active" : "warr-badge-expired"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "warr-badge-dot-active" : "warr-badge-dot-expired"}`} />
                          {isActive ? "WARRANTY ACTIVE" : "WARRANTY EXPIRED"}
                        </span>
                        <button onClick={handleReset} className="text-gray-300 hover:text-gray-500 transition-colors">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="px-4 pb-4 space-y-3">

                        {/* Ticket number */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/70 rounded-lg border border-white/80">
                          <svg className="w-3.5 h-3.5 text-[#1F6E8C] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                          <span className="font-mono text-xs font-bold text-[#1F6E8C] tracking-wider">
                            {result.product.ticketNumber}
                          </span>
                        </div>

                        {/* Registration details */}
                        <div className="bg-white/70 rounded-xl p-3 border border-white/80">
                          <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">Registration Details</p>
                          <div>
                            {[
                              {
                                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                                label: "Customer", value: result.customer.customerName, mono: false,
                              },
                              {
                                icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                                label: "Email", value: result.customer.email, mono: false,
                              },
                              {
                                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                                label: "Brand", value: snap.company, mono: false,
                              },
                              {
                                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                                label: "Model", value: snap.model, mono: true,
                              },
                              {
                                icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
                                label: "Serial", value: snap.serial, mono: true,
                              },
                            ].map((row, i) => (
                              <div key={i} className="warr-detail-row">
                                <svg className="w-3.5 h-3.5 text-[#1F6E8C] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d={row.icon} />
                                </svg>
                                <div>
                                  <p className="text-[9px] text-gray-400 font-medium">{row.label}</p>
                                  <p className={`text-xs font-semibold text-gray-700 ${row.mono ? "font-mono" : ""}`}>{row.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Warranty period */}
                        <div className="bg-white/70 rounded-xl p-3 border border-white/80">
                          <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">Warranty Period</p>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-center p-2 rounded-lg bg-white/80 border border-gray-100">
                              <p className="text-[9px] text-gray-400 font-medium mb-0.5">Start Date</p>
                              <p className="text-xs font-bold text-gray-800">{formatDate(result.product.warrStartDate)}</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-white/80 border border-gray-100">
                              <p className="text-[9px] text-gray-400 font-medium mb-0.5">End Date</p>
                              <p className={`text-xs font-bold ${isActive ? "text-green-600" : "text-red-500"}`}>
                                {formatDate(result.product.warrEndDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] text-gray-400 font-medium">Coverage Used</span>
                            <span className="text-[9px] font-bold" style={{ color: isActive ? "#16a34a" : "#dc2626" }}>
                              {isActive
                                ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining`
                                : `Expired ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? "s" : ""} ago`}
                            </span>
                          </div>
                          <div className="warr-progress-track">
                            <motion.div
                              className="warr-progress-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                              style={{
                                background: isActive
                                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                                  : "linear-gradient(90deg, #f87171, #dc2626)",
                              }}
                            />
                          </div>
                        </div>

                        {/* Check another */}
                        <button
                          onClick={handleReset}
                          className="w-full py-2 rounded-xl text-[#1F6E8C] text-xs font-bold border-2 border-[#1F6E8C]/20 bg-white/60 hover:bg-white hover:border-[#1F6E8C]/40 transition-all"
                        >
                          ← Check Another Ticket
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Info note below card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex gap-2.5 p-3.5 rounded-xl"
              style={{ background: "rgba(31,110,140,0.05)", border: "1px solid rgba(31,110,140,0.14)" }}
            >
              <svg className="w-4 h-4 text-[#1F6E8C] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong className="text-gray-700">Where is my Ticket Number?</strong> It starts with{" "}
                <span className="font-mono font-bold text-[#1F6E8C]">PRD-</span> and is printed on your <em>purchase invoice</em>, <em>product box label</em>, or sent via <em>email</em> after registration.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default WarrantyCheckSection;
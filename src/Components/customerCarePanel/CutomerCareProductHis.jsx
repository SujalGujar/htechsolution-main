

import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../Utils/axiosIntance";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getCategoryName = (p) => p.category?.name || p.category || "Uncategorized";

const getConfigs = (c) => {
  if (!c) return [];
  if (c instanceof Map) return [...c.entries()];
  if (typeof c === "object") return Object.entries(c);
  return [];
};

const groupByCategory = (products) =>
  products.reduce((acc, p) => {
    const cat = getCategoryName(p);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

const CAT_COLORS = [
  { bg: "#ede9fe", border: "#c4b5fd", text: "#6d28d9", accent: "#7c3aed" },
  { bg: "#dbeafe", border: "#93c5fd", text: "#1d4ed8", accent: "#2563eb" },
  { bg: "#dcfce7", border: "#86efac", text: "#15803d", accent: "#16a34a" },
  { bg: "#fef3c7", border: "#fcd34d", text: "#b45309", accent: "#d97706" },
  { bg: "#fce7f3", border: "#f9a8d4", text: "#be185d", accent: "#db2777" },
  { bg: "#e0f2fe", border: "#7dd3fc", text: "#0369a1", accent: "#0284c7" },
];
const getCatColor = (i) => CAT_COLORS[i % CAT_COLORS.length];

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spin = ({ size = 14 }) => (
  <span style={{
    display: "inline-block", width: size, height: size, flexShrink: 0,
    border: "2px solid #d9e6ed", borderTop: "2px solid #2B6F84",
    borderRadius: "50%", animation: "cc-spin .7s linear infinite",
  }} />
);

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CustomerCareRegistration() {
  const [view, setView] = useState("history");

  // ── Product History state ─────────────────────────────────────────────────
  const [products,        setProducts]        = useState([]);
  const [histLoading,     setHistLoading]      = useState(true);
  const [histError,       setHistError]        = useState(null);
  const [searchTerm,      setSearchTerm]       = useState("");
  const [expandedCats,    setExpandedCats]     = useState({});
  const [expandedRows,    setExpandedRows]     = useState({});
  const [copiedId,        setCopiedId]         = useState(null);
  const [selectedTickets, setSelectedTickets]  = useState([]);
  const [toast,           setToast]            = useState(null);

  // ── NEW: deletingProductId ────────────────────────────────────────────────
  // Tracks which product is currently being soft-deleted.
  // When DELETE is clicked → set to that product._id → button shows spinner.
  // After API responds → cleared back to null.
  // Only one product can be deleted at a time (prevents double-clicks).
  const [deletingProductId, setDeletingProductId] = useState(null);

  // ── Registration Form state ───────────────────────────────────────────────
  const [purchaseType,  setPurchaseType]  = useState("single");
  const [customer,      setCustomer]      = useState({ customerName: "", email: "", mobileNum: "" });
  const [warrDates,     setWarrDates]     = useState({ warrStartDate: "", warrEndDate: "" });
  const [singleTicket,  setSingleTicket]  = useState("");
  const [singleProduct, setSingleProduct] = useState(null);
  const [singleState,   setSingleState]   = useState("idle");
  const [singleErr,     setSingleErr]     = useState("");
  const [bulkList,      setBulkList]      = useState([]);
  const [bulkInput,     setBulkInput]     = useState("");
  const [bulkInputState,setBulkInputState]= useState("idle");
  const [bulkInputErr,  setBulkInputErr]  = useState("");
  const [bulkFetched,   setBulkFetched]   = useState(null);
  const [submitState,   setSubmitState]   = useState("idle");
  const [submitError,   setSubmitError]   = useState("");
  const [submitted,     setSubmitted]     = useState(false);
  const [savedReg,      setSavedReg]      = useState(null);

  const singleDebounce = useRef(null);
  const bulkDebounce   = useRef(null);

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    if (selectedTickets.length > 0 && view === "form") {
      prefillBulkFromHistory(selectedTickets);
    }
  }, [view]);

  useEffect(() => {
    if (purchaseType !== "single") return;
    if (!singleTicket || singleTicket.length < 4) {
      setSingleProduct(null); setSingleState("idle"); return;
    }
    clearTimeout(singleDebounce.current);
    singleDebounce.current = setTimeout(() => fetchSingleProduct(singleTicket), 600);
  }, [singleTicket, purchaseType]);

  useEffect(() => {
    if (purchaseType !== "bulk") return;
    if (!bulkInput || bulkInput.length < 4) {
      setBulkInputState("idle"); setBulkInputErr(""); setBulkFetched(null); return;
    }
    if (bulkList.some(i => i.ticketNumber.toUpperCase() === bulkInput.toUpperCase().trim())) {
      setBulkInputState("duplicate"); setBulkInputErr("Already added"); return;
    }
    clearTimeout(bulkDebounce.current);
    bulkDebounce.current = setTimeout(() => fetchBulkInputProduct(bulkInput), 600);
  }, [bulkInput, purchaseType]);

  // ── Fetch product history ─────────────────────────────────────────────────
  const fetchProducts = async () => {
    try {
      setHistLoading(true); setHistError(null);
      const { data } = await axiosInstance.get("/category/history");
      const list = data.data || data.products || data || [];
      setProducts(Array.isArray(list) ? list : []);
      const cats = [...new Set((Array.isArray(list) ? list : []).map(getCategoryName))];
      if (cats.length) setExpandedCats({ [cats[0]]: true });
    } catch (err) {
      setHistError(err?.response?.data?.message || "Failed to fetch products");
    } finally {
      setHistLoading(false);
    }
  };

  // ── NEW: handleDeleteProduct ──────────────────────────────────────────────
  //
  // HOW IT WORKS — step by step:
  //
  // 1. e.stopPropagation()
  //    The delete button sits inside a row that has onClick={() => toggleRow()}.
  //    Without this, clicking delete would ALSO expand/collapse the row.
  //    stopPropagation stops the click from "bubbling up" to the parent div.
  //
  // 2. window.confirm()
  //    Shows a browser confirm dialog before doing anything destructive.
  //    If the user clicks Cancel → function returns early, nothing happens.
  //
  // 3. setDeletingProductId(productId)
  //    Stores which product is being deleted.
  //    The JSX checks: isDeleting = deletingProductId === product._id
  //    When true → button renders a spinner instead of the trash icon.
  //    Only that one button shows loading; everything else stays normal.
  //
  // 4. axiosInstance.delete(`/category/${productId}`)
  //    Calls:  DELETE https://htechsolution-main.onrender.com/api/category/:id
  //    Route:  router.delete("/:id", verifyToken, authorizeRoles(...), deleteCategoryProduct)
  //    Service: Category.findByIdAndUpdate(id, { isActive: false }, { new: true })
  //    Result: isActive becomes false in MongoDB (soft delete — data stays)
  //
  // 5. setProducts(prev => prev.filter(p => p._id !== productId))
  //    Removes the deleted product from local state INSTANTLY.
  //    No need to re-fetch the whole list — just filter it out.
  //    prev = current products array
  //    .filter() returns a NEW array keeping everything EXCEPT the deleted _id
  //
  // 6. Also remove from selectedTickets if the deleted product was selected
  //    setSelectedTickets(prev => prev.filter(t => t !== ticketNumber))
  //
  // 7. showToast() — success message at bottom of screen
  //
  // 8. catch block — if API fails, show error toast
  //
  // 9. finally block — ALWAYS runs, clears deletingProductId so spinner stops
  //    This runs whether the API succeeded or failed

  const handleDeleteProduct = async (productId, ticketNumber, e) => {
    e.stopPropagation(); // prevent row expand/collapse from triggering
    console.log("Deleting product ID:", productId);           // ← what ID is being sent?
  console.log("Full URL:", `/customerDetails/products/${productId}`);
    if (!window.confirm(`Deactivate product "${ticketNumber}"?\nIt will be hidden from this list.`)) return;

    setDeletingProductId(productId);
    try {
      // DELETE /api/category/:id → sets isActive: false in DB
      
      await axiosInstance.delete(`/customerDetails/products/${productId}`);

      // Remove from local state instantly — no full re-fetch needed
      setProducts(prev => prev.filter(p => p._id !== productId));

      // Also deselect it if it was selected
      setSelectedTickets(prev => prev.filter(t => t !== ticketNumber));

      showToast(`✓ Product ${ticketNumber} deactivated`);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to deactivate product";
      showToast(`⚠ ${msg}`);
    } finally {
      setDeletingProductId(null); // always clear spinner
    }
  };

  // ── Lookup functions ──────────────────────────────────────────────────────
  const fetchSingleProduct = async (ticket) => {
    try {
      setSingleState("loading"); setSingleProduct(null); setSingleErr("");
      const { data } = await axiosInstance.get(
        `/customerDetails/product/lookup?identifier=${encodeURIComponent(ticket.trim())}`
      );
      setSingleProduct(data.product);
      setSingleState("ok");
    } catch (err) {
      setSingleErr(err?.response?.data?.message || "Product not found");
      setSingleState("err");
    }
  };

  const fetchBulkInputProduct = async (ticket) => {
    try {
      setBulkInputState("loading"); setBulkInputErr(""); setBulkFetched(null);
      const { data } = await axiosInstance.get(
        `/customerDetails/product/lookup?identifier=${encodeURIComponent(ticket.trim())}`
      );
      setBulkFetched(data.product);
      setBulkInputState("ok");
    } catch (err) {
      setBulkInputErr(err?.response?.data?.message || "Product not found");
      setBulkInputState("err");
    }
  };

  const addToBulkList = () => {
    if (bulkInputState !== "ok" || !bulkFetched) return;
    const id = bulkInput.toUpperCase().trim();
    if (bulkList.some(i => i.ticketNumber === id)) return;
    setBulkList(prev => [...prev, {
      ticketNumber:  bulkFetched.ticketNumber,
      product:       bulkFetched,
      warrStartDate: warrDates.warrStartDate,
      warrEndDate:   warrDates.warrEndDate,
    }]);
    setBulkInput(""); setBulkInputState("idle"); setBulkFetched(null);
  };

  const prefillBulkFromHistory = async (tickets) => {
    if (!tickets.length) return;
    setPurchaseType(tickets.length === 1 ? "single" : "bulk");
    if (tickets.length === 1) { setSingleTicket(tickets[0]); return; }
    const results = await Promise.allSettled(
      tickets.map(t =>
        axiosInstance.get(`/customerDetails/product/lookup?identifier=${encodeURIComponent(t)}`)
          .then(r => ({ ticketNumber: t, product: r.data.product, warrStartDate: "", warrEndDate: "" }))
      )
    );
    setBulkList(results.filter(r => r.status === "fulfilled").map(r => r.value));
  };

  const handleSubmit = async () => {
    try {
      setSubmitState("loading"); setSubmitError("");
      const products = purchaseType === "single"
        ? [{ ticketNumber: singleTicket.trim(), warrStartDate: warrDates.warrStartDate, warrEndDate: warrDates.warrEndDate }]
        : bulkList.map(item => ({
            ticketNumber:  item.ticketNumber,
            warrStartDate: item.warrStartDate || warrDates.warrStartDate,
            warrEndDate:   item.warrEndDate   || warrDates.warrEndDate,
          }));
      const { data } = await axiosInstance.post("/customerDetails/register", {
        customerName: customer.customerName.trim(),
        email:        customer.email.trim(),
        mobileNum:    customer.mobileNum.trim(),
        purchaseType, products,
      });
      setSavedReg(data.data); setSubmitState("done"); setSubmitted(true);
    } catch (err) {
      console.log(err.response?.data?.message)
      setSubmitError(err?.response?.data?.message || "Registration failed. Please try again.");
      setSubmitState("err");
    }
  };

  const handleUseInForm = () => { setView("form"); showToast(`${selectedTickets.length} ticket(s) sent to registration form`); };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const resetForm = () => {
    setCustomer({ customerName: "", email: "", mobileNum: "" });
    setWarrDates({ warrStartDate: "", warrEndDate: "" });
    setSingleTicket(""); setSingleProduct(null); setSingleState("idle");
    setBulkList([]); setBulkInput(""); setBulkInputState("idle");
    setSubmitState("idle"); setSubmitError(""); setSubmitted(false); setSavedReg(null);
    setPurchaseType("single"); setSelectedTickets([]);
  };

  const custOk      = customer.customerName && customer.email && customer.mobileNum;
  const datesOk     = warrDates.warrStartDate && warrDates.warrEndDate;
  const singleValid = purchaseType === "single" && singleState === "ok" && custOk && datesOk;
  const bulkValid   = purchaseType === "bulk"   && bulkList.length >= 2 && custOk;
  const canSubmit   = (singleValid || bulkValid) && submitState !== "loading";

  const filtered  = products.filter(p => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (p.ticketNumber || "").toLowerCase().includes(s)
      || getCategoryName(p).toLowerCase().includes(s)
      || getConfigs(p.configurations).map(([, v]) => String(v).toLowerCase()).join(" ").includes(s);
  });
  const grouped  = groupByCategory(filtered);
  const catNames = Object.keys(grouped).sort();

  const toggleCat    = (cat) => setExpandedCats(p => ({ ...p, [cat]: !p[cat] }));
  const toggleRow    = (id)  => setExpandedRows(p => ({ ...p, [id]:  !p[id] }));
  const toggleTicket = (ticket, e) => {
    e.stopPropagation();
    setSelectedTickets(p => p.includes(ticket) ? p.filter(t => t !== ticket) : [...p, ticket]);
  };
  const selectAllInCat = (cat, e) => {
    e.stopPropagation();
    const ts = grouped[cat].map(p => p.ticketNumber).filter(Boolean);
    const allSel = ts.every(t => selectedTickets.includes(t));
    setSelectedTickets(p => allSel ? p.filter(t => !ts.includes(t)) : [...new Set([...p, ...ts])]);
  };
  const copyTicket = (ticket, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ticket).catch(() => {});
    setCopiedId(ticket);
    showToast(`Copied ${ticket}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted && savedReg) {
    return (
      <div className="cc-root">
        <style>{CSS}</style>
        <div className="cc-success-wrap">
          <div className="cc-success-icon">✓</div>
          <h2 className="cc-success-title">Registration Complete</h2>
          <p className="cc-success-sub">
            Ref: <strong style={{ color: "#2B6F84", fontFamily: "DM Mono, monospace" }}>
              {savedReg._id?.slice(-8).toUpperCase() || "—"}
            </strong>
          </p>
          <div className="cc-detail-box">
            <DetailRow label="Customer"  value={savedReg.customerName} />
            <DetailRow label="Email"     value={savedReg.email} />
            <DetailRow label="Mobile"    value={savedReg.mobileNum} />
            <DetailRow label="Type"      value={savedReg.purchaseType === "bulk" ? "Bulk Purchase" : "Single Purchase"}
              accent={savedReg.purchaseType === "bulk" ? "#d97706" : "#15803d"} />
            <DetailRow label="Products"  value={`${savedReg.products?.length} unit(s) registered`} />
          </div>
          {savedReg.products?.length > 0 && (
            <div className="cc-saved-tickets">
              {savedReg.products.map(p => (
                <div key={p._id || p.ticketNumber} className="cc-saved-ticket-row">
                  <span className="cc-mono">{p.ticketNumber}</span>
                  <span style={{ color: "#6B7C86", fontSize: 12 }}>{p.categoryRef?.name || "—"}</span>
                  <span style={{ color: "#6B7C86", fontSize: 11 }}>
                    Warranty: {p.warrStartDate?.slice(0,10)} → {p.warrEndDate?.slice(0,10)}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button className="cc-btn-primary" onClick={() => { resetForm(); setView("history"); }}>← Back to Products</button>
            <button className="cc-btn-outline-dark" onClick={resetForm}>+ New Registration</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="cc-root">
      <style>{CSS}</style>
      {toast && <div className="cc-toast">{toast}</div>}

      {/* Tabs */}
      <div className="cc-tabs">
        <button className={`cc-tab${view === "history" ? " active" : ""}`} onClick={() => setView("history")}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          Product History
          {selectedTickets.length > 0 && <span className="cc-tab-badge">{selectedTickets.length}</span>}
        </button>
        <button className={`cc-tab${view === "form" ? " active" : ""}`} onClick={() => setView("form")}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
          Registration Form
          {(singleState === "ok" || bulkList.length > 0) && (
            <span className="cc-tab-badge" style={{ background: "#15803d" }}>●</span>
          )}
        </button>
      </div>

      {/* ═══════════════ HISTORY VIEW ═══════════════ */}
      {view === "history" && (
        <div className="cc-card">
          <div className="cc-header">
            <div className="cc-header-row">
              <div>
                <h2 className="cc-title">
                  Product History
                  <span className="cc-count-badge">{filtered.length} products · {catNames.length} categories</span>
                </h2>
                <p className="cc-subtitle">Select tickets below → click "Use in Form" to register</p>
              </div>
              <button className="cc-refresh" onClick={fetchProducts} disabled={histLoading}>
                {histLoading ? <Spin size={12} /> : "↺"} {histLoading ? "Loading…" : "Refresh"}
              </button>
            </div>
          </div>

          {selectedTickets.length > 0 && (
            <div className="cc-sel-bar">
              <div className="cc-sel-info">
                <span className="cc-sel-dot" />
                <strong>{selectedTickets.length}</strong> ticket{selectedTickets.length > 1 ? "s" : ""} selected
                <div className="cc-sel-chips">
                  {selectedTickets.map(t => (
                    <span key={t} className="cc-sel-chip">
                      {t}
                      <button onClick={() => setSelectedTickets(p => p.filter(x => x !== t))} className="cc-sel-x">✕</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="cc-sel-actions">
                <button className="cc-btn-ghost-light" onClick={() => { navigator.clipboard.writeText(selectedTickets.join("\n")); showToast("Copied all"); }}>Copy All</button>
                <button className="cc-btn-green" onClick={handleUseInForm}>Use in Form ({selectedTickets.length}) →</button>
                <button className="cc-btn-ghost-light" onClick={() => setSelectedTickets([])}>Clear</button>
              </div>
            </div>
          )}

          <div className="cc-toolbar">
            <div className="cc-search">
              <span className="cc-search-icon">⌕</span>
              <input placeholder="Search ticket, category, config…" value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)} />
              {searchTerm && <button className="cc-clear-srch" onClick={() => setSearchTerm("")}>✕</button>}
            </div>
          </div>

          {histError && (
            <div className="cc-error-bar">⚠ {histError} <button onClick={fetchProducts} className="cc-retry-btn">Retry</button></div>
          )}

          {histLoading && (
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {[56, 44, 44, 44].map((h, i) => <div key={i} className="cc-skeleton" style={{ height: h }} />)}
            </div>
          )}

          {!histLoading && !histError && (
            <div className="cc-groups">
              {catNames.length === 0 ? (
                <div className="cc-empty">🔍 No products found</div>
              ) : catNames.map((cat, catIdx) => {
                const items    = grouped[cat];
                const color    = getCatColor(catIdx);
                const isOpen   = !!expandedCats[cat];
                const catTix   = items.map(p => p.ticketNumber).filter(Boolean);
                const selCount = catTix.filter(t => selectedTickets.includes(t)).length;
                const allSel   = selCount === catTix.length && catTix.length > 0;

                return (
                  <div key={cat} className="cc-cat-group">
                    <div className="cc-cat-hdr" style={{ borderLeftColor: color.accent }} onClick={() => toggleCat(cat)}>
                      <div className="cc-cat-left">
                        <span className={`cc-chevron${isOpen ? " open" : ""}`}>▸</span>
                        <span className="cc-cat-name" style={{ color: color.text, background: color.bg, border: `1px solid ${color.border}` }}>{cat}</span>
                        <span className="cc-cat-count" style={{ color: color.accent }}>{items.length} product{items.length > 1 ? "s" : ""}</span>
                        {selCount > 0 && <span className="cc-cat-sel-badge">{selCount}/{catTix.length} selected</span>}
                      </div>
                      <div onClick={e => e.stopPropagation()}>
                        <button className={`cc-selall-btn${allSel ? " active" : ""}`} onClick={(e) => selectAllInCat(cat, e)}>
                          {allSel ? "✓ All Selected" : "☐ Select All"}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="cc-ticket-rows">
                        {/* Column headers */}
                        <div className="cc-ticket-thead">
                          <span></span><span>Ticket #</span><span>Date</span>
                          <span>Config Preview</span><span style={{ textAlign: "right" }}>Actions</span>
                        </div>

                        {items.map(product => {
                          const configs    = getConfigs(product.configurations);
                          const ticket     = product.ticketNumber;
                          const isRowOpen  = !!expandedRows[product._id];
                          const isSel      = selectedTickets.includes(ticket);
                          const isCopied   = copiedId === ticket;
                          // true while THIS specific product is being deleted
                          const isDeleting = deletingProductId === product._id;

                          return (
                            <React.Fragment key={product._id}>
                              <div
                                className={`cc-ticket-row${isSel ? " selected" : ""}${isRowOpen ? " row-open" : ""}`}
                                onClick={() => toggleRow(product._id)}
                              >
                                {/* Checkbox */}
                                <div
                                  className={`cc-checkbox${isSel ? " checked" : ""}`}
                                  style={isSel ? { background: color.accent, borderColor: color.accent } : {}}
                                  onClick={e => toggleTicket(ticket, e)}
                                >
                                  {isSel && "✓"}
                                </div>

                                {/* Ticket badge */}
                                <span className="cc-ticket-badge" style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}>
                                  {ticket || "—"}
                                </span>

                                {/* Date */}
                                <span className="cc-ticket-date">
                                  {product.createdAt
                                    ? new Date(product.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                    : "—"}
                                </span>

                                {/* Config chips */}
                                <div className="cc-ticket-configs">
                                  {configs.slice(0, 3).map(([k, v]) => (
                                    <span key={k} className="cc-chip">
                                      <span className="cc-chip-k">{k}:</span>
                                      <span className="cc-chip-v">{String(v)}</span>
                                    </span>
                                  ))}
                                  {configs.length > 3 && <span className="cc-chip-more">+{configs.length - 3}</span>}
                                </div>

                                {/* ── Actions: Copy | +Add | Delete ── */}
                                <div className="cc-ticket-actions" onClick={e => e.stopPropagation()}>
                                  <button
                                    className={`cc-act-btn copy${isCopied ? " copied" : ""}`}
                                    onClick={e => copyTicket(ticket, e)}
                                  >
                                    {isCopied ? "✓ Copied" : "Copy"}
                                  </button>
                                  <button
                                    className={`cc-act-btn select${isSel ? " selected" : ""}`}
                                    onClick={e => toggleTicket(ticket, e)}
                                  >
                                    {isSel ? "− Remove" : "+ Add"}
                                  </button>

                                  {/* ── NEW DELETE BUTTON ──────────────────────────────
                                    isDeleting → shows spinner (this row is being processed)
                                    disabled={isDeleting} → blocks double-click during API call
                                    e.stopPropagation() is inside handleDeleteProduct
                                    so clicking delete never toggles the row expand/collapse
                                  */}
                                  <button
                                    className="cc-act-btn cc-del-btn"
                                    onClick={e => handleDeleteProduct(product._id, ticket, e)}
                                    disabled={isDeleting}
                                    title="Deactivate this product"
                                  >
                                    {isDeleting ? <Spin size={10} /> : "🗑"}
                                  </button>

                                  <span className={`cc-chevron${isRowOpen ? " open" : ""}`} style={{ marginLeft: 2, color: "#9fb3be" }}>▸</span>
                                </div>
                              </div>

                              {/* Expanded detail row */}
                              {isRowOpen && (
                                <div className="cc-row-detail" style={{ borderLeftColor: color.accent }}>
                                  <div className="cc-detail-label" style={{ color: color.accent }}>
                                    Full Configuration — {ticket}
                                  </div>
                                  <div className="cc-detail-chips">
                                    {configs.map(([k, v]) => (
                                      <span key={k} className="cc-chip large">
                                        <span className="cc-chip-k">{k}:</span>
                                        <span className="cc-chip-v">{String(v)}</span>
                                      </span>
                                    ))}
                                  </div>
                                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                                    <button className="cc-act-btn copy" onClick={e => copyTicket(ticket, e)}>Copy Ticket</button>
                                    <button
                                      className={`cc-act-btn select${isSel ? " selected" : ""}`}
                                      onClick={e => toggleTicket(ticket, e)}
                                    >
                                      {isSel ? "− Remove from bulk" : "+ Add to form"}
                                    </button>
                                    {/* Delete button in expanded view too — with full label */}
                                    <button
                                      className="cc-act-btn cc-del-btn cc-del-full"
                                      onClick={e => handleDeleteProduct(product._id, ticket, e)}
                                      disabled={isDeleting}
                                    >
                                      {isDeleting
                                        ? <><Spin size={11} /> Deactivating…</>
                                        : "🗑 Deactivate Product"}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!histLoading && selectedTickets.length > 0 && (
            <div className="cc-bottom-bar">
              <span>{selectedTickets.length} ticket{selectedTickets.length > 1 ? "s" : ""} ready</span>
              <button className="cc-btn-green" onClick={handleUseInForm}>
                Use in Registration Form ({selectedTickets.length}) →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════ FORM VIEW ═══════════════ */}
      {view === "form" && (
        <div className="cc-card">
          <div className="cc-header">
            <div className="cc-header-row">
              <div>
                <h2 className="cc-title">Customer Registration</h2>
                <p className="cc-subtitle">
                  {selectedTickets.length > 0
                    ? `${selectedTickets.length} ticket(s) pre-filled from Product History`
                    : "Fill customer details and enter ticket numbers"}
                </p>
              </div>
              <button className="cc-refresh" onClick={() => setView("history")}>← Back to History</button>
            </div>
          </div>

          <div className="cc-form-body">
            <FormSection step="01" title="Purchase Type">
              <div className="cc-type-row">
                <TypeCard active={purchaseType === "single"} color="#2B6F84"
                  title="Single Product" desc="One unit — one ticket number"
                  onClick={() => { setPurchaseType("single"); setBulkList([]); }} />
                <TypeCard active={purchaseType === "bulk"} color="#d97706"
                  title="Bulk Purchase" desc="Multiple units — add each ticket separately"
                  onClick={() => { setPurchaseType("bulk"); setSingleProduct(null); setSingleTicket(""); }} />
              </div>
            </FormSection>

            <FormSection step="02" title="Customer Information">
              <div className="cc-grid3">
                <FormField label="Full Name">
                  <input className="cc-input" value={customer.customerName}
                    onChange={e => setCustomer(p => ({ ...p, customerName: e.target.value }))}
                    placeholder="Customer full name" />
                </FormField>
                <FormField label="Email Address">
                  <input className="cc-input" type="email" value={customer.email}
                    onChange={e => setCustomer(p => ({ ...p, email: e.target.value }))}
                    placeholder="customer@email.com" />
                </FormField>
                <FormField label="Mobile Number">
                  <input className="cc-input" value={customer.mobileNum}
                    onChange={e => setCustomer(p => ({ ...p, mobileNum: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX" />
                </FormField>
              </div>
            </FormSection>

            <FormSection step="03" title="Warranty Period">
              <div className="cc-grid2">
                <FormField label="Warranty Start Date">
                  <input className="cc-input" type="date" value={warrDates.warrStartDate}
                    onChange={e => setWarrDates(p => ({ ...p, warrStartDate: e.target.value }))} />
                </FormField>
                <FormField label="Warranty End Date">
                  <input className="cc-input" type="date" value={warrDates.warrEndDate}
                    onChange={e => setWarrDates(p => ({ ...p, warrEndDate: e.target.value }))} />
                </FormField>
              </div>
            </FormSection>

            <FormSection step="04" title={purchaseType === "bulk" ? `Product Ticket Numbers — ${bulkList.length} added` : "Product Ticket Number"}>
              {purchaseType === "single" && (
                <>
                  <TicketInput value={singleTicket} onChange={setSingleTicket} state={singleState}
                    error={singleErr} placeholder="Paste or type ticket number (e.g. PRD-20250101-12345)" />
                  {singleState === "ok" && singleProduct && <ProductFetchedCard product={singleProduct} />}
                </>
              )}

              {purchaseType === "bulk" && (
                <>
                  <div className="cc-bulk-hint">
                    Each unit has its own ticket number. Add them one by one or use
                    <strong> Product History</strong> to select and send multiple tickets at once.
                  </div>
                  <div className="cc-bulk-input-row">
                    <div style={{ flex: 1 }}>
                      <TicketInput value={bulkInput} onChange={setBulkInput}
                        onKeyDown={e => e.key === "Enter" && addToBulkList()}
                        state={bulkInputState === "duplicate" ? "err" : bulkInputState}
                        error={bulkInputState === "duplicate" ? "Already added" : bulkInputErr}
                        placeholder="Type ticket number and press Enter…" noMargin />
                    </div>
                    <button className={`cc-add-btn${bulkInputState !== "ok" ? " disabled" : ""}`}
                      onClick={addToBulkList} disabled={bulkInputState !== "ok"}>+ Add</button>
                  </div>
                  {bulkInputState === "ok" && bulkFetched && <ProductFetchedCard product={bulkFetched} compact />}
                  {bulkList.length > 0 && (
                    <div className="cc-bulk-table">
                      <div className="cc-bulk-thead">
                        <span>#</span><span>Ticket Number</span><span>Category</span><span>Config</span><span></span>
                      </div>
                      {bulkList.map(({ ticketNumber, product }, idx) => (
                        <div key={ticketNumber} className="cc-bulk-row">
                          <span className="cc-bulk-idx">{idx + 1}</span>
                          <span className="cc-mono">{ticketNumber}</span>
                          <span className="cc-bulk-cat">{product?.categoryName || "—"}</span>
                          <span className="cc-bulk-configs">
                            {getConfigs(product?.configurations).slice(0, 2).map(([k, v]) => (
                              <span key={k} className="cc-chip">
                                <span className="cc-chip-k">{k}:</span>
                                <span className="cc-chip-v">{String(v)}</span>
                              </span>
                            ))}
                          </span>
                          <button className="cc-remove-btn"
                            onClick={() => setBulkList(p => p.filter(i => i.ticketNumber !== ticketNumber))}>✕</button>
                        </div>
                      ))}
                      <div className="cc-bulk-total">
                        <span /><span style={{ color: "#6B7C86", fontSize: 12 }}>
                          {bulkList.length} unit{bulkList.length > 1 ? "s" : ""} total
                        </span><span /><span /><span />
                      </div>
                    </div>
                  )}
                </>
              )}
            </FormSection>

            {submitError && <div className="cc-submit-error">⚠ {submitError}</div>}
            <div className="cc-submit-row">
              <button className={`cc-submit-btn${!canSubmit ? " disabled" : ""}`}
                onClick={handleSubmit} disabled={!canSubmit}>
                {submitState === "loading" ? <><Spin size={14} /> Processing…</> : "Complete Registration →"}
              </button>
              {!canSubmit && (
                <p className="cc-submit-hint">
                  {!custOk ? "Fill in customer name, email and mobile"
                    : !datesOk && purchaseType === "single" ? "Select warranty dates"
                    : purchaseType === "single" && singleState !== "ok" ? "Enter a valid ticket number"
                    : purchaseType === "bulk" && bulkList.length < 2 ? "Add at least 2 products for bulk purchase"
                    : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FormSection({ step, title, children }) {
  return (
    <div className="cc-form-section">
      <div className="cc-step-label"><span className="cc-step-num">{step}</span>{title}</div>
      {children}
    </div>
  );
}
function FormField({ label, children }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 6 }}><label className="cc-field-label">{label}</label>{children}</div>;
}
function TypeCard({ active, color, title, desc, onClick }) {
  return (
    <button className="cc-type-card" onClick={onClick}
      style={{ borderColor: active ? color : "#D9E6ED", background: active ? `${color}0f` : "#fff" }}>
      <div className="cc-type-title" style={{ color: active ? color : "#1E2A32" }}>{title}</div>
      <div className="cc-type-desc">{desc}</div>
      {active && <div className="cc-type-check" style={{ background: color }}>✓</div>}
    </button>
  );
}
function TicketInput({ value, onChange, onKeyDown, state, error, placeholder, noMargin }) {
  const borderColor = state === "ok" ? "#16a34a" : state === "err" ? "#dc2626" : "#D9E6ED";
  return (
    <div style={{ marginBottom: noMargin ? 0 : 12 }}>
      <div className="cc-ticket-input-wrap" style={{ borderColor }}>
        <span style={{ color: "#9fb3be", fontSize: 16 }}>⌕</span>
        <input value={value} onChange={e => onChange(e.target.value)} onKeyDown={onKeyDown}
          placeholder={placeholder} className="cc-ticket-input-field" />
        {state === "loading" && <Spin size={14} />}
        {state === "ok"      && <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>}
        {state === "err"     && <span style={{ color: "#dc2626" }}>✕</span>}
      </div>
      {state === "err" && error && <p className="cc-input-err">⚠ {error}</p>}
    </div>
  );
}
function ProductFetchedCard({ product, compact }) {
  const configs = getConfigs(product?.configurations);
  return (
    <div className="cc-fetched-card">
      <div className="cc-fetched-tag">AUTO-FETCHED · {product?.ticketNumber}</div>
      <div className="cc-fetched-cat">{product?.categoryName || "—"}</div>
      <div className="cc-fetched-configs">
        {(compact ? configs.slice(0, 3) : configs).map(([k, v]) => (
          <span key={k} className="cc-chip"><span className="cc-chip-k">{k}:</span><span className="cc-chip-v">{String(v)}</span></span>
        ))}
        {compact && configs.length > 3 && <span className="cc-chip-more">+{configs.length - 3} more</span>}
      </div>
    </div>
  );
}
function DetailRow({ label, value, accent }) {
  return (
    <div className="cc-detail-row">
      <span>{label}</span><strong style={{ color: accent || "#1E2A32" }}>{value}</strong>
    </div>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
  .cc-root { --primary:#2B6F84; --primary-dark:#1F5668; --bg:#F2F6F9; --card:#fff; --border:#D9E6ED; --text:#1E2A32; --muted:#6B7C86; font-family:'DM Sans',sans-serif; background:var(--bg); min-height:100vh; padding:20px 20px 60px; }
  .cc-root *,.cc-root *::before,.cc-root *::after { box-sizing:border-box; }
  @keyframes cc-spin { to { transform:rotate(360deg); } }
  @keyframes cc-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes cc-fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  .cc-tabs { display:flex; gap:4px; margin-bottom:16px; background:var(--card); border-radius:12px; padding:6px; border:1px solid var(--border); }
  .cc-tab { flex:1; display:flex; align-items:center; justify-content:center; gap:7px; padding:9px 16px; border-radius:9px; border:none; background:transparent; font-size:13px; font-weight:600; color:var(--muted); cursor:pointer; transition:all .18s; font-family:'DM Sans',sans-serif; }
  .cc-tab.active { background:var(--primary); color:#fff; }
  .cc-tab:not(.active):hover { background:#eef5f8; color:var(--primary); }
  .cc-tab-badge { background:#d97706; color:#fff; border-radius:20px; font-size:10px; font-weight:700; padding:1px 7px; }
  .cc-card { background:var(--card); border-radius:16px; border:1px solid var(--border); box-shadow:0 4px 24px rgba(43,111,132,.07); overflow:hidden; }
  .cc-header { background:linear-gradient(135deg,var(--primary-dark),var(--primary)); padding:20px 24px 16px; }
  .cc-header-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  .cc-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:#fff; margin:0 0 3px; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  .cc-subtitle { font-size:12px; color:rgba(255,255,255,.55); margin:0; }
  .cc-count-badge { font-size:11px; font-weight:600; background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.22); border-radius:20px; padding:2px 10px; color:#fff; font-family:'DM Sans',sans-serif; }
  .cc-refresh { display:flex; align-items:center; gap:6px; padding:7px 14px; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3); border-radius:8px; font-size:12px; font-weight:700; color:#fff; cursor:pointer; transition:all .15s; white-space:nowrap; font-family:'DM Sans',sans-serif; }
  .cc-refresh:hover:not(:disabled) { background:rgba(255,255,255,.28); }
  .cc-refresh:disabled { opacity:.5; cursor:not-allowed; }
  .cc-sel-bar { background:linear-gradient(135deg,#1a3a45,#1d4a5a); border-bottom:1px solid #2a5a6e; padding:12px 22px; display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  .cc-sel-info { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#90cfe0; font-weight:600; flex-wrap:wrap; flex:1; }
  .cc-sel-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; margin-top:3px; box-shadow:0 0 6px #4ade80; flex-shrink:0; }
  .cc-sel-chips { display:flex; flex-wrap:wrap; gap:5px; margin-top:6px; width:100%; }
  .cc-sel-chip { display:inline-flex; align-items:center; gap:5px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); border-radius:6px; padding:3px 8px; font-size:11px; color:#e0f2fe; font-family:'DM Mono',monospace; }
  .cc-sel-x { background:none; border:none; color:#90cfe0; cursor:pointer; font-size:10px; padding:0 2px; }
  .cc-sel-actions { display:flex; gap:8px; align-items:center; flex-shrink:0; }
  .cc-toolbar { padding:12px 20px; border-bottom:1px solid var(--border); background:#fafcfd; }
  .cc-search { position:relative; max-width:460px; }
  .cc-search input { width:100%; padding:9px 34px 9px 36px; border:1.5px solid var(--border); border-radius:9px; font-size:13px; outline:none; background:#fff; color:var(--text); font-family:'DM Sans',sans-serif; transition:border-color .2s; }
  .cc-search input:focus { border-color:var(--primary); }
  .cc-search input::placeholder { color:#c0d4dc; }
  .cc-search-icon { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--muted); font-size:16px; pointer-events:none; }
  .cc-clear-srch { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--muted); cursor:pointer; font-size:12px; }
  .cc-groups { padding:14px 18px 18px; display:flex; flex-direction:column; gap:12px; }
  .cc-cat-group { border:1.5px solid var(--border); border-radius:11px; overflow:hidden; }
  .cc-cat-hdr { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:#f8fbfc; border-left:4px solid; cursor:pointer; transition:background .14s; gap:12px; flex-wrap:wrap; }
  .cc-cat-hdr:hover { background:#eef5f8; }
  .cc-cat-left { display:flex; align-items:center; gap:9px; flex-wrap:wrap; }
  .cc-cat-name { font-size:12px; font-weight:700; padding:3px 11px; border-radius:7px; }
  .cc-cat-count { font-size:12px; font-weight:600; }
  .cc-cat-sel-badge { background:#d1fae5; color:#065f46; border:1px solid #6ee7b7; border-radius:10px; font-size:11px; font-weight:700; padding:2px 8px; }
  .cc-selall-btn { font-size:11px; font-weight:700; padding:5px 11px; border:1.5px solid var(--border); border-radius:7px; background:#fff; color:var(--muted); cursor:pointer; transition:all .14s; font-family:'DM Sans',sans-serif; white-space:nowrap; }
  .cc-selall-btn:hover { border-color:var(--primary); color:var(--primary); }
  .cc-selall-btn.active { background:var(--primary); color:#fff; border-color:var(--primary); }
  .cc-ticket-rows { border-top:1px solid var(--border); }
  .cc-ticket-thead { display:grid; grid-template-columns:28px 140px 100px 1fr 160px; padding:7px 16px; background:#f4f8fa; border-bottom:1px solid var(--border); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:var(--muted); gap:10px; align-items:center; }
  .cc-ticket-row { display:grid; grid-template-columns:28px 140px 100px 1fr 160px; padding:10px 16px; gap:10px; align-items:center; border-bottom:1px solid #f0f5f7; cursor:pointer; transition:background .12s; }
  .cc-ticket-row:hover { background:#f4fbfd; }
  .cc-ticket-row.selected { background:#e8f8f0; }
  .cc-ticket-row.row-open { background:#eef5f8; }
  .cc-ticket-row:last-child { border-bottom:none; }
  .cc-checkbox { width:18px; height:18px; border-radius:5px; border:2px solid var(--border); background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .14s; font-size:11px; color:#fff; font-weight:700; flex-shrink:0; }
  .cc-checkbox:hover { border-color:var(--primary); }
  .cc-ticket-badge { font-family:'DM Mono',monospace; font-size:11px; font-weight:500; padding:4px 9px; border-radius:6px; white-space:nowrap; }
  .cc-ticket-date { font-size:12px; color:var(--muted); white-space:nowrap; }
  .cc-ticket-configs { display:flex; flex-wrap:wrap; gap:4px; align-items:center; }
  .cc-ticket-actions { display:flex; align-items:center; gap:5px; justify-content:flex-end; }
  .cc-chip { display:inline-flex; gap:3px; align-items:center; background:#f0f7fa; border:1px solid var(--border); border-radius:5px; padding:2px 7px; font-size:11px; white-space:nowrap; }
  .cc-chip.large { padding:4px 10px; font-size:12px; }
  .cc-chip-k { color:var(--muted); }
  .cc-chip-v { color:var(--primary); font-weight:700; }
  .cc-chip-more { font-size:11px; color:var(--muted); background:#eef5f8; border:1px solid var(--border); border-radius:5px; padding:2px 7px; font-weight:600; }
  .cc-act-btn { display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer; transition:all .14s; border:1.5px solid; white-space:nowrap; font-family:'DM Sans',sans-serif; }
  .cc-act-btn.copy { background:#fff; border-color:var(--border); color:var(--muted); }
  .cc-act-btn.copy:hover { border-color:var(--primary); color:var(--primary); }
  .cc-act-btn.copy.copied { background:#dcfce7; border-color:#6ee7b7; color:#15803d; }
  .cc-act-btn.select { background:#fff; border-color:var(--border); color:var(--muted); }
  .cc-act-btn.select:hover { border-color:#16a34a; color:#16a34a; }
  .cc-act-btn.select.selected { background:#dcfce7; border-color:#6ee7b7; color:#15803d; }
  /* ── Delete button styles ── */
  .cc-del-btn { background:#fff5f5; border-color:#fca5a5 !important; color:#dc2626; padding:4px 8px; }
  .cc-del-btn:hover:not(:disabled) { background:#fee2e2; border-color:#f87171 !important; color:#b91c1c; }
  .cc-del-btn:disabled { opacity:.4; cursor:not-allowed; }
  .cc-del-full { padding:4px 12px; }
  .cc-row-detail { padding:12px 16px 14px 48px; background:#f0f8fb; border-top:1px solid var(--border); border-left:4px solid; }
  .cc-detail-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px; }
  .cc-detail-chips { display:flex; flex-wrap:wrap; gap:6px; }
  .cc-bottom-bar { display:flex; align-items:center; justify-content:space-between; padding:12px 22px; border-top:1px solid var(--border); background:#f0fdf4; font-size:13px; font-weight:600; color:#15803d; gap:12px; flex-wrap:wrap; }
  .cc-form-body { padding:20px 24px 28px; display:flex; flex-direction:column; gap:0; }
  .cc-form-section { margin-bottom:28px; }
  .cc-step-label { display:flex; align-items:center; gap:9px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:var(--muted); margin-bottom:14px; }
  .cc-step-num { background:#e8f2f6; color:var(--primary); padding:2px 8px; border-radius:5px; font-size:10px; font-weight:800; }
  .cc-field-label { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--muted); font-weight:700; }
  .cc-input { background:#f8fbfc; border:1.5px solid var(--border); border-radius:9px; padding:10px 13px; color:var(--text); font-size:13px; font-family:'DM Sans',sans-serif; transition:border-color .18s,box-shadow .18s; width:100%; }
  .cc-input:focus { outline:none; border-color:var(--primary); box-shadow:0 0 0 3px rgba(43,111,132,.1); }
  .cc-input::placeholder { color:#c0d4dc; }
  .cc-grid3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
  .cc-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media (max-width:640px) { .cc-grid3,.cc-grid2 { grid-template-columns:1fr; } }
  .cc-type-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .cc-type-card { border:2px solid; border-radius:11px; padding:18px 16px; text-align:left; cursor:pointer; position:relative; transition:all .18s; font-family:'DM Sans',sans-serif; }
  .cc-type-title { font-size:14px; font-weight:700; margin-bottom:4px; }
  .cc-type-desc { font-size:11px; color:var(--muted); line-height:1.5; }
  .cc-type-check { position:absolute; top:10px; right:10px; width:20px; height:20px; border-radius:50%; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
  .cc-ticket-input-wrap { display:flex; align-items:center; gap:10px; background:#f8fbfc; border:1.5px solid; border-radius:10px; padding:11px 13px; transition:border-color .18s; margin-bottom:0; }
  .cc-ticket-input-field { flex:1; background:transparent; border:none; color:var(--text); font-size:13px; outline:none; font-family:'DM Mono',monospace; }
  .cc-ticket-input-field::placeholder { color:#c0d4dc; font-family:'DM Sans',sans-serif; }
  .cc-input-err { font-size:12px; color:#dc2626; margin:5px 0 0; }
  .cc-fetched-card { margin-top:12px; background:#f0fdf4; border:1.5px solid #86efac; border-radius:10px; padding:12px 16px; animation:cc-fadein .3s ease; }
  .cc-fetched-tag { font-size:10px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:#16a34a; margin-bottom:5px; }
  .cc-fetched-cat { font-size:14px; font-weight:700; color:var(--text); margin-bottom:8px; }
  .cc-fetched-configs { display:flex; flex-wrap:wrap; gap:6px; }
  .cc-bulk-hint { background:#f8fbfc; border:1px solid var(--border); border-radius:8px; padding:10px 14px; font-size:12px; color:var(--muted); margin-bottom:12px; line-height:1.6; }
  .cc-bulk-input-row { display:flex; gap:10px; align-items:flex-start; margin-bottom:10px; }
  .cc-add-btn { background:var(--primary); color:#fff; border:none; border-radius:9px; padding:11px 18px; font-size:13px; font-weight:700; cursor:pointer; white-space:nowrap; font-family:'DM Sans',sans-serif; transition:background .15s; }
  .cc-add-btn:hover:not(.disabled) { background:var(--primary-dark); }
  .cc-add-btn.disabled { opacity:.3; cursor:not-allowed; }
  .cc-bulk-table { border:1.5px solid var(--border); border-radius:10px; overflow:hidden; margin-top:12px; }
  .cc-bulk-thead { display:grid; grid-template-columns:28px 160px 100px 1fr 28px; padding:8px 14px; background:#f4f8fa; border-bottom:1px solid var(--border); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:var(--muted); gap:10px; }
  .cc-bulk-row { display:grid; grid-template-columns:28px 160px 100px 1fr 28px; padding:10px 14px; gap:10px; align-items:center; border-bottom:1px solid #f0f5f7; animation:cc-fadein .25s ease; }
  .cc-bulk-row:last-child { border-bottom:none; }
  .cc-bulk-total { display:grid; grid-template-columns:28px 160px 100px 1fr 28px; padding:9px 14px; gap:10px; background:#f8fbfc; border-top:1px solid var(--border); }
  .cc-bulk-idx { font-size:12px; color:var(--muted); }
  .cc-bulk-cat { font-size:12px; color:var(--muted); }
  .cc-bulk-configs { display:flex; flex-wrap:wrap; gap:4px; }
  .cc-remove-btn { background:transparent; border:1px solid var(--border); color:var(--muted); border-radius:5px; width:22px; height:22px; cursor:pointer; font-size:10px; display:flex; align-items:center; justify-content:center; }
  .cc-remove-btn:hover { border-color:#dc2626; color:#dc2626; }
  .cc-submit-row { display:flex; flex-direction:column; align-items:center; gap:8px; padding-top:6px; }
  .cc-submit-btn { background:linear-gradient(135deg,var(--primary),var(--primary-dark)); color:#fff; border:none; padding:14px 48px; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; display:inline-flex; align-items:center; gap:8px; transition:opacity .18s; }
  .cc-submit-btn.disabled { opacity:.3; cursor:not-allowed; }
  .cc-submit-btn:hover:not(.disabled) { opacity:.88; }
  .cc-submit-hint { font-size:12px; color:var(--muted); margin:0; text-align:center; }
  .cc-submit-error { background:#fff5f5; border:1px solid #fca5a5; border-left:3px solid #dc2626; border-radius:9px; padding:10px 14px; font-size:13px; color:#b91c1c; margin-bottom:12px; }
  .cc-btn-green { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; background:#16a34a; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; transition:background .14s; white-space:nowrap; font-family:'DM Sans',sans-serif; }
  .cc-btn-green:hover { background:#15803d; }
  .cc-btn-ghost-light { padding:7px 13px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.3); border-radius:8px; font-size:12px; font-weight:700; color:#fff; cursor:pointer; font-family:'DM Sans',sans-serif; }
  .cc-btn-ghost-light:hover { background:rgba(255,255,255,.22); }
  .cc-btn-primary { display:inline-flex; align-items:center; gap:6px; padding:10px 22px; background:var(--primary); color:#fff; border:none; border-radius:9px; font-size:13px; font-weight:700; cursor:pointer; transition:background .14s; font-family:'DM Sans',sans-serif; }
  .cc-btn-primary:hover { background:var(--primary-dark); }
  .cc-btn-outline-dark { padding:10px 20px; background:#fff; border:1.5px solid var(--border); color:var(--text); border-radius:9px; font-size:13px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; }
  .cc-toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); background:#1a3a45; color:#e0f2fe; padding:10px 20px; border-radius:10px; font-size:13px; font-weight:600; box-shadow:0 8px 32px rgba(0,0,0,.25); z-index:9999; white-space:nowrap; font-family:'DM Sans',sans-serif; animation:cc-fadein .25s ease; }
  .cc-skeleton { border-radius:8px; background:linear-gradient(90deg,#e8f0f4 25%,#d4e4ec 50%,#e8f0f4 75%); background-size:200% 100%; animation:cc-shimmer 1.4s infinite; }
  .cc-error-bar { margin:14px 20px; padding:11px 15px; background:#fff5f5; border:1px solid #fca5a5; border-left:3px solid #e57373; border-radius:9px; color:#b91c1c; font-size:13px; display:flex; align-items:center; gap:8px; }
  .cc-retry-btn { color:var(--primary); font-weight:700; background:none; border:none; cursor:pointer; }
  .cc-empty { text-align:center; padding:48px 24px; color:var(--muted); font-size:14px; }
  .cc-success-wrap { max-width:560px; margin:48px auto; background:var(--card); border:1.5px solid #86efac; border-radius:18px; padding:40px 36px; text-align:center; animation:cc-fadein .4s ease; }
  .cc-success-icon { width:56px; height:56px; background:#f0fdf4; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:24px; color:#16a34a; margin:0 auto 18px; border:2px solid #86efac; }
  .cc-success-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:var(--text); margin:0 0 6px; }
  .cc-success-sub { color:var(--muted); font-size:13px; margin:0 0 24px; }
  .cc-detail-box { background:#f8fbfc; border-radius:10px; padding:16px 18px; margin-bottom:20px; text-align:left; }
  .cc-detail-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border); font-size:13px; color:var(--muted); }
  .cc-detail-row:last-child { border-bottom:none; }
  .cc-saved-tickets { display:flex; flex-direction:column; gap:4px; margin-bottom:6px; text-align:left; }
  .cc-saved-ticket-row { display:flex; justify-content:space-between; align-items:center; background:#f8fbfc; border:1px solid var(--border); border-radius:7px; padding:7px 12px; gap:12px; flex-wrap:wrap; }
  .cc-mono { font-family:'DM Mono',monospace; font-size:12px; color:var(--primary); }
  .cc-chevron { display:inline-flex; transition:transform .2s; font-size:11px; }
  .cc-chevron.open { transform:rotate(90deg); }
`; 



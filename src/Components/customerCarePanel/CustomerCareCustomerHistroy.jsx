import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/axiosIntance';
import {
  Calendar, Phone, Mail, User, Package, Clock, AlertCircle,
  ChevronLeft, ChevronRight, ChevronDown,
  Eye, EyeOff, Copy, Check, ShieldCheck,
  ShoppingBag, Layers, Trash2, RefreshCw,
} from 'lucide-react';

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────── */
const C = {
  primary:       '#2E6F83',
  primaryDark:   '#2A6577',
  primaryLight:  '#E8F4F7',
  primaryMid:    '#C5DDE5',
  accent:        '#E5A93D',
  accentLight:   '#FDF3E0',
  accentBorder:  '#F5D99A',
  background:    '#F4F6F8',
  white:         '#FFFFFF',
  border:        '#E2E8ED',
  borderHover:   '#C5D5DB',
  textPrimary:   '#1F2937',
  textSecondary: '#6B7280',
  icon:          '#9CA3AF',
  successBg:     '#ECFDF5',
  successText:   '#065F46',
  successBorder: '#A7F3D0',
  warnBg:        '#FFFBEB',
  warnText:      '#92400E',
  warnBorder:    '#FDE68A',
  errorBg:       '#FEF2F2',
  errorText:     '#991B1B',
  errorBorder:   '#FECACA',
};

/* ─────────────────────────── STYLES ─────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }

  .ch-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    background: ${C.background};
    color: ${C.textPrimary};
    padding: 2rem 1.5rem 4rem;
  }

  .ch-page-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 1.75rem; padding-bottom: 1.25rem;
    border-bottom: 2px solid ${C.border};
  }
  .ch-page-title { font-size: 1.5rem; font-weight: 800; color: ${C.textPrimary}; letter-spacing: -0.02em; margin: 0 0 3px; }
  .ch-page-sub   { font-size: 0.8rem; color: ${C.textSecondary}; font-weight: 500; margin: 0; }

  .ch-refresh-btn {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0 1rem; height: 36px;
    border: 1.5px solid ${C.border}; border-radius: 10px;
    background: ${C.white}; color: ${C.textSecondary};
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.78rem; font-weight: 600; cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .ch-refresh-btn:hover { border-color: ${C.primary}; color: ${C.primary}; }

  .ch-card {
    background: ${C.white}; border: 1.5px solid ${C.border};
    border-radius: 16px; overflow: hidden; margin-bottom: 1rem;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .ch-card:hover { box-shadow: 0 4px 20px rgba(46,111,131,0.1); border-color: ${C.primaryMid}; }

  .ch-card-header {
    display: flex; flex-wrap: wrap; align-items: center;
    justify-content: space-between; gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: ${C.primary};
    border-bottom: 1px solid ${C.primaryDark};
  }
  .ch-avatar {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ch-customer-name { font-size: 0.88rem; font-weight: 700; color: #fff; line-height: 1.2; margin: 0 0 3px; }
  .ch-customer-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; }
  .ch-meta-item { display: flex; align-items: center; gap: 0.3rem; font-size: 0.72rem; color: rgba(255,255,255,0.75); font-weight: 500; }

  .ch-badge { display: inline-flex; align-items: center; gap: 0.3rem; padding: 3px 10px; border-radius: 100px; font-size: 0.68rem; font-weight: 700; border: 1px solid transparent; }
  .ch-badge-active  { background: ${C.successBg}; color: ${C.successText}; border-color: ${C.successBorder}; }
  .ch-badge-warn    { background: ${C.warnBg};    color: ${C.warnText};    border-color: ${C.warnBorder}; }
  .ch-badge-error   { background: ${C.errorBg};   color: ${C.errorText};   border-color: ${C.errorBorder}; }
  .ch-badge-ghost   { background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.25); }
  .ch-badge-accent  { background: ${C.accentLight}; color: #92400E; border-color: ${C.accentBorder}; }
  .ch-badge-date    { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.2); }
  .ch-badge-neutral { background: ${C.primaryLight}; color: ${C.primary}; border-color: ${C.primaryMid}; }

  .ch-delete-btn {
    width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
    border-radius: 8px; background: rgba(239,68,68,0.18); border: 1px solid rgba(239,68,68,0.3);
    cursor: pointer; transition: background 0.2s, border-color 0.2s;
  }
  .ch-delete-btn:hover:not(:disabled) { background: rgba(239,68,68,0.3); border-color: rgba(239,68,68,0.5); }
  .ch-delete-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .ch-products-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.6rem 1.25rem;
    background: ${C.primaryLight}; border-bottom: 1px solid ${C.primaryMid};
  }
  .ch-products-label { font-size: 0.67rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: ${C.primary}; display: flex; align-items: center; gap: 0.4rem; }
  .ch-col-headers { display: none; gap: 0.75rem; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.icon}; }
  @media (min-width: 640px) { .ch-col-headers { display: grid; grid-template-columns: 26px 1fr 110px 120px 20px; } }

  .ch-product-row {
    display: grid; align-items: center; gap: 0.75rem;
    padding: 0.7rem 1.25rem; cursor: pointer;
    border-bottom: 1px solid ${C.border}; transition: background 0.15s;
    grid-template-columns: 26px 1fr 110px 120px 20px;
  }
  .ch-product-row:last-child { border-bottom: none; }
  .ch-product-row:hover { background: ${C.primaryLight}; }
  .ch-product-row.open  { background: ${C.primaryLight}; }

  .ch-product-index {
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 700;
    background: ${C.primaryMid}; color: ${C.primaryDark}; flex-shrink: 0;
  }
  .ch-ticket-badge {
    display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 8px;
    font-size: 0.7rem; font-family: monospace; font-weight: 700;
    background: ${C.primaryLight}; color: ${C.primary}; border: 1px solid ${C.primaryMid};
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
  }
  .ch-config-chip {
    display: inline-flex; align-items: center; gap: 0.25rem;
    padding: 2px 8px; border-radius: 6px; font-size: 0.65rem;
    background: ${C.background}; border: 1px solid ${C.border};
  }
  .ch-config-key   { color: ${C.icon}; }
  .ch-config-value { color: ${C.textPrimary}; font-weight: 600; }

  .ch-product-expand {
    padding: 1rem 1.25rem; background: ${C.primaryLight};
    border-bottom: 1px solid ${C.primaryMid}; border-top: 1px solid ${C.primaryMid};
  }
  .ch-expand-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  @media (max-width: 540px) { .ch-expand-grid { grid-template-columns: 1fr; } }

  .ch-detail-panel { background: ${C.white}; border: 1.5px solid ${C.border}; border-radius: 12px; padding: 0.85rem 1rem; }
  .ch-detail-panel-title { font-size: 0.62rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.6rem; }
  .ch-detail-panel-title.primary { color: ${C.primary}; }
  .ch-detail-panel-title.accent  { color: ${C.accent}; }

  .ch-detail-row { display: flex; align-items: center; gap: 0.6rem; padding: 4px 0; border-bottom: 1px solid ${C.background}; font-size: 0.75rem; }
  .ch-detail-row:last-child { border-bottom: none; }
  .ch-detail-label { color: ${C.icon}; min-width: 52px; font-weight: 500; }
  .ch-detail-value { color: ${C.textPrimary}; font-weight: 600; }

  .ch-pw-cell { display: flex; align-items: center; gap: 0.35rem; }
  .ch-pw-text { font-size: 0.72rem; font-family: monospace; font-weight: 600; color: ${C.textPrimary}; letter-spacing: 0.1em; }
  .ch-icon-btn { width: 22px; height: 22px; border-radius: 6px; border: none; background: ${C.background}; color: ${C.icon}; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.15s, color 0.15s; }
  .ch-icon-btn:hover { background: ${C.primaryMid}; color: ${C.primary}; }

  .ch-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 1rem; text-align: center; }
  .ch-empty-icon { width: 56px; height: 56px; border-radius: 16px; background: ${C.primaryLight}; border: 1.5px solid ${C.primaryMid}; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }

  .ch-error-wrap { display: flex; align-items: center; justify-content: center; min-height: 400px; padding: 2rem; }
  .ch-error-card { background: ${C.white}; border: 1.5px solid ${C.border}; border-radius: 20px; padding: 2.5rem 2rem; max-width: 380px; width: 100%; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
  .ch-error-icon { width: 52px; height: 52px; border-radius: 14px; background: ${C.errorBg}; border: 1.5px solid ${C.errorBorder}; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }

  .ch-loading { display: flex; align-items: center; justify-content: center; min-height: 400px; }
  .ch-spinner { width: 36px; height: 36px; border: 3px solid ${C.primaryMid}; border-top-color: ${C.primary}; border-radius: 50%; animation: chSpin 0.7s linear infinite; }
  @keyframes chSpin { to { transform: rotate(360deg); } }

  .ch-pagination { display: flex; align-items: center; justify-content: space-between; background: ${C.white}; border: 1.5px solid ${C.border}; border-radius: 14px; padding: 0.75rem 1.25rem; margin-top: 1.5rem; }
  .ch-pagination-text { font-size: 0.78rem; color: ${C.textSecondary}; }
  .ch-pagination-text strong { color: ${C.textPrimary}; font-weight: 700; }
  .ch-pag-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1.5px solid ${C.border}; background: ${C.white}; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
  .ch-pag-btn:hover:not(:disabled) { border-color: ${C.primary}; background: ${C.primaryLight}; }
  .ch-pag-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .ch-pag-num { font-size: 0.78rem; font-weight: 700; color: ${C.textPrimary}; padding: 0 0.5rem; }

  .spin-slow { animation: chSpin 1s linear infinite; }
`;

/* ─────────────────────────── HELPERS ─────────────────────────── */
const fmt = (d) => {
  if (!d) return 'N/A';
  try { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return 'N/A'; }
};

const warrantyStatus = (endDate) => {
  if (!endDate) return { label: 'Unknown',       cls: 'ch-badge ch-badge-ghost' };
  const days = Math.ceil((new Date(endDate) - new Date()) / 86400000);
  if (days < 0)   return { label: 'Expired',       cls: 'ch-badge ch-badge-error' };
  if (days <= 30) return { label: 'Expiring Soon', cls: 'ch-badge ch-badge-warn' };
  return               { label: 'Active',         cls: 'ch-badge ch-badge-active' };
};

// ─────────────────────────────────────────────────────────────────────────────
//  toPlainConfig — DEFENSIVE DATA NORMALIZATION
//
//  The API can return configurations in 3 different shapes:
//  1. mongoose Map object  → convert via Object.fromEntries()
//  2. Plain JS object      → use directly (your current API returns this)
//  3. null / undefined     → return empty object safely
//
//  This function handles ALL 3 cases without crashing.
// ─────────────────────────────────────────────────────────────────────────────
const toPlainConfig = (raw) => {
  if (!raw) return {};
  if (raw instanceof Map) return Object.fromEntries(raw);
  if (typeof raw === 'object' && !Array.isArray(raw)) return raw;
  return {};
};

/* ─────────────────────────── SUB-COMPONENTS ─────────────────────────── */
const StyleTag = () => <style>{styles}</style>;

const PasswordCell = ({ password }) => {
  const [vis, setVis]       = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(password || '');
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  if (!password) return <span style={{ fontSize: '0.72rem', color: C.icon, fontStyle: 'italic' }}>Not available</span>;
  return (
    <div className="ch-pw-cell">
      <span className="ch-pw-text">{vis ? password : '••••••••'}</span>
      <button className="ch-icon-btn" onClick={() => setVis(v => !v)}>
        {vis ? <EyeOff size={11} /> : <Eye size={11} />}
      </button>
      <button className="ch-icon-btn" onClick={copy}>
        {copied ? <Check size={11} color={C.primary} /> : <Copy size={11} />}
      </button>
    </div>
  );
};

const ConfigChips = ({ config }) => {
  const entries = Object.entries(config || {});
  if (!entries.length) return <span style={{ fontSize: '0.72rem', color: C.icon, fontStyle: 'italic' }}>No specs</span>;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
      {entries.map(([k, v]) => (
        <span key={k} className="ch-config-chip">
          <span className="ch-config-key">{k}:</span>
          <span className="ch-config-value">{String(v)}</span>
        </span>
      ))}
    </div>
  );
};

const ProductRow = ({ product, index }) => {
  const [open, setOpen] = useState(false);

  // ── FIX 1: read BOTH 'configSnapshot' (registered) and 'configurations' (raw product) ──
  const config        = toPlainConfig(product.configSnapshot || product.configurations);
  const ws            = warrantyStatus(product.warrEndDate);
  const configEntries = Object.entries(config);

  return (
    <>
      <div
        className={`ch-product-row ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="ch-product-index">{index + 1}</span>

        <span className="ch-ticket-badge">{product.ticketNumber || '—'}</span>

        <span className={ws.cls}>
          <ShieldCheck size={10} />{ws.label}
        </span>

        {/* Config preview chips — max 3 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', overflow: 'hidden', maxHeight: 22 }}>
          {configEntries.slice(0, 3).map(([k, v]) => (
            <span key={k} className="ch-config-chip">
              <span className="ch-config-key">{k}:</span>
              <span className="ch-config-value">{String(v)}</span>
            </span>
          ))}
          {configEntries.length > 3 && (
            <span style={{ fontSize: '0.65rem', color: C.icon, alignSelf: 'center' }}>
              +{configEntries.length - 3} more
            </span>
          )}
        </div>

        <ChevronDown
          size={14} color={C.icon}
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
        />
      </div>

      {open && (
        <div className="ch-product-expand">
          <div className="ch-expand-grid">

            {/* Warranty dates panel */}
            <div className="ch-detail-panel">
              <div className="ch-detail-panel-title primary">Warranty Period</div>
              <div className="ch-detail-row">
                <Clock size={12} color={C.primary} />
                <span className="ch-detail-label">Starts</span>
                <span className="ch-detail-value">{fmt(product.warrStartDate)}</span>
              </div>
              <div className="ch-detail-row">
                <Clock size={12} color={C.primary} />
                <span className="ch-detail-label">Ends</span>
                <span className="ch-detail-value" style={{ color: ws.label === 'Expired' ? '#DC2626' : C.textPrimary }}>
                  {fmt(product.warrEndDate)}
                </span>
              </div>
              {/* ── FIX 2: show category from 'category.name' not 'categoryRef.name' ── */}
              {product.categoryName && (
                <div className="ch-detail-row">
                  <Package size={12} color={C.primary} />
                  <span className="ch-detail-label">Category</span>
                  <span className="ch-detail-value">{product.categoryName}</span>
                </div>
              )}
            </div>

            {/* All specs panel */}
            <div className="ch-detail-panel">
              <div className="ch-detail-panel-title accent">All Specifications</div>
              <ConfigChips config={config} />
            </div>

          </div>
        </div>
      )}
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   extractDisplayData — SINGLE SOURCE OF TRUTH FOR DATA MAPPING
   
   WHAT CHANGED AND WHY:
   
   Before (broken):
   - configSnapshot: toPlainConfig(p.configSnapshot)
     → your API returns 'configurations' not 'configSnapshot'
     → result: all chips showed "No specs"
   
   - categoryRef?.name
     → your API returns category: { name: "Laptop" } not categoryRef
     → result: category never showed

   After (fixed):
   - configSnapshot: toPlainConfig(p.configSnapshot || p.configurations)
     → reads whichever key exists, handles both old and new records
   
   - category?.name || categoryRef?.name
     → tries both keys, works regardless of field name
   
   PRODUCTION TECHNIQUE: Defensive normalization with fallback chains.
   Each field tries the most likely key first, falls back to alternatives,
   finally falls back to null. The UI never crashes from a missing key.
─────────────────────────────────────────────────────────────────────────────── */
const extractDisplayData = (customer) => {
  const fp = customer.products?.[0] || {};

  // Read config from whichever key exists on the first product
  const cfg = toPlainConfig(fp.configSnapshot || fp.configurations);

  const products = (customer.products || []).map(p => ({
    _id:          p._id,
    ticketNumber: p.ticketNumber || null,

    // FIX: API returns 'category.name', component was reading 'categoryRef.name'
    categoryName: p.category?.name     ||   // raw product API: category.name
                  p.categoryRef?.name  ||   // registered product: categoryRef.name
                  p.categoryName       ||   // pre-extracted string
                  null,

    // FIX: API returns 'configurations', component was reading 'configSnapshot'
    configSnapshot: toPlainConfig(
      p.configSnapshot  ||   // registered product schema field
      p.configurations  ||   // raw product schema field  ← your API uses this
      {}
    ),

    // Warranty dates — present on registered products (customerdetails.products[])
    // NOT present on raw product documents from /category/allproducts
    warrStartDate: p.warrStartDate || null,
    warrEndDate:   p.warrEndDate   || null,
  }));

  return {
    _id:          customer._id,
    customerName: customer.customerName || 'N/A',
    email:        customer.email        || 'N/A',
    mobileNum:    customer.mobileNum    || 'N/A',
    purchaseType: customer.purchaseType || 'single',
    status:       customer.status       || 'active',
    createdAt:    customer.createdAt,
    // Warranty on header badge comes from first product's warrEndDate
    warrEndDate:  fp.warrEndDate || null,
    products,
    plainPassword: null,
  };
};

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */
const CustomerCareCustomerHistory = () => {
  const [data,        setData]        = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId,  setDeletingId]  = useState(null);
  const itemsPerPage = 5;

  const handleDelete = async (id, customerName) => {
    if (!window.confirm(`Deactivate "${customerName}"? This will hide them from the list.`)) return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/customerDetails/registrations/${id}`);
      // Optimistic update — remove from state instantly, no re-fetch needed
      setData(prev => prev.filter(c => c._id !== id));
      setCurrentPage(1);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to deactivate customer');
    } finally {
      setDeletingId(null);
    }
  };

  const handleFetchData = async () => {
    try {
      setLoading(true); setError(null);
      const res = await axiosInstance.get('/customerDetails/registrations');
      const d   = res.data;
      // Defensive shape handling — API might return data in different wrappers
      if      (Array.isArray(d?.data))      setData(d.data);
      else if (Array.isArray(d?.customers)) setData(d.customers);
      else if (Array.isArray(d))            setData(d);
      else { setError('Invalid data format received from server'); }
    } catch (err) {
      // Typed error handling — each status code = different message
      if      (err.response?.status === 401) setError('Session expired. Please login again.');
      else if (err.response?.status === 403) setError("You don't have permission to view this data.");
      else if (err.response?.status === 404) setError('Endpoint not found.');
      else                                   setError('Failed to fetch customer details. Please try again.');
    } finally { setLoading(false); }
  };

  useEffect(() => { handleFetchData(); }, []);

  const indexOfLast  = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);
  const totalPages   = Math.ceil(data.length / itemsPerPage);

  /* ── Loading ── */
  if (loading) return (
    <>
      <StyleTag />
      <div className="ch-loading">
        <div style={{ textAlign: 'center' }}>
          <div className="ch-spinner" style={{ margin: '0 auto 0.75rem' }} />
          <p style={{ fontSize: '0.82rem', color: C.textSecondary, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            Loading customer records…
          </p>
        </div>
      </div>
    </>
  );

  /* ── Error ── */
  if (error) return (
    <>
      <StyleTag />
      <div className="ch-error-wrap">
        <div className="ch-error-card">
          <div className="ch-error-icon"><AlertCircle size={22} color="#DC2626" /></div>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, color: C.textPrimary, margin: '0 0 0.4rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            Something went wrong
          </p>
          <p style={{ fontSize: '0.8rem', color: C.textSecondary, margin: '0 0 1.5rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {error}
          </p>
          <button onClick={handleFetchData}
            style={{ width: '100%', height: 44, borderRadius: 10, border: 'none', background: C.primary, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
            Try Again
          </button>
        </div>
      </div>
    </>
  );

  /* ── Main ── */
  return (
    <div className="ch-root">
      <StyleTag />

      {/* Page Header */}
      <div className="ch-page-header">
        <div>
          <h1 className="ch-page-title">Customer Product History</h1>
          <p className="ch-page-sub">{data.length} total records</p>
        </div>
        <button className="ch-refresh-btn" onClick={handleFetchData}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Empty state */}
      {currentItems.length === 0 && (
        <div className="ch-empty">
          <div className="ch-empty-icon">
            <Package size={26} color={C.primary} />
          </div>
          <p style={{ fontSize: '0.88rem', fontWeight: 700, color: C.textPrimary, margin: '0 0 4px' }}>
            No customer records yet
          </p>
          <p style={{ fontSize: '0.78rem', color: C.textSecondary, margin: 0 }}>
            Records will appear here once added.
          </p>
        </div>
      )}

      {/* Customer cards */}
      <div>
        {currentItems.map((raw, idx) => {
          const item = extractDisplayData(raw);
          const ws   = warrantyStatus(item.warrEndDate);

          return (
            <div key={item._id || idx} className="ch-card">

              {/* ── Card header ── */}
              <div className="ch-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="ch-avatar">
                    <User size={17} color="#fff" />
                  </div>
                  <div>
                    <p className="ch-customer-name">{item.customerName}</p>
                    <div className="ch-customer-meta">
                      <span className="ch-meta-item"><Mail size={11} />{item.email}</span>
                      <span className="ch-meta-item"><Phone size={11} />{item.mobileNum}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {/* Warranty badge */}
                  <span className={ws.cls}>
                    <ShieldCheck size={10} />{ws.label}
                  </span>

                  {/* Purchase type */}
                  {item.purchaseType === 'bulk'
                    ? <span className="ch-badge ch-badge-accent"><Layers size={10} /> Bulk ({item.products.length})</span>
                    : <span className="ch-badge ch-badge-ghost"><ShoppingBag size={10} /> Single</span>
                  }

                  {/* Registration date */}
                  <span className="ch-badge ch-badge-date">
                    <Calendar size={10} />{fmt(item.createdAt)}
                  </span>

                  {/* Customer ID badge — useful for complaint lookup */}
                  <span className="ch-badge ch-badge-neutral" style={{ fontFamily: 'monospace', fontSize: '0.6rem' }}
                    title="Customer ID — use this for complaint lookup">
                    ID: {item._id?.slice(-8)}
                  </span>

                  {/* Delete button */}
                  <button
                    className="ch-delete-btn"
                    onClick={(e) => { e.stopPropagation(); handleDelete(item._id, item.customerName); }}
                    disabled={deletingId === item._id}
                    title="Deactivate customer"
                  >
                    {deletingId === item._id
                      ? <div style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'chSpin 0.7s linear infinite' }} />
                      : <Trash2 size={13} color="#FCA5A5" />
                    }
                  </button>
                </div>
              </div>

              {/* ── Products table ── */}
              {item.products.length > 0 && (
                <div>
                  {/* Table header */}
                  <div className="ch-products-header">
                    <p className="ch-products-label">
                      <Package size={12} />
                      Registered Products ({item.products.length})
                    </p>
                    <div className="ch-col-headers" style={{ paddingRight: '1.25rem' }}>
                      <span />
                      <span>Ticket #</span>
                      <span>Warranty</span>
                      <span>Config Preview</span>
                      <span />
                    </div>
                  </div>

                  {/* One row per product */}
                  {item.products.map((product, pIdx) => (
                    <ProductRow key={product._id || pIdx} product={product} index={pIdx} />
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {data.length > itemsPerPage && (
        <div className="ch-pagination">
          <p className="ch-pagination-text">
            Showing <strong>{indexOfFirst + 1}</strong>–<strong>{Math.min(indexOfLast, data.length)}</strong> of <strong>{data.length}</strong>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="ch-pag-btn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              <ChevronLeft size={15} color={C.textSecondary} />
            </button>
            <span className="ch-pag-num">{currentPage} / {totalPages}</span>
            <button className="ch-pag-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              <ChevronRight size={15} color={C.textSecondary} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCareCustomerHistory;
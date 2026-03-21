import React, { useState, useRef } from 'react';
import axiosInstance from '../../Utils/axiosIntance';
import {
  Search, User, Phone, Mail, Package, Hash,
  Calendar, Shield, AlertTriangle, CheckCircle2,
  XCircle, Loader2, Wrench, ChevronDown,
  TicketCheck, Send, RotateCcw,
} from 'lucide-react';

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────── */
const C = {
  primary:       '#2E6F83',
  primaryDark:   '#2A6577',
  background:    '#F4F6F8',
  accent:        '#E5A93D',
  textPrimary:   '#1F2937',
  textSecondary: '#6B7280',
  icon:          '#9CA3AF',
  white:         '#FFFFFF',
  border:        '#E2E8ED',
  borderHover:   '#C8D6DC',
  cardBg:        '#FFFFFF',
  sectionBg:     '#F8FAFC',
};

/* ─────────────────────────── STYLES ─────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .cc-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    background: ${C.background};
    color: ${C.textPrimary};
    padding: 2.5rem 1.5rem 4rem;
  }

  .cc-container { max-width: 700px; margin: 0 auto; }

  /* ── Header ── */
  .cc-header {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 1.75rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid ${C.border};
  }
  .cc-header-icon {
    width: 48px; height: 48px;
    background: ${C.primary};
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(46,111,131,0.3);
    flex-shrink: 0;
  }
  .cc-title {
    font-size: 1.5rem; font-weight: 800;
    color: ${C.textPrimary}; letter-spacing: -0.02em;
    line-height: 1.1; margin: 0 0 3px;
  }
  .cc-subtitle { font-size: 0.8rem; color: ${C.textSecondary}; font-weight: 500; margin: 0; }

  /* ── Step indicator ── */
  .cc-step-row {
    display: flex; align-items: center;
    margin-bottom: 1.25rem;
  }
  .cc-step-item { display: flex; align-items: center; gap: 0.5rem; flex: 1; }
  .cc-step-dot {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 700; flex-shrink: 0; transition: all 0.2s;
  }
  .cc-step-dot.active  { background: ${C.primary}; color: #fff; box-shadow: 0 2px 8px rgba(46,111,131,0.35); }
  .cc-step-dot.done    { background: #D1FAE5; color: #065F46; }
  .cc-step-dot.inactive{ background: ${C.border}; color: ${C.icon}; }
  .cc-step-name { font-size: 0.75rem; font-weight: 600; color: ${C.textSecondary}; }
  .cc-step-name.active { color: ${C.primary}; }
  .cc-step-connector { flex: 1; height: 2px; background: ${C.border}; margin: 0 0.5rem; max-width: 48px; }
  .cc-step-connector.done { background: ${C.primary}; }

  /* ── Cards ── */
  .cc-card {
    background: ${C.white}; border: 1.5px solid ${C.border};
    border-radius: 16px; overflow: hidden; margin-bottom: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cc-card:hover { border-color: ${C.borderHover}; }
  .cc-card.found { border-color: #6EE7B7; box-shadow: 0 0 0 3px rgba(52,211,153,0.1); }
  .cc-card.dimmed { opacity: 0.55; pointer-events: none; }

  .cc-card-header {
    padding: 0.85rem 1.25rem; border-bottom: 1.5px solid ${C.border};
    display: flex; align-items: center; justify-content: space-between;
    background: ${C.sectionBg};
  }
  .cc-card-label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; display: flex; align-items: center;
    gap: 0.45rem; color: ${C.textSecondary};
  }
  .cc-card-label.primary { color: ${C.primary}; }
  .cc-card-label.success { color: #059669; }

  .cc-badge {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase; padding: 3px 10px; border-radius: 100px;
    background: #D1FAE5; color: #065F46; border: 1px solid #A7F3D0;
  }

  .cc-card-body { padding: 1.25rem; }

  /* ── Fields ── */
  .cc-field { margin-bottom: 0; }
  .cc-field + .cc-field { margin-top: 1rem; }

  .cc-label {
    display: block; font-size: 0.75rem; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: ${C.textSecondary}; margin-bottom: 0.45rem;
  }
  .cc-req { color: ${C.accent}; }

  .cc-input-wrap { position: relative; }

  .cc-input, .cc-select, .cc-textarea {
    width: 100%; background: ${C.white};
    border: 1.5px solid ${C.border}; border-radius: 10px;
    color: ${C.textPrimary}; font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem; font-weight: 500;
    transition: border-color 0.2s, box-shadow 0.2s; outline: none;
  }
  .cc-input   { padding: 0.7rem 2.6rem 0.7rem 0.9rem; }
  .cc-select  { padding: 0.7rem 2.4rem 0.7rem 0.9rem; appearance: none; cursor: pointer; }
  .cc-textarea{ padding: 0.7rem 0.9rem; resize: none; }

  .cc-input::placeholder, .cc-textarea::placeholder { color: ${C.icon}; font-weight: 400; }

  .cc-input:focus, .cc-select:focus, .cc-textarea:focus {
    border-color: ${C.primary};
    box-shadow: 0 0 0 3px rgba(46,111,131,0.12);
  }
  .cc-input.state-found {
    border-color: #6EE7B7; background: #F0FDF9;
    box-shadow: 0 0 0 3px rgba(52,211,153,0.1);
  }
  .cc-input.state-error, .cc-select.state-error, .cc-textarea.state-error {
    border-color: #FCA5A5; box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
  }

  .cc-input-icon {
    position: absolute; right: 0.8rem; top: 50%; transform: translateY(-50%);
    pointer-events: none; display: flex; align-items: center;
  }
  .cc-select-arrow {
    position: absolute; right: 0.8rem; top: 50%; transform: translateY(-50%);
    pointer-events: none; color: ${C.icon}; display: flex; align-items: center;
  }

  .cc-field-error {
    display: flex; align-items: center; gap: 0.3rem;
    margin-top: 0.35rem; font-size: 0.74rem; font-weight: 500; color: #DC2626;
  }
  .cc-lookup-msg {
    display: flex; align-items: center; gap: 0.3rem;
    margin-top: 0.35rem; font-size: 0.74rem; font-weight: 500;
  }
  .cc-lookup-msg.error   { color: #DC2626; }
  .cc-lookup-msg.loading { color: ${C.primary}; }

  /* ── Customer Info Grid ── */
  .cc-info-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem;
  }
  @media (max-width: 520px) { .cc-info-grid { grid-template-columns: 1fr; } }

  .cc-info-section-title {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: ${C.icon};
    margin-bottom: 0.75rem; padding-bottom: 0.5rem;
    border-bottom: 1.5px solid ${C.border};
  }
  .cc-info-item {
    display: flex; align-items: center; gap: 0.6rem;
    padding: 0.45rem 0; border-bottom: 1px solid ${C.sectionBg};
  }
  .cc-info-item:last-child { border-bottom: none; }
  .cc-info-icon-wrap {
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(46,111,131,0.08);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: ${C.primary};
  }
  .cc-info-label {
    font-size: 0.68rem; color: ${C.icon}; font-weight: 500;
    line-height: 1; margin-bottom: 2px;
  }
  .cc-info-value {
    font-size: 0.85rem; font-weight: 600; color: ${C.textPrimary};
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .cc-warranty-pill {
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-size: 0.73rem; font-weight: 700; padding: 2px 9px; border-radius: 100px;
    background: #D1FAE5; color: #065F46; border: 1px solid #A7F3D0;
  }

  /* ── Char count ── */
  .cc-char-count {
    text-align: right; font-size: 0.7rem; font-weight: 500;
    color: ${C.icon}; margin-top: 0.3rem;
  }
  .cc-char-count.warn { color: ${C.accent}; }

  /* ── Buttons ── */
  .cc-btn-row { display: flex; gap: 0.75rem; margin-top: 1.25rem; }

  .cc-btn-reset {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0 1.2rem; height: 48px;
    border: 1.5px solid ${C.border}; border-radius: 10px;
    background: ${C.white}; color: ${C.textSecondary};
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.8rem; font-weight: 700; cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .cc-btn-reset:hover {
    border-color: ${C.primaryDark}; color: ${C.primaryDark};
    background: rgba(46,111,131,0.04);
  }

  .cc-btn-submit {
    flex: 1; display: flex; align-items: center; justify-content: center;
    gap: 0.5rem; height: 48px; border: none; border-radius: 10px;
    background: ${C.primary}; color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.88rem; font-weight: 700; letter-spacing: 0.02em;
    cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(46,111,131,0.35);
  }
  .cc-btn-submit:hover:not(:disabled) {
    background: ${C.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(46,111,131,0.4);
  }
  .cc-btn-submit:active:not(:disabled) { transform: translateY(0); }
  .cc-btn-submit:disabled { opacity: 0.45; cursor: not-allowed; box-shadow: none; }

  /* ── Toast ── */
  .cc-toast {
    position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.85rem 1.1rem; border-radius: 12px;
    font-size: 0.84rem; font-weight: 600;
    animation: ccSlideUp 0.3s ease; max-width: 340px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }
  .cc-toast.success { background: #ECFDF5; border: 1.5px solid #A7F3D0; color: #065F46; }
  .cc-toast.error   { background: #FEF2F2; border: 1.5px solid #FECACA; color: #991B1B; }
  .cc-toast-close {
    background: none; border: none; cursor: pointer;
    color: inherit; opacity: 0.5; font-size: 0.95rem; padding: 0; margin-left: 0.3rem;
  }
  .cc-toast-close:hover { opacity: 1; }
  @keyframes ccSlideUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Success Screen ── */
  .cc-success-wrap {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; padding: 2rem; background: ${C.background};
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .cc-success-card {
    background: ${C.white}; border: 1.5px solid ${C.border};
    border-radius: 20px; padding: 3rem 2.5rem;
    max-width: 420px; width: 100%; text-align: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  }
  .cc-success-icon-ring {
    width: 72px; height: 72px; background: #D1FAE5;
    border: 2px solid #A7F3D0; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem;
  }
  .cc-success-title {
    font-size: 1.5rem; font-weight: 800; color: ${C.textPrimary};
    letter-spacing: -0.02em; margin: 0 0 0.5rem;
  }
  .cc-success-text  { color: ${C.textSecondary}; font-size: 0.88rem; margin: 0 0 0.4rem; font-weight: 500; }
  .cc-success-email { color: ${C.icon}; font-size: 0.8rem; margin: 0 0 2rem; }
  .cc-success-email strong { color: ${C.textSecondary}; }

  .spin { animation: ccSpin 0.8s linear infinite; }
  @keyframes ccSpin { to { transform: rotate(360deg); } }
`;

/* ─────────────────────────── SUB-COMPONENTS ─────────────────────────── */
const StyleTag = () => <style>{styles}</style>;

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  return (
    <div className={`cc-toast ${toast.type}`}>
      {toast.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
      <span>{toast.message}</span>
      <button className="cc-toast-close" onClick={onClose}>✕</button>
    </div>
  );
};

const InfoItem = ({ icon, label, value, pill }) => (
  <div className="cc-info-item">
    <div className="cc-info-icon-wrap">{icon}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="cc-info-label">{label}</div>
      {pill
        ? <span className="cc-warranty-pill"><CheckCircle2 size={10} />{value || '—'}</span>
        : <div className="cc-info-value">{value || '—'}</div>
      }
    </div>
  </div>
);

const Field = ({ label, required, error, children }) => (
  <div className="cc-field">
    <label className="cc-label">
      {label}{required && <span className="cc-req"> *</span>}
    </label>
    {children}
    {error && (
      <div className="cc-field-error">
        <AlertTriangle size={11} />{error}
      </div>
    )}
  </div>
);

/* ─────────────────────────── CONSTANTS ─────────────────────────── */
const INITIAL_FORM = {
  customerName: '', customerEmail: '', customerPhone: '',
  ticketNumber: '', productName: '', serialNumber: '',
  purchaseDate: '', warrantyStatus: 'In Warranty', warrEndDate: '',
  issueTitle: '', issueDescription: '', issueType: '',
};
const INITIAL_ERRORS = {
  ticketNumber: '', issueTitle: '', issueDescription: '', issueType: '',
};

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */
const CustomerCareComplains = () => {
  const [form, setForm]                 = useState(INITIAL_FORM);
  const [errors, setErrors]             = useState(INITIAL_ERRORS);
  const [customerData, setCustomerData] = useState(null);
  const [ticketInput, setTicketInput]   = useState('');
  const [lookupStatus, setLookupStatus] = useState('idle');
  const [submitting, setSubmitting]     = useState(false);
  const [toast, setToast]               = useState(null);
  const [submitted, setSubmitted]       = useState(false);
  const debounceRef                     = useRef(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleTicketInput = (val) => {
    setTicketInput(val);
    setLookupStatus('idle');
    setCustomerData(null);
    setForm(prev => ({
      ...prev,
      customerName: '', customerEmail: '', customerPhone: '',
      ticketNumber: val, productName: '', serialNumber: '',
      purchaseDate: '', warrantyStatus: 'In Warranty',
    }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length < 3) return;
    debounceRef.current = setTimeout(() => lookupTicket(val.trim()), 600);
  };

  const lookupTicket = async (ticket) => {
    try {
      setLookupStatus('loading');
      const query = ticket.toUpperCase();

      const res = await axiosInstance.get('/customerDetails/registrations');
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

      if (!foundCustomer || !foundProduct) {
        setLookupStatus('notfound');
        return;
      }

      setCustomerData({ customer: foundCustomer, product: foundProduct });
      setLookupStatus('found');

      const snap = foundProduct.configSnapshot || {};

      // Determine warranty status from warrEndDate
      let warrantyStatus = 'Out of Warranty';
      if (foundProduct.warrEndDate) {
        warrantyStatus = new Date(foundProduct.warrEndDate) >= new Date()
          ? 'In Warranty'
          : 'Out of Warranty';
      }

      setForm(prev => ({
        ...prev,
        customerName:   foundCustomer.customerName  || '',
        customerEmail:  foundCustomer.email         || '',
        customerPhone:  foundCustomer.mobileNum     || foundCustomer.phone || '',
        ticketNumber:   ticket,
        productName:    snap.companyname  || snap.company_name  || snap.modelnumber || '',
        serialNumber:   snap.serialnumber || snap.serial_numebr || snap.serialNo    || '',
        purchaseDate:   foundProduct.warrStartDate  || '',
        warrantyStatus,
        warrEndDate:    foundProduct.warrEndDate || '',
      }));
    } catch (err) {
      console.error('Ticket lookup error:', err.message);
      setLookupStatus('error');
    }
  };

  const validate = () => {
    const e = { ticketNumber: '', issueTitle: '', issueDescription: '', issueType: '' };
    let valid = true;
    if (!form.ticketNumber.trim())             { e.ticketNumber     = 'Ticket number is required'; valid = false; }
    if (lookupStatus !== 'found')              { e.ticketNumber     = 'Please enter a valid ticket number with customer details'; valid = false; }
    if (!form.issueTitle.trim())               { e.issueTitle       = 'Issue title is required'; valid = false; }
    if (!form.issueDescription.trim())         { e.issueDescription = 'Issue description is required'; valid = false; }
    else if (form.issueDescription.trim().length < 20) { e.issueDescription = 'Please describe the issue in at least 20 characters'; valid = false; }
    if (!form.issueType)                       { e.issueType        = 'Please select an issue type'; valid = false; }
    setErrors(e);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      const payload = {
        customerName: form.customerName, customerEmail: form.customerEmail,
        customerPhone: form.customerPhone, ticketNumber: form.ticketNumber,
        productName: form.productName, serialNumber: form.serialNumber,
        purchaseDate: form.purchaseDate || undefined, warrantyStatus: form.warrantyStatus,
        issueTitle: form.issueTitle.trim(), issueDescription: form.issueDescription.trim(),
        issueType: form.issueType,
      };
      await axiosInstance.post('/complaint/raise-complaint', payload);
      setSubmitted(true);
      showToast('success', 'Complaint raised successfully!');
    } catch (err) {
      console.error('Submit error:', err);
      showToast('error', err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM); setErrors(INITIAL_ERRORS);
    setTicketInput(''); setCustomerData(null);
    setLookupStatus('idle'); setSubmitted(false);
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <>
        <StyleTag />
        <div className="cc-success-wrap">
          <div className="cc-success-card">
            <div className="cc-success-icon-ring">
              <CheckCircle2 size={32} color="#059669" />
            </div>
            <h2 className="cc-success-title">Complaint Submitted</h2>
            <p className="cc-success-text">
              Ticket{' '}
              <span style={{ fontFamily: 'monospace', color: C.primary, fontWeight: 700 }}>
                {form.ticketNumber}
              </span>{' '}
              has been registered.
            </p>
            <p className="cc-success-email">
              Confirmation sent to <strong>{form.customerEmail}</strong>
            </p>
            <button
              className="cc-btn-submit"
              style={{ flex: 'none', width: '100%' }}
              onClick={handleReset}
            >
              <RotateCcw size={15} /> Raise Another Complaint
            </button>
          </div>
        </div>
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  const step1Done = lookupStatus === 'found';

  /* ── Main Form ── */
  return (
    <div className="cc-root">
      <StyleTag />
      <div className="cc-container">

        {/* Header */}
        <div className="cc-header">
          <div className="cc-header-icon">
            <TicketCheck size={22} color="#fff" />
          </div>
          <div>
            <h1 className="cc-title">Raise a Complaint</h1>
            <p className="cc-subtitle">Customer Care Portal · Issue Escalation</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="cc-step-row">
          <div className="cc-step-item">
            <div className={`cc-step-dot ${step1Done ? 'done' : 'active'}`}>
              {step1Done ? <CheckCircle2 size={13} /> : '1'}
            </div>
            <span className={`cc-step-name ${!step1Done ? 'active' : ''}`}>Ticket Lookup</span>
          </div>
          <div className={`cc-step-connector ${step1Done ? 'done' : ''}`} />
          <div className="cc-step-item">
            <div className={`cc-step-dot ${step1Done ? 'active' : 'inactive'}`}>2</div>
            <span className={`cc-step-name ${step1Done ? 'active' : ''}`}>Issue Details</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Card 1 — Ticket Lookup */}
          <div className="cc-card">
            <div className="cc-card-header">
              <span className="cc-card-label primary">
                <Hash size={11} /> Ticket Lookup
              </span>
            </div>
            <div className="cc-card-body">
              <Field label="Ticket Number" required error={errors.ticketNumber}>
                <div className="cc-input-wrap">
                  <input
                    type="text"
                    className={`cc-input ${lookupStatus === 'found' ? 'state-found' : lookupStatus === 'notfound' ? 'state-error' : ''}`}
                    placeholder="e.g. TKT-2024-001"
                    value={ticketInput}
                    onChange={(e) => handleTicketInput(e.target.value)}
                  />
                  <span className="cc-input-icon">
                    {lookupStatus === 'loading'  && <Loader2 size={17} color={C.primary} className="spin" />}
                    {lookupStatus === 'found'    && <CheckCircle2 size={17} color="#059669" />}
                    {(lookupStatus === 'notfound' || lookupStatus === 'error') && <XCircle size={17} color="#DC2626" />}
                    {lookupStatus === 'idle'     && <Search size={17} color={C.icon} />}
                  </span>
                </div>
                {lookupStatus === 'notfound' && !errors.ticketNumber && (
                  <div className="cc-lookup-msg error">
                    <XCircle size={12} /> No registration found for this ticket number
                  </div>
                )}
                {lookupStatus === 'error' && !errors.ticketNumber && (
                  <div className="cc-lookup-msg error">
                    <XCircle size={12} /> Something went wrong. Please try again.
                  </div>
                )}
                {lookupStatus === 'loading' && (
                  <div className="cc-lookup-msg loading">
                    <Loader2 size={12} className="spin" /> Searching customer records…
                  </div>
                )}
              </Field>
            </div>
          </div>

          {/* Card 2 — Customer & Product (auto-filled) */}
          {lookupStatus === 'found' && customerData && (
            <div className="cc-card found">
              <div className="cc-card-header">
                <span className="cc-card-label success">
                  <CheckCircle2 size={11} /> Customer &amp; Product Details
                </span>
                <span className="cc-badge">Auto-filled</span>
              </div>
              <div className="cc-card-body">
                <div className="cc-info-grid">
                  <div>
                    <div className="cc-info-section-title">Customer</div>
                    <InfoItem icon={<User size={13} />}  label="Full Name" value={form.customerName} />
                    <InfoItem icon={<Phone size={13} />} label="Phone"     value={form.customerPhone} />
                    <InfoItem icon={<Mail size={13} />}  label="Email"     value={form.customerEmail} />
                  </div>
                  <div>
                    <div className="cc-info-section-title">Product</div>
                    <InfoItem icon={<Package size={13} />}  label="Product Name"  value={form.productName} />
                    <InfoItem icon={<Hash size={13} />}     label="Serial No."    value={form.serialNumber} />
                    <InfoItem
                      icon={<Calendar size={13} />}
                      label="Purchase Date"
                      value={form.purchaseDate
                        ? new Date(form.purchaseDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '—'}
                    />
                    <InfoItem icon={<Shield size={13} />} label="Warranty" value={form.warrantyStatus} pill />
                    {form.warrEndDate && (
                      <InfoItem
                        icon={<Calendar size={13} />}
                        label="Warranty Ends"
                        value={new Date(form.warrEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 3 — Issue Details */}
          <div className={`cc-card ${lookupStatus !== 'found' ? 'dimmed' : ''}`}>
            <div className="cc-card-header">
              <span className="cc-card-label" style={{ color: lookupStatus === 'found' ? C.primary : C.icon }}>
                <Wrench size={11} /> Issue Details
              </span>
              {lookupStatus !== 'found' && (
                <span style={{ fontSize: '0.7rem', color: C.icon, fontWeight: 500 }}>
                  Complete ticket lookup first
                </span>
              )}
            </div>
            <div className="cc-card-body">

              <Field label="Issue Title" required error={errors.issueTitle}>
                <input
                  type="text"
                  className={`cc-input ${errors.issueTitle ? 'state-error' : ''}`}
                  placeholder="e.g. Screen flickering after 30 minutes"
                  value={form.issueTitle}
                  onChange={(e) => {
                    setForm(p => ({ ...p, issueTitle: e.target.value }));
                    if (errors.issueTitle) setErrors(p => ({ ...p, issueTitle: '' }));
                  }}
                />
              </Field>

              <Field label="Issue Type" required error={errors.issueType}>
                <div className="cc-input-wrap">
                  <select
                    className={`cc-select ${errors.issueType ? 'state-error' : ''}`}
                    value={form.issueType}
                    style={{ color: form.issueType ? C.textPrimary : C.icon }}
                    onChange={(e) => {
                      setForm(p => ({ ...p, issueType: e.target.value }));
                      if (errors.issueType) setErrors(p => ({ ...p, issueType: '' }));
                    }}
                  >
                    <option value="" disabled>Select issue type</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Installation">Installation</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="cc-select-arrow"><ChevronDown size={15} /></span>
                </div>
              </Field>

              <Field label="Issue Description" required error={errors.issueDescription}>
                <textarea
                  rows={5}
                  className={`cc-textarea ${errors.issueDescription ? 'state-error' : ''}`}
                  placeholder="Describe the issue in detail — when it started, how often it occurs, what has been tried…"
                  value={form.issueDescription}
                  onChange={(e) => {
                    setForm(p => ({ ...p, issueDescription: e.target.value }));
                    if (errors.issueDescription) setErrors(p => ({ ...p, issueDescription: '' }));
                  }}
                />
                <div className={`cc-char-count ${form.issueDescription.length > 0 && form.issueDescription.length < 20 ? 'warn' : ''}`}>
                  {form.issueDescription.length} chars
                  {form.issueDescription.length > 0 && form.issueDescription.length < 20 && ' · min 20 required'}
                </div>
              </Field>

            </div>
          </div>

          {/* Actions */}
          <div className="cc-btn-row">
            <button type="button" className="cc-btn-reset" onClick={handleReset}>
              <RotateCcw size={13} /> Reset
            </button>
            <button
              type="submit"
              className="cc-btn-submit"
              disabled={submitting || lookupStatus !== 'found'}
            >
              {submitting
                ? <><Loader2 size={15} className="spin" /> Submitting…</>
                : <><Send size={15} /> Submit Complaint</>
              }
            </button>
          </div>

        </form>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default CustomerCareComplains;
import React, { useState, useRef } from 'react';
import axiosInstance from '../../Utils/axiosIntance';
import {
  Search, User, Phone, Mail, Package, Hash,
  Calendar, Shield, AlertTriangle, CheckCircle2,
  XCircle, Loader2, Wrench, ChevronDown,
  TicketCheck, Send, RotateCcw, IdCard,
} from 'lucide-react';

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────── */
const C = {
  primary:       '#2E6F83',
  primaryDark:   '#2A6577',
  primaryLight:  '#E8F4F7',
  primaryMid:    '#C5DDE5',
  background:    '#F4F6F8',
  accent:        '#E5A93D',
  textPrimary:   '#1F2937',
  textSecondary: '#6B7280',
  icon:          '#9CA3AF',
  white:         '#FFFFFF',
  border:        '#E2E8ED',
  borderHover:   '#C8D6DC',
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

  .cc-header {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 1.75rem; padding-bottom: 1.5rem;
    border-bottom: 2px solid ${C.border};
  }
  .cc-header-icon {
    width: 48px; height: 48px; background: ${C.primary};
    border-radius: 14px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(46,111,131,0.3); flex-shrink: 0;
  }
  .cc-title { font-size: 1.5rem; font-weight: 800; color: ${C.textPrimary}; letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 3px; }
  .cc-subtitle { font-size: 0.8rem; color: ${C.textSecondary}; font-weight: 500; margin: 0; }

  .cc-step-row { display: flex; align-items: center; margin-bottom: 1.25rem; }
  .cc-step-item { display: flex; align-items: center; gap: 0.5rem; flex: 1; }
  .cc-step-dot {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 700; flex-shrink: 0; transition: all 0.2s;
  }
  .cc-step-dot.active   { background: ${C.primary}; color: #fff; box-shadow: 0 2px 8px rgba(46,111,131,0.35); }
  .cc-step-dot.done     { background: #D1FAE5; color: #065F46; }
  .cc-step-dot.inactive { background: ${C.border}; color: ${C.icon}; }
  .cc-step-name { font-size: 0.75rem; font-weight: 600; color: ${C.textSecondary}; }
  .cc-step-name.active { color: ${C.primary}; }
  .cc-step-connector { flex: 1; height: 2px; background: ${C.border}; margin: 0 0.5rem; max-width: 48px; }
  .cc-step-connector.done { background: ${C.primary}; }

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
    border-color: ${C.primary}; box-shadow: 0 0 0 3px rgba(46,111,131,0.12);
  }
  .cc-input.state-found { border-color: #6EE7B7; background: #F0FDF9; box-shadow: 0 0 0 3px rgba(52,211,153,0.1); }
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

  .cc-field-error { display: flex; align-items: center; gap: 0.3rem; margin-top: 0.35rem; font-size: 0.74rem; font-weight: 500; color: #DC2626; }
  .cc-lookup-msg { display: flex; align-items: center; gap: 0.3rem; margin-top: 0.35rem; font-size: 0.74rem; font-weight: 500; }
  .cc-lookup-msg.error   { color: #DC2626; }
  .cc-lookup-msg.loading { color: ${C.primary}; }

  /* ── Product selector ── */
  .cc-product-list { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; }
  .cc-product-option {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.7rem 0.9rem; border-radius: 10px;
    border: 1.5px solid ${C.border}; background: ${C.white};
    cursor: pointer; transition: border-color 0.15s, background 0.15s;
  }
  .cc-product-option:hover { border-color: ${C.primaryMid}; background: ${C.primaryLight}; }
  .cc-product-option.selected { border-color: ${C.primary}; background: ${C.primaryLight}; box-shadow: 0 0 0 3px rgba(46,111,131,0.1); }
  .cc-product-radio {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid ${C.border}; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.15s;
  }
  .cc-product-option.selected .cc-product-radio { border-color: ${C.primary}; }
  .cc-product-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: ${C.primary}; }
  .cc-ticket-mono { font-family: monospace; font-size: 0.82rem; font-weight: 700; color: ${C.primary}; }
  .cc-product-meta { font-size: 0.72rem; color: ${C.textSecondary}; margin-top: 2px; }

  /* ── Info grid ── */
  .cc-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem; }
  @media (max-width: 520px) { .cc-info-grid { grid-template-columns: 1fr; } }

  .cc-info-section-title {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: ${C.icon};
    margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1.5px solid ${C.border};
  }
  .cc-info-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0; border-bottom: 1px solid ${C.sectionBg}; }
  .cc-info-item:last-child { border-bottom: none; }
  .cc-info-icon-wrap {
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(46,111,131,0.08);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: ${C.primary};
  }
  .cc-info-label { font-size: 0.68rem; color: ${C.icon}; font-weight: 500; line-height: 1; margin-bottom: 2px; }
  .cc-info-value { font-size: 0.85rem; font-weight: 600; color: ${C.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cc-warranty-pill {
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-size: 0.73rem; font-weight: 700; padding: 2px 9px; border-radius: 100px;
    background: #D1FAE5; color: #065F46; border: 1px solid #A7F3D0;
  }
  .cc-warranty-pill.expired { background: #FEF2F2; color: #991B1B; border-color: #FECACA; }

  .cc-char-count { text-align: right; font-size: 0.7rem; font-weight: 500; color: ${C.icon}; margin-top: 0.3rem; }
  .cc-char-count.warn { color: ${C.accent}; }

  .cc-btn-row { display: flex; gap: 0.75rem; margin-top: 1.25rem; }
  .cc-btn-reset {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0 1.2rem; height: 48px; border: 1.5px solid ${C.border}; border-radius: 10px;
    background: ${C.white}; color: ${C.textSecondary};
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.8rem; font-weight: 700;
    cursor: pointer; transition: border-color 0.2s, color 0.2s; white-space: nowrap;
  }
  .cc-btn-reset:hover { border-color: ${C.primaryDark}; color: ${C.primaryDark}; }

  .cc-btn-submit {
    flex: 1; display: flex; align-items: center; justify-content: center;
    gap: 0.5rem; height: 48px; border: none; border-radius: 10px;
    background: ${C.primary}; color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 700;
    cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(46,111,131,0.35);
  }
  .cc-btn-submit:hover:not(:disabled) { background: ${C.primaryDark}; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(46,111,131,0.4); }
  .cc-btn-submit:active:not(:disabled) { transform: translateY(0); }
  .cc-btn-submit:disabled { opacity: 0.45; cursor: not-allowed; box-shadow: none; }

  .cc-toast {
    position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.85rem 1.1rem; border-radius: 12px; font-size: 0.84rem; font-weight: 600;
    animation: ccSlideUp 0.3s ease; max-width: 340px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }
  .cc-toast.success { background: #ECFDF5; border: 1.5px solid #A7F3D0; color: #065F46; }
  .cc-toast.error   { background: #FEF2F2; border: 1.5px solid #FECACA; color: #991B1B; }
  .cc-toast-close { background: none; border: none; cursor: pointer; color: inherit; opacity: 0.5; font-size: 0.95rem; padding: 0; margin-left: 0.3rem; }
  .cc-toast-close:hover { opacity: 1; }
  @keyframes ccSlideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .cc-success-wrap {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; padding: 2rem; background: ${C.background};
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .cc-success-card {
    background: ${C.white}; border: 1.5px solid ${C.border}; border-radius: 20px;
    padding: 3rem 2.5rem; max-width: 420px; width: 100%; text-align: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  }
  .cc-success-icon-ring {
    width: 72px; height: 72px; background: #D1FAE5; border: 2px solid #A7F3D0;
    border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;
  }
  .cc-success-title { font-size: 1.5rem; font-weight: 800; color: ${C.textPrimary}; letter-spacing: -0.02em; margin: 0 0 0.5rem; }
  .cc-success-text  { color: ${C.textSecondary}; font-size: 0.88rem; margin: 0 0 0.4rem; font-weight: 500; }
  .cc-success-email { color: ${C.icon}; font-size: 0.8rem; margin: 0 0 2rem; }
  .cc-success-email strong { color: ${C.textSecondary}; }

  .spin { animation: ccSpin 0.8s linear infinite; }
  @keyframes ccSpin { to { transform: rotate(360deg); } }

  /* ── Customer ID hint ── */
  .cc-id-hint {
    margin-top: 0.4rem; padding: 0.6rem 0.8rem;
    background: ${C.primaryLight}; border: 1px solid ${C.primaryMid};
    border-radius: 8px; font-size: 0.72rem; color: ${C.primary}; font-weight: 500;
  }
  .cc-id-hint code { font-family: monospace; font-weight: 700; }
`;

/* ─────────────────────────── HELPERS ─────────────────────────── */
const fmtDate = (d) => {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return '—'; }
};

const isInWarranty = (endDate) => {
  if (!endDate) return false;
  return new Date(endDate) >= new Date();
};

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

const InfoItem = ({ icon, label, value, pill, expired }) => (
  <div className="cc-info-item">
    <div className="cc-info-icon-wrap">{icon}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="cc-info-label">{label}</div>
      {pill
        ? <span className={`cc-warranty-pill ${expired ? 'expired' : ''}`}>
            <CheckCircle2 size={10} />{value || '—'}
          </span>
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
  customerId: '', selectedProductId: '',
  ticketNumber: '', productName: '', serialNumber: '',
  purchaseDate: '', warrantyStatus: 'In Warranty', warrEndDate: '',
  issueTitle: '', issueDescription: '', issueType: '',
};
const INITIAL_ERRORS = {
  customerId: '', selectedProductId: '', issueTitle: '', issueDescription: '', issueType: '',
};

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */
const CustomerCareComplains = () => {
  const [form, setForm]                 = useState(INITIAL_FORM);
  const [errors, setErrors]             = useState(INITIAL_ERRORS);
  const [customerData, setCustomerData] = useState(null);   // full customer object from API
  const [customerIdInput, setCustomerIdInput] = useState('');
  const [lookupStatus, setLookupStatus] = useState('idle'); // idle | loading | found | notfound | error
  const [submitting, setSubmitting]     = useState(false);
  const [toast, setToast]               = useState(null);
  const [submitted, setSubmitted]       = useState(false);
  const debounceRef                     = useRef(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // ─────────────────────────────────────────────────────────────────────────
  //  HOW CUSTOMER ID LOOKUP WORKS:
  //
  //  1. Agent types the customer's MongoDB _id (e.g. 69b13dd6ca6bf2c2e6bb475c)
  //  2. After 600ms debounce → calls GET /customerDetails/search/:customerId
  //  3. Backend finds the customer by _id and returns their full record
  //     including all their registered products[]
  //  4. Frontend stores the full customer in `customerData`
  //  5. A product selector appears — agent picks which product the complaint is for
  //  6. On product select → auto-fills all product + customer fields in the form
  //
  //  WHY customer ID instead of ticket number?
  //  One customer can have many tickets (bulk purchase).
  //  Searching by customer ID gives ALL their products at once,
  //  then the agent picks the specific product. This is more efficient
  //  than requiring agents to know the exact ticket number.
  // ─────────────────────────────────────────────────────────────────────────

  const handleCustomerIdInput = (val) => {
    setCustomerIdInput(val);
    setLookupStatus('idle');
    setCustomerData(null);

    // Reset all auto-filled fields
    setForm(prev => ({
      ...prev,
      customerName: '', customerEmail: '', customerPhone: '',
      customerId: val, selectedProductId: '',
      ticketNumber: '', productName: '', serialNumber: '',
      purchaseDate: '', warrantyStatus: 'In Warranty', warrEndDate: '',
    }));

    if (debounceRef.current) clearTimeout(debounceRef.current);

    // MongoDB ObjectId is 24 hex characters — don't search for shorter input
    if (val.trim().length < 10) return;

    debounceRef.current = setTimeout(() => lookupByCustomerId(val.trim()), 600);
  };

  // ── API call: GET /customerDetails/search/:customerId ─────────────────────
  const lookupByCustomerId = async (customerId) => {
    try {
      setLookupStatus('loading');

      const res = await axiosInstance.get(`/customerDetails/search/${customerId}`);

      // Handle different response shapes
      const customer = res.data?.data || res.data?.customer || res.data || null;

      if (!customer || !customer._id) {
        setLookupStatus('notfound');
        return;
      }

      setCustomerData(customer);
      setLookupStatus('found');

      // Auto-fill customer info immediately (product info filled on product select)
      setForm(prev => ({
        ...prev,
        customerName:  customer.customerName || '',
        customerEmail: customer.email        || '',
        customerPhone: customer.mobileNum    || customer.phone || '',
        customerId:    customer._id,
      }));

    } catch (err) {
      console.error('Customer lookup error:', err.message);
      if (err.response?.status === 404) {
        setLookupStatus('notfound');
      } else {
        setLookupStatus('error');
      }
    }
  };

  // ── Called when agent selects a product from the list ─────────────────────
  //
  // HOW IT WORKS:
  // Each product in customer.products[] has its own _id.
  // When agent clicks a product row, we:
  // 1. Store the product._id as selectedProductId
  // 2. Extract ticketNumber, configSnapshot fields, warranty dates
  // 3. Auto-fill the form with that product's data
  const handleProductSelect = (product) => {
    const snap = product.configSnapshot || {};

    // configSnapshot can be a Map or plain object — normalize it
    const config = snap instanceof Map
      ? Object.fromEntries(snap)
      : (typeof snap === 'object' ? snap : {});

    const warrantyStatus = isInWarranty(product.warrEndDate)
      ? 'In Warranty'
      : 'Out of Warranty';

    setForm(prev => ({
      ...prev,
      selectedProductId: product._id,
      ticketNumber:      product.ticketNumber   || '',
      productName:       config.companyname  || config.company_name  || config.modelnumber || config.brand || '',
      serialNumber:      config.serialnumber || config.serial_numebr || config.serial_number || '',
      purchaseDate:      product.warrStartDate  || '',
      warrantyStatus,
      warrEndDate:       product.warrEndDate    || '',
    }));

    // Clear product selection error if present
    setErrors(prev => ({ ...prev, selectedProductId: '' }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {
      customerId: '', selectedProductId: '',
      issueTitle: '', issueDescription: '', issueType: '',
    };
    let valid = true;

    if (!form.customerId.trim()) {
      e.customerId = 'Customer ID is required'; valid = false;
    }
    if (lookupStatus !== 'found') {
      e.customerId = 'Please enter a valid Customer ID'; valid = false;
    }
    if (!form.selectedProductId) {
      e.selectedProductId = 'Please select a product for this complaint'; valid = false;
    }
    if (!form.issueTitle.trim()) {
      e.issueTitle = 'Issue title is required'; valid = false;
    }
    if (!form.issueDescription.trim()) {
      e.issueDescription = 'Issue description is required'; valid = false;
    } else if (form.issueDescription.trim().length < 20) {
      e.issueDescription = 'Please describe the issue in at least 20 characters'; valid = false;
    }
    if (!form.issueType) {
      e.issueType = 'Please select an issue type'; valid = false;
    }

    setErrors(e);
    return valid;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      const payload = {
        customerId:       form.customerId,
        customerName:     form.customerName,
        customerEmail:    form.customerEmail,
        customerPhone:    form.customerPhone,
        ticketNumber:     form.ticketNumber,
        selectedProductId: form.selectedProductId,
        productName:      form.productName,
        serialNumber:     form.serialNumber,
        purchaseDate:     form.purchaseDate || undefined,
        warrantyStatus:   form.warrantyStatus,
        issueTitle:       form.issueTitle.trim(),
        issueDescription: form.issueDescription.trim(),
        issueType:        form.issueType,
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

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setForm(INITIAL_FORM); setErrors(INITIAL_ERRORS);
    setCustomerIdInput(''); setCustomerData(null);
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
            <button className="cc-btn-submit" style={{ flex: 'none', width: '100%' }} onClick={handleReset}>
              <RotateCcw size={15} /> Raise Another Complaint
            </button>
          </div>
        </div>
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  const step1Done = lookupStatus === 'found' && !!form.selectedProductId;
  const step2Active = lookupStatus === 'found';

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
            <span className={`cc-step-name ${!step1Done ? 'active' : ''}`}>Customer &amp; Product</span>
          </div>
          <div className={`cc-step-connector ${step1Done ? 'done' : ''}`} />
          <div className="cc-step-item">
            <div className={`cc-step-dot ${step1Done ? 'active' : 'inactive'}`}>2</div>
            <span className={`cc-step-name ${step1Done ? 'active' : ''}`}>Issue Details</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── Card 1: Customer ID Lookup ── */}
          <div className="cc-card">
            <div className="cc-card-header">
              <span className="cc-card-label primary">
                <IdCard size={11} /> Customer ID Lookup
              </span>
            </div>
            <div className="cc-card-body">
              <Field label="Customer ID" required error={errors.customerId}>
                <div className="cc-input-wrap">
                  <input
                    type="text"
                    className={`cc-input ${lookupStatus === 'found' ? 'state-found' : (lookupStatus === 'notfound' || lookupStatus === 'error') ? 'state-error' : ''}`}
                    placeholder="e.g. 69b13dd6ca6bf2c2e6bb475c"
                    value={customerIdInput}
                    onChange={(e) => handleCustomerIdInput(e.target.value)}
                    style={{ fontFamily: 'monospace' }}
                  />
                  <span className="cc-input-icon">
                    {lookupStatus === 'loading'  && <Loader2 size={17} color={C.primary} className="spin" />}
                    {lookupStatus === 'found'    && <CheckCircle2 size={17} color="#059669" />}
                    {(lookupStatus === 'notfound' || lookupStatus === 'error') && <XCircle size={17} color="#DC2626" />}
                    {lookupStatus === 'idle'     && <Search size={17} color={C.icon} />}
                  </span>
                </div>

                {/* Hint for where to find the Customer ID */}
                {lookupStatus === 'idle' && !customerIdInput && (
                  <div className="cc-id-hint">
                    Find the Customer ID from the <strong>Customer History</strong> page — it's the unique ID shown on each customer record.
                  </div>
                )}
                {lookupStatus === 'notfound' && (
                  <div className="cc-lookup-msg error">
                    <XCircle size={12} /> No customer found with this ID
                  </div>
                )}
                {lookupStatus === 'error' && (
                  <div className="cc-lookup-msg error">
                    <XCircle size={12} /> Something went wrong. Please try again.
                  </div>
                )}
                {lookupStatus === 'loading' && (
                  <div className="cc-lookup-msg loading">
                    <Loader2 size={12} className="spin" /> Looking up customer…
                  </div>
                )}
              </Field>
            </div>
          </div>

          {/* ── Card 2: Customer found — select product ── */}
          {lookupStatus === 'found' && customerData && (
            <div className="cc-card found">
              <div className="cc-card-header">
                <span className="cc-card-label success">
                  <CheckCircle2 size={11} /> {customerData.customerName}
                </span>
                <span className="cc-badge">Found</span>
              </div>
              <div className="cc-card-body">

                {/* Customer info row */}
                <div className="cc-info-grid" style={{ marginBottom: '1rem' }}>
                  <div>
                    <div className="cc-info-section-title">Customer</div>
                    <InfoItem icon={<User size={13} />}  label="Full Name" value={form.customerName} />
                    <InfoItem icon={<Phone size={13} />} label="Phone"     value={form.customerPhone} />
                    <InfoItem icon={<Mail size={13} />}  label="Email"     value={form.customerEmail} />
                  </div>
                  <div>
                    <div className="cc-info-section-title">Account Info</div>
                    <InfoItem
                      icon={<Hash size={13} />}
                      label="Customer ID"
                      value={customerData._id}
                    />
                    <InfoItem
                      icon={<Package size={13} />}
                      label="Purchase Type"
                      value={customerData.purchaseType}
                    />
                    <InfoItem
                      icon={<Calendar size={13} />}
                      label="Registered"
                      value={customerData.createdAt
                        ? new Date(customerData.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '—'}
                    />
                  </div>
                </div>

                {/* Product selector */}
                <Field label="Select Product for Complaint" required error={errors.selectedProductId}>
                  <div className="cc-product-list">
                    {(customerData.products || []).length === 0 && (
                      <p style={{ fontSize: '0.8rem', color: C.textSecondary }}>No products found for this customer.</p>
                    )}
                    {(customerData.products || []).map((product, idx) => {
                      const isSelected  = form.selectedProductId === product._id;
                      const snap        = product.configSnapshot instanceof Map
                        ? Object.fromEntries(product.configSnapshot)
                        : (product.configSnapshot || {});
                      const label       = snap.companyname || snap.company_name || snap.modelnumber || `Product ${idx + 1}`;
                      const inWarranty  = isInWarranty(product.warrEndDate);

                      return (
                        <div
                          key={product._id || idx}
                          className={`cc-product-option ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleProductSelect(product)}
                        >
                          {/* Radio dot */}
                          <div className="cc-product-radio">
                            {isSelected && <div className="cc-product-radio-dot" />}
                          </div>

                          {/* Product info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span className="cc-ticket-mono">{product.ticketNumber}</span>
                              <span style={{
                                fontSize: '0.65rem', fontWeight: 700, padding: '1px 8px',
                                borderRadius: '100px',
                                background: inWarranty ? '#D1FAE5' : '#FEF2F2',
                                color:      inWarranty ? '#065F46' : '#991B1B',
                                border:     `1px solid ${inWarranty ? '#A7F3D0' : '#FECACA'}`,
                              }}>
                                {inWarranty ? 'In Warranty' : 'Expired'}
                              </span>
                            </div>
                            <div className="cc-product-meta">
                              {label} {snap.serialnumber || snap.serial_numebr ? `· S/N: ${snap.serialnumber || snap.serial_numebr}` : ''}
                            </div>
                          </div>

                          {/* Warranty end */}
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: '0.65rem', color: C.icon }}>Warranty ends</div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: inWarranty ? '#059669' : '#DC2626' }}>
                              {fmtDate(product.warrEndDate)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Field>

                {/* Show selected product details */}
                {form.selectedProductId && (
                  <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: C.primaryLight, borderRadius: 10, border: `1px solid ${C.primaryMid}` }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.primary, marginBottom: '0.6rem' }}>
                      Selected Product Details
                    </p>
                    <div className="cc-info-grid">
                      <div>
                        <InfoItem icon={<Hash size={13} />}     label="Ticket #"   value={form.ticketNumber} />
                        <InfoItem icon={<Package size={13} />}  label="Product"    value={form.productName} />
                        <InfoItem icon={<Hash size={13} />}     label="Serial No." value={form.serialNumber} />
                      </div>
                      <div>
                        <InfoItem icon={<Calendar size={13} />} label="Warr Start" value={fmtDate(form.purchaseDate)} />
                        <InfoItem icon={<Calendar size={13} />} label="Warr End"   value={fmtDate(form.warrEndDate)} />
                        <InfoItem
                          icon={<Shield size={13} />}
                          label="Status"
                          value={form.warrantyStatus}
                          pill
                          expired={form.warrantyStatus === 'Out of Warranty'}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Card 3: Issue Details ── */}
          <div className={`cc-card ${!step1Done ? 'dimmed' : ''}`}>
            <div className="cc-card-header">
              <span className="cc-card-label" style={{ color: step1Done ? C.primary : C.icon }}>
                <Wrench size={11} /> Issue Details
              </span>
              {!step1Done && (
                <span style={{ fontSize: '0.7rem', color: C.icon, fontWeight: 500 }}>
                  Select a product first
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
              disabled={submitting || !step1Done}
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


import { useState, useEffect } from "react";
import React from "react";
import axiosInstance from "../../Utils/axiosIntance";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, color = "currentColor", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const PlusIcon     = () => <Icon d="M12 5v14M5 12h14" />;
const TrashIcon    = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
const ChevronDown  = () => <Icon d="M6 9l6 6 6-6" />;
const SettingsIcon = () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />;
const XIcon        = () => <Icon d="M18 6L6 18M6 6l12 12" />;
const CheckIcon    = () => <Icon d="M20 6L9 17l-5-5" />;
const EditIcon     = () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;
const BoxIcon      = () => <Icon d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />;
const CalendarIcon = () => <Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />;

// ─── COLOR TOKENS ─────────────────────────────────────────────────────────────
const C = {
  pageBg:        "#eef2f5",
  cardBg:        "#ffffff",
  headerBg:      "linear-gradient(135deg, #1a3a4f 0%, #1F6E8C 100%)",
  panelBg:       "#e8f4f9",
  inputBg:       "#f4f9fc",
  border:        "#d0e8f2",
  borderMid:     "#b3d4e2",
  textPrimary:   "#0e2535",
  textSecondary: "#3d7a90",
  textMuted:     "#85afc0",
  teal:          "#1F6E8C",
  tealLight:     "#2a8faf",
  tealPale:      "#dbedf5",
  green:         "#6BA368",
  greenPale:     "#e6f3e5",
  amber:         "#D9A441",
  amberPale:     "#fdf3de",
  red:           "#d95555",
  redPale:       "#fce8e8",
};

const FIELD_TYPES = ["String", "Number", "Date"];

const TYPE_META = {
  String: { color: "#1F6E8C", bg: "#dbedf5", label: "STR"  },
  Number: { color: "#6BA368", bg: "#e6f3e5", label: "NUM"  },
  Date:   { color: "#D9A441", bg: "#fdf3de", label: "DATE" },
};

const FieldTypeBadge = ({ type }) => {
  const m = TYPE_META[type] || TYPE_META.String;
  return (
    <span style={{
      background: m.bg, color: m.color,
      border: `1px solid ${m.color}44`,
      padding: "2px 8px", borderRadius: 4,
      fontSize: 10, fontWeight: 700,
      fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em"
    }}>{m.label}</span>
  );
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = ({ toasts, removeToast }) => (
  <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999,
    display: "flex", flexDirection: "column", gap: 10 }}>
    {toasts.map(t => (
      <div key={t.id} style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px", background: "#fff",
        border: `1px solid ${t.type === "success" ? "#6BA36844" : "#d9555544"}`,
        borderLeft: `3px solid ${t.type === "success" ? "#6BA368" : "#d95555"}`,
        borderRadius: 10, minWidth: 280,
        boxShadow: "0 4px 20px rgba(31,110,140,0.13)",
        animation: "toastIn 0.25s ease",
      }}>
        <span style={{ color: t.type === "success" ? "#6BA368" : "#d95555", fontWeight: 700, fontSize: 15 }}>
          {t.type === "success" ? "✓" : "✕"}
        </span>
        <span style={{ flex: 1, color: C.textPrimary, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
          {t.message}
        </span>
        <button onClick={() => removeToast(t.id)}
          style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer" }}>
          <XIcon />
        </button>
      </div>
    ))}
  </div>
);

// ─── MODAL ────────────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      background: "rgba(10,28,40,0.55)", backdropFilter: "blur(4px)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      overflowY: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: wide ? 680 : 520,
        boxShadow: "0 24px 64px rgba(31,110,140,0.2)",
        animation: "modalIn 0.2s ease", overflow: "hidden",
        border: `1px solid ${C.border}`,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px", background: C.headerBg, flexShrink: 0,
        }}>
          <h3 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 700,
            fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>
            {title}
          </h3>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8,
            padding: 7, cursor: "pointer", color: "#fff",
            display: "flex", alignItems: "center",
          }}>
            <XIcon />
          </button>
        </div>
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

// ─── INPUT ────────────────────────────────────────────────────────────────────
const Input = ({ label, required, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && (
      <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
        letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
    )}
    <input {...props} style={{
      background: C.inputBg, border: `1.5px solid ${C.border}`,
      borderRadius: 8, padding: "9px 13px",
      fontSize: 13, color: C.textPrimary, outline: "none",
      fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.15s",
      width: "100%",
      ...(props.style || {})
    }}
      onFocus={e => e.target.style.borderColor = C.teal}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const DateInput = ({ label, required, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && (
      <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
        letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
        display: "flex", alignItems: "center", gap: 5 }}>
        <CalendarIcon size={11} color={C.textSecondary} />
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
    )}
    <input type="date" {...props} style={{
      background: C.inputBg, border: `1.5px solid ${C.border}`,
      borderRadius: 8, padding: "9px 13px", fontSize: 13,
      color: props.value ? C.textPrimary : C.textMuted,
      outline: "none", fontFamily: "'DM Sans', sans-serif",
      transition: "border-color 0.15s", width: "100%",
      cursor: "pointer", colorScheme: "light",
      ...(props.style || {})
    }}
      onFocus={e => e.target.style.borderColor = C.teal}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const Select = ({ label, required, children, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && (
      <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
        letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
    )}
    <select {...props} style={{
      background: C.inputBg, border: `1.5px solid ${C.border}`,
      borderRadius: 8, padding: "9px 13px",
      fontSize: 13, color: C.textPrimary, outline: "none",
      fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
    }}>{children}</select>
  </div>
);

const BVARS = {
  primary:   { bg: C.teal,       color: "#fff",          border: C.teal,       hover: "#174f68" },
  secondary: { bg: C.tealPale,   color: C.textSecondary, border: C.border,     hover: "#cde6f0" },
  danger:    { bg: C.redPale,    color: C.red,           border: "#f0c8c8",    hover: "#f8d8d8" },
  ghost:     { bg: "transparent",color: C.teal,          border: C.tealPale,   hover: C.tealPale },
  success:   { bg: C.greenPale,  color: C.green,         border: "#c0dab8",    hover: "#d2ecce" },
  white:     { bg: "rgba(255,255,255,0.18)", color: "#fff", border: "rgba(255,255,255,0.3)", hover: "rgba(255,255,255,0.28)" },
};
const Btn = ({ variant = "primary", children, loading, style = {}, ...props }) => {
  const v = BVARS[variant] || BVARS.primary;
  return (
    <button {...props} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "8px 16px", borderRadius: 8,
      background: v.bg, color: v.color, border: `1px solid ${v.border}`,
      fontSize: 12, fontWeight: 700, cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      whiteSpace: "nowrap", transition: "all 0.15s", ...style
    }}
      onMouseOver={e => e.currentTarget.style.background = v.hover}
      onMouseOut={e => e.currentTarget.style.background = v.bg}>
      {loading ? "⏳" : children}
    </button>
  );
};

const CategoryAvatar = ({ name }) => {
  const hue = (name.charCodeAt(0) * 53 + name.charCodeAt(name.length - 1) * 17) % 360;
  return (
    <div style={{
      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 17, fontWeight: 800,
      background: `hsl(${hue},50%,92%)`,
      color: `hsl(${hue},50%,32%)`,
      border: `1.5px solid hsl(${hue},40%,80%)`,
      fontFamily: "'Syne', sans-serif",
    }}>
      {name[0].toUpperCase()}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// UNIQUE FIELD KEYS — these fields must be different for every unit
// serialnumber, modelnumber, invoicenumber must be entered per unit
// All other fields (RAM, color, company etc.) are shared across all units
// ─────────────────────────────────────────────────────────────────────────────
const UNIQUE_KEYS = [
  "serialnumber", "serial_number", "serial_numebr",
  "SERIALNUMBER", "SERIAL_NUMBER",   // ← add uppercase versions
  "modelnumber",  "model_number",    "MODELNUMBER",
  "invoicenumber", "invoice_number", "INVOICENUMBER",
];

// Returns true if this field must be unique per unit
const isUniqueField = (fieldKey) =>
  UNIQUE_KEYS.includes(fieldKey.toLowerCase().trim());

// ═══════════════════════════════════════════════════════════════════════════════
export default function CustomerCareHome() {
  const [categories, setCategories]             = useState([]);
  const [configs, setConfigs]                   = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading]                   = useState(false);
  const [toasts, setToasts]                     = useState([]);
  const [showCatModal, setShowCatModal]         = useState(false);
  const [showConfigModal, setShowConfigModal]   = useState(false);
  const [showFieldModal, setShowFieldModal]     = useState(false);
  const [activeCategoryForConfig, setActiveCategoryForConfig] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerCategory, setRegisterCategory]   = useState(null);

  // ── REGISTER FORM STATE (UPDATED) ─────────────────────────────────────────
  //
  // OLD approach (the bug):
  //   registerForm = { serialnumber: "SAME", modelnumber: "SAME" }
  //   → ALL units get the same values
  //
  // NEW approach (the fix):
  //   sharedForm = { ram: "8GB", color: "Black" }        ← same for ALL units
  //   unitRows   = [                                      ← unique per unit
  //     { id:1, serialnumber: "A1", modelnumber: "M1" },
  //     { id:2, serialnumber: "A2", modelnumber: "M2" },
  //   ]
  //
  const [sharedForm, setSharedForm] = useState({});  // shared fields — one value for all
  const [unitRows,   setUnitRows]   = useState([{ id: 1 }]); // one object per unit
  const [quantity,   setQuantity]   = useState(1);

  const [catForm, setCatForm]     = useState({ name: "", description: "" });
  const [configFields, setConfigFields] = useState([]);
  const [editCat, setEditCat]     = useState(null);
  const [newField, setNewField]   = useState({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
  const [addingField, setAddingField] = useState({ categoryId: null, field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" } });

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const removeToast = id => setToasts(p => p.filter(t => t.id !== id));

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/category/allproducts");
      setCategories(data.data || []);
    } catch (e) { addToast(e.response?.data?.message || "Failed to load categories", "error"); }
    finally { setLoading(false); }
  };

  const fetchConfig = async (categoryId) => {
    if (configs[categoryId] !== undefined) return;
    try {
      const { data } = await axiosInstance.get(`/product/${categoryId}/configurations`);
      setConfigs(p => ({ ...p, [categoryId]: data.data }));
    } catch (e) { setConfigs(p => ({ ...p, [categoryId]: null })); }
  };

  useEffect(() => { fetchCategories(); }, []);

  // ── When quantity changes → regenerate unit rows ──────────────────────────
  //
  // HOW IT WORKS:
  // Agent types "3" in quantity field
  //   → handleQuantityChange(3) runs
  //   → creates Array of 3 objects: [{ id:1 }, { id:2 }, { id:3 }]
  //   → each object will store that unit's unique field values
  //   → unitRows.length === quantity always stays in sync
  //
  // Why Array.from({ length: count }, (_, i) => ...)?
  //   Array.from({ length: 3 }) → creates array with 3 empty slots
  //   (_, i) → _ = unused value, i = index (0,1,2)
  //   We preserve existing values if agent already typed something:
  //     unitRows[i] → if this unit already existed, keep its data
  //     || { id: i+1 } → if new unit, start fresh with just an id
  //
  const handleQuantityChange = (val) => {
    const count = Math.max(1, Number(val) || 1);
    setQuantity(count);
    setUnitRows(prev =>
      Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        ...(prev[i] || {}), // preserve existing typed values if unit already existed
      }))
    );
  };

  // ── Update one field in one specific unit row ─────────────────────────────
  //
  // HOW IT WORKS:
  // Agent types "SN-001" in Unit 1's serialnumber field
  //   → handleUnitFieldChange(1, "serialnumber", "SN-001") runs
  //   → .map() loops over all unitRows
  //   → finds unit with id===1, updates ONLY that unit's serialnumber
  //   → all other units stay unchanged
  //
  // This is the key pattern for editing one item in an array of objects:
  //   prev.map(unit => unit.id === unitId ? { ...unit, [fieldKey]: value } : unit)
  //   ↑ spread keeps all existing fields, [fieldKey] updates only the changed one
  //
  const handleUnitFieldChange = (unitId, fieldKey, value) => {
    setUnitRows(prev =>
      prev.map(unit =>
        unit.id === unitId
          ? { ...unit, [fieldKey]: value }  // update only this unit's field
          : unit                             // all other units unchanged
      )
    );
  };

  const handleSaveCategory = async () => {
    if (!catForm.name.trim()) return addToast("Category name is required", "error");
    try {
      if (editCat) { await axiosInstance.put(`/category/updateProduct/${editCat._id}`, catForm); addToast("Category updated!"); }
      else { await axiosInstance.post("/category/createCategory", catForm); addToast("Category created!"); }
      setShowCatModal(false); setCatForm({ name: "", description: "" }); setEditCat(null); fetchCategories();
    } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Deactivate this category?")) return;
    try { await axiosInstance.delete(`/category/${id}`); addToast("Category deactivated"); fetchCategories(); }
    catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const openCreateConfig = (cat) => { setActiveCategoryForConfig(cat); setConfigFields([]); setShowConfigModal(true); };
  const toFieldKey = (name) => name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

  const addFieldToForm = () => {
    if (!newField.fieldName || !newField.fieldKey) return addToast("Field name & key required", "error");
    const options = newField.options ? newField.options.split(",").map(o => o.trim()).filter(Boolean) : [];
    setConfigFields(p => [...p, { ...newField, options, _tempId: Date.now() }]);
    setNewField({ fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" });
  };

  const handleCreateConfig = async () => {
    if (!configFields.length) return addToast("Add at least one field", "error");
    try {
      await axiosInstance.post("/product/configuration", { category: activeCategoryForConfig._id, fields: configFields.map(({ _tempId, ...f }) => f) });
      addToast("Configuration created!"); setShowConfigModal(false);
      setConfigs(p => ({ ...p, [activeCategoryForConfig._id]: undefined })); fetchConfig(activeCategoryForConfig._id);
    } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const handleAddFieldToExisting = async () => {
    const { categoryId, field } = addingField;
    if (!field.fieldName || !field.fieldKey) return addToast("Field name & key required", "error");
    const options = field.options ? field.options.split(",").map(o => o.trim()).filter(Boolean) : [];
    try {
      await axiosInstance.post(`/product/addconfigration/${categoryId}/add-field`, { ...field, options });
      addToast("Field added!"); setShowFieldModal(false);
      setConfigs(p => ({ ...p, [categoryId]: undefined })); fetchConfig(categoryId);
    } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const handleRemoveField = async (categoryId, fieldKey) => {
    if (!confirm(`Remove field "${fieldKey}"?`)) return;
    try {
      await axiosInstance.delete(`/product/removeconfigration/${categoryId}/remove-field/${fieldKey}`);
      addToast("Field removed"); setConfigs(p => ({ ...p, [categoryId]: undefined })); fetchConfig(categoryId);
    } catch (e) { addToast(e.response?.data?.message || "Failed", "error"); }
  };

  const toggleExpand = (catId) => {
    if (expandedCategory === catId) { setExpandedCategory(null); }
    else { setExpandedCategory(catId); fetchConfig(catId); }
  };

  // ── Reset register modal state when opening ───────────────────────────────
  const openRegisterModal = (cat) => {
    setRegisterCategory(cat);
    setSharedForm({});          // clear shared fields
    setUnitRows([{ id: 1 }]);  // reset to 1 unit row
    setQuantity(1);
    setShowRegisterModal(true);
  };

  // ── Handle Register submit ────────────────────────────────────────────────
  //
  // HOW IT WORKS:
  // 1. Loop over unitRows (one per unit)
  // 2. For each unit, merge sharedForm + that unit's unique fields
  //    Result: { ram: "8GB", serialnumber: "SN-001", modelnumber: "M-001" }
  // 3. Build units array: [{ configurations: {...} }, { configurations: {...} }]
  // 4. Send to backend: { category, units }
  // 5. Backend creates one Product document per unit with unique configs
  //
 const handleRegisterSubmit = async () => {
  const fields = configs[registerCategory?._id]?.fields || [];

  // ── STEP 1: Validate shared fields first ─────────────────────────────────
  const requiredShared = fields.filter(f => f.isRequired && !isUniqueField(f.fieldKey));
  for (const f of requiredShared) {
    if (!sharedForm[f.fieldKey]?.toString().trim()) {
      addToast(`"${f.fieldName}" is required`, "error");
      return;
    }
  }

  // ── STEP 2: Validate unique fields per unit ───────────────────────────────
  const requiredUnique = fields.filter(f => f.isRequired && isUniqueField(f.fieldKey));
  for (let i = 0; i < unitRows.length; i++) {
    for (const f of requiredUnique) {
      const val = unitRows[i][f.fieldKey] || unitRows[i][f.fieldKey.toLowerCase()];
      if (!val?.toString().trim()) {
        addToast(`Unit ${i + 1}: "${f.fieldName}" is required`, "error");
        return;
      }
    }
  }

  // ── STEP 3: Build units array ─────────────────────────────────────────────
  const units = unitRows.map(unit => {
    const configurations = { ...sharedForm };
    fields
      .filter(f => isUniqueField(f.fieldKey))
      .forEach(f => {
        const val = unit[f.fieldKey] || unit[f.fieldKey.toLowerCase()] || "";
        configurations[f.fieldKey] = val;
      });
    return { configurations };
  });

  // ── STEP 4: Send to backend ───────────────────────────────────────────────
  try {
    await axiosInstance.post("/category/register", {
      category: registerCategory._id,
      units,
      quantity: units.length,
    });

    addToast(`${units.length} product${units.length > 1 ? "s" : ""} registered successfully!`);
    setShowRegisterModal(false);
    setSharedForm({});
    setUnitRows([{ id: 1 }]);
    setQuantity(1);
  } catch (e) {
    addToast(e.response?.data?.message || "Registration failed", "error");
  }
};

  const activeCount = categories.filter(c => c.isActive !== false).length;
  const configCount = Object.values(configs).filter(Boolean).length;

  // Get unique and shared fields for the register modal
  const registerFields   = configs[registerCategory?._id]?.fields || [];
  const sharedFields     = registerFields.filter(f => !isUniqueField(f.fieldKey));
  const uniqueFields     = registerFields.filter(f =>  isUniqueField(f.fieldKey));
  const hasUniqueFields  = uniqueFields.length > 0;

  // Render a shared field (reads/writes sharedForm)
  const renderSharedField = (field) => {
    const commonProps = {
      key:      field.fieldKey,
      label:    quantity > 1 ? `${field.fieldName} (same for all ${quantity} units)` : field.fieldName,
      required: field.isRequired,
    };
    if (field.fieldType === "Date") {
      return (
        <DateInput {...commonProps}
          value={sharedForm[field.fieldKey] || ""}
          onChange={e => setSharedForm(p => ({ ...p, [field.fieldKey]: e.target.value }))} />
      );
    }
    if (field.options?.length > 0) {
      return (
        <Select {...commonProps}
          value={sharedForm[field.fieldKey] || ""}
          onChange={e => setSharedForm(p => ({ ...p, [field.fieldKey]: e.target.value }))}>
          <option value="">— Select —</option>
          {field.options.map(o => <option key={o} value={o}>{o}</option>)}
        </Select>
      );
    }
    return (
      <Input {...commonProps}
        type={field.fieldType === "Number" ? "number" : "text"}
        value={sharedForm[field.fieldKey] || ""}
        onChange={e => setSharedForm(p => ({ ...p, [field.fieldKey]: e.target.value }))} />
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ccm-root { background: #eef2f5; font-family: 'DM Sans', sans-serif; }
        .ccm-header {
          position: sticky; top: 0; z-index: 100; height: 64px;
          background: linear-gradient(135deg, #1a3a4f 0%, #1F6E8C 100%);
          padding: 0 40px; display: flex; align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 16px rgba(26,58,79,0.25);
        }
        .ccm-main { max-width: 860px; margin: 0 auto; padding: 32px 20px 48px; }
        @keyframes toastIn { from { transform: translateX(20px); opacity:0 } to { transform:none; opacity:1 } }
        @keyframes modalIn { from { transform: scale(0.97) translateY(-6px); opacity:0 } to { transform:none; opacity:1 } }
        @keyframes fadeUp  { from { transform: translateY(10px); opacity:0 } to { transform:none; opacity:1 } }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .cat-card { animation: fadeUp 0.28s ease both; transition: box-shadow 0.2s, transform 0.2s; }
        .cat-card:hover { box-shadow: 0 6px 24px rgba(31,110,140,0.12) !important; transform: translateY(-1px); }
        .cat-row:hover  { background: #f0f9fc !important; }
        .field-row:hover { background: #f0f9fc !important; }
        .unit-card { border: 1.5px solid #d0e8f2; border-radius: 10px; overflow: hidden; margin-bottom: 0; }
        .unit-card + .unit-card { margin-top: 10px; }
        input::placeholder { color: #a8c8d8; }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(35%) sepia(60%) saturate(400%) hue-rotate(165deg);
          cursor: pointer; opacity: 0.8;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 1; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #b3d4e2; border-radius: 2px; }
      `}</style>

      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="ccm-root">

        {/* ── STICKY HEADER ── */}
        <header className="ccm-header">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BoxIcon size={17} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff",
                fontFamily: "'Syne', sans-serif", letterSpacing: "-0.4px", lineHeight: 1 }}>
                Category Manager
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                Customer Care Portal
              </div>
            </div>
          </div>
          <Btn variant="white" onClick={() => { setEditCat(null); setCatForm({ name: "", description: "" }); setShowCatModal(true); }}>
            <PlusIcon /> New Category
          </Btn>
        </header>

        <main className="ccm-main">

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 30 }}>
            {[
              { label: "Total Categories", value: categories.length, color: C.teal  },
              { label: "With Config",       value: configCount,       color: C.green },
              { label: "Active",            value: activeCount,       color: C.amber },
            ].map(s => (
              <div key={s.label} style={{
                background: "#fff", border: `1px solid ${C.border}`,
                borderRadius: 14, padding: "20px 22px",
                boxShadow: "0 2px 8px rgba(31,110,140,0.07)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: "14px 14px 0 0" }} />
                <div style={{ fontSize: 11, color: C.textSecondary, fontWeight: 600, letterSpacing: "0.04em", marginBottom: 10, marginTop: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 34, fontWeight: 800, color: s.color, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Section Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 3, height: 20, background: C.teal, borderRadius: 2 }} />
              <h2 style={{ fontSize: 17, fontWeight: 800, color: C.textPrimary, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.4px" }}>
                All Categories
              </h2>
            </div>
            <span style={{ fontSize: 11, color: C.textMuted }}>Click a category to manage configuration</span>
          </div>

          {/* Category List */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  height: 66, borderRadius: 14,
                  background: "linear-gradient(90deg, #e4eff4 25%, #d4e9f0 50%, #e4eff4 75%)",
                  backgroundSize: "200% 100%",
                  animation: `shimmer 1.4s infinite`, animationDelay: `${i * 0.1}s`,
                  border: `1px solid ${C.border}`,
                }} />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "64px 24px", background: "#fff",
              borderRadius: 16, border: `2px dashed ${C.border}`,
              boxShadow: "0 2px 8px rgba(31,110,140,0.05)",
            }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>📦</div>
              <div style={{ fontWeight: 700, color: C.textSecondary, fontSize: 15 }}>No categories yet</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>Create your first category to get started</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {categories.map((cat, i) => {
                const isOpen = expandedCategory === cat._id;
                const config = configs[cat._id];
                return (
                  <div key={cat._id} className="cat-card" style={{
                    background: "#fff",
                    border: `1px solid ${isOpen ? C.teal + "66" : C.border}`,
                    borderRadius: 14, overflow: "hidden",
                    boxShadow: isOpen ? `0 0 0 3px ${C.teal}14, 0 4px 20px rgba(31,110,140,0.1)` : "0 1px 4px rgba(31,110,140,0.06)",
                    transition: "all 0.2s ease", animationDelay: `${i * 0.05}s`,
                  }}>
                    {/* Category Row */}
                    <div className="cat-row" onClick={() => toggleExpand(cat._id)} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "13px 18px", cursor: "pointer",
                      background: isOpen ? "#f0f9fc" : "#fff",
                      transition: "background 0.15s",
                      borderBottom: isOpen ? `1px solid ${C.border}` : "none",
                    }}>
                      <CategoryAvatar name={cat.name} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary, fontFamily: "'Syne', sans-serif" }}>
                          {cat.name}
                        </div>
                        {cat.description && (
                          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {cat.description}
                          </div>
                        )}
                      </div>
                      {config?.fields?.length > 0 && (
                        <span style={{
                          background: C.tealPale, color: C.teal, border: `1px solid ${C.borderMid}`,
                          borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700,
                        }}>{config.fields.length} fields</span>
                      )}
                      <div onClick={e => e.stopPropagation()} style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => { setEditCat(cat); setCatForm({ name: cat.name, description: cat.description || "" }); setShowCatModal(true); }}
                          style={{ background: C.tealPale, border: "none", borderRadius: 7, padding: 7, cursor: "pointer", color: C.textSecondary, display: "flex", transition: "all 0.15s" }}
                          onMouseOver={e => { e.currentTarget.style.background = "#cde6f0"; e.currentTarget.style.color = C.teal; }}
                          onMouseOut={e => { e.currentTarget.style.background = C.tealPale; e.currentTarget.style.color = C.textSecondary; }}>
                          <EditIcon />
                        </button>
                        <button onClick={() => handleDeleteCategory(cat._id)}
                          style={{ background: C.redPale, border: "none", borderRadius: 7, padding: 7, cursor: "pointer", color: C.red, display: "flex", transition: "all 0.15s" }}
                          onMouseOver={e => e.currentTarget.style.background = "#f8d8d8"}
                          onMouseOut={e => e.currentTarget.style.background = C.redPale}>
                          <TrashIcon />
                        </button>
                      </div>
                      <div style={{ color: isOpen ? C.teal : C.textMuted, transform: isOpen ? "rotate(180deg)" : "none", transition: "all 0.2s ease", display: "flex" }}>
                        <ChevronDown />
                      </div>
                    </div>

                    {/* Config Panel */}
                    {isOpen && (
                      <div style={{ background: C.panelBg, padding: "16px 18px 20px", borderTop: `1px solid ${C.tealPale}` }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, color: C.textSecondary,
                            fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
                            <SettingsIcon /> CONFIGURATION FIELDS
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            {config && (
                              <Btn variant="success" onClick={() => openRegisterModal(cat)}>
                                <BoxIcon /> Register Product
                              </Btn>
                            )}
                            {config === null ? (
                              <Btn onClick={() => openCreateConfig(cat)}><PlusIcon /> Create Config</Btn>
                            ) : config ? (
                              <Btn variant="ghost" onClick={() => { setAddingField({ categoryId: cat._id, field: { fieldName: "", fieldKey: "", fieldType: "String", unit: "", isRequired: false, options: "" } }); setShowFieldModal(true); }}>
                                <PlusIcon /> Add Field
                              </Btn>
                            ) : null}
                          </div>
                        </div>

                        {config === undefined ? (
                          <div style={{ textAlign: "center", padding: "20px", color: C.textMuted, fontSize: 13 }}>Loading config...</div>
                        ) : config === null ? (
                          <div style={{ textAlign: "center", padding: "28px", border: `2px dashed ${C.borderMid}`, borderRadius: 10, background: "#fff" }}>
                            <div style={{ fontSize: 26, marginBottom: 8 }}>⚙️</div>
                            <div style={{ fontWeight: 600, color: C.textSecondary, fontSize: 13 }}>No configuration yet</div>
                            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>
                              Create a config for <b style={{ color: C.teal }}>{cat.name}</b>
                            </div>
                          </div>
                        ) : config.fields?.length === 0 ? (
                          <div style={{ textAlign: "center", padding: "16px", fontSize: 12, color: C.textMuted }}>No fields yet. Add one!</div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 32px", gap: 12, padding: "5px 12px",
                              fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                              <span>Field / Key</span><span>Type</span><span>Unit</span><span>Required</span><span></span>
                            </div>
                            {config.fields.map((field, fi) => (
                              <div key={fi} className="field-row" style={{
                                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 32px",
                                gap: 12, padding: "10px 12px",
                                background: "#fff", border: `1px solid ${C.border}`,
                                borderRadius: 9, alignItems: "center", transition: "background 0.15s",
                              }}>
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontWeight: 600, fontSize: 13, color: C.textPrimary }}>{field.fieldName}</span>
                                    {field.fieldType === "Date" && <span title="Date field"><CalendarIcon size={12} color={C.amber} /></span>}
                                    {/* Show badge if this field is unique per unit */}
                                    {isUniqueField(field.fieldKey) && (
                                      <span style={{ fontSize: 9, fontWeight: 700, background: C.amberPale, color: C.amber,
                                        border: `1px solid ${C.amber}44`, borderRadius: 4, padding: "1px 6px" }}>
                                        UNIQUE/UNIT
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{field.fieldKey}</div>
                                  {field.options?.length > 0 && (
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
                                      {field.options.map(o => (
                                        <span key={o} style={{ background: C.tealPale, color: C.textSecondary, borderRadius: 4, padding: "1px 6px", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>{o}</span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div><FieldTypeBadge type={field.fieldType} /></div>
                                <div style={{ fontSize: 12, color: C.textMuted }}>{field.unit || "—"}</div>
                                <div>
                                  {field.isRequired
                                    ? <span style={{ color: C.green, fontSize: 11, fontWeight: 700 }}>✓ Yes</span>
                                    : <span style={{ color: C.textMuted, fontSize: 11 }}>No</span>}
                                </div>
                                <div>
                                  <button onClick={() => handleRemoveField(cat._id, field.fieldKey)}
                                    style={{ background: "transparent", border: "none", borderRadius: 6, padding: 5, cursor: "pointer", color: C.textMuted, display: "flex", transition: "all 0.15s" }}
                                    onMouseOver={e => { e.currentTarget.style.background = C.redPale; e.currentTarget.style.color = C.red; }}
                                    onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMuted; }}>
                                    <TrashIcon />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ══ MODAL: CREATE / EDIT CATEGORY ══ */}
      <Modal open={showCatModal} onClose={() => { setShowCatModal(false); setEditCat(null); }} title={editCat ? "Edit Category" : "New Category"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Category Name" required placeholder="e.g. Laptop, Printer, AC" value={catForm.name} onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Description" placeholder="Optional description" value={catForm.description} onChange={e => setCatForm(p => ({ ...p, description: e.target.value }))} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="secondary" onClick={() => { setShowCatModal(false); setEditCat(null); }}>Cancel</Btn>
            <Btn onClick={handleSaveCategory}>{editCat ? "Update" : "Create Category"}</Btn>
          </div>
        </div>
      </Modal>

      {/* ══ MODAL: CREATE CONFIG ══ */}
      <Modal open={showConfigModal} onClose={() => setShowConfigModal(false)} title={`Config — ${activeCategoryForConfig?.name}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>
            Define fields for <b style={{ color: C.teal }}>{activeCategoryForConfig?.name}</b>.
          </p>
          <div style={{ background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Add a field</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Field Name" placeholder="e.g. Purchase Date" value={newField.fieldName} onChange={e => setNewField(p => ({ ...p, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) }))} />
              <Input label="Field Key" placeholder="auto-filled" value={newField.fieldKey} onChange={e => setNewField(p => ({ ...p, fieldKey: e.target.value }))} />
              <Select label="Type" value={newField.fieldType} onChange={e => setNewField(p => ({ ...p, fieldType: e.target.value }))}>
                {FIELD_TYPES.map(t => <option key={t}>{t}</option>)}
              </Select>
              <Input label="Unit (optional)" placeholder="GB, inch..." value={newField.unit} onChange={e => setNewField(p => ({ ...p, unit: e.target.value }))} />
            </div>
            <Input label="Options (comma separated)" placeholder="8GB, 16GB, 32GB" value={newField.options} onChange={e => setNewField(p => ({ ...p, options: e.target.value }))} />
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textSecondary, cursor: "pointer" }}>
              <input type="checkbox" checked={newField.isRequired} onChange={e => setNewField(p => ({ ...p, isRequired: e.target.checked }))} style={{ accentColor: C.teal }} />
              Required field
            </label>
            {newField.fieldType === "Date" && (
              <div style={{ fontSize: 11, color: C.amber, background: C.amberPale, border: `1px solid ${C.amber}44`, borderRadius: 7, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                <CalendarIcon size={12} color={C.amber} />
                Date fields show a calendar picker when registering a product
              </div>
            )}
            <Btn variant="ghost" onClick={addFieldToForm} style={{ alignSelf: "flex-start" }}><PlusIcon /> Add to list</Btn>
          </div>
          {configFields.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Fields to create ({configFields.length})</div>
              {configFields.map(f => (
                <div key={f._tempId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{f.fieldName}</span>
                    <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 8, fontFamily: "'DM Mono', monospace" }}>({f.fieldKey})</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <FieldTypeBadge type={f.fieldType} />
                    {f.fieldType === "Date" && <CalendarIcon size={12} color={C.amber} />}
                    {f.isRequired && <span style={{ color: C.green, fontSize: 10, fontWeight: 700 }}>REQUIRED</span>}
                    <button onClick={() => setConfigFields(p => p.filter(x => x._tempId !== f._tempId))} style={{ background: "none", border: "none", cursor: "pointer", color: C.red, display: "flex" }}><XIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setShowConfigModal(false)}>Cancel</Btn>
            <Btn onClick={handleCreateConfig} disabled={configFields.length === 0}><CheckIcon /> Save Configuration</Btn>
          </div>
        </div>
      </Modal>

      {/* ══ MODAL: ADD FIELD ══ */}
      <Modal open={showFieldModal} onClose={() => setShowFieldModal(false)} title="Add New Field">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Field Name" required placeholder="e.g. Warranty End Date" value={addingField.field.fieldName} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldName: e.target.value, fieldKey: toFieldKey(e.target.value) } }))} />
            <Input label="Field Key" placeholder="auto-filled" value={addingField.field.fieldKey} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldKey: e.target.value } }))} />
            <Select label="Type" value={addingField.field.fieldType} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, fieldType: e.target.value } }))}>
              {FIELD_TYPES.map(t => <option key={t}>{t}</option>)}
            </Select>
            <Input label="Unit (optional)" placeholder="GB, inch..." value={addingField.field.unit} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, unit: e.target.value } }))} />
          </div>
          <Input label="Options (comma separated)" placeholder="8GB, 16GB, 32GB" value={addingField.field.options} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, options: e.target.value } }))} />
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textSecondary, cursor: "pointer" }}>
            <input type="checkbox" checked={addingField.field.isRequired} onChange={e => setAddingField(p => ({ ...p, field: { ...p.field, isRequired: e.target.checked } }))} style={{ accentColor: C.teal }} />
            Required field
          </label>
          {addingField.field.fieldType === "Date" && (
            <div style={{ fontSize: 11, color: C.amber, background: C.amberPale, border: `1px solid ${C.amber}44`, borderRadius: 7, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6 }}>
              <CalendarIcon size={12} color={C.amber} />
              Date fields show a calendar picker when registering a product
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setShowFieldModal(false)}>Cancel</Btn>
            <Btn onClick={handleAddFieldToExisting}><PlusIcon /> Add Field</Btn>
          </div>
        </div>
      </Modal>

      {/* ══ MODAL: REGISTER PRODUCT (FIXED) ══════════════════════════════════
        
        THE FIX EXPLAINED:
        
        BEFORE (the bug):
          One single registerForm object shared by all units.
          { serialnumber: "ABC", modelnumber: "XYZ" }
          All 3 units get identical values → BUG
        
        AFTER (the fix):
          TWO separate areas:
          1. SHARED FIELDS — filled once, applies to ALL units
             e.g. RAM=8GB, Color=Black, Company=Dell
          2. UNIT ROWS — one card per unit, each has its own
             serialnumber, modelnumber, invoicenumber
        
        When quantity changes → handleQuantityChange generates
        that many unit row cards automatically.
        
        On submit → merge shared + unique per unit → send units[] array
        Backend creates one Product per unit with unique configs.
      ════════════════════════════════════════════════════════════════════════ */}
      <Modal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        title={`Register — ${registerCategory?.name}`}
        wide={hasUniqueFields && quantity > 1}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Category banner */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.tealPale, border: `1px solid ${C.borderMid}`,
            borderRadius: 9, padding: "10px 14px",
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, flexShrink: 0,
              background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BoxIcon size={14} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted,
                textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.teal,
                fontFamily: "'Syne', sans-serif" }}>{registerCategory?.name}</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 600, color: C.teal,
              background: "#fff", border: `1px solid ${C.borderMid}`, borderRadius: 5, padding: "2px 8px" }}>
              Auto
            </span>
          </div>

          {/* Quantity */}
          {/* Quantity */}
<div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
  <label style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary,
    letterSpacing: "0.05em", textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif" }}>
    Quantity
  </label>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <button
      onClick={() => handleQuantityChange(quantity - 1)}
      style={{ width: 32, height: 32, borderRadius: 8,
        border: `1.5px solid ${C.border}`, background: C.inputBg,
        color: C.textPrimary, fontSize: 18, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700 }}>
      −
    </button>
    <input
      type="number" min="1"
      value={quantity}
      onChange={e => handleQuantityChange(e.target.value)}
      style={{ width: 70, textAlign: "center", background: C.inputBg,
        border: `1.5px solid ${C.border}`, borderRadius: 8,
        padding: "8px", fontSize: 15, fontWeight: 700,
        color: C.textPrimary, outline: "none",
        fontFamily: "'DM Sans', sans-serif" }}
    />
    <button
      onClick={() => handleQuantityChange(quantity + 1)}
      style={{ width: 32, height: 32, borderRadius: 8,
        border: `1.5px solid ${C.border}`, background: C.inputBg,
        color: C.textPrimary, fontSize: 18, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700 }}>
      +
    </button>
  </div>
</div>

          {/* ── SHARED FIELDS SECTION ────────────────────────────────────────
            These fields are the same for ALL units.
            Agent fills them once. All products get the same value.
            Examples: RAM, Color, Company Name, Purchase Date
          ─────────────────────────────────────────────────────────────────── */}
          {sharedFields.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {quantity > 1 && (
                <div style={{
                  fontSize: 10, fontWeight: 700, color: C.textSecondary,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  display: "flex", alignItems: "center", gap: 8,
                  borderBottom: `1px solid ${C.border}`, paddingBottom: 8,
                }}>
                  <span style={{ background: C.tealPale, color: C.teal, borderRadius: 4,
                    padding: "2px 8px", fontSize: 9 }}>SHARED</span>
                  Same for all {quantity} units
                </div>
              )}
              {sharedFields.map(field => renderSharedField(field))}
            </div>
          )}

          {/* ── UNIQUE FIELDS SECTION ─────────────────────────────────────────
            These fields must be different for each unit.
            One card rendered per unit. Agent fills each separately.
            Fields: serialnumber, modelnumber, invoicenumber
          ─────────────────────────────────────────────────────────────────── */}
          {hasUniqueFields && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Section header */}
              <div style={{
                fontSize: 10, fontWeight: 700, color: C.textSecondary,
                textTransform: "uppercase", letterSpacing: "0.08em",
                display: "flex", alignItems: "center", gap: 8,
                borderBottom: `1px solid ${C.border}`, paddingBottom: 8,
              }}>
                <span style={{ background: C.amberPale, color: C.amber, borderRadius: 4,
                  padding: "2px 8px", fontSize: 9, border: `1px solid ${C.amber}44` }}>UNIQUE</span>
                Enter different values for each of the {quantity} unit{quantity > 1 ? "s" : ""}
              </div>

              {/* One card per unit */}
              {unitRows.map((unit, idx) => (
                <div key={unit.id} className="unit-card">

                  {/* Unit header */}
                  <div style={{
                    background: `linear-gradient(135deg, #1a3a4f, #1F6E8C)`,
                    padding: "8px 14px",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{
                      background: "rgba(255,255,255,0.2)", color: "#fff",
                      borderRadius: 5, padding: "2px 10px",
                      fontSize: 11, fontWeight: 800,
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      Unit {idx + 1}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                      of {quantity}
                    </span>
                  </div>

                  {/* Unique fields for this unit */}
                  <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {uniqueFields.map(field => (
                      <Input
                        key={field.fieldKey}
                        label={field.fieldName}
                        required={field.isRequired}
                        placeholder={`Enter ${field.fieldName} for Unit ${idx + 1}`}
                        value={unit[field.fieldKey] || ""}
                        onChange={e => handleUnitFieldChange(unit.id, field.fieldKey, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4,
            borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            <Btn variant="secondary" onClick={() => setShowRegisterModal(false)}>Cancel</Btn>
            <Btn onClick={handleRegisterSubmit}>
              <CheckIcon /> Register {quantity} Product{quantity > 1 ? "s" : ""}
            </Btn>
          </div>
        </div>
      </Modal>
    </>
  );
}
import React, { useState, useEffect } from "react";
import { Lock, Unlock, X, Plus, Minus, Trophy, Trash2, Edit, UserPlus } from "lucide-react";

const LOGO_SRC = "data:image/png;base64,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";

/* ---------------------------------------------------------
   ÍCONOS DE PALOS — mismo trazo monolínea que el isotipo
   de UnTrucoUY, usados como marca de agua en cada mesa.
--------------------------------------------------------- */
function SuitIcon({ type, className }) {
  const common = { viewBox: "0 0 100 100", fill: "none", stroke: "currentColor", strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round", className };
  if (type === "espada") return (
    <svg {...common}>
      <line x1="50" y1="8" x2="50" y2="82" />
      <line x1="28" y1="30" x2="72" y2="30" />
      <circle cx="50" cy="90" r="6" />
    </svg>
  );
  if (type === "basto") return (
    <svg {...common}>
      <rect x="40" y="14" width="20" height="72" rx="9" />
      <circle cx="50" cy="30" r="3" fill="currentColor" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
      <circle cx="50" cy="70" r="3" fill="currentColor" />
    </svg>
  );
  if (type === "copa") return (
    <svg {...common}>
      <path d="M28 16 H72 L60 52 V72 M40 52 V72 M33 88 H67 L60 72 H40 L33 88 Z" />
    </svg>
  );
  return (
    <svg {...common}>
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="13" />
    </svg>
  );
}

const SUITS = ["oro", "copa", "espada", "basto"];

/* ---------------------------------------------------------
   DATOS DE EJEMPLO
--------------------------------------------------------- */
const initialMesas = [
  { id: 1, a: "Los Cracks", b: "Doble Nueve", scoreA: 24, scoreB: 18, set: "malas", status: "jugando" },
  { id: 2, a: "Ni Fu Ni Fa", b: "Truco Viejo", scoreA: 12, scoreB: 9, set: "malas", status: "jugando" },
  { id: 3, a: "Envido Va", b: "La Junta", scoreA: 30, scoreB: 22, set: "buenas", status: "finalizada" },
  { id: 4, a: "Flor y Truco", b: "Los Pibes", scoreA: 5, scoreB: 3, set: "buenas", status: "jugando" },
  { id: 5, a: "Sin Cartas", b: "Retruco FC", scoreA: 0, scoreB: 0, set: "malas", status: "libre" },
  { id: 6, a: "La Banda del Oro", b: "Cuatro Vale", scoreA: 20, scoreB: 27, set: "malas", status: "jugando" },
  { id: 7, a: "Mano de Hierro", b: "Los Zurdos", scoreA: 30, scoreB: 14, set: "buenas", status: "finalizada" },
  { id: 8, a: "Che Truco", b: "Doña Envido", scoreA: 15, scoreB: 15, set: "malas", status: "jugando" },
];

const initialStandings = [
  { pair: "Mano de Hierro", pj: 3, pg: 3, pp: 0, pts: 9 },
  { pair: "Envido Va", pj: 3, pg: 3, pp: 0, pts: 9 },
  { pair: "Cuatro Vale", pj: 3, pg: 2, pp: 1, pts: 6 },
  { pair: "Los Cracks", pj: 3, pg: 2, pp: 1, pts: 6 },
  { pair: "Flor y Truco", pj: 3, pg: 1, pp: 2, pts: 3 },
  { pair: "Che Truco", pj: 3, pg: 1, pp: 2, pts: 3 },
  { pair: "Doble Nueve", pj: 3, pg: 0, pp: 3, pts: 0 },
  { pair: "La Junta", pj: 3, pg: 0, pp: 3, pts: 0 },
];

const initialBracket = {
  cuartos: [
    { a: "Envido Va", b: "La Junta", winner: "Envido Va" },
    { a: "Mano de Hierro", b: "Los Zurdos", winner: "Mano de Hierro" },
    { a: "Los Cracks", b: "Doble Nueve", winner: null },
    { a: "Cuatro Vale", b: "La Banda del Oro", winner: null },
  ],
  semis: [
    { a: "Envido Va", b: "Mano de Hierro", winner: null },
    { a: "TBD", b: "TBD", winner: null },
  ],
  final: [{ a: "TBD", b: "TBD", winner: null }],
};

/* ---------------------------------------------------------
   COMPONENTE PRINCIPAL
--------------------------------------------------------- */
export default function TrucoTorneoDemo() {
  const [tab, setTab] = useState("mesas");
  const [showLogin, setShowLogin] = useState(false);
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mesas, setMesas] = useState([]);
  const [standings, setStandings] = useState([]);
  const [bracket, setBracket] = useState({ cuartos: [], semis: [], final: [] });
  const [loading, setLoading] = useState(true);

  // Modales mesas
  const [showCreateMesa, setShowCreateMesa] = useState(false);
  const [newMesaA, setNewMesaA] = useState("");
  const [newMesaB, setNewMesaB] = useState("");
  const [newMesaSet, setNewMesaSet] = useState("malas");
  const [newMesaStatus, setNewMesaStatus] = useState("libre");

  // Modales participantes
  const [showCreatePart, setShowCreatePart] = useState(false);
  const [newPartName, setNewPartName] = useState("");
  const [newPartPJ, setNewPartPJ] = useState(0);
  const [newPartPG, setNewPartPG] = useState(0);
  const [newPartPP, setNewPartPP] = useState(0);
  const [newPartPts, setNewPartPts] = useState(0);

  const [editingPart, setEditingPart] = useState(null);
  const [editPartName, setEditPartName] = useState("");
  const [editPartPJ, setEditPartPJ] = useState(0);
  const [editPartPG, setEditPartPG] = useState(0);
  const [editPartPP, setEditPartPP] = useState(0);
  const [editPartPts, setEditPartPts] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [resMesas, resStandings, resBracket] = await Promise.all([
        fetch("/api/mesas").then((r) => r.json()),
        fetch("/api/standings").then((r) => r.json()),
        fetch("/api/bracket").then((r) => r.json()),
      ]);
      setMesas(resMesas || []);
      setStandings(resStandings || []);
      if (resBracket) {
        setBracket(resBracket);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  }

  function tryLogin() {
    if (pass === "truco2026") {
      setIsAdmin(true);
      setShowLogin(false);
      setPass("");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  }

  async function adjustScore(id, side, delta) {
    const mesa = mesas.find((m) => m.id === id);
    if (!mesa) return;
    const newScore = Math.max(0, Math.min(30, mesa[side] + delta));

    // Optimistic update
    setMesas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [side]: newScore } : m))
    );

    try {
      const res = await fetch("/api/mesas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, [side]: newScore }),
      });
      if (!res.ok) throw new Error("Failed to update score");
      const updated = await res.json();
      setMesas((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch (err) {
      console.error("Error updating score:", err);
      fetchData();
    }
  }

  async function cycleStatus(id) {
    const mesa = mesas.find((m) => m.id === id);
    if (!mesa) return;
    const order = ["libre", "jugando", "finalizada"];
    const newStatus = order[(order.indexOf(mesa.status) + 1) % order.length];

    // Optimistic update
    setMesas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );

    try {
      const res = await fetch("/api/mesas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setMesas((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch (err) {
      console.error("Error updating status:", err);
      fetchData();
    }
  }

  async function pickWinner(round, idx, name) {
    if (!isAdmin || name === "TBD") return;
    const nextBracket = structuredClone(bracket);
    nextBracket[round][idx].winner =
      nextBracket[round][idx].winner === name ? null : name;

    // Optimistic update
    setBracket(nextBracket);

    try {
      const res = await fetch("/api/bracket", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextBracket),
      });
      if (!res.ok) throw new Error("Failed to update bracket");
      const updated = await res.json();
      setBracket(updated);
    } catch (err) {
      console.error("Error updating bracket:", err);
      fetchData();
    }
  }

  async function createMesa(e) {
    e.preventDefault();
    if (!newMesaA || !newMesaB) return;
    try {
      const res = await fetch("/api/mesas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          a: newMesaA,
          b: newMesaB,
          set: newMesaSet,
          status: newMesaStatus,
          scoreA: 0,
          scoreB: 0
        }),
      });
      if (!res.ok) throw new Error("Error al crear mesa");
      const created = await res.json();
      setMesas((prev) => [...prev, created]);
      setShowCreateMesa(false);
      setNewMesaA("");
      setNewMesaB("");
      setNewMesaSet("malas");
      setNewMesaStatus("libre");
    } catch (err) {
      console.error(err);
      alert("Error al crear la mesa");
    }
  }

  async function deleteMesa(id) {
    if (!window.confirm("¿Seguro que querés eliminar esta mesa?")) return;
    try {
      const res = await fetch(`/api/mesas?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar mesa");
      setMesas((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la mesa");
    }
  }

  async function createParticipant(e) {
    e.preventDefault();
    if (!newPartName) return;
    try {
      const res = await fetch("/api/standings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pair: newPartName,
          pj: Number(newPartPJ),
          pg: Number(newPartPG),
          pp: Number(newPartPP),
          pts: Number(newPartPts)
        }),
      });
      if (!res.ok) throw new Error("Error al crear participante");
      const created = await res.json();
      setStandings((prev) => [...prev, created].sort((a, b) => b.pts - a.pts));
      setShowCreatePart(false);
      setNewPartName("");
      setNewPartPJ(0);
      setNewPartPG(0);
      setNewPartPP(0);
      setNewPartPts(0);
    } catch (err) {
      console.error(err);
      alert("Error al crear el participante");
    }
  }

  function startEditingPart(p) {
    setEditingPart(p);
    setEditPartName(p.pair);
    setEditPartPJ(p.pj);
    setEditPartPG(p.pg);
    setEditPartPP(p.pp);
    setEditPartPts(p.pts);
  }

  async function updateParticipant(e) {
    e.preventDefault();
    if (!editingPart || !editPartName) return;
    try {
      const res = await fetch("/api/standings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPart.id,
          pair: editPartName,
          pj: Number(editPartPJ),
          pg: Number(editPartPG),
          pp: Number(editPartPP),
          pts: Number(editPartPts)
        }),
      });
      if (!res.ok) throw new Error("Error al actualizar participante");
      const updated = await res.json();
      setStandings((prev) =>
        prev
          .map((p) => (p.id === editingPart.id ? updated : p))
          .sort((a, b) => b.pts - a.pts)
      );
      setEditingPart(null);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el participante");
    }
  }

  async function deleteParticipant(id) {
    if (!window.confirm("¿Seguro que querés eliminar este participante?")) return;
    try {
      const res = await fetch(`/api/standings?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar participante");
      setStandings((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el participante");
    }
  }


  return (
    <div className="tw-root">
      <style>{`
        @import url(\'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap\');

        .tw-root {
          --gray-900: #201F1E;
          --gray-800: #2C2B2A;
          --gray-700: #4A4A49;
          --gray-600: #606060;
          --gray-500: #7A7A78;
          --line: rgba(247,231,205,0.16);
          --cream: #F7E7CD;
          --cream-dim: #C9BBA0;
          --ink: #201F1D;
          --live: #B5493D;
          font-family: \'Work Sans\', sans-serif;
          background: var(--gray-900);
          background-image:
            repeating-linear-gradient(90deg, rgba(247,231,205,0.035) 0px, rgba(247,231,205,0.035) 1px, transparent 1px, transparent 7px);
          color: var(--cream);
          min-height: 100%;
          border-radius: 12px;
          overflow: hidden;
        }
        .tw-display { font-family: \'Fraunces\', serif; font-optical-sizing: auto; letter-spacing: 0.01em; }
        .tw-mono { font-family: \'JetBrains Mono\', monospace; }

        .tw-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 28px; border-bottom: 1px solid var(--line);
          background: var(--gray-600);
          background-image: repeating-linear-gradient(90deg, rgba(32,31,30,0.06) 0px, rgba(32,31,30,0.06) 1px, transparent 1px, transparent 6px);
        }
        .tw-brand { display: flex; align-items: center; gap: 14px; }
        .tw-brand img { width: 46px; height: 46px; flex-shrink: 0; }
        .tw-title { font-family: \'Fraunces\'; font-weight: 600; font-size: 27px; line-height: 1; color: var(--cream); letter-spacing: 0.01em; }
        .tw-subtitle { font-size: 12px; color: var(--cream-dim); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 5px; }

        .tw-live {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(181,73,61,0.18); border: 1px solid rgba(181,73,61,0.5);
          color: #E9998D; padding: 4px 10px; border-radius: 999px;
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
        }
        .tw-dot { width: 7px; height: 7px; border-radius: 999px; background: #E9998D; animation: pulse 1.6s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

        .tw-nav { display: flex; gap: 4px; padding: 14px 28px 0 28px; }
        .tw-tab {
          font-family: \'Fraunces\'; font-weight: 600; font-size: 16px; letter-spacing: 0.02em;
          padding: 10px 20px; color: var(--cream-dim); cursor: pointer;
          border-bottom: 3px solid transparent; transition: all 0.15s ease;
          background: none; border-top: none; border-left: none; border-right: none;
        }
        .tw-tab:hover { color: var(--cream); }
        .tw-tab.active { color: var(--cream); border-bottom-color: var(--cream); }

        .tw-body { padding: 24px 28px 34px 28px; }

        .tw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }

        .tw-mesa {
          position: relative; overflow: hidden;
          background: var(--gray-800);
          border: 1.5px solid var(--gray-700);
          border-radius: 14px; padding: 16px;
        }
        .tw-mesa.finalizada { border-color: rgba(247,231,205,0.35); }
        .tw-mesa.libre { border-style: dashed; opacity: 0.65; }
        .tw-suit-watermark { position: absolute; right: -18px; bottom: -18px; width: 130px; height: 130px; color: var(--cream); opacity: 0.06; pointer-events: none; }
        .tw-mesa-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .tw-mesa-num { font-family: \'Fraunces\'; font-weight: 600; font-size: 26px; color: var(--cream); line-height: 1; }
        .tw-status-chip { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; padding: 4px 9px; border-radius: 999px; cursor: default; }
        .tw-status-chip.jugando { background: rgba(247,231,205,0.14); color: var(--cream); }
        .tw-status-chip.finalizada { background: rgba(255,255,255,0.06); color: var(--cream-dim); }
        .tw-status-chip.libre { background: rgba(255,255,255,0.04); color: var(--cream-dim); }
        .tw-status-chip.clickable { cursor: pointer; }
        .tw-status-chip.clickable:hover { filter: brightness(1.3); }

        .tw-players { display: flex; flex-direction: column; gap: 8px; position: relative; z-index: 1; }
        .tw-player-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .tw-player-name { font-size: 14.5px; font-weight: 600; color: var(--cream); }
        .tw-score-wrap { display: flex; align-items: center; gap: 6px; }
        .tw-score { font-family: \'JetBrains Mono\'; font-size: 19px; font-weight: 700; color: var(--cream); min-width: 26px; text-align: center; }
        .tw-score-btn { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--gray-700); background: rgba(255,255,255,0.03); color: var(--cream-dim); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .tw-score-btn:hover { border-color: var(--cream); color: var(--cream); }
        .tw-set-label { font-size: 11px; color: var(--cream-dim); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 8px; position: relative; z-index: 1; }

        .tw-bracket { display: flex; gap: 46px; overflow-x: auto; padding-bottom: 8px; }
        .tw-round { display: flex; flex-direction: column; justify-content: space-around; gap: 20px; min-width: 210px; }
        .tw-round-label { font-family: \'Fraunces\'; font-weight: 600; font-size: 15px; color: var(--cream-dim); text-align: center; margin-bottom: 6px; letter-spacing: 0.03em; }
        .tw-match { background: var(--gray-800); border: 1.5px solid var(--gray-700); border-radius: 10px; overflow: hidden; }
        .tw-match-side { display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; font-size: 13.5px; font-weight: 600; color: var(--cream-dim); border-bottom: 1px solid var(--gray-700); cursor: default; }
        .tw-match-side:last-child { border-bottom: none; }
        .tw-match-side.winner { color: var(--cream); background: rgba(247,231,205,0.08); }
        .tw-match-side.clickable { cursor: pointer; }
        .tw-match-side.clickable:hover { background: rgba(247,231,205,0.05); }

        .tw-table-wrap { border: 1.5px solid var(--gray-700); border-radius: 12px; overflow: hidden; }
        table.tw-standings { width: 100%; border-collapse: collapse; }
        table.tw-standings th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--cream-dim); font-weight: 700; padding: 12px 14px; background: rgba(0,0,0,0.18); border-bottom: 1px solid var(--gray-700); }
        table.tw-standings td { padding: 11px 14px; font-size: 14px; border-bottom: 1px solid rgba(247,231,205,0.08); }
        table.tw-standings tr:last-child td { border-bottom: none; }
        table.tw-standings tr:hover td { background: rgba(255,255,255,0.02); }
        .tw-pos { font-family: \'JetBrains Mono\'; color: var(--cream); font-weight: 700; }
        .tw-pts { font-family: \'JetBrains Mono\'; font-weight: 700; color: var(--cream); }

        .tw-btn { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; font-weight: 600; padding: 9px 15px; border-radius: 999px; border: 1.5px solid var(--cream-dim); background: transparent; color: var(--cream); transition: all 0.15s ease; }
        .tw-btn:hover { background: rgba(247,231,205,0.1); }
        .tw-btn.solid { background: var(--cream); color: var(--ink); border-color: var(--cream); }
        .tw-btn.solid:hover { filter: brightness(1.06); }

        .tw-modal-overlay { position: fixed; inset: 0; background: rgba(10,9,8,0.72); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px; }
        .tw-modal { background: var(--gray-800); border: 1.5px solid var(--gray-700); border-radius: 16px; padding: 26px; width: 100%; max-width: 340px; position: relative; }
        .tw-modal-close { position: absolute; top: 14px; right: 14px; cursor: pointer; color: var(--cream-dim); }
        .tw-modal-close:hover { color: var(--cream); }
        .tw-input { width: 100%; margin-top: 14px; padding: 11px 13px; border-radius: 9px; border: 1.5px solid var(--gray-700); background: rgba(0,0,0,0.2); color: var(--cream); font-size: 14px; box-sizing: border-box; }
        .tw-input:focus { outline: none; border-color: var(--cream); }
        .tw-error { color: #E9998D; font-size: 12.5px; margin-top: 8px; }
        .tw-hint { color: var(--cream-dim); font-size: 11.5px; margin-top: 10px; line-height: 1.5; }

        .tw-admin-banner { display: flex; align-items: center; justify-content: space-between; background: rgba(247,231,205,0.08); border: 1px solid rgba(247,231,205,0.28); padding: 9px 16px; border-radius: 10px; margin-bottom: 18px; font-size: 12.5px; color: var(--cream); }

        @media (max-width: 560px) {
          .tw-header { flex-direction: column; align-items: flex-start; gap: 12px; }
          .tw-title { font-size: 22px; }
          .tw-body { padding: 18px; }
          .tw-nav { padding: 12px 18px 0 18px; overflow-x: auto; }
          .tw-bracket { gap: 26px; }
        }

        .tw-focus:focus-visible { outline: 2px solid var(--cream); outline-offset: 2px; }
      `}</style>

      {/* HEADER */}
      <div className="tw-header">
        <div className="tw-brand">
          <img src={LOGO_SRC} alt="UnTrucoUY" />
          <div>
            <div className="tw-title">UnTrucoUY</div>
            <div className="tw-subtitle">Sede Pocitos · Fecha 3</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="tw-live"><span className="tw-dot" /> En vivo</span>
          {isAdmin ? (
            <button className="tw-btn solid tw-focus" onClick={() => setIsAdmin(false)}>
              <Unlock size={15} /> Modo admin
            </button>
          ) : (
            <button className="tw-btn tw-focus" onClick={() => setShowLogin(true)}>
              <Lock size={15} /> Admin
            </button>
          )}
        </div>
      </div>

      {/* NAV */}
      <div className="tw-nav">
        <button className={`tw-tab tw-focus ${tab === "mesas" ? "active" : ""}`} onClick={() => setTab("mesas")}>Mesas</button>
        <button className={`tw-tab tw-focus ${tab === "cruces" ? "active" : ""}`} onClick={() => setTab("cruces")}>Cruces</button>
        <button className={`tw-tab tw-focus ${tab === "posiciones" ? "active" : ""}`} onClick={() => setTab("posiciones")}>Posiciones</button>
      </div>

      {/* BODY */}
      <div className="tw-body">
        {isAdmin && (
          <div className="tw-admin-banner">
            <span>Modo admin activo — tocá los puntajes, el estado o los ganadores para editarlos.</span>
          </div>
        )}

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", color: "var(--cream-dim)", gap: 10 }}>
            <span className="tw-dot" style={{ position: "static", transform: "none" }} /> Cargando torneo...
          </div>
        ) : (
          <>
            {tab === "mesas" && (
              <div>
                {isAdmin && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
                    <button className="tw-btn solid tw-focus" onClick={() => setShowCreateMesa(true)}>
                      <Plus size={15} /> Nueva Mesa
                    </button>
                  </div>
                )}
                <div className="tw-grid">
                  {mesas.map((m) => {
                    const suit = SUITS[(m.id - 1) % SUITS.length];
                    return (
                      <div key={m.id} className={`tw-mesa ${m.status}`}>
                        <SuitIcon type={suit} className="tw-suit-watermark" />
                        <div className="tw-mesa-top">
                          <div className="tw-mesa-num">Mesa {m.id}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {isAdmin && (
                              <button
                                className="tw-score-btn"
                                style={{ border: "none", background: "none", color: "#E9998D", cursor: "pointer" }}
                                onClick={() => deleteMesa(m.id)}
                                title="Eliminar Mesa"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                            <div className={`tw-status-chip ${m.status} ${isAdmin ? "clickable" : ""}`} onClick={() => isAdmin && cycleStatus(m.id)}>
                              {m.status}
                            </div>
                          </div>
                        </div>
                        <div className="tw-players">
                          <div className="tw-player-row">
                            <span className="tw-player-name">{m.a}</span>
                            <span className="tw-score-wrap">
                              {isAdmin && <button className="tw-score-btn" onClick={() => adjustScore(m.id, "scoreA", -1)}><Minus size={12} /></button>}
                              <span className="tw-score">{m.scoreA}</span>
                              {isAdmin && <button className="tw-score-btn" onClick={() => adjustScore(m.id, "scoreA", 1)}><Plus size={12} /></button>}
                            </span>
                          </div>
                          <div className="tw-player-row">
                            <span className="tw-player-name">{m.b}</span>
                            <span className="tw-score-wrap">
                              {isAdmin && <button className="tw-score-btn" onClick={() => adjustScore(m.id, "scoreB", -1)}><Minus size={12} /></button>}
                              <span className="tw-score">{m.scoreB}</span>
                              {isAdmin && <button className="tw-score-btn" onClick={() => adjustScore(m.id, "scoreB", 1)}><Plus size={12} /></button>}
                            </span>
                          </div>
                        </div>
                        <div className="tw-set-label">{m.set}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "cruces" && (
              <div className="tw-bracket">
                {Object.entries(bracket).map(([roundKey, matches]) => (
                  <div className="tw-round" key={roundKey}>
                    <div className="tw-round-label">
                      {roundKey === "cuartos" ? "Cuartos" : roundKey === "semis" ? "Semifinal" : "Final"}
                    </div>
                    {matches && matches.map((match, idx) => (
                      <div className="tw-match" key={idx}>
                        {["a", "b"].map((side) => (
                          <div
                            key={side}
                            className={`tw-match-side ${match.winner === match[side] ? "winner" : ""} ${isAdmin && match[side] !== "TBD" ? "clickable" : ""}`}
                            onClick={() => pickWinner(roundKey, idx, match[side])}
                          >
                            {match[side]}
                            {match.winner === match[side] && <Trophy size={13} />}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {tab === "posiciones" && (
              <div>
                {isAdmin && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
                    <button className="tw-btn solid tw-focus" onClick={() => setShowCreatePart(true)}>
                      <UserPlus size={15} /> Nueva Pareja
                    </button>
                  </div>
                )}
                <div className="tw-table-wrap">
                  <table className="tw-standings">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Pareja</th>
                        <th>PJ</th>
                        <th>PG</th>
                        <th>PP</th>
                        <th>Pts</th>
                        {isAdmin && <th style={{ textAlign: "right" }}>Acciones</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((s, i) => (
                        <tr key={s.id || s.pair}>
                          <td className="tw-pos">{i + 1}</td>
                          <td>{s.pair}</td>
                          <td className="tw-mono">{s.pj}</td>
                          <td className="tw-mono">{s.pg}</td>
                          <td className="tw-mono">{s.pp}</td>
                          <td className="tw-pts">{s.pts}</td>
                          {isAdmin && (
                            <td style={{ textAlign: "right" }}>
                              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                                <button
                                  className="tw-score-btn"
                                  style={{ border: "none", background: "none", color: "var(--cream-dim)", cursor: "pointer" }}
                                  onClick={() => startEditingPart(s)}
                                  title="Editar"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  className="tw-score-btn"
                                  style={{ border: "none", background: "none", color: "#E9998D", cursor: "pointer" }}
                                  onClick={() => deleteParticipant(s.id)}
                                  title="Eliminar"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="tw-modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="tw-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tw-modal-close" onClick={() => setShowLogin(false)}><X size={18} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Lock size={18} color="var(--cream)" />
              <div className="tw-display" style={{ fontSize: 21, fontWeight: 600 }}>Ingreso admin</div>
            </div>
            <input
              className="tw-input tw-focus"
              type="password"
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setLoginError(false); }}
              onKeyDown={(e) => e.key === "Enter" && tryLogin()}
            />
            {loginError && <div className="tw-error">Contraseña incorrecta, probá de nuevo.</div>}
            <button className="tw-btn solid tw-focus" style={{ marginTop: 14, width: "100%", justifyContent: "center" }} onClick={tryLogin}>
              Entrar
            </button>
            <div className="tw-hint">Demo: la contraseña es <strong>truco2026</strong>. En la versión real cada organizador tendría su propio usuario.</div>
          </div>
        </div>
      )}

      {/* MODAL CREAR MESA */}
      {showCreateMesa && (
        <div className="tw-modal-overlay" onClick={() => setShowCreateMesa(false)}>
          <div className="tw-modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
            <div className="tw-modal-close" onClick={() => setShowCreateMesa(false)}><X size={18} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Plus size={18} color="var(--cream)" />
              <div className="tw-display" style={{ fontSize: 21, fontWeight: 600 }}>Nueva Mesa</div>
            </div>
            <form onSubmit={createMesa}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>Pareja A</label>
                  <select
                    className="tw-input tw-focus"
                    value={newMesaA}
                    onChange={(e) => setNewMesaA(e.target.value)}
                    required
                  >
                    <option value="" disabled style={{ background: "var(--gray-800)" }}>Seleccione pareja A</option>
                    {standings.map((p) => (
                      <option key={p.id} value={p.pair} style={{ background: "var(--gray-800)" }}>{p.pair}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>Pareja B</label>
                  <select
                    className="tw-input tw-focus"
                    value={newMesaB}
                    onChange={(e) => setNewMesaB(e.target.value)}
                    required
                  >
                    <option value="" disabled style={{ background: "var(--gray-800)" }}>Seleccione pareja B</option>
                    {standings.map((p) => (
                      <option key={p.id} value={p.pair} style={{ background: "var(--gray-800)" }}>{p.pair}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>Set</label>
                  <select
                    className="tw-input tw-focus"
                    value={newMesaSet}
                    onChange={(e) => setNewMesaSet(e.target.value)}
                  >
                    <option value="malas" style={{ background: "var(--gray-800)" }}>Malas</option>
                    <option value="buenas" style={{ background: "var(--gray-800)" }}>Buenas</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>Estado</label>
                  <select
                    className="tw-input tw-focus"
                    value={newMesaStatus}
                    onChange={(e) => setNewMesaStatus(e.target.value)}
                  >
                    <option value="libre" style={{ background: "var(--gray-800)" }}>Libre</option>
                    <option value="jugando" style={{ background: "var(--gray-800)" }}>Jugando</option>
                    <option value="finalizada" style={{ background: "var(--gray-800)" }}>Finalizada</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="tw-btn solid tw-focus" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
                Crear Mesa
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CREAR PARTICIPANTE */}
      {showCreatePart && (
        <div className="tw-modal-overlay" onClick={() => setShowCreatePart(false)}>
          <div className="tw-modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
            <div className="tw-modal-close" onClick={() => setShowCreatePart(false)}><X size={18} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <UserPlus size={18} color="var(--cream)" />
              <div className="tw-display" style={{ fontSize: 21, fontWeight: 600 }}>Nueva Pareja</div>
            </div>
            <form onSubmit={createParticipant}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>Nombre de la Pareja</label>
                  <input
                    type="text"
                    className="tw-input tw-focus"
                    placeholder="Ej: Envido Va"
                    value={newPartName}
                    onChange={(e) => setNewPartName(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>PJ (Partidos Jugados)</label>
                    <input
                      type="number"
                      className="tw-input tw-focus"
                      value={newPartPJ}
                      onChange={(e) => setNewPartPJ(e.target.value)}
                      min="0"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>PG (Partidos Ganados)</label>
                    <input
                      type="number"
                      className="tw-input tw-focus"
                      value={newPartPG}
                      onChange={(e) => setNewPartPG(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>PP (Partidos Perdidos)</label>
                    <input
                      type="number"
                      className="tw-input tw-focus"
                      value={newPartPP}
                      onChange={(e) => setNewPartPP(e.target.value)}
                      min="0"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>Pts (Puntos)</label>
                    <input
                      type="number"
                      className="tw-input tw-focus"
                      value={newPartPts}
                      onChange={(e) => setNewPartPts(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="tw-btn solid tw-focus" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
                Crear Pareja
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR PARTICIPANTE */}
      {editingPart && (
        <div className="tw-modal-overlay" onClick={() => setEditingPart(null)}>
          <div className="tw-modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
            <div className="tw-modal-close" onClick={() => setEditingPart(null)}><X size={18} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Edit size={18} color="var(--cream)" />
              <div className="tw-display" style={{ fontSize: 21, fontWeight: 600 }}>Editar Pareja</div>
            </div>
            <form onSubmit={updateParticipant}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>Nombre de la Pareja</label>
                  <input
                    type="text"
                    className="tw-input tw-focus"
                    value={editPartName}
                    onChange={(e) => setEditPartName(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>PJ (Partidos Jugados)</label>
                    <input
                      type="number"
                      className="tw-input tw-focus"
                      value={editPartPJ}
                      onChange={(e) => setEditPartPJ(e.target.value)}
                      min="0"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>PG (Partidos Ganados)</label>
                    <input
                      type="number"
                      className="tw-input tw-focus"
                      value={editPartPG}
                      onChange={(e) => setEditPartPG(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>PP (Partidos Perdidos)</label>
                    <input
                      type="number"
                      className="tw-input tw-focus"
                      value={editPartPP}
                      onChange={(e) => setEditPartPP(e.target.value)}
                      min="0"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--cream-dim)" }}>Pts (Puntos)</label>
                    <input
                      type="number"
                      className="tw-input tw-focus"
                      value={editPartPts}
                      onChange={(e) => setEditPartPts(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="tw-btn solid tw-focus" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

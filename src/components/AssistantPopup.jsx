import React from "react";
import "../scss/components/_assistant-popup.scss";
import Assistant3DViewer from "./Assistant3DViewer";

const PROMPTS = [
  "Raportează o problemă",
  "Am găsit un bug",
  "Vreau să dau feedback",
  "Nu funcționează ceva",
  "Am o sugestie",
  "Nu mă pot conecta"
];

const AssistantPopup = ({ onClose }) => {
  return (
    <div className="assistant-popup-overlay">
      <div className="assistant-popup-modal assistant-popup-modal--wide">
        <button className="assistant-popup-close assistant-popup-close--large" onClick={onClose}>&times;</button>
        <div className="assistant-popup-content">
          <div className="assistant-popup-3d assistant-popup-3d--large">
            <Assistant3DViewer />
          </div>
          <div className="assistant-popup-interact">
            <div className="assistant-popup-prompts">
              {PROMPTS.map((prompt, idx) => (
                <button key={idx} className="assistant-popup-prompt-btn">{prompt}</button>
              ))}
            </div>
            <form className="assistant-popup-form" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                className="assistant-popup-input"
                placeholder="Scrie ceva..."
                autoFocus
              />
              <button type="submit" className="assistant-popup-send-btn">Trimite</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPopup; 
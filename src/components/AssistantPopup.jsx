import React, { useState, useRef } from "react";
import "../scss/components/_assistant-popup.scss";
import Assistant3DViewer from "./Assistant3DViewer";
import { X, Send } from "lucide-react";

const PROMPTS = [
  "Raportează o problemă",
  "Am găsit un bug",
  "Vreau să dau feedback",
  "Nu funcționează ceva",
  "Am o sugestie",
  "Nu mă pot conecta"
];

const AssistantPopup = ({ onClose }) => {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleClearPrompt = () => {
    setSelectedPrompt("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Submitted:", {
      prompt: selectedPrompt,
      input: inputValue
    });
  };

  const handleInput = (e) => {
    const textarea = e.target;
    setInputValue(textarea.value);

    // Creăm un element hidden pentru a calcula înălțimea corectă
    const hiddenDiv = document.createElement('div');
    hiddenDiv.style.cssText = window.getComputedStyle(textarea, null).cssText;
    hiddenDiv.style.height = 'auto';
    hiddenDiv.style.position = 'absolute';
    hiddenDiv.style.visibility = 'hidden';
    hiddenDiv.style.whiteSpace = 'pre-wrap';
    hiddenDiv.style.wordWrap = 'break-word';
    hiddenDiv.textContent = textarea.value + '\n';
    
    document.body.appendChild(hiddenDiv);
    const scrollHeight = hiddenDiv.offsetHeight;
    document.body.removeChild(hiddenDiv);

    // Calculăm noua înălțime
    const newHeight = Math.min(Math.max(44, scrollHeight), 96);
    if (textarea.style.height !== newHeight + 'px') {
      textarea.style.height = newHeight + 'px';
    }
  };

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
                <button 
                  key={idx} 
                  className={`assistant-popup-prompt-btn ${selectedPrompt === prompt ? 'selected' : ''}`}
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form className="assistant-popup-form" onSubmit={handleSubmit}>
              {selectedPrompt && (
                <div className="assistant-popup-selected-prompt">
                  <span>{selectedPrompt}</span>
                  <button 
                    type="button"
                    className="assistant-popup-clear-prompt"
                    onClick={handleClearPrompt}
                    title="Șterge prompt"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="assistant-popup-input-row">
                <textarea
                  ref={textareaRef}
                  className="assistant-popup-input"
                  placeholder="Scrie ceva..."
                  value={inputValue}
                  onChange={handleInput}
                  rows={1}
                  autoFocus
                />
                <button type="submit" className="assistant-popup-send-btn" title="Trimite">
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPopup; 
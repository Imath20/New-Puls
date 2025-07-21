import React, { useState, useRef } from "react";
import "../scss/components/_assistant-popup.scss";
import Assistant3DViewer from "./Assistant3DViewer";
import { X, Send } from "lucide-react";
import { searchKnowledgeBase } from "../lib/assistant-knowledge-base.js";

const PROMPTS = [
  "Raportează o problemă",
  "Am găsit un bug",
  "Vreau să dau feedback",
  "Unde găsesc resursele despre pendule?",
  "Nu mă pot conecta",
  "Am o sugestie",
  "Ce probleme de mecanică aveți?",
  "Cum te cheamă?"
];

const SUPPORT_EMAIL = "pulsphysics@gmail.com";

const GENKIT_ENDPOINT = "http://localhost:3001/api/assistant/ask";

function isGraveProblem(text) {
  const keywords = ["eroare", "nu merge", "bug", "problemă gravă", "crash", "fatal", "nu funcționează", "nu pot accesa", "nu pot folosi", "nu pot intra", "nu pot deschide"];
  return keywords.some(kw => text.toLowerCase().includes(kw));
}

const AssistantPopup = ({ onClose }) => {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState([]); // {role: 'user'|'ai', text: string}
  const textareaRef = useRef(null);
  const chatRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    setInputValue(prompt);
    // Automatically submit the prompt as a message
    handleSend(null, prompt);
  };

  const handleClearPrompt = () => {
    setSelectedPrompt("");
    setInputValue("");
  };

  const handleSend = async (e, prompt = null) => {
    if (e) e.preventDefault();
    const text = prompt || inputValue.trim();
    if (!text) return;

    if (!chatMode) setChatMode(true);
    setMessages((msgs) => [...msgs, { role: "user", text }]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch(GENKIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await response.json();
      if (data && data.result) {
        setMessages((msgs) => [...msgs, { role: "ai", text: data.result }]);
      } else if (data && data.answer) {
        setMessages((msgs) => [...msgs, { role: "ai", text: data.answer }]);
      } else {
        // fallback la knowledge base
        const aiText = searchKnowledgeBase(text);
        setMessages((msgs) => [...msgs, { role: "ai", text: aiText }]);
      }
    } catch (err) {
      // fallback la knowledge base
      const aiText = searchKnowledgeBase(text);
      setMessages((msgs) => [...msgs, { role: "ai", text: aiText }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 100);
    }
  };

  const handleInput = (e) => {
    const textarea = e.target;
    setInputValue(textarea.value);
    // Auto-resize logic
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
    const newHeight = Math.min(Math.max(44, scrollHeight), 96);
    if (textarea.style.height !== newHeight + 'px') {
      textarea.style.height = newHeight + 'px';
    }
  };

  // Add this handler to send message on Enter (but allow Shift+Enter for newline)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  // Scroll chat to bottom when new message
  React.useEffect(() => {
    if (chatMode && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, chatMode]);

  return (
    <div className="assistant-popup-overlay">
      <div className="assistant-popup-modal assistant-popup-modal--wide">
        <button className="assistant-popup-close assistant-popup-close--large" onClick={onClose}>&times;</button>
        <div className="assistant-popup-content">
          <div className="assistant-popup-3d assistant-popup-3d--large">
            <Assistant3DViewer />
          </div>
          <div className="assistant-popup-interact">
            {!chatMode && (
              <>
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
                <form className="assistant-popup-form" onSubmit={handleSend}>
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
                      onKeyDown={handleKeyDown}
                      rows={1}
                      autoFocus
                    />
                    <button type="submit" className="assistant-popup-send-btn" title="Trimite">
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </>
            )}
            {chatMode && (
              <>
                <div className="assistant-popup-chat-window" ref={chatRef}>
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`assistant-popup-chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                      {msg.role === 'ai' ? (
                        <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="assistant-popup-chat-bubble ai loading">Profesorul Whiz scrie...</div>
                  )}
                </div>
                <form className="assistant-popup-form" onSubmit={handleSend}>
                  <div className="assistant-popup-input-row">
                    <textarea
                      ref={textareaRef}
                      className="assistant-popup-input"
                      placeholder="Scrie un mesaj..."
                      value={inputValue}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      rows={1}
                      autoFocus
                    />
                    <button type="submit" className="assistant-popup-send-btn" title="Trimite">
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPopup; 
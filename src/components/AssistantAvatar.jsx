import React, { useState } from "react";
import "../scss/components/_assistant-avatar.scss";
import AssistantPopup from "./AssistantPopup";

const AssistantAvatar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="assistant-avatar"
        onClick={() => setOpen(true)}
        title="Deschide asistentul virtual"
      >
        <img src="/Modele Asistent/bebu-profile.png" alt="Asistent Virtual" />
      </div>
      {open && <AssistantPopup onClose={() => setOpen(false)} />}
    </>
  );
};

export default AssistantAvatar; 
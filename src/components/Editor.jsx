import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { EditorView } from "@codemirror/view";
function Editor({ title, value, onChange, fontSize }) {
  const [showSettings, setShowSettings] = useState(false);

  // 🔹 Language selector
  function getLanguage() {
    if (title === "HTML") return html(); 
    if (title === "CSS") return css(); 
    if (title === "JavaScript") return javascript();
  }
 return ( <div
      style={{ flex: 1,
        display: "flex",
         flexDirection: "column", 
         background: "#1d1e22",
          borderRadius: "5px",
          minWidth:0,
   minHeight:0 }}
    > 
    {/* 🔹 Header */}
      <div
        style={{
          background: "#111",
          color: "white",
          padding: "5px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #333"
        }}>
        <span style={{ fontWeight: "bold" }}>{title}</span>

        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          ⚙
        </button>
      </div>

      {/* 🔹 Settings Panel */}
      {showSettings && (
        <div
          style={{
            background: "#2a2a2a",
            padding: "8px",
            color: "white",
            fontSize: "12px"
          }}
        >
          <button
            onClick={() => onChange("")}
            style={{
              padding: "4px 8px",
              background: "#ff4d4d",
              border: "none",
              color: "white",
              cursor: "pointer",
              borderRadius: "4px"
            }}
          >
            Reset Code
          </button>
        </div>
      )}

      {/* 🔹 Editor */}
      <div style={{minHeight:0}}>
        <div style={{overflow:"auto", height:"300px"}}>
        <CodeMirror
          value={value}
          height="300px"
          theme={dracula}
          extensions={[getLanguage(), EditorView.lineWrapping]}
          onChange={(value) => onChange(value)}
          autoFocus={true}
          style={{
            fontSize: fontSize + "px"
          }}
          basicSetup={{
            lineNumbers:true,
            highlightActiveLine:true
          }}

        />
        </div>
      </div>
    </div>
  );
}

export default Editor;
import { useState, useEffect } from "react";
import Split from "react-split";
import Editor from "./components/Editor";

function App() {
  const [html, setHtml] = useState(() => {
  return localStorage.getItem("html") || "";
});

const [css, setCss] = useState(() => {
  return localStorage.getItem("css") || "";
});

const [js, setJs] = useState(() => {
  return localStorage.getItem("js") || "";
});
  const [srcDoc, setSrcDoc] = useState("");

  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
  localStorage.setItem("html", html);
}, [html]);

useEffect(() => {
  localStorage.setItem("css", css);
}, [css]);

useEffect(() => {
  localStorage.setItem("js", js);
}, [js]);

  // 🔹 Auto update preview
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}<\/script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div style={{
       height: "100vh",
       display: "flex",
       flexDirection: "column",
       overflow:"hidden",
       minHeight:0 }}>

      {/* 🔹 HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#111",
        padding: "10px",
        color: "white",
        borderBottom: "1px solid #333"
      }}>
        <h2 style={{ margin: 0 }}>Codepen-clone</h2>

        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            padding: "5px 10px",
            background: "#0ebeff",
            border: "none",
            color: "white",
            cursor: "pointer",
            borderRadius: "4px"
          }}
        >
          ⚙ Settings
        </button>
      </div>

      {/* 🔹 SETTINGS PANEL */}
      {showSettings && (
        <div style={{
          background: "#2a2a2a",
          padding: "10px",
          color: "white",
          fontSize: "13px"
        }}>

          {/* Font Size */}
          <div style={{ marginBottom: "10px" }}>
            <label>Font Size: {fontSize}px</label><br />

            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setHtml("");
              setCss("");
              setJs("");

              localStorage.removeItem("html");
              localStorage.removeItem("css");
              localStorage.removeItem("js");
            }}
            style={{
              padding: "6px 12px",
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

      {/* 🔹 VERTICAL SPLIT */}
      <Split
        direction="vertical"
        sizes={[50, 50]}
        minSize={100}
        gutterSize={8}
        style={{ flex: 1, overflow: "hidden", display:"flex",flexDirection:"column" }} >

        {/* TOP → Editors */}
        <div style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          background: "#1d1e22",
          minHeight:0
        }}>
          <div style={{flex:1,  minWidth:0, minHeight:0, overflow:"scroll"}}>
          <Editor title="HTML" value={html} onChange={setHtml} fontSize={fontSize} />
          </div>
          <div style={{flex:1, minWidth:0, minHeight:0, overflow:"scroll"}}>
          <Editor title="CSS" value={css} onChange={setCss} fontSize={fontSize} />
          </div>
          <div style={{flex:1,  minWidth:0, minHeight:0, overflow:"scroll"}}>
          <Editor title="JavaScript" value={js} onChange={setJs} fontSize={fontSize} />
          </div> 
          </div>

        {/* BOTTOM → Output */}
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "white",
            minHeight:0
          }}
        />

      </Split>
    </div>
  );
}

export default App;
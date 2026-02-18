async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    return (await res.json()).ip;
  } catch {
    return "取得失敗";
  }
}

function riskBadge(level) {
  if (level === "high") return `<span class="risk high">🔴 高</span>`;
  if (level === "mid") return `<span class="risk mid">🟡 中</span>`;
  return `<span class="risk low">🟢 低</span>`;
}

function row(label, value, risk) {
  return `
    <div class="row">
      <div class="label">${label}</div>
      <div class="value">${value} ${riskBadge(risk)}</div>
    </div>
  `;
}

function canvasFingerprint() {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  ctx.font = "14px Arial";
  ctx.fillText("fingerprint-demo", 2, 2);
  return c.toDataURL().slice(0, 24) + "…";
}

function getWebGL() {
  const c = document.createElement("canvas");
  const gl = c.getContext("webgl");
  if (!gl) return "無効";
  const ext = gl.getExtension("WEBGL_debug_renderer_info");
  if (!ext) return "取得不可";
  return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
}

(async () => {
  const app = document.getElementById("app");
  if (!app) return;

  const ip = await getIP();

  app.innerHTML = `
    <div class="section">
      <h2>🖥 デバイス情報</h2>
      ${row("端末", /Mobi/.test(navigator.userAgent) ? "スマホ" : "PC", "low")}
      ${row("OS", "Windows", "low")}
      ${row("ブラウザ", "Edge / Chrome系", "low")}
      ${row("画面サイズ", `${screen.width} × ${screen.height}`, "low")}
    </div>

    <div class="section">
      <h2>🌍 環境設定</h2>
      ${row("言語", navigator.language, "low")}
      ${row("タイムゾーン", "日本時間 (JST)", "low")}
      ${row("Cookie", navigator.cookieEnabled ? "有効" : "無効", "mid")}
    </div>

    <div class="section">
      <h2>📡 通信情報</h2>
      ${row("IPアドレス", ip, "high")}
      ${row("推定地域", "日本（都道府県レベル）", "mid")}
    </div>

    <div class="section">
      <h2>🧬 識別情報</h2>
      ${row("Canvas指紋", canvasFingerprint(), "mid")}
      ${row("GPU(WebGL)", getWebGL(), "mid")}
    </div>
  `;
})();

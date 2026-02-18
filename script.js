function browserName() {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  return "不明";
}

function osName() {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone")) return "iOS";
  return "不明";
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
  ctx.fillText("fingerprint", 2, 2);
  return c.toDataURL();
}

function getWebGLInfo() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  if (!gl) return "無効";
  const ext = gl.getExtension("WEBGL_debug_renderer_info");
  if (!ext) return "取得不可";
  return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
}

async function getIP() {
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    return (await r.json()).ip;
  } catch {
    return "取得失敗";
  }
}

(async () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="section">
      <h2>🖥 デバイス情報</h2>
      ${row("端末", /Mobi/.test(navigator.userAgent) ? "スマホ" : "PC", "low")}
      ${row("OS", osName(), "low")}
      ${row("ブラウザ", browserName(), "low")}
      ${row("画面サイズ", `${screen.width} × ${screen.height}`, "low")}
    </div>

    <div class="section">
      <h2>🌍 環境設定</h2>
      ${row("言語", navigator.language, "low")}
      ${row("タイムゾーン", Intl.DateTimeFormat().resolvedOptions().timeZone, "low")}
      ${row("Cookie", navigator.cookieEnabled ? "有効" : "無効", "mid")}
    </div>

    <div class="section">
      <h2>📡 通信</h2>
      ${row("IPアドレス", await getIP(), "high")}
      ${row("地域推定", "国・都道府県レベル", "mid")}
    </div>

    <div class="section">
      <h2>🧬 識別情報</h2>
      ${row("Canvas指紋", canvasFingerprint().slice(0, 24) + "…", "mid")}
      ${row("GPU(WebGL)", getWebGLInfo(), "mid")}
    </div>
  `;
})();

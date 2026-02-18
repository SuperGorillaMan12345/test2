function risk(level) {
  if (level === "high") return "🔴 高";
  if (level === "mid") return "🟡 中";
  return "🟢 低";
}

function isMobile() {
  return /Mobi|Android|iPhone/.test(navigator.userAgent);
}

async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    return (await res.json()).ip;
  } catch {
    return "取得失敗";
  }
}

function canvasFingerprint() {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  ctx.font = "14px Arial";
  ctx.fillText("fingerprint-demo", 2, 2);
  return c.toDataURL().slice(0, 32) + "…";
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
  const ip = await getIP();

  app.innerHTML = `
  <div class="section">
    <h2>🖥 デバイス情報</h2>
    <div class="row"><span>端末種別</span><span>${isMobile() ? "スマホ" : "PC"} ${risk("low")}</span></div>
    <div class="row"><span>OS</span><span>Windows ${risk("low")}</span></div>
    <div class="row"><span>ブラウザ</span><span>Edge / Chrome系 ${risk("low")}</span></div>
    <div class="row"><span>画面サイズ</span><span>${screen.width} × ${screen.height} ${risk("low")}</span></div>
  </div>

  <div class="section">
    <h2>🌍 設定・環境</h2>
    <div class="row"><span>言語</span><span>${navigator.language} ${risk("low")}</span></div>
    <div class="row"><span>タイムゾーン</span><span>日本時間 (JST) ${risk("low")}</span></div>
    <div class="row"><span>Cookie</span><span>${navigator.cookieEnabled ? "有効" : "無効"} ${risk("mid")}</span></div>
  </div>

  <div class="section">
    <h2>📡 通信</h2>
    <div class="row"><span>IPアドレス</span><span>${ip} ${risk("high")}</span></div>
    <div class="row"><span>推定地域</span><span>日本（都道府県レベル） ${risk("mid")}</span></div>
  </div>

  <div class="section">
    <h2>🧬 識別情報</h2>
    <div class="row"><span>Canvas指紋</span><span>${canvasFingerprint()} ${risk("mid")}</span></div>
    <div class="row"><span>GPU情報</span><span>${getWebGL()} ${risk("mid")}</span></div>
  </div>
  `;
})();

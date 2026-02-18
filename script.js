async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "取得失敗";
  }
}

function canvasFingerprint() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("fingerprint-test", 2, 2);

  return canvas.toDataURL();
}

function getWebGLInfo() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  if (!gl) return "WebGL 無効";

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (!debugInfo) return "取得不可";

  return {
    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  };
}

(async () => {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width} x ${screen.height}`,
    colorDepth: screen.colorDepth,
    cookiesEnabled: navigator.cookieEnabled,
    ipAddress: await getIP(),
    canvasFingerprint: canvasFingerprint().slice(0, 80) + "...",
    webgl: getWebGLInfo(),
  };

  document.getElementById("output").textContent =
    JSON.stringify(info, null, 2);
})();

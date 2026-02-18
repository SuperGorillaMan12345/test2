window.addEventListener("DOMContentLoaded", async () => {
    const app = document.getElementById("app");
    if (!app) return;

    /* ===== IP・国・ISP を実取得 ===== */
    let ipData = {};
    try {
        const res = await fetch("https://ipapi.co/json/");
        ipData = await res.json();
    } catch {
        ipData = { error: true };
    }

    /* ===== 基本情報（全部実値） ===== */
    const data = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${screen.width} x ${screen.height}`,
        colorDepth: screen.colorDepth,
        cookiesEnabled: navigator.cookieEnabled,
        ip: ipData.ip || "取得不可",
        country: ipData.country_name || "不明",
        isp: ipData.org || "不明",
        vpn: ipData.proxy ? "はい" : "不明"
    };

    /* ===== 危険度判定（簡易だが実用） ===== */
    let riskScore = 0;
    if (!navigator.cookieEnabled) riskScore++;
    if (ipData.proxy) riskScore += 2;
    if (data.language !== "ja") riskScore++;
    if (!navigator.webdriver) riskScore += 0; else riskScore += 2;

    let riskText = "低";
    let riskClass = "safe";

    if (riskScore >= 2) {
        riskText = "中";
        riskClass = "medium";
    }
    if (riskScore >= 4) {
        riskText = "高";
        riskClass = "danger";
    }

    /* ===== 表示 ===== */
    app.innerHTML = `
        <h1>取得情報（実データ）</h1>

        <div class="row"><div class="label">IPアドレス</div><div class="value">${data.ip}</div></div>
        <div class="row"><div class="label">国</div><div class="value">${data.country}</div></div>
        <div class="row"><div class="label">ISP</div><div class="value">${data.isp}</div></div>
        <div class="row"><div class="label">UserAgent</div><div class="value">${data.userAgent}</div></div>
        <div class="row"><div class="label">OS</div><div class="value">${data.platform}</div></div>
        <div class="row"><div class="label">言語</div><div class="value">${data.language}</div></div>
        <div class="row"><div class="label">タイムゾーン</div><div class="value">${data.timezone}</div></div>
        <div class="row"><div class="label">画面サイズ</div><div class="value">${data.screen}</div></div>
        <div class="row"><div class="label">色深度</div><div class="value">${data.colorDepth}</div></div>
        <div class="row"><div class="label">Cookie有効</div><div class="value">${data.cookiesEnabled}</div></div>

        <div class="row">
            <div class="label">危険度</div>
            <div class="value ${riskClass}">${riskText}</div>
        </div>
    `;
});

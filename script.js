window.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    if (!app) {
        console.error("app が見つからない");
        return;
    }

    const data = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${screen.width} x ${screen.height}`,
        colorDepth: screen.colorDepth,
        cookiesEnabled: navigator.cookieEnabled
    };

    let riskText = "低";
    let riskClass = "safe";

    if (!navigator.cookieEnabled) {
        riskText = "中";
        riskClass = "medium";
    }

    app.innerHTML = `
        <h1>取得情報</h1>

        <div class="row"><div class="label">UserAgent</div><div class="value">${data.userAgent}</div></div>
        <div class="row"><div class="label">OS</div><div class="value">${data.platform}</div></div>
        <div class="row"><div class="label">言語</div><div class="value">${data.language}</div></div>
        <div class="row"><div class="label">タイムゾーン</div><div class="value">${data.timezone}</div></div>
        <div class="row"><div class="label">画面サイズ</div><div class="value">${data.screen}</div></div>
        <div class="row"><div class="label">色深度</div><div class="value">${data.colorDepth}</div></div>
        <div class="row"><div class="label">Cookie</div><div class="value">${data.cookiesEnabled}</div></div>

        <div class="row">
            <div class="label">危険度</div>
            <div class="value ${riskClass}">${riskText}</div>
        </div>
    `;
});

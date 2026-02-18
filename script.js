async function loadInfo() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        document.getElementById("ip").textContent = data.ip;
        document.getElementById("country").textContent = data.country_name;

        const ua = navigator.userAgent;
        document.getElementById("browser").textContent = ua.includes("Chrome") ? "Chrome" :
                                                        ua.includes("Firefox") ? "Firefox" :
                                                        ua.includes("Safari") ? "Safari" : "Unknown";

        document.getElementById("os").textContent =
            ua.includes("Windows") ? "Windows" :
            ua.includes("Mac") ? "MacOS" :
            ua.includes("Android") ? "Android" :
            ua.includes("iPhone") ? "iOS" : "Unknown";

        document.getElementById("language").textContent = navigator.language;

        // 危険度判定（簡易）
        const riskEl = document.getElementById("risk");

        if (data.country_code === "JP") {
            riskEl.textContent = "低";
            riskEl.className = "safe";
        } else {
            riskEl.textContent = "中";
            riskEl.className = "medium";
        }

    } catch (e) {
        console.error(e);
    }
}

loadInfo();

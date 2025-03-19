// Google APIのライブラリを読み込む
function loadGoogleAuth() {
    google.accounts.id.initialize({
        client_id: "441788767782-183ndebp7adg7dsigjqofpj56bb7c3mp.apps.googleusercontent.com",  // あなたのクライアントIDに変更
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "filled_black", size: "x-large", shape: "rectangular" }
    );

    // 枠線を消す処理（要素が存在するか確認）
    setTimeout(() => {
        const signinBtn = document.querySelector(".g_id_signin");
        if (signinBtn) {
            signinBtn.style.border = "none";
            signinBtn.style.boxShadow = "none";
        }
    }, 100);

    google.accounts.id.prompt(); // 自動的にログインを促す
}

const API_URL = "http://210.101.236.158:8080/api/login"; // APIのエンドポイント

async function handleCredentialResponse(response) {
    console.log("Google ID Token:", response.credential);

    try {
        const res = await fetch(API_URL, {  
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${response.credential}`
            },
            body: JSON.stringify({ token: response.credential }) // トークンをJSONで送信
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Login successful", data);
        alert("Login Successful!");


        window.location.href = "../loading/loading.html";  

    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
    }
}
http://127.0.0.1:5501/src/graph.html


// Google APIのスクリプトを動的に追加
(function () {
    let script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = loadGoogleAuth;
    document.head.appendChild(script);
})();

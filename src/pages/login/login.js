// Google APIのライブラリを読み込む
function loadGoogleAuth() {
    google.accounts.id.initialize({
        client_id: "441788767782-183ndebp7adg7dsigjqofpj56bb7c3mp.apps.googleusercontent.com",  // あなたのクライアントIDに変更
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "filled_black", size: "x-large" , shape: "rectangular" }
    );
    
    // 枠線を消す
    setTimeout(() => {
        document.querySelector(".g_id_signin").style.border = "none";
        document.querySelector(".g_id_signin").style.boxShadow = "none";
    }, 100);

    google.accounts.id.prompt(); // 自動的にログインを促す
}

// Googleログインのコールバック関数
// function handleCredentialResponse(response) {
//     console.log("Google ID Token:", response.credential);
    
//     // 必要に応じてバックエンドにトークンを送信し、ユーザーを認証
//     fetch("http://210.101.236.158:8080/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json",
//             "Authorization": `Bearer ${response.credetial}`
//          },
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Login successful", data);
//         alert("Login Successful!");

//         // リダイレクト処理（ログイン成功後）
//         window.location.href = "/dashboard";  // リダイレクト先URLを指定
//     })
//     .catch(error => console.error("Error during login:", error));
// }

// Googleログインのコールバック関数
async function handleCredentialResponse(response) {
    console.log("Google ID Token:", response.credential);
    
    // 必要に応じてバックエンドにトークンを送信し、ユーザーを認証
    const res = await fetch("http://210.101.236.158:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${response.credetial}`
         },
    })
    const data = res.json()

    return data
    
        console.log("Login successful", data);
        alert("Login Successful!");

        // リダイレクト処理（ログイン成功後）
        window.location.href = "/dashboard";  // リダイレクト先URLを指定
}

// Google APIのスクリプトを動的に追加
(function () {
    let script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = loadGoogleAuth;
    document.head.appendChild(script);
})();

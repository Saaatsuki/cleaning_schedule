window.onload = function () {
  var googleToken = localStorage.getItem("google_token");

  if (googleToken) {
    // サーバーにトークンを送信
    fetch("https://bannote.org/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: googleToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // サーバーから成功のレスポンスを受け取った場合、graph.htmlに遷移
          window.location.href = "../main_graph/graph.html";
        } else {
          // successがfalseの場合の処理
          let errorMessage = "Login failed. Please try again."; // デフォルトのエラーメッセージ

          // エラーメッセージの判定をswitch文で処理
          switch (data.message) {
            case "가입 필요: 학번 등록이 필요합니다.":
              errorMessage = "Student number registration is required.";
              break;
            case "Authorization 헤더가 누락되었거나 올바르지 않습니다.":
              errorMessage = "Missing or incorrect Authorization header.";
              break;
            case "올바르지 않은 토큰입니다.":
              errorMessage = "Invalid token.";
              break;
            case "거부: 영진 전문대 학생이 아닙니다. @g.yju.ac.kr 이메일을 이용해주세요":
              errorMessage = "Access denied: Please use @g.yju.ac.kr email.";
              break;
            default:
              errorMessage = "An unknown error occurred. Please try again.";
              break;
          }

          // エラーメッセージを表示
          alert(errorMessage);

          // ../login/login.htmlに戻る
          window.location.href = "../login/login.html";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
        window.location.href = "../login/login.html";
      });
  } else {
    // トークンが存在しない場合、ログインページにリダイレクト
    window.location.href = "../login/login.html";
  }
};

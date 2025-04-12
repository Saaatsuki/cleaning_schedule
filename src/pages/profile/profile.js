document.addEventListener("DOMContentLoaded", function () {
  try {
    const mainCodeHTML = `
      <div class="profile-container">
        <div class="profile-container_header">
          <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/96/FFFFFF/edit-administrator.png" alt="admin-settings-male"/>
          <h2>프로필 설정</h2>
        </div>
        <div class="profile-container_box">
          <div class="profile-section">
            <label for="profile-image">이미지</label>
            <div class="image-container" id="image-click-area">
              <img id="profile-preview" width="96" height="96" src="https://img.icons8.com/color/96/test-account.png" alt="test-account" class="profile_img"/>
              <input type="file" id="image-upload" accept="image/*" style="display: none;" />
            </div>
            <div class="plf_edit" id="upload-trigger">
              <img width="30" height="30" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/image.png" alt="image"/>
            </div>
          </div>
          <div class="profile-section">
            <div class="pro_name"><h3>${sessionStorage.getItem("familyName") || "GUEST"} ${
      sessionStorage.getItem("givenName") || ""
    }</h3></div>
          </div>
          <div class="lg_box">
            <div class="profile-section lg">
              <div class="lglg stuNum_lglg">
                <img src="https://img.icons8.com/pulsar-color/96/student-male.png" alt="student-male"/>
              </div>
              <div class="pro_schNum"><h5>${sessionStorage.getItem("studentNumber") || "Guest Student"}</h5></div>
            </div>
            <div class="profile-section lg">
              <div class="lglg line_lglg">
                <img src="https://img.icons8.com/pulsar-color/96/gmail-new.png" alt="gmail-new"/>
              </div>
              <div class="email-container">
                <div class="pro_email">
                  <h5 id="email-text">${sessionStorage.getItem("email") || "example@g.yju.ac.kr"}</h5>
                </div>
                <button id="copy-email" class="copy-btn">
                  <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/f594b5/copy--v1.png" alt="copy--v1"/>
                </button>
              </div>
            </div>
            <div class="profile-section lg">
              <div class="lglg">
                <a href="https://lin.ee/byNXODw">
                  <img src="https://img.icons8.com/pulsar-color/96/FFFFFF/line-me.png" alt="line-me"/>
                </a>
              </div>
              <div class="line-container">
                <div class="conect_h5">
                  <h5 id="line-toggle">LINE 연결</h5>
                </div>
                <div class="line_torisetu" style="display: none;">
                  <div class="torisetu_batsu">
                    <i class="fa-solid fa-xmark fa-lg" style="color: #f1a7a0;"></i>
                  </div>
                  <div class="token_copy" onclick="copyToken()">
                    <div class="tk_cp">
                      <div class="title_line_logo">
                        <img width="500" height="500" src="https://img.icons8.com/clouds/500/line-me.png" alt="line-me"/>
                      </div>
                      <div class="title_line_txt" id="line-toggle">
                        <h4>LINE 연결방법</h4>
                      </div>
                      <div class="line_list">
                        <ol>
                          <li>
                            아래 정보코드을 복사한다!!
                            <div class="token_copy">
                              <div class="token_copy_txt"><p id="copyTarget">복사</p></div>
                              <div class="token_copy_lg"><i class="fa-regular fa-copy"></i></div>
                            </div>
                          </li>
                          <li>
                            여기서 공식 라인을 추가한다!!
                            <a href="https://lin.ee/QzwyAVv">
                              <div class="line_add_btn">
                                <img width="30" height="30" src="https://img.icons8.com/ios/100/d5725b/line-me.png" alt="line-me"/>
                                <p>추가</p>
                              </div>
                            </a>
                          </li>
                          <li>공식 계정의 톡에 방금 복사한 URL을 보내줘!</li>
                          <li>연결 완료!!</li>
                        </ol>
                      </div>
                    </div>
                    <div class="vp_img"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-section lg logout-box">
              <div class="lglg line_lglg">
                <img width="96" height="96" src="https://img.icons8.com/pulsar-color/96/exit.png" alt="exit"/>
              </div>
              <div class="logout-container">
                <div class="pro_logout conect_h5">
                  <h5 id="logout-text">Log Out</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const mainElement = document.querySelector("main");
    mainElement.innerHTML += mainCodeHTML;

    // ======================== イベントバインド ========================

    const profileImg = document.getElementById("profile-preview");
    const imageInput = document.getElementById("image-upload");
    const imageClickArea = document.getElementById("upload-trigger");

    imageClickArea.addEventListener("click", () => {
      imageInput.click();
      console.log("Image input click!!");
    });

    imageInput.addEventListener("change", async () => {
      const file = imageInput.files[0];
      if (!file) return;

      // 一時的に表示するURL
      const tempURL = URL.createObjectURL(file);
      profileImg.src = tempURL;

      // FileReaderでBase64変換し、sessionStorageに保存
      const reader = new FileReader();
      reader.onload = () => {
        sessionStorage.setItem("profileImage", reader.result); // Base64形式
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("https://bannote.org/api/members/me/profile-image", {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        const result = await response.json();

        if (result.success) {
          // サーバーが画像URLを返してくる場合
          if (typeof result.data === "string") {
            const imageURL = "https://bannote.org/" + result.data;
            profileImg.src = imageURL;
            sessionStorage.setItem("profileImage", imageURL); // URLで上書き
          }
        } else {
          alert("画像のアップロードに失敗しました: " + result.message);
        }
      } catch (error) {
        console.error("アップロード中にエラー:", error);
        alert("画像のアップロードに失敗しました。");
      }
    });

    document.getElementById("copy-email").addEventListener("click", function () {
      const emailText = document.getElementById("email-text").innerText;
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = emailText;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert(`복사 : ${emailText}`);
    });

    function toggleMenu(event, menuClass) {
      const menu = document.querySelector(menuClass);
      if (!menu) return;

      if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
        setTimeout(() => menu.classList.add("show"), 10);
      } else {
        menu.classList.remove("show");
        setTimeout(() => (menu.style.display = "none"), 300);
      }
    }

    document.getElementById("line-toggle")?.addEventListener("click", function (event) {
      toggleMenu(event, ".line_torisetu");
    });

    document.querySelector(".torisetu_batsu")?.addEventListener("click", function () {
      const menu = document.querySelector(".line_torisetu");
      if (menu) {
        menu.classList.remove("show");
        setTimeout(() => (menu.style.display = "none"), 300);
      }
      setTimeout(() => location.reload(), 500);
    });

    window.copyToken = async function () {
      try {
        const myToken = sessionStorage.getItem("token");
        if (!myToken) throw new Error("トークンが見つかりません");

        const response = await fetch("https://bannote.org/api/message", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        });

        if (!response.ok) throw new Error("APIエラー");

        const data = await response.json();
        const token = data.data;
        await navigator.clipboard.writeText(token);
        document.getElementById("copyTarget").innerText = "복사 완료!";
      } catch (err) {
        console.error("トークン取得失敗:", err);
        document.getElementById("copyTarget").innerText = "복사 실패";
      }
    };

    document.getElementById("logout-text").addEventListener("click", function () {
      if (confirm("로그아웃하셔도 괜찮으시겠어요?")) {
        sessionStorage.removeItem("token");
        location.href = "../login/login.html";
      }
    });
  } catch (error) {
    console.error("スクリプト初期化中にエラー:", error);
  }
});

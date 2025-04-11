
document.addEventListener('DOMContentLoaded', function () { 
    try {
        // ① ヘッダーの内容を動的に作成
        const headerHTML = `
            <header>
                <div class="profile-img" id="profileLink">
                    <img src="https://img.icons8.com/color/96/test-account.png" alt="test-account"/>
                </div>
                <div class="Profole-name" onclick="showMemberScroll()">
                    <div class="pro-name"><h3>${sessionStorage.getItem('familyName') || 'GUEST'} ${sessionStorage.getItem('givenName') || ''}</h3></div>
                    <div class="pro-school_number"><h5>${sessionStorage.getItem('studentNumber') || 'Guest Student'}</h5></div>
                </div>
                <div class="menu-logo">
                    <button class="menu-lo" onclick="this.classList.toggle('opened');this.setAttribute('aria-expanded', this.classList.contains('opened'))" aria-label="Main Menu">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                            <path class="line line2" d="M 20,50 H 80" />
                            <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                        </svg>
                    </button>
                </div>
            </header>
        `;

        const menuHTML = `
            <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>

            <div class="menu-container">
                <div class="menu-content">
                    <div class="menu-list">
                        <div class="menu" data-link=" ../main/main.html">
                            <div class="menu-li-logo"><img width="70" height="70" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/home.png" alt="home"/></div>
                            <div class="menu-ti">HOME</div>
                        </div>
                        <div class="menu" data-link=" ../profile/profile.html">
                            <div class="menu-li-logo"><img src="https://img.icons8.com/fluency-systems-regular/96/FFFFFF/edit-administrator.png" alt="broom" /></div>
                            <div class="menu-ti">프로필 설정</div>
                        </div>            
                        <div class="menu" data-link=" ../clean/clean.html">
                            <div class="menu-li-logo"><img src="https://img.icons8.com/ios-filled/100/FFFFFF/broom.png" alt="broom" /></div>
                            <div class="menu-ti">청소 일정</div>
                        </div>
                        <div class="menu" data-link=" ../graph/graph.html">
                            <div class="menu-li-logo"><img src="https://img.icons8.com/fluency-systems-filled/100/FFFFFF/combo-chart.png" alt="broom" /></div>
                            <div class="menu-ti">학교 시간 기록</div>
                        </div>
                        <div class="menu" data-link=" ../manager/manager.html">
                            <div class="menu-li-logo"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/100/FFFFFF/business-network.png" alt="business-network"/></div>
                            <div class="menu-ti">관리사</div>
                        </div>
                    </div>

                </div>
            </div>
        `;

        // `body` に追加
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        document.body.insertAdjacentHTML('beforeend', menuHTML);

        document.getElementById("profileLink").addEventListener("click", function() {
            window.location.href = "https://bannote.org/src/pages/profile/profile.html";
        });


        // メニュー開閉処理
        const menuLogo = document.querySelector('.menu-logo');
        const menuContent = document.querySelector('.menu-content');

        menuContent.style.height = '0px';
        menuContent.style.overflow = 'hidden';
        menuContent.style.transition = 'height 0.3s ease-in-out';

        menuLogo.addEventListener('click', function () {
            if (menuContent.style.height === '0px' || menuContent.style.height === '') {
                menuContent.style.height = menuContent.scrollHeight + 'px'; // メニューを表示
            } else {
                menuContent.style.height = '0px'; // メニューを非表示
            }
        });

        // メニュー項目のクリックイベント処理
        const menuItems = document.querySelectorAll('.menu');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const link = item.getAttribute('data-link');
                if (link) {
                    window.location.href = link; // リダイレクト
                }
            });
        });

        // ② セッションストレージから情報を取得
        const familyName = sessionStorage.getItem('familyName');
        const givenName = sessionStorage.getItem('givenName');
        const studentNumber = sessionStorage.getItem('studentNumber');
        const profileImage = sessionStorage.getItem('profileImage');

        if (!givenName || !familyName || !studentNumber) {
            console.error("セッションから情報を取得できませんでした。");
            return;
        }
        
        // データが存在しない場合、デフォルトの名前を設定
        if (!familyName || !givenName) {
            sessionStorage.setItem('familyName', '홍');  
            sessionStorage.setItem('givenName', '길동동');  
        }

        // ③ ヘッダー内のプロファイル情報を更新
        const profileNameDiv = document.querySelector('.Profole-name');
        const profileImageDiv = document.querySelector('.profile-img');

        // 名前を動的に表示
        profileNameDiv.querySelector('.pro-name h3').textContent = `${familyName} ${givenName}`;
        profileNameDiv.querySelector('.pro-school_number h5').textContent = studentNumber;

        // プロフィール画像を設定（profileImageがnull, undefined, false, 空文字のいずれかの場合はデフォルト画像を使用）
        const imgElement = document.createElement('img');
        if (!profileImage || profileImage === "false" || profileImage.trim() === "") {
            imgElement.src = 'https://img.icons8.com/color/96/test-account.png'; // デフォルト画像
        } else {
            imgElement.src = profileImage;
        }
        profileImageDiv.innerHTML = ''; 
        profileImageDiv.appendChild(imgElement);



        

    } catch (error) {
        console.error("データ取得時のエラー:", error);
    }
});

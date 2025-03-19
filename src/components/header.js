document.addEventListener('DOMContentLoaded', function () {
    // ① ヘッダーの内容を動的に作成
    const headerHTML = `
        <header>
            <div class="profile-img">
                <img src="https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000"/>
            </div>
            <div class="Profole-name">
                <div class="pro-name"><h3>${sessionStorage.getItem('familyName') || 'GUEST'} ${sessionStorage.getItem('givenName') || ''}</h3></div>
                <div class="pro-school_number"><h5>${sessionStorage.getItem('studentNumber') || 'Guest Student'}</h5></div>
            </div>
            <div class="menu-logo">
                <div class="sq"></div>
                <div class="sq"></div>
                <div class="sq"></div>
            </div>
        </header>
    `;

    // ヘッダーをページの先頭に挿入
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // ② セッションストレージから情報を取得
    const familyName = sessionStorage.getItem('familyName');
    const givenName = sessionStorage.getItem('givenName');
    const studentNumber = sessionStorage.getItem('studentNumber');
    const profileImage = sessionStorage.getItem('profileImage');

    if (!givenName || !familyName || !studentNumber || !profileImage) {
        console.error("セッションから情報を取得できませんでした。");
        // 必要に応じてUIにエラーメッセージを表示
        return;
    }
    
    // データが存在する場合にセッションストレージを更新する
    if (!familyName || !givenName) {
        sessionStorage.setItem('familyName', '김');  // 例: '김' として更新
        sessionStorage.setItem('givenName', '규민');  // 例: '규민' として更新
    }

    // ③ ヘッダー内のプロファイル情報を更新
    const profileNameDiv = document.querySelector('.Profole-name');
    const profileImageDiv = document.querySelector('.profile-img');

    // 名前を動的に表示
    profileNameDiv.querySelector('.pro-name h3').textContent = `${familyName} ${givenName}`;
    profileNameDiv.querySelector('.pro-school_number h5').textContent = studentNumber;

    const imgElement = document.createElement('img');
    imgElement.src = profileImage;
    profileImageDiv.innerHTML = '';
    profileImageDiv.appendChild(imgElement);

    // ④ メニューアイコン（.menu-logo）の処理
    const menuLogo = document.querySelector('.menu-logo');
    for (let i = 0; i < 3; i++) {
        const sq = document.createElement('div');
        sq.classList.add('sq');
        menuLogo.appendChild(sq);
    }

    const menuContent = document.querySelector('.menu-content');
    const menuList = document.querySelector('.menu-list');
    menuList.classList.add('menu-list');

    if (sessionStorage.getItem('menuOpen') === 'true') {
        menuLogo.classList.add('menu-open');
        menuContent.classList.add('open');
        menuList.classList.add('open');
    }

    menuLogo.addEventListener('click', function () {
        console.log("メニューアイコンがクリックされました！");

        // アニメーション処理
        const imgEle = document.querySelector('.menu-bg-img img');
        const menu = document.querySelector('.menu');
        imgEle.classList.add('animate1');
        menu.classList.add('animate2');
    
        // メニュー開閉処理
        if (menuContent.classList.contains('open')) {
            menuLogo.classList.remove('menu-open');
            menuContent.classList.remove('open');
            menuList.classList.remove('open');
            menuContent.classList.add('close');
            sessionStorage.setItem('menuOpen', 'false');
            console.log("メニューを閉じました！");
        } else {
            menuLogo.classList.add('menu-open');
            menuContent.classList.add('open');
            menuList.classList.add('open');
            menuContent.classList.remove('close');
            sessionStorage.setItem('menuOpen', 'true');
            console.log("メニューを開きました！");
        }
    });

    // ⑤ ヘッダーの高さに応じて main の margin-top を調整
    function adjustMargin() {
        const header = document.querySelector("header");
        const main = document.querySelector("main");
        if (header && main) {
            const headerHeight = header.offsetHeight; // ヘッダーの高さを取得
            main.style.marginTop = `${headerHeight + 15}px`; // 余白を追加
        }
    }

    adjustMargin();
    window.onresize = adjustMargin; // ウィンドウサイズ変更時も調整
})
.catch(error => {
    console.error("データ取得時のエラー:", error);
});

document.addEventListener('DOMContentLoaded', function () {
    // ① まず `header.html` を読み込む
    fetch('./header.html')
    .then(response => response.text())
    .then(headerHTML => {
        document.body.insertAdjacentHTML('afterbegin', headerHTML); // body の最初に追加
        return fetch('http://localhost:3000/cleanInfo'); // ② `cleanInfo` のデータを取得
    })
    .then(response => response.json())
    .then(data => {
        data = data.data;
        console.log("取得したデータ:", data);

        if (!Array.isArray(data) || data.length === 0) {
            console.error("データが空です。");
            return;
        }

        // ③ ヘッダー内のプロファイル情報を更新
        const profileNameDiv = document.querySelector('div.Profole-name');
        const profileImageDiv = document.querySelector('div.profile-img');

        const profile = data[0].members[1]; // 最初のプロフィール
        const name = profile.givenName + ` ` + profile.firstName;
        const studentNumber = profile.studentNumber;
        const profileImage = profile.profileImage;

        profileNameDiv.querySelector('.pro-name h3').textContent = name;
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
        menuList.classList.add(`menu-list`);
    
        if (sessionStorage.getItem('menuOpen') === 'true') {
            menuLogo.classList.add('menu-open');
            menuContent.classList.add('open');
            menuList.classList.add('open');
        }
    
        menuLogo.addEventListener('click', function () {
            console.log("メニューアイコンがクリックされました！");
        
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
        

        // ⑤ ヘッダーの高さに応じて `main` の `margin-top` を調整
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
});

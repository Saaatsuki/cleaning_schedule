document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/cleanInfo')
    .then(response => response.json())
    .then(data => {
        data = data.data
        console.log("取得したデータ:", data);

        if (!Array.isArray(data) || data.length === 0) {
            console.error("データが空です。");
            return;
        }

        const header = document.querySelector('header');
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

            const imgEle = document.querySelector('.menu-bg-img img');
            const menu = document.querySelector('.menu');
            imgEle.classList.add('animate1'); // アニメーション開始
            menu.classList.add('animate2');   // メニューアニメーション開始            

            // imgEle.classList.remove('animate1');
            // menu.classList.remove('animate2');
            // void imgEle.offsetWidth;
            // void menu.offsetWidth;

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
    })
    .catch(error => {
        console.error("データ取得時のエラー:", error);
    });

    function adjustMargin() {
        const header = document.querySelector("header");
        const main = document.querySelector("main");
        const headerHeight = header.offsetHeight; // ヘッダーの高さを取得
        main.style.marginTop = `${headerHeight + 15}px`; // 余白を追加
    }
    
    window.onload = adjustMargin;
    window.onresize = adjustMargin; // ウィンドウサイズ変更時も調整

});

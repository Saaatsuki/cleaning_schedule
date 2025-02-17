document.addEventListener('DOMContentLoaded', function () {
    // JSONデータのURL
    fetch('http://localhost:3000/Profile')
    .then(response => response.json())
    .then(data => {
        console.log("取得したデータ:", data);

        // データが空でないか確認
        if (!Array.isArray(data) || data.length === 0) {
            console.error("データが空です。");
            return;
        }

        // HTML要素の取得
        const header = document.querySelector('header');
        const profileNameDiv = document.querySelector('div.Profole-name');
        const profileImageDiv = document.querySelector('div.profile-img');
        
        // JSONから必要な情報を取り出す
        const profile = data[1]; // 最初のプロフィール
        const name = profile.name;
        const studentNumber = profile.student_number;
        const profileImage = profile.profileImage;

        // 名前と学生番号を表示
        profileNameDiv.querySelector('.pro-name h3').textContent = name;
        profileNameDiv.querySelector('.pro-school_number h5').textContent = studentNumber;

        // プロフィール画像を表示
        const imgElement = document.createElement('img');
        imgElement.src = profileImage;
        profileImageDiv.innerHTML = ''; // 既存の内容をクリア
        profileImageDiv.appendChild(imgElement);

        // メニュー部分の3つの四角を表示
        const menuLogo = document.querySelector('.menu-logo');
        for (let i = 0; i < 3; i++) {
            const sq = document.createElement('div');
            sq.classList.add('sq');
            menuLogo.appendChild(sq);
        }

        
        const menuContent = document.querySelector('.menu-content');
        const menuList = document.querySelector('.menu-list');
    
        // ページロード時にバツ印状態を復元
        if (localStorage.getItem('menuOpen') === 'true') {
            menuLogo.classList.add('menu-open');
            menuContent.classList.add('open');
            menuList.classList.add('open');
        }
    
        // メニューアイコンのクリック処理
        menuLogo.addEventListener('click', function () {
            if (localStorage.getItem('menuOpen') === 'true') {
                // メニューが開いている状態
                menuLogo.classList.remove('menu-open');  // ハンバーガーアイコンに戻す
                menuContent.classList.remove('open');   // シャッターを上げる
                menuList.classList.remove('open');      // メニューを非表示にする
    
                // メニューが閉じたことを記録
                localStorage.setItem('menuOpen', 'false');
            } else {
                // メニューが閉じている状態
                menuLogo.classList.add('menu-open');    // バツ印に変える
                menuContent.classList.add('open');      // シャッターを下ろす
                menuList.classList.add('open');         // メニューを表示する
    
                // メニューが開いたことを記録
                localStorage.setItem('menuOpen', 'true');
            }
        });
        

    })
    .catch(error => {
        console.error("データ取得時のエラー:", error);
    });
});

function adjustMargin() {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const headerHeight = header.offsetHeight; // ヘッダーの高さを取得
    main.style.marginTop = `${headerHeight + 15}px`; // 余白を追加
}

window.onload = adjustMargin;
window.onresize = adjustMargin; // ウィンドウサイズ変更時も調整
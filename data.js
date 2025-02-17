


document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/cleanInfo')  // サーバーからデータを取得
    .then(response => response.json())  // JSON形式に変換
    .then(data => {
        console.log("取得したデータ:", data); // デバッグ用にデータ全体を表示
    
        // 直接データが配列であることを確認
        if (!Array.isArray(data) || data.length === 0) {
            console.error("データが空です。");
            return;
        }

        const main = document.querySelector('main'); // <main>タグを取得
    
        // 各データを繰り返し処理して表示
        let currentDate = ''; // 日付を記録しておく変数

        // まず、日付を変えてboxを作成する処理を修正
        data.forEach(item => {
            // 日付の取得
            const date = new Date(item.date);  // データの中のdateフィールドを取得
            const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
            const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${dayNames[date.getDay()]}요일`;

            // 日付が変わった場合、新しいboxを作成
            if (formattedDate !== currentDate) {
                currentDate = formattedDate;

                // 新しいboxを作成
                const box = document.createElement('div');
                box.classList.add('box');

                // 日付ボックスを追加
                const dateElement = document.createElement('div');
                dateElement.classList.add('date');
                dateElement.innerHTML = `<h5>${formattedDate}</h5>`;
                box.appendChild(dateElement);

                // メインに新しいボックスを追加
                main.appendChild(box);
            }

            // 同じ日付の中で新しいエリアを追加
            const areaSub = document.createElement('div');
            areaSub.classList.add('area-sub');

            const areaMenu = document.createElement('div');
            areaMenu.classList.add('area-menu');
            const areaDiv = document.createElement('div');
            areaDiv.classList.add('area');
            areaDiv.classList.add(`me-box`);
            areaDiv.innerHTML = `<h6>${item.cleanArea}</h6>`;
            areaMenu.appendChild(areaDiv);

            const memClassDiv = document.createElement('div');
            memClassDiv.classList.add('mem-coun');
            memClassDiv.classList.add(`me-box`);
            memClassDiv.innerHTML = `<h6>${item.membersCount}</h6>`;
            areaMenu.appendChild(memClassDiv);

            
            
            const memCountDiv = document.createElement('div');
            memCountDiv.classList.add('me-box');
            memCountDiv.classList.add(`me-class`);
            memCountDiv.innerHTML = `<h6>${item.class}</h6>`;
            areaMenu.appendChild(memCountDiv);

            areaSub.appendChild(areaMenu);

            // メンバーリストを表示
            const membersDiv = document.createElement('div');
            membersDiv.classList.add('members');

            item.members.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('member');

                const memImg = document.createElement('div');
                memImg.classList.add('mem-img');
                memImg.classList.add('mem-o');
                memImg.innerHTML = `<img src="${member.profileImage}" />`;
                memberDiv.appendChild(memImg);

                const cleanCount = document.createElement('div');
                cleanCount.classList.add('clean-coun');
                cleanCount.innerHTML = `<p>${member.cleanCount}</p>`;
                memImg.appendChild(cleanCount);

                const memName = document.createElement('div');
                memName.classList.add('mem-name');
                memName.innerHTML = `<h6>${member.name}</h6>`;
                memberDiv.appendChild(memName);



                membersDiv.appendChild(memberDiv);
            });


            // membersCountがmembers.lengthより多い場合、足りないメンバー分だけplus.pngを追加
            const missingCount = item.membersCount - item.members.length;
            for (let i = 0; i < missingCount; i++) {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('member');

                const memImg = document.createElement('div');
                memImg.classList.add('mem-img');
                memImg.classList.add('mem-x');
                memImg.innerHTML = `<img src="plus.png" />`; // ここでplus.pngを表示
                memberDiv.appendChild(memImg);

                const memName = document.createElement('div');
                memName.classList.add('mem-name');
                memName.classList.add('mem-x');
                memName.innerHTML = `<h6>추가</h6>`; // メンバー名を「추가」に設定
                memberDiv.appendChild(memName);
                membersDiv.appendChild(memberDiv);
            }
                   

            areaSub.appendChild(membersDiv);

            // 同じbox内にarea-subを追加
            const box = main.querySelector('.box:last-child'); // 最後に追加したboxを取得
            box.appendChild(areaSub);
        });
    })
    .catch(error => {
        console.error("データ取得中にエラーが発生しました:", error);
    });
});

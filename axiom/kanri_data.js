document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    
    // カレンダーと詳細エリアを追加
    const calendarDiv = document.createElement('div');
    calendarDiv.id = 'calendar';
    body.insertBefore(calendarDiv, body.firstChild);

    const detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';
    detailsDiv.classList.add('details');
    body.insertBefore(detailsDiv, body.firstChild.nextSibling);

    fetch('http://localhost:3000/cleanInfo')
    .then(response => response.json())
    .then(data => {
        console.log("取得したデータ:", data);
    
        if (!Array.isArray(data) || data.length === 0) {
            console.error("データが空です。");
            return;
        }

        const main = document.querySelector('main');
        let currentDate = '';
    
        data.forEach(item => {
            // areaSub をここで定義
            const areaSub = document.createElement('div');
            areaSub.classList.add('area-sub');  // クラス名は任意に設定してください

            // membersDiv をここで初期化
            const membersDiv = document.createElement('div');
            membersDiv.classList.add('members-list');

            item.members.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('member');
    
                const memImg = document.createElement('div');
                memImg.classList.add('mem-img', 'mem-o');
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
    
                // membersDiv に追加
                membersDiv.appendChild(memberDiv);
            });
    
            const missingCount = item.membersCount - item.members.length;
            for (let i = 0; i < missingCount; i++) {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('member');
    
                const memImg = document.createElement('div');
                memImg.classList.add('mem-img', 'mem-x');
                memImg.innerHTML = `<img src="plus.png" />`;
                memberDiv.appendChild(memImg);
    
                const memName = document.createElement('div');
                memName.classList.add('mem-name', 'mem-x');
                memName.innerHTML = `<h6>추가</h6>`;
                memberDiv.appendChild(memName);
                membersDiv.appendChild(memberDiv);
            }
    
            // areaSub に membersDiv を追加
            areaSub.appendChild(membersDiv);
            const box = main.querySelector('.box:last-child');
            box.appendChild(areaSub);  // ここで areaSub を main に追加
        });
    })
    .catch(error => {
        console.error("データ取得中にエラーが発生しました:", error);
    });
});

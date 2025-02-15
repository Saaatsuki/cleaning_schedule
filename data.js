document.addEventListener('DOMContentLoaded', function() {
    fetch('cleaning_schedule_2025.json')
        .then(response => response.json())
        .then(data => {
            // JSONデータが正常に取得できているかコンソールに出力
            console.log(data);

            // 日付の取得
            const date = new Date(data.date); // JSONの日付データをDateオブジェクトに変換
            const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
            const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${dayNames[date.getDay()]}요일`;

            // 日付を表示
            document.querySelector('.date h5').textContent = formattedDate;

            // エリアリストの生成
            const areaListsContainer = document.querySelector('.area-lists');
            data.areas.forEach(area => {
                const areaDiv = document.createElement('div');
                areaDiv.classList.add('area-sub');

                const areaMenuDiv = document.createElement('div');
                areaMenuDiv.classList.add('area-menu');
                areaMenuDiv.innerHTML = `
                    <div class="area me-box"><h6>${area.name}</h6></div>
                    <div class="mem-coun me-box"><h6>${area.members.length}</h6></div>
                `;
                areaDiv.appendChild(areaMenuDiv);

                const membersDiv = document.createElement('div');
                membersDiv.classList.add('members');

                area.members.forEach(member => {
                    const memberDiv = document.createElement('div');
                    memberDiv.classList.add('member');
                    memberDiv.innerHTML = `
                        <div class="mem-img">
                            <img src="${member.image}" />
                        </div>
                        <div class="mem-name">
                            <h6>${member.name}</h6>
                        </div>
                        <div class="clean-coun">
                            <p>${member.cleanCount}</p>
                        </div>
                    `;
                    membersDiv.appendChild(memberDiv);
                });

                areaDiv.appendChild(membersDiv);
                areaListsContainer.appendChild(areaDiv);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

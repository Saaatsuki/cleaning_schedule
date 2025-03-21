// グローバル変数
let currentDate = new Date();

// 月を変更する関数
function changeMonth(monthChange) {
    currentDate.setMonth(currentDate.getMonth() + monthChange);
    generateCalendar();
}

// カレンダーを生成する関数
function generateCalendar() {
    const monthName = document.getElementById('month-name');
    const calendarGrid = document.getElementById('calendar-grid');

    // 月名を表示（韓国語）
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    monthName.innerText = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // カレンダーグリッドをクリア
    calendarGrid.innerHTML = '';

    // 曜日を表示（韓国語） - 月曜始まりに変更
    const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

    // 曜日のヘッダーを追加
    weekdays.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.innerText = day;
        calendarGrid.appendChild(dayCell);
    });

    // 現在の月の1日の曜日を取得
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDaysInMonth = lastDateOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // 月曜始まりの調整 (日曜日を7に変更)
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;

    // 1日の前に空白を追加
    for (let i = 0; i < adjustedFirstDayOfWeek - 1; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }

    // 日付を埋める
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.innerText = day;
        dateCell.onclick = () => showDateDetail(day);
        calendarGrid.appendChild(dateCell);
    }
}

// 日付の詳細を表示する関数
function showDateDetail(day) {
    const dateDetail = document.getElementById('date-detail');
    dateDetail.innerText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${day}일\n상세 정보를 추가할 수 있습니다.`;
}

// ページがロードされたときにカレンダーを生成
generateCalendar();

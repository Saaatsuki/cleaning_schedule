document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  
  const class_ContainerCalender = document.querySelector('.container_calendar');
  class_ContainerCalender.innerHTML = `
      <div class="contianer">
          <div class="calendar">
              <div class="calendar-header">
                  <span class="month-picker" id="month-picker"> May </span>
                  <div class="year-picker" id="year-picker">
                      <span class="year-change" id="pre-year"><pre><</pre></span>
                      <span id="year">2020 </span>
                      <span class="year-change" id="next-year"><pre>></pre></span>
                  </div>
              </div>
              <div class="calendar-body">
                  <div class="calendar-week-days">
                      <div>Sun</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                  </div>
                  <div class="calendar-days"></div>
              </div>
              <div class="calendar-footer"></div>
              <div class="date-time-formate">
                  <div class="day-text-formate">TODAY</div>
                  <div class="date-time-value">
                      <div class="time-formate">01:41:20</div>
                      <div class="date-formate">03 - March - 2022</div>
                  </div>
              </div>
              <div class="month-list"></div>
          </div>
      </div>
  `;

  document.querySelector('.search-calendar').addEventListener('click', function() {
      const calendar = document.querySelector('.container_calendar');
      
      // カレンダーの表示・非表示を切り替える
      if (calendar.style.display === 'none' || calendar.style.display === '') {
          calendar.style.display = 'block';
          setTimeout(() => {
              calendar.classList.add('active'); // フェードイン
          }, 10);
      } else {
          calendar.classList.remove('active'); // フェードアウト
          setTimeout(() => {
              calendar.style.display = 'none';
          }, 300);
      }
  });

  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  const month_names = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
  
  month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
  };
  
  const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];
  
    let currentDate = new Date();
  
    month_picker.innerHTML = month_names[month];
  
    calendar_header_year.innerHTML = year;
  
    let first_day = new Date(year, month);
  
  
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
  
      let day = document.createElement('div');
  
      if (i >= first_day.getDay()) {
        day.innerHTML = i - first_day.getDay() + 1;
  
        if (i - first_day.getDay() + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add('current-date');
        }
      }
      calendar_days.appendChild(day);
    }
  };
  
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
  
    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
    };
  });
  
  (function() {
    month_list.classList.add('hideonce');
  })();
  document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);
  
  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  
  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
      )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
      )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);



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
    
        // box-list を作成し、main に追加
        const boxList = document.createElement('div');
        boxList.classList.add('box-list');
        main.appendChild(boxList);

        data.forEach(item => {
        const date = new Date(item.date);
        const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
        const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${dayNames[date.getDay()]}요일`;

        if (formattedDate !== currentDate) {
            currentDate = formattedDate;
            const box = document.createElement('div');
            box.classList.add('box');
            
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.innerHTML = `<h5>${formattedDate}</h5>`;
            box.appendChild(dateElement);

            // box-list に追加
            boxList.appendChild(box);
        }


    
            const areaSub = document.createElement('div');
            areaSub.classList.add('area-sub');
            const allSwich = document.createElement('div'); 
            allSwich.classList.add('all-sw');
    
            const areaMenuLeft = document.createElement('div');
            const areaMenuRight = document.createElement('div');
    
            areaMenuLeft.classList.add('area-menu');
            const areaDiv = document.createElement('div');
            areaDiv.classList.add('area', 'me-box');
            areaDiv.innerHTML = `<h6>${item.cleanArea}</h6>`;
            areaMenuLeft.appendChild(areaDiv);
    
            const memClassDiv = document.createElement('div');
            memClassDiv.classList.add('mem-coun', 'me-box');
            memClassDiv.innerHTML = `<h6>${item.membersCount}</h6>`;
            areaMenuLeft.appendChild(memClassDiv);
    
            const memCountDiv = document.createElement('div');
            memCountDiv.classList.add('me-box', 'me-class');
            memCountDiv.innerHTML = `<h6>${item.class}</h6>`;
            areaMenuLeft.appendChild(memCountDiv);
    
            const memEditDiv = document.createElement('div');
            memEditDiv.classList.add('me-box', 'me-edit');
            memEditDiv.innerHTML = `
              <div class="card">
                <div class="front">
                  <h6><img src="pen.png" alt="pen icon"></h6>
                </div>
                <div class="back">
                  <h6>EDIT</h6>
                </div>
              </div>
            `;
            areaMenuRight.appendChild(memEditDiv);
    
            allSwich.appendChild(areaMenuLeft);
            allSwich.appendChild(areaMenuRight);
            areaSub.appendChild(allSwich);
    
            const membersDiv = document.createElement('div');
            membersDiv.classList.add('members');
    
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
    
            areaSub.appendChild(membersDiv);
            const box = main.querySelector('.box:last-child');
            box.appendChild(areaSub);
        });
        // 日付をクリックしたときの処理
        const dayElements = document.querySelectorAll('.calendar-days div');
        dayElements.forEach(dayElement => {
            dayElement.addEventListener('click', () => {
                // クリックされた日付を取得（例: "2025년 2월 14일"）
                const clickedDate = `${currentYear.value}년 ${currentMonth.value + 1}월 ${dayElement.textContent}일`;
                
                // クリックされた日付を 'YYYY-MM-DD' 形式に変換
                const formattedDate = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(dayElement.textContent).padStart(2, '0')}`;
                console.log();
                
                
                // JSONデータのクリーン情報を照合
                cleanInfo = data;  // データを格納
                const matchedData = cleanInfo.filter(item => item.date === formattedDate);
                console.log(matchedData);

                if (matchedData.length > 0) {
                  // 一致したデータがある場合の処理
                  console.log(matchedData);
              } else {
                  const noDataMsg = document.createElement(`div`);
                  noDataMsg.classList.add(`no-data-message`);
                  noDataMsg.innerHTML = `
                      ${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${dayNames[date.getDay()]}요일는 청소없습니다. 
                  `
                  // 一致するデータがない場合の処理
                  console.log('該当するデータはありません。');

              }
              
            });
        });
        
    })
    .catch(error => {
        console.error("データ取得中にエラーが発生しました:", error);
    });
});
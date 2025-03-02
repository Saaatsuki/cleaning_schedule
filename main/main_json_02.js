document.addEventListener('DOMContentLoaded', function () {
  // カレンダーのHTMLをcontainer_calendarに動的に挿入
  const classContainerCalendar = document.querySelector('#calendar');
  classContainerCalendar.innerHTML = `
    <div class="contianer">
      <div class="calendar">
        <div class="calendar-header">
          <span class="month-picker" id="month-picker"> May </span>
          <div class="year-picker" id="year-picker">
            <span class="year-change" id="pre-year">
              <pre><</pre>
            </span>
            <span id="year">2020 </span>
            <span class="year-change" id="next-year">
              <pre>></pre>
            </span>
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
          <div class="calendar-days">
          </div>
        </div>
        <div class="calendar-footer">
        </div>
        <div class="date-time-formate">
          <div class="day-text-formate">TODAY</div>
          <div class="date-time-value">
            <div class="time-formate">01:41:20</div>
            <div class="date-formate">03 - march - 2022</div>
          </div>
        </div>
        <div class="month-list"></div>
      </div>
    </div>
  `
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
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  
  const calendar1 = document.querySelector('.container_calendar');
  document.querySelector('.search-calendar').addEventListener('click', function () {
    const boxList = document.querySelector('.box-list');

    // カレンダーが表示されていなければ表示する
    if (calendar1.style.display === 'none' || calendar1.style.display === '') {
      calendar1.style.display = 'block';
      setTimeout(() => {
          calendar1.classList.add('active'); // フェードイン
          boxList.classList.add('active');  // ボックスも同時に表示
      }, 20);
    } else {
      calendar1.classList.remove('active'); // カレンダーを非表示
      boxList.classList.remove('active');  // ボックスも非表示

      // アニメーションが終わるのを待ってから display: none にする
      setTimeout(() => {
          calendar1.style.display = 'none';
      }, 2100); // 2.0秒 + 100ms の余裕を持たせる
    }

  });  


  fetch('http://localhost:3000/cleanInfo')
  .then(response => response.json())
  .then(data => {
    console.log("取得したデータ:", data.data);

    if (!Array.isArray(data.data) || data.data.length === 0) {
      console.error("データが空です。");
      return;
    }

    const boxList = document.querySelector(`.box-list`);
    boxList.classList.add(`box-list`);
    let currentDate = ``;
    let box = null; // 現在のボックスを保持する変数

    data.data.forEach(item => {
      const date = new Date(item.date);
      const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
      const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${dayNames[date.getDay()]}요일`;

      // 日付が変わったら新しいボックスを作成
      if (formattedDate !== currentDate) {
        currentDate = formattedDate;
        box = document.createElement('div');
        box.classList.add('box');

        const dateElement = document.createElement('div');
        dateElement.classList.add('date');
        dateElement.innerHTML = `<h5>${formattedDate}</h5>`;
        box.appendChild(dateElement);
        boxList.appendChild(box);
      }

      // const members = item.members.map(member => `
      //     <div class="member">
      //       <div class="mem-img mem-o">
      //         <img src="../../img/${member.profileImage}" />
      //         <div class="clean-coun">
      //           <p>${member.cleaningCount}</p>
      //         </div>
      //       </div>
      //       <div class="mem-name">
      //         <h6>${member.givenName} ${member.firstName}</h6>
      //       </div>       
      //     </div>
      //   `).join('');

        const members = (item) => {
          let addNuguCount = item.membersCount - item.members.length;
          const addNugu = `  
          <div class="member">
            <div class="mem-img mem-x">
              <img src="../../img/plus.png" />
            </div>
            <div class="mem-name">
              <h6>추가</h6>
            </div>       
          </div>
        `;
        
          let membersHtml = item.members.map(member => `
            <div class="member">
              <div class="mem-img mem-o">
                <img src="../../img/${member.profileImage}" />
                <div class="clean-coun">
                  <p>${member.cleaningCount}</p>
                </div>
              </div>
              <div class="mem-name">
                <h6>${member.givenName} ${member.firstName}</h6>
              </div>       
            </div>
          `).join('');
        
          membersHtml += addNugu.repeat(addNuguCount);
          
          return membersHtml;
        }
      

      console.log(members(item));



      let addNuguCount = item.membersCount - item.members.length
      console.log(addNuguCount);

      // areaSub を作成して box に追加
      if (box) {
        const areaSub = document.createElement('div');
        areaSub.classList.add('area-sub');
        areaSub.innerHTML = `
          <div class="all-sw">
            <div class="area-menu">
              <div class="area me-box">
                <h6>${item.cleanArea}</h6>
              </div>
              <div class="mem-coun me-box">
                <h6>${item.membersCount}</h6>
              </div>
              <div class="me-box me-class">
                <h6>${item.class}</h6>
              </div>
            </div>
            <div class="me-box me-edit">
              <div class="card">
                <div class="front">
                  <h6><img src="../../img/../../img/pen.png" alt="pen icon"></h6>
                </div>
                <div class="back">
                  <h6>EDIT</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="members">
            ${members(item)}
          </div>
        `;
        box.appendChild(areaSub); 
      }
    });
  });
});
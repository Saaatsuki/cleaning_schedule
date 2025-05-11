const name_search = `
<div class="name_serch">
          <div class="search-container">
            <div class="icon calender-btn">
              <button>
                <img src="https://img.icons8.com/windows/32/FFFFFF/calendar.png" alt="検索アイコン" />
              </button>
            </div>
            <input type="text" placeholder="이름으로 검색..." />
            <div class="icon serch-btn">
              <button>
                <img src="https://img.icons8.com/pastel-glyph/128/FFFFFF/search--v2.png" alt="検索アイコン" />
              </button>
            </div>
          </div>
        </div>`;

const calendar_search = `<div class="calendar_serch">
          <div class="calendar-container">
            <div class="calendar-header">
              <button class="prev-month" onclick="changeMonth(-1)">❮</button>
              <h2 id="month-name"></h2>
              <button class="next-month" onclick="changeMonth(1)">❯</button>
            </div>
            <div class="calendar-grid" id="calendar-grid"></div>
          </div>
        </div>`;

const search_wrapper = document.getElementById("search");

search_wrapper.innerHTML = name_search + calendar_search;

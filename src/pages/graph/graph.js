https://apexcharts.com/docs/options/plotoptions/pie/#labels




document.addEventListener("DOMContentLoaded", function () {
    // 共通のラベルとカラーを定義
    var labels = ['학교 체류', '학교 부재', '식사', '도서관', '키타'];
    var colors = ['#F5A623', '#8BD3DD', '#F582AE', '#E8CB1F', '#B3B3B3'];

    // 1つ目のグラフの設定
    var options1 = {
        chart: {
            type: 'donut',
            fontFamily: 'Noto Sans KR',
            events: {
                mounted: function(chartContext) {
                    addHourLabels(chartContext);
                }
            }
        },
        series: [40, 60, 50, 30, 20], // 1つ目のグラフのデータ
        labels: labels,
        colors: colors,
        plotOptions: {
            pie: {
                donut: {
                    size: '45%', // ドーナツサイズの設定
                    labels: {
                        show: true, // 真ん中にラベルを表示
                        name: {
                            show: true,
                            fontSize: '10px',
                            fontFamily: 'Noto Sans KR',
                            fontWeight: 600,
                            color: '#172C66', // ラベルの色
                            offsetY: -5,
                            formatter: function (val) {
                                return val; // ラベルのフォーマット
                            }
                        },
                        value: {
                            show: true,
                            fontSize: '15px',
                            fontFamily: 'Noto Sans KR',
                            fontWeight: 400,
                            color: '#172C66',
                            offsetY: 1,
                            formatter: function (val) {
                                return val; // 値ラベルのフォーマット
                            }
                        },
                        total: {
                            show: true, // 合計値を表示しない
                        }
                    }
                },
                
            }
        },
        legend: {
            show: false // 外側のデータラベル（Legend）を表示しない
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val; // コロンを削除するために、値だけを返す
                }
            }
        },
        dataLabels: {
            enabled: false, // データラベルを表示するかどうかを設定します。trueにすると表示されます。
            enabledOnSeries: undefined, // 特定のシリーズにのみデータラベルを表示する場合、シリーズのインデックスを指定します。undefinedだとすべてのシリーズに表示されます。
            formatter: function (val, opts) { 
                // データラベルの表示内容をカスタマイズするための関数
                return  val; // ここではそのまま値を返していますが、例えば`return "$" + val`のように加工できます。
            },
            textAnchor: 'middle', // ラベルのテキストの配置方法。'middle'は中央に配置されます。他には'start'や'end'があります。
            distributed: true, // ラベルを均等に配置するかどうか。trueだとラベルが均等に分散されます。
            offsetX: 0, // X軸方向へのオフセット。値を変更するとラベルが左右に移動します。
            offsetY: 0, // Y軸方向へのオフセット。値を変更するとラベルが上下に移動します。
            style: {
                fontSize: '10px', // ラベルのフォントサイズを指定します。
                fontFamily: '"Noto Sans KR", serif', // 使用するフォントファミリー。複数のフォントを指定できます。
                fontWeight: 'bold', // フォントの太さ。'bold'で太字になります。
                colors: undefined // ラベルの文字色を指定します。未設定のためデフォルトカラーが適用されます。
            },
            background: {
                enabled: true, // データラベルの背景を表示するかどうか。trueにすると背景が表示されます。
                foreColor: '#fff', // 背景の文字色を設定します。ここでは白色。
                padding: 4, // ラベルと背景との間の余白を指定します。
                borderRadius: 2, // 背景の角を丸くする半径を指定します。
                borderWidth: 1, // 背景の枠線の太さを指定します。
                borderColor: '#fff', // 背景の枠線の色を指定します。ここでは白色。
                opacity: 0.9, // 背景の透明度を指定します。1が完全に不透明、0が完全に透明です。
                dropShadow: {
                    enabled: false, // 背景にシャドウを追加するかどうか。falseだとシャドウは表示されません。
                    top: 1, // シャドウの垂直方向のオフセット（位置）を指定します。
                    left: 1, // シャドウの水平方向のオフセット（位置）を指定します。
                    blur: 1, // シャドウのぼかし具合を指定します。数値が大きいほどぼけます。
                    color: '#000', // シャドウの色を指定します。ここでは黒色。
                    opacity: 0.45 // シャドウの透明度を指定します。1が完全に不透明、0が完全に透明です。
                }
            },
            dropShadow: {
                enabled: false, // データラベルのテキスト自体にシャドウを追加するかどうか。
                top: 1, // シャドウの垂直方向のオフセット。
                left: 1, // シャドウの水平方向のオフセット。
                blur: 1, // シャドウのぼかし具合。
                color: '#000', // シャドウの色。
                opacity: 0.45 // シャドウの透明度。
            }
        }
    };

    var options2 = JSON.parse(JSON.stringify(options1)); // 1つ目のオプションをコピー
    options2.series = [30, 50, 40, 20, 10]; // 別データを適用（例）


    // 1つ目のグラフを描画
    var chart1 = new ApexCharts(document.querySelector("#myChart1"), options1);
    chart1.render();

    // 2つ目のグラフを描画
    var chart2 = new ApexCharts(document.querySelector("#myChart2"), options2);
    chart2.render();

    // カスタムレジェンドを表示
    var legendContainer = document.querySelector('.color-exp'); // レジェンドを表示する親要素

    labels.forEach(function(label, index) {
        // レジェンドアイテムを作成
        var legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');
        
        // カラーボックスの作成
        var colorBox = document.createElement('div');
        colorBox.classList.add('legend-color');
        colorBox.style.backgroundColor = colors[index]; // 色を設定
        
        // ラベルの作成
        var legendLabel = document.createElement('span');
        legendLabel.classList.add('legend-label');
        legendLabel.textContent = label; // ラベルを設定
        
        // カラーボックスとラベルを結合
        legendItem.appendChild(colorBox);
        legendItem.appendChild(legendLabel);
        
        // カスタムレジェンドの親要素に追加
        legendContainer.appendChild(legendItem);
    });

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    function addHourLabels(chartContext) {
        let svg = chartContext.el.querySelector("svg");
        let chartCenterX = chartContext.w.globals.cx;
        let chartCenterY = chartContext.w.globals.cy;
        let radius = chartContext.w.globals.radius + 20; // 円の外周位置

        for (let i = 0; i < 24; i++) {
            let angle = (i * 15) - 90; // 0～23時を円周に配置
            let radian = (angle * Math.PI) / 180;
            let x = chartCenterX + radius * Math.cos(radian);
            let y = chartCenterY + radius * Math.sin(radian);

            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x);
            text.setAttribute("y", y);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("font-size", "12px");
            text.setAttribute("fill", "#000");
            text.textContent = i;

            svg.appendChild(text);
        }
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const RANKING_URL = "../../../axiom/ranking.json";
    const rankingContainer = document.querySelector(".class_Ranking");
    const dateHeading = document.getElementById("ranking-date");

    let currentDate = new Date("2025-04-11");


    function formatJapaneseDate(date) {
        const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${days[date.getDay()]}`;
    }


    function formatKeyDate(date) {
        return date.toISOString().split("T")[0];
    }

    function loadRankingForDate(date) {
        fetch(RANKING_URL)
            .then(response => response.json())
            .then(data => {
                const key = formatKeyDate(date);
                const rankingData = data.ranking[key];

                // タイトル更新
                dateHeading.textContent = formatJapaneseDate(date);

                if (!rankingData || !rankingContainer) {
                    console.warn("ランキングデータが存在しません。");
                    rankingContainer.innerHTML = `
                        <div class="dateX_msg">
                            <p>데이터가 없습니다</p>
                            <img src="https://www.sanrio.co.jp/wp-content/themes/sanrio2022/common/images/spots/h1_char.png" />
                        </div>
                    `;
                    return;
                }

                // 一旦中身をクリア
                rankingContainer.innerHTML = "";

                // ソート（studyTimeを基準に降順）
                rankingData.sort((a, b) => {
                    const timeToMinutes = timeStr => {
                        const match = timeStr.match(/(\d+)시간\s*(\d+)분/);
                        return parseInt(match[1]) * 60 + parseInt(match[2]);
                    };
                    return timeToMinutes(b.studyTime) - timeToMinutes(a.studyTime);
                });

                rankingData.forEach((student, index) => {
                    const fullName = `${student.familyName} ${student.firstName}`.trim();
                    const studentImg = student.image || "https://img.icons8.com/emoji/48/student-emoji.png";

                    const studentHtml = `
                        <div class="class_ranking_mem">
                            <div class="class_rank">
                                <p>${index + 1}</p>
                            </div>
                            <div class="rank_img">
                                <img src="${studentImg}" alt="${fullName}" />
                            </div>
                            <div class="rank_name">
                                <p>${fullName}</p>
                            </div>
                            <div class="rank_time">
                                <p>${student.studyTime}</p>
                            </div>
                        </div>
                    `;

                    rankingContainer.insertAdjacentHTML("beforeend", studentHtml);
                });
            })
            .catch(error => {
                console.error("ランキングデータの取得に失敗しました:", error);
            });
    }

    // 日付変更用関数（±1日）
    window.changeday = function (offset) {
        currentDate.setDate(currentDate.getDate() + offset);
        loadRankingForDate(currentDate);
    };

    // 初回表示
    loadRankingForDate(currentDate);
});


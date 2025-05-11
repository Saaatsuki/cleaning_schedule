// import getCleanData from "./api/getCleanData";

// データ取得
const getCleanData = async (classId) => {
  console.log("데이터 요청 시작:", classId);
  try {
    const response = await fetch(`http://210.101.236.158:8081/api/clean/all?classId=${classId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
};

// 日付をフォーマット
const formatDate = (date_arg) => {
  const date = new Date(date_arg);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${
    dayNames[date.getDay()]
  }요일`;

  return formattedDate;
};

// ボックスIDをフォーマット
const formatBoxId = (date_arg) => {
  const date = new Date(date_arg);
  return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};

// 日付要素を作成
const createDateElement = (date) => {
  const formattedDate = formatDate(date);
  const dateElement = document.createElement("div");
  dateElement.classList.add("date");
  dateElement.innerHTML = `<h5>${formattedDate}</h5>`;

  return dateElement;
};

const createAreaElement = (item) => {
  console.log(item);

  const areaElement = document.createElement("div");
  areaElement.classList.add("area-sub");
  areaElement.innerHTML = `<div class="all-sw">
                            <div class="area-menu">
                                <div class="area me-box">
                                    <h6>${item.cleanArea}</h6>
                                </div>
                                <div class="mem-coun me-box">
                                    <h6>${item.membersCount}</h6>
                                </div>
                            </div>
                            <!-- <div class="me-box me-edit">
                                <div class="card">
                                    <div class="front">
                                        <h6><img src="http://127.0.0.1:5501/img/pen.png" alt="pen icon"></h6>
                                    </div>
                                    <div class="back">
                                        <h6>EDIT</h6>
                                    </div>
                                </div>
                            </div> -->
                        </div>`;

  const membersElement = createMembersWrapperElement(item);
  areaElement.appendChild(membersElement);

  return areaElement;
};

// メンバーたちの要素を作成（メンバーのグループを作成）
const createMembersWrapperElement = (item) => {
  const membersElement = document.createElement("div");
  membersElement.classList.add("members");

  item.members.map((member) => {
    const memberElement = createMemberElement(member);
    memberElement.dataset.groupId = item.groupId;
    membersElement.appendChild(memberElement);
  });

  for (let i = 0; i < item.membersCount - item.members.length; i++) {
    const addMember = addMemberElement(item);
    membersElement.appendChild(addMember);
  }

  return membersElement;
};

// 追加メンバー要素を作成
const addMemberElement = () => {
  const addMember = document.createElement("div");
  addMember.classList.add("add-member");
  addMember.innerHTML = `
                        <div class="mem-img mem-x">
                            <img src="../../../img/plus.png" />
                        </div>
                        <div class="mem-name">
                            <h6>추가</h6>
                        </div>
                        `;

  return addMember;
};

// メンバー要素を作成（一人分）
const createMemberElement = (member) => {
  const memberElement = document.createElement("div");
  memberElement.classList.add("member");
  memberElement.dataset.studentNumber = member.studentNumber;
  memberElement.innerHTML = `
                                <div class="mem-img mem-o" id=${member.studentNumber}>
                                    <img class="mem-o_img" src="${member.profileImage}" />
                                    <div class="clean-coun">
                                        <p>${member.cleaningCount}</p>
                                    </div>
                                </div>
                                <div class="mem-name">
                                    <h6>${member.familyName} ${member.givenName}</h6>
                                </div>                            
                                `;

  return memberElement;
};

// ボックスを作成
const createBoxElement = (item) => {
  const box = document.createElement("div");
  const boxId = formatBoxId(item.date);
  box.id = boxId;
  box.classList.add("box");

  const dateElement = createDateElement(item.date);
  box.appendChild(dateElement);

  const areaElement = createAreaElement(item);
  box.appendChild(areaElement);

  return box;
};

const memberMenu = () => {
  const menu_open = localStorage.getItem("menu_open");
  const profileImage = localStorage.getItem("menu_member_profileImage");
  const familyName = localStorage.getItem("menu_member_familyName");
  const givenName = localStorage.getItem("menu_member_givenName");
  const formattedDate = localStorage.getItem("menu_member_formattedDate");

  const memberMenu = document.querySelector("#member-menu");

  if (menu_open === "true") {
    memberMenu.innerHTML = `
                                <div class=menu_batu><i class="fa-solid fa-xmark" style="color :rgb(180, 180, 180)"></i></div>
                                <div class="member-info">
                                    <img src="${profileImage}" alt="Member Image">
                                    <h6>${familyName} ${givenName}</h6>
                                    <p>${formattedDate}</p>
                                </div>
                                <div class="mem-menu">
                                    <div class="mem-menu_img">
                                        <img src="https://img.icons8.com/pulsar-color/48/user-female-circle.png" alt="user-female-circle"/>
                                    </div>
                                    <div class="mem-menu_p">
                                        <p>프로필 보기</p>
                                    </div>
                                </div>
                                <div class="mem-menu">
                                    <div class="mem-menu_img">
                                        <img src="https://img.icons8.com/pulsar-color/48/broom.png" alt="broom"/>
                                    </div>
                                    <div class="mem-menu_p">
                                        <p>청소 기록</p>
                                    </div>
                                </div>
                                <div class="mem-menu">
                                    <div class="mem-menu_img">
                                        <img src="https://img.icons8.com/pulsar-color/48/change.png" alt="change"/>
                                    </div>
                                    <div class="mem-menu_p">
                                        <p>교환 신청</p>
                                    </div>
                                </div>
                            `;
    memberMenu.classList.add("show");
  } else {
    memberMenu.innerHTML = "";
    memberMenu.classList.remove("show");
  }

  return memberMenu;
};

const memberClick = (member) => {
  console.log("メンバー要素がクリックされました。");
  localStorage.setItem("menu_open", true);
  localStorage.setItem("menu_member_profileImage", member.querySelector(".mem-o_img").src);
  localStorage.setItem("menu_member_familyName", member.querySelector(".mem-name h6").textContent);
  localStorage.setItem("menu_member_givenName", member.querySelector(".mem-name h6").textContent);
  localStorage.setItem(
    "menu_member_formattedDate",
    member.parentElement.parentElement.parentElement.querySelector(".date").querySelector("h5").textContent
  );
};

const addMemberMenu = () => {};

const addMemberClick = () => {};

// 初期化
const init = async () => {
  const cleanData = await getCleanData(1);
  console.log("받은 데이터:", cleanData);

  const boxList = document.querySelector(`.box-list`);

  cleanData.data.forEach((item) => {
    const box = createBoxElement(item);
    boxList.appendChild(box);
  });

  // 追加メンバー要素をクリックしたら、メンバーを追加
  document.querySelectorAll(".add-member").forEach((addMember) => {
    addMember.addEventListener("click", () => {
      console.log("追加メンバー要素がクリックされました。");
      addMemberClick();
      addMemberMenu();
    });
  });

  // メンバー要素をクリックしたら、メニューを表示
  document.querySelectorAll(".member").forEach((member) => {
    member.addEventListener("click", () => {
      memberClick(member);
      memberMenu();
    });
  });

  // メニューを閉じる
  document.addEventListener("click", (event) => {
    // メニューをクリックした場合は除外
    if (!event.target.closest("#member-menu") && !event.target.closest(".member")) {
      localStorage.setItem("menu_open", false);
      memberMenu();
    }
  });
};

init();

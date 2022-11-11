$(document).ready(function () {
  //
  // 메뉴버튼 클릭시 네비게이션 나타나는 기능
  //
  var nav_menu = document.getElementsByClassName("nav_menu")[0];
  var btn_menu = document.getElementById("btn_menu");

  // 메뉴 버튼을 클릭하면
  btn_menu.onclick = function () {
    nav_menu.classList.toggle("on");
    btn_menu.classList.toggle("on");
    $("body").toggleClass("hidden"); // 네비게이션이 나왔을때 배경 스크롤 금지
  };

  // 모바일 네비게이션 리스트 아코디언
  let mobile = window.matchMedia("(max-width: 767px)");
  if (mobile.matches == true) {
    var listClick = document.querySelectorAll("ul.menu > li");

    for (var i = 0; i < listClick.length; i++) {
      listClick[i].addEventListener("click", function (e) {
        e.preventDefault();

        if (this.classList.contains("active")) {
          this.classList.remove("active");
        } else {
          for (var x = 0; x < listClick.length; x++) {
            listClick[x].classList.remove("active");
          }
          this.classList.add("active");
        }
      });
    }
  }

  //슬라이드
  // 반복 SLIDE 디자인
  function infiniteSlide(targetWrap) {
    const wrap = targetWrap; // 슬라이드 영역
    const mask = $(wrap + " div.view_mask"); // 슬라이드 mask
    let innerUl = $(wrap + " div.view_mask > ul"); // 슬라이드 ul
    let innerList = $(wrap + " div.view_mask > ul > li"); // 슬라이드 list
    const btnPrev = $(wrap + " button.prev"); // 이전 버튼
    const btnNext = $(wrap + " button.next"); // 다음 버튼
    const listWidth = innerList.outerWidth(); // list border 포함한 넓이
    const moveCnt = 1; // 클릭
    const duration = 300; // 슬라이드 지연 시간
    let clickEvent = true; // 클릭 이벤트 발생여부
    let setTime = 0; // 슬라이드 setInterval, clearInterval 확인

    // 슬라이드 기본 함수
    (function init() {
      for (var i = 1; i <= moveCnt; i++) {
        innerList.last().prependTo(innerUl); // 마지막 list 를 ul의 맨처음에 넣기
      }
      innerUl.css("margin-left", -(listWidth * moveCnt) + "px"); // list 넓이에 클릭 횟수를 곱한 만큼 ul 왼쪽으로 옮기기 그래야 첫번째 li로 ul 시작되는 것처럼 보임
    })();

    // 이전 버튼 클릭 함수
    btnPrev.click(function test() {
      if (clickEvent) {
        // 클릭 이벤트가 true면
        clickEvent = false; // 클릭 이벤트 값에 false를 넣음
        movement(1); // 이동 함수 (1) 실행
      } else {
        // 클릭 이벤트가 false면
        return; // 함수 종료
      }
    });

    // 다음 버튼 클릭 함수
    btnNext.click(function () {
      if (clickEvent) {
        // 클릭 이벤트가 true면
        clickEvent = false; // 클릭 이벤트 값에 false를 넣음
        movement(-1); // 이동 함수 (-1) 실행
      } else {
        // 클릭 이벤트가 false면
        return; // 함수 종료
      }
    });

    // 이동 함수
    function movement(direction) {
      //direction 값 들어오면
      stopTime(); // 반복 정지 함수
      innerUl.animate(
        { left: listWidth * direction * moveCnt + "px" }, // 최종 변화 화면이 왼쪽에서 list 넓이에 이동 방향 곱해진 값만큼 이동(ul의 display가 block 이여서 property 설정에 따른 변경은 반영되지 않지만, position이 relative, fixed, absolute인 경우에는 반영됨. 참고: https://www.w3schools.com/jquery/jquery_animate.asp)
        duration, // 지연 시간: display block 에서도 반영됨
        function () {
          // 콜백함수: display block 에서도 반영됨
          for (var i = 1; i <= moveCnt; i++) {
            innerList = $(wrap + " div.view_mask > ul > li"); // 슬라이드 li 재할당
            if (direction == 1) {
              // 이전 버튼 클릭되면
              innerList.last().prependTo(innerUl); // 마지막 list 를 ul의 처음에 넣기
            } else if (direction == -1) {
              //다음 버튼 클릭되면
              innerList.first().appendTo(innerUl); // 첫번째 list 를 ul의 마지막에 넣기
            }
          }
          innerUl.css("left", "0px"); // display block 인 경우 반영안됨.
          clickEvent = true; // 클릭 이벤트 값에 true 넣기
          startTime(); // 반복 함수 실행
        }
      );
    }

    // 시작 함수
    function startTime() {
      if (setTime != 0) {
        //타이머가 0이 아니면
        clearInterval(setTime); // 타이머 종료
      }
      setTime = setInterval(function () {
        // 반복 실행
        btnNext.click(); // 다음 버튼 클릭 함수
      }, 3000); // 3초간 반복
    }
    // 반복 정지 함수
    function stopTime() {
      if (setTime != 0) clearInterval(setTime); // 타이머가 0이 아니면 타이머 종료
      setTime = 0; // 타이머 값으로 0
    }
    // 반복 SLIDE 디자인 실행 시 시작함수 자동 실행
    startTime();
  }

  // sns 영역 slide 실행
  infiniteSlide(".sns");

  //
  //탭 버튼 클릭시 해당 페이지로 전환
  //
  const tabMenu = document.querySelectorAll(".rel button");
  const tabText = document.querySelectorAll(".rel button span");
  const tabContent = document.querySelectorAll(".lists_wrap li");
  const tabBar = document.querySelector(".bar");
  var cnt_num = 0;

  // 탭 모바일, 태블릿 반응형 디자인
  let mobileTablet = window.matchMedia("(max-width: 1024px");
  if (mobileTablet.matches == true) {
    (function lists_init() {
      tabContent[0].style.display = "block";
      tabText.forEach(function (item, idx) {
        item.classList.remove("tab-active");
      });
      tabText[0].classList.add("tab-active");
      tabBar.style.left = tabMenu[0].offsetLeft;
      +"px";
    })();
    // 탭 버튼 클릭시
    tabMenu.forEach(function (item, idx) {
      item.addEventListener("click", function () {
        if (idx == cnt_num) return;
        cnt_num = idx;
        showContent(cnt_num);
        moveTabBar(cnt_num);
        $(this).siblings().find("span").removeClass("tab-active");
        $(this).find("span").addClass("tab-active");
      });
    });
    // 클릭된 탭 인덱스 받아와서 동일한 인덱스 이미지 보여주기
    function showContent(num) {
      tabContent.forEach(function (item, idx) {
        item.style.display = "none";
      });
      tabContent[num].style.display = "block";
    }
    // 탭버튼 offsetLeft 값 만큼 바 이동
    function moveTabBar(num) {
      const newLeft = tabMenu[num].offsetLeft;
      tabBar.style.left = newLeft + "px";
    }
  }

  // 데스크탑 사이즈 확인
  let desktop = window.matchMedia("(min-width: 1025px)");
  // 데스크탑 사이즈 에서 변화 발생할 때 체크
  desktop.addEventListener("change", function () {
    console.log(tabContent);
    if (desktop.matches == true) {
      tabContent.forEach(function (item, idx) {
        item.style.display = "block";
      });
    } else {
      tabContent.forEach(function (item, idx) {
        item.style.display = "none";
      });
      // 일단, 기본 화면 설정하고
      (function lists_init() {
        tabContent[0].style.display = "block";
        tabText.forEach(function (item, idx) {
          item.classList.remove("tab-active");
        });
        tabText[0].classList.add("tab-active");
        tabBar.style.left = tabMenu[0].offsetLeft;
        +"px";
      })();
      // 탭 버튼 클릭시
      tabMenu.forEach(function (item, idx) {
        item.addEventListener("click", function () {
          if (idx == cnt_num) return;
          cnt_num = idx;
          showContent(cnt_num);
          moveTabBar(cnt_num);
          $(this).siblings().find("span").removeClass("tab-active");
          $(this).find("span").addClass("tab-active");
        });
      });
      // 클릭된 탭 인덱스 받아와서 동일한 인덱스 이미지 보여주기
      function showContent(num) {
        tabContent.forEach(function (item, idx) {
          item.style.display = "none";
        });
        tabContent[num].style.display = "block";
      }
      // 탭버튼 offsetLeft 값 만큼 바 이동
      function moveTabBar(num) {
        const newLeft = tabMenu[num].offsetLeft;
        tabBar.style.left = newLeft + "px";
      }
    }
  });
});

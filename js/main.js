// 모바일 nav
const buttons = document.querySelectorAll(".nav-btn");
let activeButton = document.querySelector(".nav-btn.active");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => { // 스크롤 시 자동으로 변경되는 메뉴
    // 현재 영역의 id값
    let current = "";
    sections.forEach(section => {
        // 각 section의 top 위치(absolute)
        const sectionTop = window.scrollY + section.getBoundingClientRect().top - 1;

        // 누적된 스크롤이 section의 top 위치에 도달했거나 section의 안에 위치할 경우
        if(window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    buttons.forEach(item => {
        const text = item.querySelector(".nav-title");
        item.classList.remove("active");
        item.querySelector(".nav-title").classList.remove("active");
        const href = item.getAttribute("name").substring(0);
        if(href === current) {
            // 현재 있는 영역의 id와 메뉴의 링크 주소가 일치할 때
            item.classList.add("active");
            text.classList.add("active");
        }
    });
});

buttons.forEach(item => {
    const text = item.querySelector(".nav-title");

    item.addEventListener("click", function() {
        if (this.classList.contains("active"))
            return;
        this.classList.add("active");
        if (activeButton) {
            activeButton.classList.remove("active");
            activeButton.querySelector(".nav-title").classList.remove("active");
        }
        handleTransition(this, text);
        activeButton = this;
    });
});

function handleTransition(item, text) {
    item.addEventListener("transitionend", (e) => {
        if (e.propertyName != "flex-grow" || !item.classList.contains("active"))
            return;
        text.classList.add("active"); 
    });
}


// pc nav
const nav = $(".gnb-pc");
const line = $("<div />").addClass("line");

line.appendTo(nav);

const active = nav.find(".active");
let pos = 0;
let wid = 0;

if(active.length) {
    pos = active.position().left;
    wid = active.width();
    line.css({
        left: pos,
        width: wid
    });
}

nav.find("ul li a").click(function(e) {
    if(!$(this).parent().hasClass("active") && !nav.hasClass("animate")) {
        nav.addClass("animate");
        const _this = $(this);
        nav.find("ul li").removeClass("active");
        let position = _this.parent().position();
        let width = _this.parent().width();

        if(position.left >= pos) {
            line.animate({
                width: ((position.left - pos) + width)
            }, 300, function() {
                line.animate({
                    width: width,
                    left: position.left
                }, 150, function() {
                    nav.removeClass("animate");
                });
                _this.parent().addClass("active");
            });
        } else {
            line.animate({
                left: position.left,
                width: ((pos - position.left) + width)
            }, 300, function() {
                line.animate({
                    width: width
                }, 150, function() {
                    nav.removeClass("animate");
                });
                _this.parent().addClass("active");
            });
        }
    
        pos = position.left;
        wid = width;
    }
});


// 스크롤에 따른 색상 및 좌우 사진 요소 변경
window.addEventListener("scroll", () => {
    // 현재 영역의 id 값
    let current = ""

    sections.forEach(section => {
        // 각 section의 top 위치(절대적 위치)
        const sectionTop = window.scrollY + section.getBoundingClientRect().top - 1;
    
        // 누적된 스크롤이 section의 top위치에 도달했거나 section의 안에 위치할 경우
        if(window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    const circleRight = document.getElementById("circleRight");
    const circleLeft = document.getElementById("circleLeft");
    const menus = document.getElementsByClassName("menu");
    const titleNums = document.getElementsByClassName("title-num");
    const titles = document.getElementsByClassName("title");

    if(current == "projects" || current == "contact") {
        document.body.style.backgroundColor = "#2f2e2d";
        circleRight.style.opacity = "0";
        circleLeft.style.opacity = "1";
        for (const menu of menus) {
            menu.style.color = '#f2ece4';
        }
        for (const titleNum of titleNums) {
            titleNum.style.color = '#f2ece4';
        }
        for (const title of titles) {
            title.style.webkitTextStrokeColor = "#f2ece4";
        }
    } else {
        document.body.style.backgroundColor = "#f2ece4";
        circleRight.style.opacity = "1";
        circleLeft.style.opacity = "0";
        for (const menu of menus) {
            menu.style.color = '#2f2e2d';
        }
        for (const titleNum of titleNums) {
            titleNum.style.color = '#2f2e2d';
        }
        for (const title of titles) {
            title.style.webkitTextStrokeColor = "#2f2e2d";
        }
    }
});


// skills progress bar animation restart
window.addEventListener("scroll", () => {
    // 현재 영역의 id 값
    let current = ""

    sections.forEach(section => {
        // 각 section의 top 위치(절대적 위치)
        const sectionTop = window.scrollY + section.getBoundingClientRect().top - 1;
    
        // 누적된 스크롤이 section의 top위치에 도달했거나 section의 안에 위치할 경우
        if(window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    const progress = document.getElementsByClassName("progress");
    let name = "";

    if(current == "skills") {
        for (let i = 0; i < progress.length; i++) {
            name = progress[i].getAttribute("id");
            progress[i].classList.add(name);
        }
    } else {
        for (let i = 0; i < progress.length; i++) {
            name = progress[i].getAttribute("id");
            progress[i].classList.remove(name);
        }
    }
});


// 프로젝트 nav 버튼 클릭시 active 클래스 추가
const navBtn = document.getElementsByClassName("navBtn");

for (let i = 0; i < navBtn.length; i++) {
    navBtn[i].onclick = function() {
        for (let j = 0 ; j < navBtn.length; j++) {
            // 버튼에 입혀진 active 라는 클래스를 지운다.
            navBtn[j].classList.remove("active");
        }

        navBtn[i].classList.add("active");
        location.href = `#project0${i + 1}`;
    }
}
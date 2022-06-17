// 모바일 nav
const buttons = document.querySelectorAll(".nav-btn");
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
        text.classList.remove("active");
        
        const name = item.getAttribute("name");
        if(name === current) {
            // 현재 있는 영역의 id와 메뉴의 이름이 일치할 때
            item.classList.add("active");
            text.classList.add("active");
        }
    });
});


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


// WAYPOINT fade-out
window.addEventListener("scroll", () => {
    const pointTop = document.getElementById("point").getBoundingClientRect().top;
    const waypoint = document.getElementById("waypoint");
    if(pointTop <= 100) {
        waypoint.style.animationName = "fade-out";
    } else {
        waypoint.style.animationName = "fade-in";
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
const projects = document.querySelectorAll(".project");
const projectBtns = document.querySelectorAll(".navBtn");

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

window.addEventListener("scroll", () => { // 스크롤 시 자동으로 변경되는 메뉴
    // 현재 영역의 id값
    let current = "";
    projects.forEach(project => {
        // 각 section의 top 위치(absolute)
        const projectTop = window.scrollY + project.getBoundingClientRect().top - 180;

        // 누적된 스크롤이 section의 top 위치에 도달했거나 section의 안에 위치할 경우
        if(window.scrollY >= projectTop) {
            current = project.getAttribute("id");
        }
    });

    projectBtns.forEach(item => {
        item.classList.remove("active");
        const name = item.getAttribute("name");
        if(name === current) {
            // 현재 있는 영역의 id와 메뉴의 이름이 일치할 때
            item.classList.add("active");
        }
    });
});


// EmailJS
const inputText = document.getElementsByClassName("input-text");
let sendBtn = document.getElementById("send-btn");

for (let i = 0; i < inputText.length; i++) {
    inputText[i].addEventListener("keyup", checkForm);
}

function checkForm() {
    let canSubmit = true;

    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i].value.length == 0) {
            canSubmit = false;
        }
    }

    if (canSubmit) {
        sendBtn.disabled = false;
    } else if(!canSubmit) {
        sendBtn.disabled = true;
    }

    console.log(canSubmit);
    console.log(sendBtn.disabled);
}

function setStatus(status) {
    let icon;
    let title;
    let text;

    if (status == "success") {
        icon = "success";
        title = "전송 완료";
        text = "메일 전송 감사합니다. 빠른 시일 내에 확인 후 답장드리겠습니다.";
    } else {
        icon = "error";
        title = "전송 실패";
        text = "오류가 발생했습니다. 재시도해주시기 바랍니다.";
    }

    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText: "확인",
        showClass: {
            popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutUp"
        }
    });
}

const sendEmail = () => {
    if(sendBtn.disabled == false) {
        emailjs.init("HcdT_GGrzWUpKScSF");
        let templateParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };
    
        emailjs.send("service_t22s76f", "template_1aj9w8r", templateParams).then(function(response) {
            console.log('Success!', response.status, response.text);
            setStatus("success");
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        }, function(error) {
            console.log('Failed...', error);
            setStatus("fail");
        });
    }
}
window.onload = function() {
    const sections = document.querySelectorAll("section");
    
    // pc nav
    const nav = document.querySelector(".gnb-pc");
    const line = document.createElement("div");
    const anchors = document.querySelectorAll(".gnb > li > a");
    line.classList.add("line");
    nav.appendChild(line);

    // line의 길이와 위치 설정
    function setLine(e) {
        line.style.left = e.offsetLeft + "px";
        line.style.width = e.offsetWidth + "px";
    }

    const init = document.querySelector(".gnb > li > a");
    setLine(init);

    window.addEventListener("scroll", () => {
        // WAYPOINT fade-out
        const pointTop = document.getElementById("point").getBoundingClientRect().top;
        const waypoint = document.getElementById("waypoint");

        if(pointTop <= 179) {
            waypoint.style.animationName = "fade-out";
        } else {
            waypoint.style.animationName = "fade-in";
        }

        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = window.scrollY + section.getBoundingClientRect().top - 1;

            if(window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
            
            // 스크롤 위치에 따라 line 이동
            anchors.forEach(anchor => {
                anchor.classList.remove("active");
                const href = anchor.getAttribute("href").substring(1);
                if(href === currentSection) {
                    anchor.classList.add("active");
                    setLine(anchor);
                }
            })
        });



        // 모바일 nav
        const buttons = document.querySelectorAll(".nav-btn");

        buttons.forEach(item => {
            const text = item.querySelector(".nav-title");
            item.classList.remove("active");
            text.classList.remove("active");
            
            const name = item.getAttribute("name");
            if(name === currentSection) {
                item.classList.add("active");
                text.classList.add("active");
            }
        });



        // 스크롤에 따른 색상 및 좌우 사진 요소 변경
        const circleRight = document.getElementById("circleRight");
        const circleLeft = document.getElementById("circleLeft");
        const menus = document.getElementsByClassName("menu");
        const titleNums = document.getElementsByClassName("title-num");
        const titles = document.getElementsByClassName("title");

        if(currentSection == "projects" || currentSection == "contact") {
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



        // skills progress bar animation restart
        const progress = document.getElementsByClassName("progress");
        let name = "";

        if(currentSection == "skills") {
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



        // projects nav 버튼 클릭시 active 클래스 추가
        const navBtn = document.getElementsByClassName("navBtn");
        const projects = document.querySelectorAll(".project");
        let currentProject = "";

        projects.forEach(project => {
            const projectTop = window.scrollY + project.getBoundingClientRect().top - 180;

            if(window.scrollY >= projectTop) {
                currentProject = project.getAttribute("id");
            }
        });

        for (let i = 0; i < navBtn.length; i++) {
            navBtn[i].onclick = function() {
                for (let j = 0 ; j < navBtn.length; j++) {
                    navBtn[j].classList.remove("active");
                }
    
                navBtn[i].classList.add("active");
                location.href = `#project0${i + 1}`;
            }

            navBtn[i].classList.remove("active");
            const name = navBtn[i].getAttribute("name");

            if(name === currentProject) {
                navBtn[i].classList.add("active");
            }
        }
    });



    // projects full screen modal
    const body = document.querySelector("body");
    const modal = document.getElementsByClassName("modal");
    const modalOpen = document.getElementsByClassName("open-btn");
    const modalClose = document.getElementsByClassName("close-btn");
    const topBtn = document.getElementsByClassName("top-btn");
    const on = [];
    const off = [];

    function Modal(num) {
        return function() {
            modalOpen[num].addEventListener("click", () => {
                modal[num].classList.toggle("show");

                if (modal[num].classList.contains("show")) {
                    body.style.overflow = "hidden";
                }
            });
        }
    }

    function Exit(num) {
        return function() {
            modal[num].addEventListener("click", (event) => {
                if (event.target === modal[num]) {
                    modal[num].classList.toggle("show");

                    if (!modal[num].classList.contains("show")) {
                        body.style.overflow = "auto";
                    }
                }
            });

            modalClose[num].addEventListener("click", () => {
                modal[num].classList.toggle("show");

                if (!modal[num].classList.contains("show")) {
                    body.style.overflow = "auto";
                }
            })
        }
    }

    for (var i = 0; i < modalOpen.length; i++) {
        on[i] = Modal(i);
        off[i] = Exit(i);
    };

    for (var j = 0; j < modalOpen.length; j++) {
        on[j]();
        off[j]();
    };

    for (let i = 0; i < topBtn.length; i++) {
        topBtn[i].onclick = function() {
            modal[i].scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }



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
    }

    function setStatus(status) {
        const error = document.getElementById("error");
        const success = document.getElementById("success");
        const okay = document.querySelector(".okay");
        const tryAgain =document.querySelector(".try-again");

        if(status == "success") {
            success.classList.add("active");
            body.style.overflow = "hidden";
            okay.addEventListener("click", () => {
                success.classList.remove("active");
                body.style.overflow = "auto";
            });
        } else {
            error.classList.add("active");
            body.style.overflow = "hidden";
            tryAgain.addEventListener("click", () => {
                error.classList.remove("active");
                body.style.overflow = "auto";
            });
        }
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
}
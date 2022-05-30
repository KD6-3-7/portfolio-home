// 모바일 nav
const buttons = document.querySelectorAll(".nav-btn");
let activeButton = document.querySelector(".nav-btn.active");

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

var active = nav.find(".active");
let pos = 0;
let wid = 0;

if(active.length) {
    pos = active.position().left; // 1920 사이즈에서는 8.5를 빼야함 원인미상
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
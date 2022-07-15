const body = document.querySelector("body");
const modal = document.getElementsByClassName("modal");
const clickOpenPopup = document.getElementsByClassName("books");
const on = [];
const off = [];

function Modal(num) {
    return function() {
        clickOpenPopup[num].addEventListener("click", () => {
            modal[num].classList.toggle("show");

            if (modal[num].classList.contains("show")) {
                body.style.overflow = "scroll"; // hidden 값을 주면 스크롤 잠금
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
    }
}

for (var i = 0; i < clickOpenPopup.length; i++) {
    on[i] = Modal(i);
    off[i] = Exit(i);
};

for (var j = 0; j < clickOpenPopup.length; j++) {
    on[j]();
    off[j]();
};
var tooltipsLeft = document.querySelectorAll('.book-text-left');
var tooltipsRight = document.querySelectorAll('.book-text-right');

window.onmousemove = function (e) {
    var x = (e.clientX + 20) + 'px',
        y = (e.clientY + 20) + 'px',
        z = (e.clientX - 630) + 'px';
    for (var i = 0; i < tooltipsLeft.length; i++) {
        tooltipsLeft[i].style.top = y;
        tooltipsLeft[i].style.left = x;
    }
    for (var j = 0; j < tooltipsRight.length; j++) {
        tooltipsRight[j].style.top = y;
        tooltipsRight[j].style.left = z;
    }
};
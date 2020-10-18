const bodyElement = document.body || document.querySelector('.body') [0];
bodyElement.insertAdjacentHTML('beforeend', '<button onclick = "topFunction()" class="upButton" title="Наверх">^</button>');
document.querySelector(".upButton").setAttribute("style", "display: none; position: fixed; bottom: 18px; right: 18px; z-index: 1000; cursor: pointer; color: #EF071E; box-shadow: 2px 2px 2px #5C087A; border-radius: 50%; font-size: 80px; width: 70px; height: 70px; padding-bottom: 10px; background: #f0e568;");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
const button = document.querySelector(".upButton");

if (document.body.scrollTop > 360 || document.documentElement.scrollTop > 360) {
    button.style.display = "block";
} else {
    button.style.display = "none";
}
}

function topFunction() { 
    document.body.scrollTop = 0; //For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
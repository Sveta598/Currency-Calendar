function currencySelection() {
    if(document.querySelector('.navigation__option1').selected === true){
        document.querySelector('.navigation__input_first').value = 170;
    }
    else if(document.querySelector('.navigation__option2').selected === true){
        document.querySelector('.navigation__input_first').value = 191;
    }
    else if(document.querySelector('.navigation__option3').selected === true){
        document.querySelector('.navigation__input_first').value = 290;
    }
    else if(document.querySelector('.navigation__option4').selected === true){
        document.querySelector('.navigation__input_first').value = 291;
    }
    else if(document.querySelector('.navigation__option5').selected === true){
        document.querySelector('.navigation__input_first').value = 145;
    }
    else if(document.querySelector('.navigation__option6').selected === true){
        document.querySelector('.navigation__input_first').value = 292;
    }
    else if(document.querySelector('.navigation__option7').selected === true){
        document.querySelector('.navigation__input_first').value = 293;
    }
    else if(document.querySelector('.navigation__option8').selected === true){
        document.querySelector('.navigation__input_first').value = 355;
    }
    else if(document.querySelector('.navigation__option9').selected === true){
        document.querySelector('.navigation__input_first').value = 303;
    }
    else if(document.querySelector('.navigation__option10').selected === true){
        document.querySelector('.navigation__input_first').value = 294;
    }
    else if(document.querySelector('.navigation__option11').selected === true){
        document.querySelector('.navigation__input_first').value = 23;
    }
    else if(document.querySelector('.navigation__option12').selected === true){
        document.querySelector('.navigation__input_first').value = 304;
    }
    else if(document.querySelector('.navigation__option13').selected === true){
        document.querySelector('.navigation__input_first').value = 72;
    }
    else if(document.querySelector('.navigation__option14').selected === true){
        document.querySelector('.navigation__input_first').value = 296;
    }
    else if(document.querySelector('.navigation__option15').selected === true){
        document.querySelector('.navigation__input_first').value = 286;
    }
    else if(document.querySelector('.navigation__option16').selected === true){
        document.querySelector('.navigation__input_first').value = 297;
    }
    else if(document.querySelector('.navigation__option17').selected === true){
        document.querySelector('.navigation__input_first').value = 298;
    }
    else if(document.querySelector('.navigation__option18').selected === true){
        document.querySelector('.navigation__input_first').value = 299;
    }
    else if(document.querySelector('.navigation__option19').selected === true){
        document.querySelector('.navigation__input_first').value = 119;
    }
    else if(document.querySelector('.navigation__option20').selected === true){
        document.querySelector('.navigation__input_first').value = 300;
    }
    else if(document.querySelector('.navigation__option21').selected === true){
        document.querySelector('.navigation__input_first').value = 301;
    }
    else if(document.querySelector('.navigation__option22').selected === true){
        document.querySelector('.navigation__input_first').value = 302;
    }
    else if(document.querySelector('.navigation__option23').selected === true){
        document.querySelector('.navigation__input_first').value = 143;
    }
    else if(document.querySelector('.navigation__option24').selected === true){
        document.querySelector('.navigation__input_first').value = 305;
    }
    else if(document.querySelector('.navigation__option25').selected === true){
        document.querySelector('.navigation__input_first').value = 306;
    }
    else {
        document.querySelector('.navigation__input_first').value = 130;
    }
}

const dayjsformat = 'YYYY-MM-DD';
const curdate1 = dayjs();

document.querySelector('.navigation__input_fourth').value = curdate1.subtract(1, 'y').format(dayjsformat).slice(0, 4);

function yearSelection () {
    if (document.querySelector('.navigation__option27').selected === true){
        document.querySelector('.navigation__input_fourth').value = curdate1.subtract(1, 'y').format(dayjsformat).slice(0, 4);
    }
    else {
        document.querySelector('.navigation__input_fourth').value = curdate1.format(dayjsformat).slice(0, 4);
    }
}

const format = 'YYYY-MM-DD';
const curdate = moment();
const currentYear = document.querySelector('.footer__curyear');
currentYear.innerHTML = moment().year();
const dayjsdateformat = 'YYYY-MM-DD';
const dayjscurrentdate = dayjs();

const endDate = dayjs().format(dayjsdateformat);

function getChart() {
    if(document.querySelector('.navigation__option1').selected === true) {
        currency = 'AUD';
    }
    else if(document.querySelector('.navigation__option2').selected === true){
        currency = 'BGN';
    }
    else if(document.querySelector('.navigation__option3').selected === true){
        currency = 'UAH';
    }
    else if(document.querySelector('.navigation__option4').selected === true){
        currency = 'DKK';
    }
    else if(document.querySelector('.navigation__option5').selected === true){
        currency = 'USD';
    }
    else if(document.querySelector('.navigation__option6').selected === true){
        currency = 'EUR';
    }
    else if(document.querySelector('.navigation__option7').selected === true){
        currency = 'PLN';
    }
    else if(document.querySelector('.navigation__option8').selected === true){
        currency = 'JPY';
    }
    else if(document.querySelector('.navigation__option9').selected === true){
        currency = 'IRR';
    }
    else if(document.querySelector('.navigation__option10').selected === true){
        currency = 'ISK';
    }
    else if(document.querySelector('.navigation__option11').selected === true){
        currency = 'CAD';
    }
    else if(document.querySelector('.navigation__option12').selected === true){
        currency = 'CNY';
    }
    else if(document.querySelector('.navigation__option13').selected === true){
        currency = 'KWD';
    }
    else if(document.querySelector('.navigation__option14').selected === true){
        currency = 'MDL';
    }
    else if(document.querySelector('.navigation__option15').selected === true){
        currency = 'NZD';
    }
    else if(document.querySelector('.navigation__option16').selected === true){
        currency = 'NOK';
    }
    else if(document.querySelector('.navigation__option17').selected === true){
        currency = 'RUB';
    }
    else if(document.querySelector('.navigation__option18').selected === true){
        currency = 'XDR';
    }
    else if(document.querySelector('.navigation__option19').selected === true){
        currency = 'SGD';
    }
    else if(document.querySelector('.navigation__option20').selected === true){
        currency = 'KGS';
    }
    else if(document.querySelector('.navigation__option21').selected === true){
        currency = 'KZT';
    }
    else if(document.querySelector('.navigation__option22').selected === true){
        currency = 'TRY';
    }
    else if(document.querySelector('.navigation__option23').selected === true){
        currency = 'GBP';
    }
    else if(document.querySelector('.navigation__option24').selected === true){
        currency = 'CZK';
    }
    else if(document.querySelector('.navigation__option25').selected === true){
        currency = 'SEK';
    }
    else {
        currency = 'CHF';
    }   

    localStorage.setItem('currency', JSON.stringify(currency));

    const curID = document.querySelector('.navigation__input_first').value;
    localStorage.setItem('curID', JSON.stringify(curID));

    if(document.querySelector('.navigation__option27').selected === true) {
        startDate = dayjscurrentdate.subtract(1,'d').format(dayjsdateformat);
    }
    else if(document.querySelector('.navigation__option28').selected === true) {
        startDate = dayjscurrentdate.subtract(7,'d').format(dayjsdateformat);
    }
    else if(document.querySelector('.navigation__option29').selected === true) {
        startDate = dayjscurrentdate.subtract(1,'M').format(dayjsdateformat);
    }    
    else {
        startDate = dayjscurrentdate.subtract(3,'M').format(dayjsdateformat);
    }

    localStorage.setItem('startDate', JSON.stringify(startDate));

    localStorage.setItem('endDate', JSON.stringify(endDate));
    
    const url = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID}?startDate=${startDate}T00:00:00&endDate=${endDate}T00:00:00`;

    const worker = new Worker('js/worker3.js');
        worker.postMessage(url);
        worker.onmessage = function(e) {
            chart (e.data.date, e.data.rate);
        }

    function chart(categories, data) {
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: `Курс ${currency} к BYN`
            },
            subtitle: {
                text: `Изменение курса ${currency}`
            },
            xAxis: {
                categories,
            },
            yAxis: {
                title: {
                        text: 'Курс валюты'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                        enableMouseTracking: false
                }
            },
            series: [{
                    name: `${currency}`,
                    data,
                }] 
        });

    localStorage.setItem('Date', JSON.stringify(categories));
    localStorage.setItem('Cur_OfficialRate', JSON.stringify(data));
        
    }
}

getChart();
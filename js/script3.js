const currencyUrl2 = 'https://www.nbrb.by/api/exrates/currencies';

const worker = new Worker('js/worker3.js');
worker.postMessage(currencyUrl2)
worker.onmessage = function(e) {
    getOptions (e.data);
    worker.terminate();
}

const worker1 = new Worker('js/worker4.js');
worker1.onmessage = function(e) {
    chart (e.data.date, e.data.rate);
}

function getOptions(currencyData) {

    let key;

    const currencyObj = {};

    for (let i = 0; i < currencyData.length; i++) {
        const abbr = currencyData[i].Cur_Abbreviation;

        if (!currencyObj[abbr]) {
            currencyObj[abbr] = {
                Cur_Abbreviation: abbr,
                payload: [],
            }
        }

        currencyObj[abbr].payload.push({
            Cur_ID: currencyData[i].Cur_ID,
            Cur_DateStart: currencyData[i].Cur_DateStart,
            Cur_DateEnd: currencyData[i].Cur_DateEnd,
        });
    }

    if (localStorage.getItem('currencyObject') !== null) {
        JSON.parse(localStorage.getItem('currencyObject'));
    } else {
        localStorage.setItem('currencyObject', JSON.stringify(currencyObj));
    }

    const currencyArr = Object.values(currencyObj);

    let options = '';

    const temp = document.querySelector('.navigation__selectionVariants');
    const item = temp.content.querySelector('.navigation__currencyOption');

    for (key in currencyArr) {

        currencyArr.sort(function(a, b){
            if(a.Cur_Abbreviation < b.Cur_Abbreviation) { return -1; }
            if(a.Cur_Abbreviation > b.Cur_Abbreviation) { return 1; }
            return 0;
        })

        options = currencyArr[key].Cur_Abbreviation;
        const copyHTML = document.importNode(item, true);
        copyHTML.textContent = options;
        document.querySelector('.navigation__selection1').appendChild(copyHTML);
    }

    if (localStorage.getItem('currencyArray') !== null) {
        JSON.parse(localStorage.getItem('currencyArray'));
    } else {
        localStorage.setItem('currencyArray', JSON.stringify(currencyArr));
    }
}

const dateFormat = ('YYYY-MM-DD');
const currentDate = dayjs().format(dateFormat);
document.querySelector('.navigation__input_first').max = currentDate;
document.querySelector('.navigation__input_second').max = currentDate;

function getChart () {
    const cur = valuta.value;
    const startDate = startDateId.value;
    const endDate = endDateId.value;

    let currencies = localStorage.getItem('currencyObject');
    if (!currencies) {
        throw 'currencyObj not setted';
        return;
    } else {
        currencies = JSON.parse(currencies);
    }

    /*console.log(currencies);*/

    const curObj = currencies[cur];
    const urlArray = [];
    const newArray = curObj.payload;
    for (let i = 0; i < newArray.length; i++) {
        const curID = newArray[i].Cur_ID;
        const curDataStart = newArray[i].Cur_DateStart;
        const curDataEnd = newArray[i].Cur_DateEnd;
        const url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID}?startDate=${startDate}T00:00:00&endDate=${endDate}T00:00:00`;
        urlArray.push(url1);
        const url2 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID}?startDate=${startDate}T00:00:00&endDate=${curDataEnd}T00:00:00`;
        urlArray.push(url2);
        const url3 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID}?startDate=${curDataStart}T00:00:00&endDate=${endDate}T00:00:00`;
        urlArray.push(url3)
        const url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID}?startDate=${curDataStart}T00:00:00&endDate=${curDataEnd}T00:00:00`;
        urlArray.push(url4);


        worker1.postMessage(urlArray);
    }






    /*
    * 1. разделить по промежуткам связанным с id
    * 2. разделить по промежуткам связанным с ограничением на период в 1 год
    * */

    /*worker1.postMessage({cur, startDate, endDate});*/
}

function chart(categories, data) {
    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: `Курс валюты к BYN`
        },
        subtitle: {
            text: `Изменение курса выбранной валюты за выбранный период`
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
            name: `Динамика валютного курса`,
            data,
        }]
    });
}

const currentYear = document.querySelector('.footer__curyear');
currentYear.innerHTML = dayjs().year();

if (localStorage.getItem('currenctYear') !== null) {
    JSON.parse(localStorage.getItem('currentYear'));
} else {
    localStorage.setItem('currenctYear', JSON.stringify(currentYear.innerHTML));
}

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
const currentDateSubtract = dayjs().subtract(1, 'd').format(dateFormat);
document.querySelector('.navigation__input_first').max = currentDateSubtract;
document.querySelector('.navigation__input_second').max = currentDate;

function getChart () {
    const cur = valuta.value;
    let startDate = startDateId.value;
    let endDate = endDateId.value;

    let currencies = localStorage.getItem('currencyObject');
    if (!currencies) {
        throw 'currencyObj not setted';
        return;
    } else {
        currencies = JSON.parse(currencies);
    }

    const curObj = currencies[cur];
    const newArray = curObj.payload;
    const periodArr = [];
    
    for (let i = 0; i < newArray.length; i++) {
    
        const period = curObj.payload[i];
        
        if (startDate > period.Cur_DateEnd.slice(0, 10)) { continue; }

        const range = dayjs(endDate).diff(startDate, 'year');

        let endD = '';
        //если curId не менялся
        if (curObj.payload.length === 1) {
            startDate = startDateId.value;
            endD = endDate;
        }
        //если curId менялся
        else {
            if (endDate <= period.Cur_DateEnd.slice(0, 10)) {
                endD = endDate;
                if (startDate >= curObj.payload[i].Cur_DateStart) {
                    startDate = startDateId.value;
                } else {
                    startDate = curObj.payload[i].Cur_DateStart.slice(0, 10);
                }
            } else {
                 endD = period.Cur_DateEnd.slice(0, 10);
                 startDate = startDateId.value;
            }
        }

        //если длина запрашиваемого периода больше года
        if (range >= 1) {
            //если длина менее 2 лет
            if (range < 2) {
                if(endD > period.Cur_DateEnd.slice(0, 10)) {
                    endD = period.Cur_DateEnd.slice(0, 10);
                }

                endD = dayjs(startDate).add(1, 'y').subtract(1, 'd').format(dateFormat);
    
                periodArr.push({
                    curId: period.Cur_ID,
                    startDate,
                    endDate: endD,
                    
                });

                if (endD === dayjs(startDate).add(1, 'y').subtract(1, 'd').format(dateFormat)) {
                    startDate5 = dayjs(startDate).add(1, 'y').format(dateFormat);
                    if (endDate > period.Cur_DateEnd.slice(0, 10)) {
                        endDate = period.Cur_DateEnd.slice(0, 10);
                    }

                    periodArr.push({
                        curId: period.Cur_ID,
                        startDate: startDate5,
                        endDate: endDate,
                    });
                }
            }
            //если длина более 2 лет
            else {
                if(endD > period.Cur_DateEnd.slice(0, 10)) {
                    endD = period.Cur_DateEnd.slice(0, 10);
                }

                endD = dayjs(startDate).add(1, 'y').subtract(1, 'd').format(dateFormat);
        
                periodArr.push({
                    curId: period.Cur_ID,
                    startDate,
                    endDate: endD,
                    
                });

                if (endD === dayjs(startDate).add(1, 'y').subtract(1, 'd').format(dateFormat)) {
                    for (let k = 1; k < range; k++) {
                        startDate2 = dayjs(startDate).add(k, 'y').format(dateFormat);
                        endD2 = dayjs(startDate2).add(1, 'y').subtract(1, 'd').format(dateFormat);

                        if(endD2 > period.Cur_DateEnd.slice(0, 10)) {
                            endD2 = period.Cur_DateEnd.slice(0, 10);
                        }

                        periodArr.push({
                            curId: period.Cur_ID,
                            startDate: startDate2,
                            endDate: endD2,
                        });
                    }
                }
            
             
                if (endD2 = dayjs(startDate2).add(1, 'y').subtract(1, 'd').format(dateFormat)) {
                    startDate3 = dayjs(endD2).add(1, 'd').format(dateFormat);

                    if(endDate > period.Cur_DateEnd.slice(0, 10)) {
                        endDate = period.Cur_DateEnd.slice(0, 10);
                    }
                    
                    periodArr.push({
                        curId: period.Cur_ID,
                        startDate: startDate3,
                        endDate: endDate,
                    
                    });
                }
            }
        }
        //если длина запрашиваемого периода меньше года
        else {
            periodArr.push({
                curId: period.Cur_ID,
                startDate,
                endDate: endD,
                    
            });
        }

       if (endDate <= period.Cur_DateEnd.slice(0, 10)) { break; }
       
    }
    
    console.log(periodArr);
    
    /*
    * 1. разделить по промежуткам связанным с id
    * 2. разделить по промежуткам связанным с ограничением на период в 1 год
    * */

   worker1.postMessage(periodArr);
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
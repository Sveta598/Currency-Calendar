const currencyUrl2 = 'https://www.nbrb.by/api/exrates/currencies';

const worker2 = new Worker('js/todayRateWorker.js');
worker2.postMessage('do something');
worker2.addEventListener('message', function(event) {
    getContent(event.data);   
});   

const worker = new Worker('js/curObjWorker.js');
worker.postMessage(currencyUrl2)
worker.onmessage = function(e) {
    getOptions (e.data);
    worker.terminate();
}

const worker1 = new Worker('js/chartDrawWorker.js');
worker1.onmessage = function(e) {
    saveToLocalStorage ();
    chart (e.data.date, e.data.rate);
    drawMovingAverage (e.data.date, e.data.rate);
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

    document.querySelector('.navigation__selection1').selectedIndex = 101;

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
document.querySelector('.navigation__input_first').value = currentDateSubtract;
document.querySelector('.navigation__input_second').value = currentDate;

function getChart () {
    const cur = valuta.value;
    const startDate = startDateId.value;
    const endDate = endDateId.value;

    localStorage.setItem('startDate', JSON.stringify(startDate));
    localStorage.setItem('endDate', JSON.stringify(endDate));

    let currencies = localStorage.getItem('currencyObject');
    if (!currencies) {
        throw 'currencyObj not setted';
        return;
    } else {
        currencies = JSON.parse(currencies);
    }

    const curObj = currencies[cur];
    const newArray = curObj.payload;
    const urlArr = [];

    for (let period = 0; period < newArray.length; period += 1) {
        
      if (startDate > newArray[period].Cur_DateEnd) { continue; }

      const iSD = startDate > newArray[period].Cur_DateStart ? startDate : newArray[period].Cur_DateStart;
      const iED = endDate < newArray[period].Cur_DateEnd ? endDate : newArray[period].Cur_DateEnd;

      const startYear = Number(dayjs(iSD).format('YYYY'));
      const endYear = Number(dayjs(iED).format('YYYY'));

      for (let year = startYear; year <= endYear; year += 1) {
        const begin = year === startYear ? dayjs(iSD).format('YYYY-MM-DD'): `${year}-01-01`;
        const end = year === endYear ? dayjs(iED).format('YYYY-MM-DD') : `${year}-12-31`;

        urlArr.push(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${newArray[period].Cur_ID}?startDate=${begin}T00:00:00&endDate=${end}T00:00:00`)
      }
    }

   worker1.postMessage(urlArr);
}

function drawMovingAverage (categories, data) {
    let startPoint = localStorage.getItem('startDate');
    let endPoint = localStorage.getItem('endDate');
  
    if (document.querySelector('.navigation__selection2').selectedIndex === 1) {
        const dateArray1 = [];
        const quoteArray1 = [];
        const rangeForCount = dayjs(endPoint).diff(startPoint, 'month');
        const monthStart1 = dayjs(startPoint).startOf('month').format(dateFormat);
        const monthEnd1 = dayjs(startPoint).endOf('month').format(dateFormat);
        const monthEnd1Add = dayjs(monthEnd1).add(1, 'd').format(dateFormat);
        const rangeForSlice1 = dayjs(monthEnd1Add).diff(startPoint, 'day');
        const month1Quotes = data.slice(0, rangeForSlice1);
        const interval1Sum = month1Quotes.reduce((a, b) => a + b, 0);
        const interval1AvgQuote = interval1Sum / month1Quotes.length;
        const interval1AvgQuoteShort = JSON.stringify(interval1AvgQuote).slice(0, 5);
        const shortNumber1 = Number(interval1AvgQuoteShort);
        quoteArray1.push(shortNumber1);
        const chartDate1 = dayjs(startPoint).format('YYYY-MM');
        dateArray1.push(chartDate1);
       
        for (let i = 1; i < rangeForCount; i++) {
            const monthStart2 = dayjs(monthStart1).add(i, 'M').format(dateFormat);
            const monthEnd2 = dayjs(monthEnd1).add(i, 'M').format(dateFormat);
            const monthEnd2Add = dayjs(monthEnd2).add(1, 'd').format(dateFormat);
            const range11 = dayjs(monthStart2).diff(monthStart1, 'day');
            const range12 = dayjs(monthEnd2Add).diff(monthStart2, 'day');
            const range13 = range11 + range12;
            const range14 = dayjs(startPoint).diff(monthStart1, 'day');
            const range15 = range11 - range14;
            const range16 = range13 - range14;
            const month2Quotes = data.slice(range15, range16);
            const interval2Sum = month2Quotes.reduce((a, b) => a + b, 0);
            const interval2AvgQuote = interval2Sum / month2Quotes.length;
            const interval2AvgQuoteShort = JSON.stringify(interval2AvgQuote).slice(0, 5);
            const shortNumber2 = Number(interval2AvgQuoteShort);
            quoteArray1.push(shortNumber2);
            const chartDate2 = dayjs(monthStart2).format('YYYY-MM');
            dateArray1.push(chartDate2);
        }
        
        const monthStart3 = dayjs(endPoint).startOf('month').format(dateFormat);
        const endPointAdd = dayjs(endPoint).add(1, 'd').format(dateFormat);
        const rangeForSlice2 = dayjs(endPointAdd).diff(monthStart3, 'day');
        const month3Quotes = data.slice(-rangeForSlice2);
        const interval3Sum = month3Quotes.reduce((a, b) => a + b, 0);
        const interval3AvgQuote = interval3Sum / month3Quotes.length;
        const interval3AvgQuoteShort = JSON.stringify(interval3AvgQuote).slice(0, 5);
        const shortNumber3 = Number(interval3AvgQuoteShort);
        quoteArray1.push(shortNumber3);
        const chartDate3 = dayjs(endPoint).format('YYYY-MM');
        dateArray1.push(chartDate3);

        chart(dateArray1, quoteArray1);
    }

    else if (document.querySelector('.navigation__selection2').selectedIndex === 2) {
        const dateArray2 = [];
        const quoteArray2 = [];
        const rangeCount = dayjs(endPoint).diff(startPoint, 'year');
        const yearStart1 = dayjs(startPoint).startOf('year').format(dateFormat);
        const yearEnd1 = dayjs(startPoint).endOf('year').format(dateFormat);
        const yearEnd1Add = dayjs(yearEnd1).add(1, 'd').format(dateFormat);
        const rangeForSlice1 = dayjs(yearEnd1Add).diff(startPoint, 'day');
        const year1Quotes = data.slice(0, rangeForSlice1);
        const interval1Sum = year1Quotes.reduce((a, b) => a + b, 0);
        const interval1AvgQuote = interval1Sum / year1Quotes.length;
        const interval1AvgQuoteShort = JSON.stringify(interval1AvgQuote).slice(0, 5);
        const shortNumber1 = Number(interval1AvgQuoteShort);
        quoteArray2.push(shortNumber1);
        const chartDate1 = dayjs(startPoint).format('YYYY');
        dateArray2.push(chartDate1);

        for (let j = 1; j < rangeCount; j++) {
            const yearStart2 = dayjs(yearStart1).add(j, 'y').format(dateFormat);
            const yearEnd2 = dayjs(yearEnd1).add(j, 'y').format(dateFormat);
            const yearEnd2Add = dayjs(yearEnd2).add(1, 'd').format(dateFormat);
            const range11 = dayjs(yearStart2).diff(yearStart1, 'day');
            const range12 = dayjs(yearEnd2Add).diff(yearStart2, 'day');
            const range13 = range11 + range12;
            const range14 = dayjs(startPoint).diff(yearStart1, 'day');
            const range15 = range11 - range14;
            const range16 = range13 - range14;
            const year2Quotes = data.slice(range15, range16);
            const interval2Sum = year2Quotes.reduce((a, b) => a + b, 0);
            const interval2AvgQuote = interval2Sum / year2Quotes.length;
            const interval2AvgQuoteShort = JSON.stringify(interval2AvgQuote).slice(0, 5);
            const shortNumber2 = Number(interval2AvgQuoteShort);
            quoteArray2.push(shortNumber2);
            const chartDate2 = dayjs(yearStart2).format('YYYY');
            dateArray2.push(chartDate2);
        }

        const yearStart3 = dayjs(endPoint).startOf('year').format(dateFormat);
        const endPointAdd = dayjs(endPoint).add(1, 'd').format(dateFormat);
        const rangeForSlice2 = dayjs(endPointAdd).diff(yearStart3, 'day');
        const year3Quotes = data.slice(-rangeForSlice2);
        const interval3Sum = year3Quotes.reduce((a, b) => a + b, 0);
        const interval3AvgQuote = interval3Sum / year3Quotes.length;
        const interval3AvgQuoteShort = JSON.stringify(interval3AvgQuote).slice(0, 5);
        const shortNumber3 = Number(interval3AvgQuoteShort);
        quoteArray2.push(shortNumber3);
        const chartDate3 = dayjs(endPoint).format('YYYY');
        dateArray2.push(chartDate3);

        chart(dateArray2, quoteArray2);
    }
}

function getContent(content) {
    localStorage.setItem('content', JSON.stringify(content));
} 

function saveToLocalStorage () {
    let keyCurrencies = JSON.parse(localStorage.getItem('content'));
    const abbr = valuta.value;
    for (let i = 0; i < keyCurrencies.length; i++) {
        const id = keyCurrencies[i].Cur_ID;
        localStorage.setItem('id', JSON.stringify(id));
        if (abbr === keyCurrencies[i].Cur_Abbreviation) {
            if (localStorage.getItem(`${abbr} daily dates`) !== null 
            && localStorage.getItem(`${abbr} daily quotes`) !== null) {
                JSON.parse(localStorage.getItem(`${abbr} daily dates`));
                JSON.parse(localStorage.getItem(`${abbr} daily quotes`));
            } 
            else {
                getResponse();
            }
        }
    }
}

async function getResponse() {
    const abbr = valuta.value;
    const yearAgo = dayjs().subtract(1, 'y').add(1, 'd').format(dateFormat);
    let id = JSON.parse(localStorage.getItem('id'));
    const response = await fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${id}?startDate=${yearAgo}T00:00:00&endDate=${currentDate}T00:00:00`);
    const content = await response.json();
    const categories = content.map(el => el.Date.slice(0, 10));
    localStorage.setItem(`${abbr} daily dates`, JSON.stringify(categories));
    const data = content.map(el => el.Cur_OfficialRate);
    localStorage.setItem(`${abbr} daily quotes`, JSON.stringify(data));
}

function chart(categories, data) {
    const curAbbr = valuta.value;

    let curList = localStorage.getItem('currencyObject');
    if (!curList) {
        throw 'curList not setted';
        return;
    } else {
        curList = JSON.parse(curList);
    }

    const currencyItem = curList[curAbbr];
    const currencyName = currencyItem.Cur_Abbreviation;
    
    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: `Курс ${currencyName} к BYN`
        },
        subtitle: {
            text: `Изменение курса ${currencyName} за выбранный период`
        },
        xAxis: {
            categories,
        },
        yAxis: {
            title: {
            text: `Курс ${currencyName}`
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
            name: `Динамика курса ${currencyName}`,
            data,
        }]
    });
}

const currentYear = document.querySelector('.footer__curyear');
currentYear.innerHTML = dayjs().year();

if (localStorage.getItem('currentYear') !== null) {
    JSON.parse(localStorage.getItem('currentYear'));
} else {
    localStorage.setItem('currentYear', JSON.stringify(currentYear.innerHTML));
}
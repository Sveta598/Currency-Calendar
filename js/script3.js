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
    const startDate = document.querySelector('.navigation__input_first').value;
    const endDate = document.querySelector('.navigation__input_second').value;
    const dayjsStartDate = dayjs(startDate).format(dateFormat);
    const dayjsEndDate = dayjs(endDate).format(dateFormat);
    const globalArray = JSON.parse(localStorage.getItem('currencyArray'));
    const readyUrlArray = [];
    let range = 0;
    let range2 = 0;
    let range3 = 0;
    let range4 = 0;
    let date1 = '';
    let date2 = '';
    let date3 = '';
    let date4 = '';
    let date5 = '';
    let date6 = '';
    let date7 = '';
    let date8 = '';
    let date9 = '';
    let date10 = '';
    let date11 = '';
    let date12 = '';
    let date13 = '';
    let date14 = '';
    let date15 = '';
    let date16 = '';
    let url1 = ``;
    let url2 = ``;
    let url3 = ``;
    let url4 = ``;
    let url5 = ``;
    let url6 = ``;
    let url7 = ``;
    let url8 = ``;
    let url9 = ``;
    let url10 = ``;
    let url11 = ``;
    let url12 = ``;
    for (let i = 0; i < globalArray.length; i++) {
        document.querySelector('.navigation__selection1').value = globalArray[i].Cur_Abbreviation;
        //максимальное количество временных промежутков действия curID - 4
        for (let j = 0; j < globalArray[i].payload.length; j++) {
            //если у валюты только один временной промежуток или и начальная и конечная даты отображения
            //находятся в первом промежутке 
            const curID1 = globalArray[i].payload[0].Cur_ID;
            const curDataEnd1 = globalArray[i].payload[0].Cur_DateEnd.slice(0, 10);
            const dayjsCurDataEnd1 = dayjs(curDataEnd1).format(dateFormat);
            if (dayjsStartDate.isBefore(dayjsCurDataEnd1.add(1, 'd')) && dayjsEndDate.isBefore(dayjsCurDataEnd1.add(1, 'd'))) {
                range = dayjsEndDate.diff(dayjsStartDate, 'year', true);
                //если длина запрашиваемого периода больше 1 года или равна 1 году
                if (range >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date1 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${startDate}T00:00:00&endDate=${date1}T00:00:00`;
                        readyUrlArray.push(url1);
                        date2 = startDate.add(k, 'y').format(dateFormat);
                        date3 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url2 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${date2}T00:00:00&endDate=${date3}T00:00:00`;
                        readyUrlArray.push(url2);
                        date4 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url3 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${date4}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url3);
                    }
                }
                //если длина запрашиваемого периода меньше 1 года 
                else {
                    url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${startDate}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url1);
                }
            }
            //нужно использовать второй промежуток
            //если начальная дата отображения находится в первом промежутке, а конечная - во втором
            const curID2 = globalArray[i].payload[1].Cur_ID;
            const curDataStart2 = globalArray[i].payload[1].Cur_DateStart.slice(0, 10);
            const curDataEnd2 = globalArray[i].payload[1].Cur_DateEnd.slice(0, 10);
            const dayjsCurDataStart2 = dayjs(curDataStart2).format(dateFormat);
            const dayjsCurDataEnd2 = dayjs(curDataEnd2).format(dateFormat);
            if (dayjsStartDate.isBefore(dayjsCurDataEnd1.add(1, 'd')) && dayjsEndDate.isAfter(dayjsCurDataEnd1) && dayjsEndDate.isBefore(dayjsCurDataEnd2.add(1, 'd'))) {
                //часть запрашиваемого периода, находящаяся в первом промежутке
                range = dayjsCurDataEnd1.diff(dayjsStartDate, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date1 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${startDate}T00:00:00&endDate=${date1}T00:00:00`;
                        readyUrlArray.push(url1);
                        date2 = startDate.add(k, 'y').format(dateFormat);
                        date3 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url2 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${date2}T00:00:00&endDate=${date3}T00:00:00`;
                        readyUrlArray.push(url2);
                        date4 = curDataEnd1.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url3 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${date4}T00:00:00&endDate=${curDataEnd1}T00:00:00`;
                        readyUrlArray.push(url3);
                    }
                }
                 //если длина этой части запрашиваемого периода меньше 1 года 
                 else {
                    url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${startDate}T00:00:00&endDate=${curDataEnd1}T00:00:00`;
                    readyUrlArray.push(url1);
                }
                //часть запрашиваемого периода, находящаяся во втором промежутке
                range2 = dayjsEndDate.diff(dayjsCurDataStart2, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range2 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date5 = curDataStart2.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${curDataStart2}T00:00:00&endDate=${date5}T00:00:00`;
                        readyUrlArray.push(url4);
                        date6 = curDataStart2.add(k, 'y').format(dateFormat);
                        date7 = curDataStart2.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url5 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date6}T00:00:00&endDate=${date7}T00:00:00`;
                        readyUrlArray.push(url5);
                        date8 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url6 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date8}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url6);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${curDataStart2}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url4);
                }
            }
            //если и начальная, и конечная дата отображения находятся во втором промежутке
            if (dayjsStartDate.isAfter(dayjsCurDataStart2.subtract(1, 'd')) && dayjsStartDate.isBefore(dayjsCurDataEnd2.add(1, 'd')) && dayjsEndDate.isBefore(dayjsCurDataEnd2.add(1, 'd'))) {
                range = dayjsEndDate.diff(dayjsStartDate, 'year', true);
                //если длина запрашиваемого периода больше 1 года или равна 1 году
                if (range >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date1 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${startDate}T00:00:00&endDate=${date1}T00:00:00`;
                        readyUrlArray.push(url1);
                        date2 = startDate.add(k, 'y').format(dateFormat);
                        date3 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url2 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date2}T00:00:00&endDate=${date3}T00:00:00`;
                        readyUrlArray.push(url2);
                        date4 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url3 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date4}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url3);
                    }
                }
                //если длина запрашиваемого периода меньше 1 года 
                else {
                    url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${startDate}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url1);
                }
            }
            //нужно использовать третий промежуток
            //если начальная дата отображения находится в первом промежутке, а конечная - в третьем
            const curID3 = globalArray[i].payload[2].Cur_ID;
            const curDataStart3 = globalArray[i].payload[2].Cur_DateStart.slice(0, 10);
            const curDataEnd3 = globalArray[i].payload[2].Cur_DateEnd.slice(0, 10);
            const dayjsCurDataStart3 = dayjs(curDataStart3).format(dateFormat);
            const dayjsCurDataEnd3 = dayjs(curDataEnd3).format(dateFormat);
            if (dayjsStartDate.isBefore(dayjsCurDataEnd1.add(1, 'd')) && dayjsEndDate.isAfter(dayjsCurDataEnd2) && dayjsEndDate.isBefore(dayjsCurDataEnd3.add(1, 'd'))) {
                //часть запрашиваемого периода, находящаяся в первом промежутке
                range = dayjsCurDataEnd1.diff(dayjsStartDate, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date1 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${startDate}T00:00:00&endDate=${date1}T00:00:00`;
                        readyUrlArray.push(url1);
                        date2 = startDate.add(k, 'y').format(dateFormat);
                        date3 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url2 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${date2}T00:00:00&endDate=${date3}T00:00:00`;
                        readyUrlArray.push(url2);
                        date4 = curDataEnd1.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url3 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${date4}T00:00:00&endDate=${curDataEnd1}T00:00:00`;
                        readyUrlArray.push(url3);
                    }
                }
                 //если длина этой части запрашиваемого периода меньше 1 года 
                 else {
                    url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${startDate}T00:00:00&endDate=${curDataEnd1}T00:00:00`;
                    readyUrlArray.push(url1);
                }
                //часть запрашиваемого периода, находящаяся во втором промежутке
                range2 = dayjsCurDataEnd2.diff(dayjsCurDataStart2, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range2 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date5 = curDataStart2.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${curDataStart2}T00:00:00&endDate=${date5}T00:00:00`;
                        readyUrlArray.push(url4);
                        date6 = curDataStart2.add(k, 'y').format(dateFormat);
                        date7 = curDataStart2.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url5 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date6}T00:00:00&endDate=${date7}T00:00:00`;
                        readyUrlArray.push(url5);
                        date8 = curDataEnd2.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url6 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date8}T00:00:00&endDate=${curDataEnd2}T00:00:00`;
                        readyUrlArray.push(url6);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${curDataStart2}T00:00:00&endDate=${curDataEnd2}T00:00:00`;
                    readyUrlArray.push(url4);
                }
                //часть запрашиваемого периода, находящаяся в третьем промежутке
                range3 = dayjsEndDate.diff(dayjsCurDataStart3, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range3 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date9 = curDataStart3.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${curDataStart3}T00:00:00&endDate=${date9}T00:00:00`;
                        readyUrlArray.push(url7);
                        date10 = curDataStart3.add(k, 'y').format(dateFormat);
                        date11 = curDataStart3.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url8 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date10}T00:00:00&endDate=${date11}T00:00:00`;
                        readyUrlArray.push(url8);
                        date12 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url9 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date12}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url9);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${curDataStart3}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url7);
                }
            }
            //если начальная дата отображения находится во втором промежутке, а конечная - в третьем
            if (dayjsStartDate.isAfter(dayjsCurDataStart2.subtract(1, 'd')) && dayjsStartDate.isBefore(dayjsCurDataEnd2.add(1, 'd')) && dayjsEndDate.isAfter(dayjsCurDataEnd2) && dayjsEndDate.isBefore(dayjsCurDataEnd3.add(1, 'd'))) {
                //часть запрашиваемого периода, находящаяся во втором промежутке
                range2 = dayjsCurDataEnd2.diff(dayjsStartDate, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range2 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date5 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${startDate}T00:00:00&endDate=${date5}T00:00:00`;
                        readyUrlArray.push(url4);
                        date6 = startDate.add(k, 'y').format(dateFormat);
                        date7 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url5 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date6}T00:00:00&endDate=${date7}T00:00:00`;
                        readyUrlArray.push(url5);
                        date8 = curDataEnd2.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url6 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date8}T00:00:00&endDate=${curDataEnd2}T00:00:00`;
                        readyUrlArray.push(url6);
                    }
                }
                 //если длина этой части запрашиваемого периода меньше 1 года 
                 else {
                    url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${startDate}T00:00:00&endDate=${curDataEnd2}T00:00:00`;
                    readyUrlArray.push(url4);
                }
                //часть запрашиваемого периода, находящаяся в третьем промежутке
                range3 = dayjsEndDate.diff(dayjsCurDataStart3, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range3 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date9 = curDataStart3.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${curDataStart3}T00:00:00&endDate=${date9}T00:00:00`;
                        readyUrlArray.push(url7);
                        date10 = curDataStart3.add(k, 'y').format(dateFormat);
                        date11 = curDataStart3.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url8 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date10}T00:00:00&endDate=${date11}T00:00:00`;
                        readyUrlArray.push(url8);
                        date12 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url9 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date12}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url9);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${curDataStart3}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url7);
                }
            }
            //если и начальная, и конечная дата отображения находятся в третьем промежутке
            if (dayjsStartDate.isAfter(dayjsCurDataStart3.subtract(1, 'd')) && dayjsStartDate.isBefore(dayjsCurDataEnd3.add(1, 'd')) && dayjsEndDate.isAfter(dayjsCurDataStart3.subtract(1, 'd')) && dayjsEndDate.isBefore(dayjsCurDataEnd3.add(1, 'd'))) {
                range3 = dayjsEndDate.diff(dayjsStartDate, 'year', true);
                //если длина запрашиваемого периода больше 1 года или равна 1 году
                if (range3 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date9 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${startDate}T00:00:00&endDate=${date9}T00:00:00`;
                        readyUrlArray.push(url7);
                        date10 = startDate.add(k, 'y').format(dateFormat);
                        date11 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url8 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date10}T00:00:00&endDate=${date11}T00:00:00`;
                        readyUrlArray.push(url8);
                        date12 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url9 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date12}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url9);
                    }
                }
                //если длина запрашиваемого периода меньше 1 года 
                else {
                    url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${startDate}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url7);
                }
            }
            //нужно использовать четвертый промежуток
            //если начальная дата отображения находится в первом промежутке, а конечная - в четвертом
            const curID4 = globalArray[i].payload[3].Cur_ID;
            const curDataStart4 = globalArray[i].payload[3].Cur_DateStart.slice(0, 10);
            const curDataEnd4 = globalArray[i].payload[3].Cur_DateEnd.slice(0, 10);
            const dayjsCurDataStart4 = dayjs(curDataStart4).format(dateFormat);
            const dayjsCurDataEnd4 = dayjs(curDataEnd4).format(dateFormat);
            if (dayjsStartDate.isBefore(dayjsCurDataEnd1.add(1, 'd')) && dayjsEndDate.isAfter(dayjsCurDataEnd3)) {
                //часть запрашиваемого периода, находящаяся в первом промежутке
                range = dayjsCurDataEnd1.diff(dayjsStartDate, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date1 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${startDate}T00:00:00&endDate=${date1}T00:00:00`;
                        readyUrlArray.push(url1);
                        date2 = startDate.add(k, 'y').format(dateFormat);
                        date3 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url2 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${date2}T00:00:00&endDate=${date3}T00:00:00`;
                        readyUrlArray.push(url2);
                        date4 = curDataEnd1.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url3 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${date4}T00:00:00&endDate=${curDataEnd1}T00:00:00`;
                        readyUrlArray.push(url3);
                    }
                }
                 //если длина этой части запрашиваемого периода меньше 1 года 
                 else {
                    url1 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID1}?startDate=${startDate}T00:00:00&endDate=${curDataEnd1}T00:00:00`;
                    readyUrlArray.push(url1);
                }
                //часть запрашиваемого периода, находящаяся во втором промежутке
                range2 = dayjsCurDataEnd2.diff(dayjsCurDataStart2, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range2 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date5 = curDataStart2.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${curDataStart2}T00:00:00&endDate=${date5}T00:00:00`;
                        readyUrlArray.push(url4);
                        date6 = curDataStart2.add(k, 'y').format(dateFormat);
                        date7 = curDataStart2.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url5 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date6}T00:00:00&endDate=${date7}T00:00:00`;
                        readyUrlArray.push(url5);
                        date8 = curDataEnd2.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url6 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date8}T00:00:00&endDate=${curDataEnd2}T00:00:00`;
                        readyUrlArray.push(url6);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${curDataStart2}T00:00:00&endDate=${curDataEnd2}T00:00:00`;
                    readyUrlArray.push(url4);
                }
                //часть запрашиваемого периода, находящаяся в третьем промежутке
                range3 = dayjsCurDataEnd3.diff(dayjsCurDataStart3, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range3 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date9 = curDataStart3.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${curDataStart3}T00:00:00&endDate=${date9}T00:00:00`;
                        readyUrlArray.push(url7);
                        date10 = curDataStart3.add(k, 'y').format(dateFormat);
                        date11 = curDataStart3.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url8 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date10}T00:00:00&endDate=${date11}T00:00:00`;
                        readyUrlArray.push(url8);
                        date12 = curDataEnd3.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url9 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date12}T00:00:00&endDate=${curDataEnd3}T00:00:00`;
                        readyUrlArray.push(url9);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${curDataStart3}T00:00:00&endDate=${curDataEnd3}T00:00:00`;
                    readyUrlArray.push(url7);
                }
                //часть запрашиваемого периода, находящаяся в четвертом промежутке
                range4 = dayjsEndDate.diff(dayjsCurDataStart4, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range4 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date13 = curDataStart4.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url10 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${curDataStart4}T00:00:00&endDate=${date13}T00:00:00`;
                        readyUrlArray.push(url10);
                        date14 = curDataStart4.add(k, 'y').format(dateFormat);
                        date15 = curDataStart4.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url11 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${date14}T00:00:00&endDate=${date15}T00:00:00`;
                        readyUrlArray.push(url11);
                        date16 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url12 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${date16}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url12);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url10 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${curDataStart4}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url10);
                }
            }
            //если начальная дата отображения находится во втором промежутке, а конечная - в четвертом
            if (dayjsStartDate.isAfter(dayjsCurDataStart2.subtract(1, 'd')) && dayjsStartDate.isBefore(dayjsCurDataEnd2.add(1, 'd')) && dayjsEndDate.isAfter(dayjsCurDataEnd3)) {
                //часть запрашиваемого периода, находящаяся во втором промежутке
                range2 = dayjsCurDataEnd2.diff(dayjsStartDate, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range2 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date5 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${startDate}T00:00:00&endDate=${date5}T00:00:00`;
                        readyUrlArray.push(url4);
                        date6 = startDate.add(k, 'y').format(dateFormat);
                        date7 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url5 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date6}T00:00:00&endDate=${date7}T00:00:00`;
                        readyUrlArray.push(url5);
                        date8 = curDataEnd2.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url6 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${date8}T00:00:00&endDate=${curDataEnd2}T00:00:00`;
                        readyUrlArray.push(url6);
                    }
                }
                 //если длина этой части запрашиваемого периода меньше 1 года 
                 else {
                    url4 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID2}?startDate=${startDate}T00:00:00&endDate=${curDataEnd2}T00:00:00`;
                    readyUrlArray.push(url4);
                }
                //часть запрашиваемого периода, находящаяся в третьем промежутке
                range3 = dayjsCurDataEnd3.diff(dayjsCurDataStart3, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range3 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date9 = curDataStart3.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${curDataStart3}T00:00:00&endDate=${date9}T00:00:00`;
                        readyUrlArray.push(url7);
                        date10 = curDataStart3.add(k, 'y').format(dateFormat);
                        date11 = curDataStart3.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url8 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date10}T00:00:00&endDate=${date11}T00:00:00`;
                        readyUrlArray.push(url8);
                        date12 = curDataEnd3.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url9 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date12}T00:00:00&endDate=${curDataEnd3}T00:00:00`;
                        readyUrlArray.push(url9);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${curDataStart3}T00:00:00&endDate=${curDataEnd3}T00:00:00`;
                    readyUrlArray.push(url7);
                }
                //часть запрашиваемого периода, находящаяся в четвертом промежутке
                range4 = dayjsEndDate.diff(dayjsCurDataStart4, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range4 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date13 = curDataStart4.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url10 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${curDataStart4}T00:00:00&endDate=${date13}T00:00:00`;
                        readyUrlArray.push(url10);
                        date14 = curDataStart4.add(k, 'y').format(dateFormat);
                        date15 = curDataStart4.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url11 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${date14}T00:00:00&endDate=${date15}T00:00:00`;
                        readyUrlArray.push(url11);
                        date16 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url12 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${date16}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url12);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url10 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${curDataStart4}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url10);
                }
            }
            //если начальная дата отображения находится в третьем промежутке, а конечная - в четвертом
            if (dayjsStartDate.isAfter(dayjsCurDataStart3.subtract(1, 'd')) && dayjsStartDate.isBefore(dayjsCurDataEnd3.add(1, 'd')) && dayjsEndDate.isAfter(dayjsCurDataEnd3)) {
                //часть запрашиваемого периода, находящаяся в третьем промежутке
                range3 = dayjsCurDataEnd3.diff(dayjsStartDate, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range3 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date9 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${startDate}T00:00:00&endDate=${date9}T00:00:00`;
                        readyUrlArray.push(url7);
                        date10 = startDate.add(k, 'y').format(dateFormat);
                        date11 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url8 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date10}T00:00:00&endDate=${date11}T00:00:00`;
                        readyUrlArray.push(url8);
                        date12 = curDataEnd3.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url9 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${date12}T00:00:00&endDate=${curDataEnd3}T00:00:00`;
                        readyUrlArray.push(url9);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url7 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID3}?startDate=${startDate}T00:00:00&endDate=${curDataEnd3}T00:00:00`;
                    readyUrlArray.push(url7);
                }
                //часть запрашиваемого периода, находящаяся в четвертом промежутке
                range4 = dayjsEndDate.diff(dayjsCurDataStart4, 'year', true);
                //если длина этой части запрашиваемого периода больше 1 года или равна 1 году
                if (range4 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date13 = curDataStart4.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url10 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${curDataStart4}T00:00:00&endDate=${date13}T00:00:00`;
                        readyUrlArray.push(url10);
                        date14 = curDataStart4.add(k, 'y').format(dateFormat);
                        date15 = curDataStart4.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url11 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${date14}T00:00:00&endDate=${date15}T00:00:00`;
                        readyUrlArray.push(url11);
                        date16 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url12 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${date16}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url12);
                    }
                }
                //если длина этой части запрашиваемого периода меньше 1 года 
                else {
                    url10 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${curDataStart4}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url10);
                }
            }
            //если и начальная, и конечная дата отображения находятся в четвертом промежутке
            if (dayjsStartDate.isAfter(dayjsCurDataStart4.subtract(1, 'd')) && dayjsEndDate.isAfter(dayjsCurDataStart4.subtract(1, 'd'))) {
                range4 = dayjsEndDate.diff(dayjsStartDate, 'year', true);
                //если длина запрашиваемого периода больше 1 года или равна 1 году
                if (range4 >= 1) {
                    for (let k = 1; k <= range; k++) {
                        date13 = startDate.add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url10 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${startDate}T00:00:00&endDate=${date13}T00:00:00`;
                        readyUrlArray.push(url10);
                        date14 = startDate.add(k, 'y').format(dateFormat);
                        date15 = startDate.add(k, 'y').add(1, 'y').subtract(1, 'd').format(dateFormat);
                        url11 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${date14}T00:00:00&endDate=${date15}T00:00:00`;
                        readyUrlArray.push(url11);
                        date16 = endDate.subtract(1, 'y').add(1, 'd').format(dateFormat);
                        url12 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${date16}T00:00:00&endDate=${endDate}T00:00:00`;
                        readyUrlArray.push(url12);
                    }
                }
                //если длина запрашиваемого периода меньше 1 года 
                else {
                    url10 = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curID4}?startDate=${startDate}T00:00:00&endDate=${endDate}T00:00:00`;
                    readyUrlArray.push(url10);
                }
            }
        }
    }
    worker1.postMessage(readyUrlArray);
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
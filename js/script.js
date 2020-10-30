const format = 'YYYY-MM-DD';
const curdate = moment();
const currentYear = document.querySelector('.footer__curyear');
currentYear.innerHTML = moment().year();

function getCurrencyTable(content) {
    let list = document.querySelector('.mainpart__table');

    let key;
    
    for (key in content) {
        list.innerHTML += `
        
        <tr>
            <td class="mainpart__tableCell">${content[key].Cur_Abbreviation}</td>
            <td class="mainpart__tableCell">${content[key].Cur_ID}</td>
            <td class="mainpart__tableCell">${content[key].Cur_Name}</td>
            <td class="mainpart__tableCell">${content[key].Cur_OfficialRate}</td>
            <td class="mainpart__tableCell">${content[key].Date}</td>         
        </tr>
        ` 
        localStorage.setItem('currency', JSON.stringify(content.map(element => { 
            return element.Cur_Abbreviation;
        })));
        localStorage.setItem('curID', JSON.stringify(content.map(element => { 
            return element.Cur_ID;
        })));

        let currencyNames = JSON.stringify(content.map(element => { 
            return element.Cur_Name;
        }));
        if (localStorage.getItem('curName') !== null) {
            currencyNames = JSON.parse(localStorage.getItem('curName'));
        } else {
            localStorage.setItem('curName', currencyNames);
        }
        
        localStorage.setItem('Cur_OfficialRate', JSON.stringify(content.map(element => { 
            return element.Cur_OfficialRate;
        })));
        localStorage.setItem('Date', JSON.stringify(content.map(element => { 
            return element.Date;
        })));
        
    }
}

let worker
if (window.Worker) {
    const worker = new Worker('js/worker.js');
    worker.postMessage('do something');
    worker.addEventListener('message', function(event) {
        getCurrencyTable(event.data);       
    });   
}
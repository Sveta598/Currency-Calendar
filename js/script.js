const curdate = dayjs();
const currentYear = document.querySelector('.footer__curyear');
currentYear.innerHTML = dayjs().year();

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
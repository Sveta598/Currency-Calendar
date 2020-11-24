const curdate = dayjs();
const currentYear = document.querySelector('.footer__curyear');
currentYear.innerHTML = dayjs().year();

function getCurrencyTable(content) {
<<<<<<< HEAD
    let key;
    const temp2 = document.querySelector('.mainpart__template1');
    const item2 = temp2.content.querySelector('.mainpart__par1');
    const temp3 = document.querySelector('.mainpart__template2');
    const item3 = temp3.content.querySelector('.mainpart__par2');
    const temp4 = document.querySelector('.mainpart__template3');
    const item4 = temp4.content.querySelector('.mainpart__par3');
    const temp5 = document.querySelector('.mainpart__template4');
    const item5 = temp5.content.querySelector('.mainpart__par4');
    const temp6 = document.querySelector('.mainpart__template5');
    const item6 = temp6.content.querySelector('.mainpart__par5');
    for (key in content) {
        const copyHTML2 = document.importNode(item2, true);
        copyHTML2.textContent = content[key].Cur_Abbreviation;
        document.querySelector('.mainpart__tableCell1').appendChild(copyHTML2);
        const copyHTML3 = document.importNode(item3, true);
        copyHTML3.textContent = content[key].Cur_ID;
        document.querySelector('.mainpart__tableCell2').appendChild(copyHTML3);
        const copyHTML4 = document.importNode(item4, true);
        copyHTML4.textContent = content[key].Cur_Name;
        document.querySelector('.mainpart__tableCell3').appendChild(copyHTML4);
        const copyHTML5 = document.importNode(item5, true);
        copyHTML5.textContent = content[key].Cur_OfficialRate;
        document.querySelector('.mainpart__tableCell4').appendChild(copyHTML5);
        const copyHTML6 = document.importNode(item6, true);
        copyHTML6.textContent = content[key].Date.slice(0, 10);
        document.querySelector('.mainpart__tableCell5').appendChild(copyHTML6);
=======

>>>>>>> 7ee61504c61b85ff217305003baca11013ed5f3a
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
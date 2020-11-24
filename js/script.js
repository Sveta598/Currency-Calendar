const curdate = dayjs();
const currentYear = document.querySelector('.footer__curyear');
currentYear.innerHTML = dayjs().year();

function getCurrencyTable(content) {

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
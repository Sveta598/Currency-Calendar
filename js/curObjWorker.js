const currencyUrl2 = 'https://www.nbrb.by/api/exrates/currencies';

onmessage = () => fetch(currencyUrl2)
.then(response => response.json())
.then(self.postMessage)
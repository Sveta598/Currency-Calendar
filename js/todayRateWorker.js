const URLDynamics = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

onmessage = () => fetch(URLDynamics)
.then(response => response.json())
.then(self.postMessage)
function mapper (commits) {
    const date = commits.map(element => {
            return element.Date.slice(0, 10);
    });
    const rate = commits.map(element => {
            return element.Cur_OfficialRate;
    });
    return {date, rate}
};

onmessage = function(e) {
    fetch(e.data)
            .then(response => response.json())
            .then(mapper) 
            .then(self.postMessage);
}


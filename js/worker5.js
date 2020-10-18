function mapper (commits) {
    const rate = commits.map(element => {
            return element.Cur_OfficialRate;
    });
    return rate
};

onmessage = function(e) {
    fetch(e.data)
            .then(response => response.json())
            .then(mapper) 
            .then(self.postMessage);
}
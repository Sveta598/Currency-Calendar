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
    const promises = e.data.map(url => fetch(url));

    Promise.all(promises)
        .then(data => data.map(response => response.json()))
        .then(data => Promise.all(data))
        .then(data => {
            const result = [];

            data.forEach(el => result.push(...el))

            return result;
        })
        .then(mapper)
        .then(self.postMessage);
}

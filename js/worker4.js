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
        const promises = e.data.map(url => fetch(url)
            .then(response => response.json())
            .then(mapper)
        );
    
        Promise.all(promises)
            .then(data => {
                const result = [];
    
                data.forEach(el => result.push(...el))
    
                return result;
            })
            .then(self.postMessage);
}
onmessage = function(e) {
    fetch(e.data)
            .then(response => response.json())
            .then(self.postMessage);
}
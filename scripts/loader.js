let loader = (function() {
    let tasks = [];
    return {
        queue: function(promise) {
            tasks[tasks.length] = promise;
        },
        await: function() {
            return Promise.all(tasks);
        }
    }
})()
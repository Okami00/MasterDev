const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('fail');
    }, 3000);
});

function callApi() {
    promise.then((data) => {
        alert(data);
    });
    promise.finally(() =>{
        console.log('â')
    })
}

callApi();
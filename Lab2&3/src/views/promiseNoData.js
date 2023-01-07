
function promiseNoData(promiseState) {
    if (!promiseState.promise) {
        return (
            <div>No data</div>
        );
    }

    else if (promiseState.promise && !promiseState.data && !promiseState.error) {
        return (
            <img class="loading" src={"https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"}></img>
        );
    }
    
    else if (promiseState.promise && !promiseState.data && promiseState.error) {
        return (
            <div>
                {String(promiseState.error)}
            </div>
        );
    }
    
    else if (promiseState.promise && promiseState.data && !promiseState.error) {
        return false;
    }
}

export default promiseNoData;
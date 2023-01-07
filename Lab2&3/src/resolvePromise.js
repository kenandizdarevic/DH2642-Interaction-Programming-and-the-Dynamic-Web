function resolvePromise(promiseToResolve, promiseState, notify) {
    promiseState.promise=promiseToResolve;
    promiseState.data= null;         
    promiseState.error= null;

    if(notify)
        notify();

    if (promiseToResolve === null) {
        return "Promise is null!"
    }

    function saveDataACB(result) {
        if (promiseState.promise !== promiseToResolve) return; {
            /* SAVE RESULT IN promiseState*/
            promiseState.data = result;
            if (notify) {
                notify();
            }
        }
    }

    function saveErrorACB(err) {
        /* SAME CHECK AS ABOVE*/
        /* SAVE err IN promiseState*/
        if (promiseState.promise !== promiseToResolve) return; {
            /* SAVE RESULT IN promiseState*/
            promiseState.error = err;
            if (notify) {
                notify();
            }
        }
    }
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}
export default resolvePromise;
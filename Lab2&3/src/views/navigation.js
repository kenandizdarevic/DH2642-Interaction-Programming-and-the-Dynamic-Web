function initialHash(){
    const hashes = ["#summary", "#details"]
    if(!hashes.includes(window.location.hash)){
        window.location.hash = "#search";
    }
}
initialHash();

window.addEventListener("hashchange", initialHash)
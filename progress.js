
const options = {method: 'GET', headers: {Accept: 'application/json'}};

function getTotalMints(){

fetch('https://api.opensea.io/api/v1/collection/lbo/stats', options)
  .then(response => response.json())
  .then(response => setMintValue(response.stats.count))
  .catch(err => console.error(err));

}

function setMintValue(amount){
    document.getElementById("totalMint").innerHTML = amount;
    document.getElementById("mintPercent").innerHTML = ((parseInt(amount/5555*100))) + "%";
    progress(parseInt(amount/5555*100));
}

let i = 0;

function progress(val) {
  if (i == 0) {
    i = 1;
    let bar = document.getElementById("bar");
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= val) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        bar.style.width = width + "%";
      }
    }
  }
}

const options = {method: 'GET', headers: {Accept: 'application/json'}};

const getTotalMints = async() => {
  let openseaData = await fetch("https://api.opensea.io/api/v1/collection/lbo/stats");
  let openseaDataJson = await openseaData.json();
  return openseaDataJson.stats.count;
}

async function updateMintStats(){
  let mints = await getTotalMints();

  document.getElementById("totalMint").innerHTML = mints;
  document.getElementById("mintPercent").innerHTML = parseInt(mints/5555*100) + "%";
  console.log("Updated!")
}

async function setMintValue(){
    let mints = await getTotalMints();

    updateMintStats();
    progress(parseInt(mints/5555*100));

    setInterval(function(){updateMintStats()}, 10000)
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
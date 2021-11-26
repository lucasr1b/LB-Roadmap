const options = {method: 'GET', headers: {Accept: 'application/json'}};

const getTotalMints = async() => {
  let openseaData = await fetch("https://api.opensea.io/api/v1/collection/lbo/stats");
  let openseaDataJson = await openseaData.json();
  return openseaDataJson.stats.count;
}

async function updateMintStats(){
  const mints = await getTotalMints();

  setupTimer();
  progress(parseInt((mints/5555*100)), parseInt((mints/5555*100)));

  document.getElementById("total-mint").innerText = mints;
  document.getElementById("mint-percent").innerText = parseInt(mints/5555*100) + "%";
  console.log("Updated total mints!")
}

async function setup(){
    const mints = await getTotalMints();

    updateMintStats();
    progress(1, parseInt(mints/5555*100));

    setInterval(function(){updateMintStats()}, 10000)
}

function setupTimer(){
  const timer = document.getElementById("update-timer");
  let time = 9;
  const timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      timer.innerText = "Updating now...";
      time = 9;
    } else {timer.innerText = `Updating in ${time--}`}
  }, 1000)
}

let i = 0;

function progress(width, totalPercent) {
  if (i == 0) {
    i = 1;
    const bar = document.getElementById("bar");
    const id = setInterval(frame, 10);
    function frame() {
      if (width >= totalPercent) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        bar.style.width = width + "%";
      }
    }
  }
}
const refreshBtn = document.getElementById('refreshBtn');
const lastUpdate = document.getElementById('lastUpdate');

let chart;

function initChart() {
  const ctx = document.getElementById('priceChart');

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'VWCE',
        data: [],
        borderColor: '#4f98a3'
      }]
    }
  });
}

async function fetchVWCE() {
  try {
    const r = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/VWCE.DE');
    const j = await r.json();

    const price = j.chart.result[0].meta.regularMarketPrice;

    document.querySelector('.value').textContent = '€ ' + price.toFixed(2);

    const t = new Date().toLocaleTimeString();

    chart.data.labels.push(t);
    chart.data.datasets[0].data.push(price);
    chart.update();

    lastUpdate.textContent = new Date().toLocaleString();

  } catch (e) {
    console.error(e);
  }
}

refreshBtn.addEventListener('click', fetchVWCE);

window.onload = () => {
  initChart();
  fetchVWCE();
  setInterval(fetchVWCE, 60000);
};

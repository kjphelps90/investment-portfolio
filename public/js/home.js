function createChart(data) {
  const labels = [];
  let prices = [];

  for (let i = 0; i < 23; i++) {
    const openPrice = Math.floor(data.data[i].close);
    prices.push(openPrice);
    labels.push("");
  }

  console.log(prices);

  const inputs = {
    labels: labels,
    datasets: [
      {
        label: "Dow Jones - Last 30 Days",
        backgroundColor: "rgb(20, 50, 185)",
        borderColor: "rgb(20, 50, 185)",
        data: prices,
      },
    ],
  };

  const config = {
    type: "line",
    data: inputs,
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 24,
            },
          },
        },
      },
    },
  };

  var myChart = new Chart(document.getElementById("myChart"), config);
}

async function getMarketData() {
  const marketData = await fetch("/api/marketdata");
  const marketDataJson = await marketData.json();

  createChart(marketDataJson);
}

const deletePortfolio = async (id, name) => {
  const checkDelete = confirm(
    `Do you want to delete portfolio - ${name}?\nWarning!!! This is irreversible.`
  );
  if (checkDelete) {
    const response = await fetch("/api/portfolio/" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("User Portfolio has been Deleted");
      window.location = "/";
    } else {
      alert(response.statusText);
    }
  }
};

getMarketData();

document.getElementById("create-portfolio").addEventListener("click", () => {
  window.location = "/portfolio";
});

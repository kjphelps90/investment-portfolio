const addInvestmentHandler = () => {
    document.getElementById("investment-form").style.display = "block";
    document.getElementById("investment-list").style.display = "none";
    document.getElementById("add-investment").style.display = "none";
} 

document
  .getElementById("add-investment")
  .addEventListener("click", addInvestmentHandler);

const deleteInvestmentsHandler = async (id) => {
  console.log(id)
  const response = await fetch("/api/investments/" + id, {
    method: "DELETE",
  });

  if (response.ok) {
    alert(response.statusText);
    loadInvestments();
  } else {
    alert(response.statusText);
  }
}

const loadInvestments = async () => {
  const invRows = document.getElementById("investment-list-rows");
  let paths = window.location.pathname.split("/");
  let portfolioId = paths[2];

  const response = await fetch("/api/portfolio/" + portfolioId, {
    method: 'GET'
  });

  if (response.ok) {
    const result = await response.json();

    const investments = result.investments.map(inv => {
      return `<tr>
        <td>${inv.ticker.symbol}</td>
        <td>${inv.ticker.name}</td>
        <td>${inv.quantity}</td>
        <td>${inv.price}</td>
        <td>${inv.price * inv.quantity}</td>
        <td>
          <button type="button" class="btn btn-danger" onclick="deleteInvestmentsHandler('${inv.id}')">
            <i class="fas fa-trash-alt"></i>
          </button></td>
      </tr>`;
    });

    invRows.innerHTML = investments.join("");
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  loadInvestments();
});
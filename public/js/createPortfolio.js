const createPortfolioHandler = async (event) => {
  event.preventDefault();

  const portfolioName = document.getElementById("portfolioName").value.trim();

  if (portfolioName) {
    const response = await fetch("/api/portfolio", {
      method: "POST",
      body: JSON.stringify({ portfolioName }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("User Portfolio created");
      window.location = "/";
    } else {
      alert(response.statusText);
    }
  }
};

document
  .getElementById("name-portfolio")
  .addEventListener("click", createPortfolioHandler);

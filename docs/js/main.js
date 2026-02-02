document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  populateDropdowns();
  initMap();

  document.getElementById("searchBtn").addEventListener("click", () => {
    clearRoutes();

    const origin = document
      .getElementById("originInput")
      .value.trim()
      .toUpperCase();

    const destination = document
      .getElementById("destinationInput")
      .value.trim()
      .toUpperCase();

    const airline = document
      .getElementById("airlineInput")
      .value.trim()
      .toUpperCase();

    const results = filterRoutes(origin, destination, airline);

    results.forEach(drawRoute);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    clearRoutes();
    document.getElementById("originSelect").value = "";
    document.getElementById("destinationSelect").value = "";
    document.getElementById("airlineSelect").value = "";
  });
});

document.addEventListener("DOMContentLoaded", async function () {

  await loadData();
  initMap();
  populateDropdowns();
  drawRoutes(routes);

  // 初期件数表示
  updateRouteCount(routes);
});

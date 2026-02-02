function filterRoutes(origin, destination, airline) {

  return routes.filter(route => {

    const matchOrigin =
      !origin ||
      route.origin === origin ||
      route.destination === origin;

    const matchDestination =
      !destination ||
      route.origin === destination ||
      route.destination === destination;

    const matchAirline =
      !airline ||
      route.airlines.includes(airline);

    return matchOrigin && matchDestination && matchAirline;
  });

}

function populateDropdowns() {

  const originSelect = document.getElementById("originSelect");
  const destinationSelect = document.getElementById("destinationSelect");
  const airlineSelect = document.getElementById("airlineSelect");

  airports.forEach(airport => {

    originSelect.add(
      new Option(`${airport.iata} - ${airport.name}`, airport.iata)
    );

    destinationSelect.add(
      new Option(`${airport.iata} - ${airport.name}`, airport.iata)
    );

  });

  airlines.forEach(airline => {

    airlineSelect.add(
      new Option(`${airline.iata} - ${airline.name}`, airline.iata)
    );

  });

}

function updateRouteCount(routeArray) {
  const countElement = document.getElementById("route-count");
  countElement.textContent = `該当路線数：${routeArray.length}件`;
}

document.addEventListener("DOMContentLoaded", async function () {

  await loadData();

  initMap();
  populateDropdowns();

  drawRoutes(routes);
  updateRouteCount(routes);

  document.getElementById("searchBtn").addEventListener("click", function () {

    const origin = document.getElementById("originSelect").value;
    const destination = document.getElementById("destinationSelect").value;
    const airline = document.getElementById("airlineSelect").value;

    const results = filterRoutes(origin, destination, airline);

    drawRoutes(results);
    updateRouteCount(results);
  });

  document.getElementById("resetBtn").addEventListener("click", function () {

    document.getElementById("originSelect").value = "";
    document.getElementById("destinationSelect").value = "";
    document.getElementById("airlineSelect").value = "";

    drawRoutes(routes);
    updateRouteCount(routes);
  });

});

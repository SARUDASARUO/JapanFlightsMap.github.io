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
    const option1 = new Option(
      `${airport.iata} - ${airport.city}`,
      airport.iata
    );
    const option2 = new Option(
      `${airport.iata} - ${airport.city}`,
      airport.iata
    );

    originSelect.add(option1);
    destinationSelect.add(option2);
  });

  airlines.forEach(airline => {
    const option = new Option(
      `${airline.iata} - ${airline.name}`,
      airline.iata
    );
    airlineSelect.add(option);
  });
}

function updateRouteCount(routes) {
  const countElement = document.getElementById("route-count");
  countElement.textContent = `該当路線数：${routes.length}件`;
}

// ==============================
// 検索ボタン処理
// ==============================
document.getElementById("searchBtn").addEventListener("click", function () {

  const origin = document.getElementById("originSelect").value;
  const destination = document.getElementById("destinationSelect").value;
  const airline = document.getElementById("airlineSelect").value;

  const filteredRoutes = filterRoutes(origin, destination, airline);

  drawRoutes(filteredRoutes);

  // 🔥 路線数更新
  updateRouteCount(filteredRoutes);
});


// ==============================
// リセットボタン処理
// ==============================
document.getElementById("resetBtn").addEventListener("click", function () {

  // ドロップダウン初期化
  document.getElementById("originSelect").value = "";
  document.getElementById("destinationSelect").value = "";
  document.getElementById("airlineSelect").value = "";

  drawRoutes(routes);

  // 🔥 全件数表示
  updateRouteCount(routes);
});


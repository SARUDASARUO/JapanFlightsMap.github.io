let map;
let routeLayerGroup;
let airportLayerGroup;
let drawnRoutes = [];

function initMap() {

  map = L.map("map").setView([36.2048, 138.2529], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  routeLayerGroup = L.layerGroup().addTo(map);
  airportLayerGroup = L.layerGroup().addTo(map);

  airportLayerGroup.setZIndex(1000);
  routeLayerGroup.setZIndex(500);
}

function clearRoutes() {
  routeLayerGroup.clearLayers();
  airportLayerGroup.clearLayers();
  drawnRoutes = [];
}

function drawRoutes(routeArray) {
  clearRoutes();
  routeArray.forEach(drawRoute);
}

function drawRoute(route) {

  const originAirport = airports.find(a => a.iata === route.origin);
  const destAirport = airports.find(a => a.iata === route.destination);

  if (!originAirport || !destAirport) return;

  const polyline = L.polyline(
    [
      [originAirport.lat, originAirport.lng],
      [destAirport.lat, destAirport.lng]
    ],
    {
      weight: 2,
      color: "#444"
    }
  );

  polyline.routeData = route;

  polyline.bindPopup(`
    <strong>${route.origin} ⇄ ${route.destination}</strong><br/>
    航空会社: ${route.airlines.join(", ")}
  `);

  polyline.addTo(routeLayerGroup);
  drawnRoutes.push(polyline);

  drawAirportMarker(originAirport);
  drawAirportMarker(destAirport);
}

function drawAirportMarker(airport) {

  const exists = airportLayerGroup.getLayers().some(layer =>
    layer.options.iata === airport.iata
  );

  if (exists) return;

  const marker = L.circleMarker(
    [airport.lat, airport.lng],
    {
      radius: 6,
      weight: 1,
      fillColor: "#003366",
      color: "#003366",
      fillOpacity: 0.8
    }
  );

  marker.options.iata = airport.iata;

  marker.bindPopup(`
    <strong>${airport.city}</strong><br/>
    (${airport.iata})
  `);

  marker.on("mouseover", () => highlightRoutes(airport.iata));
  marker.on("mouseout", resetRouteStyles);

  marker.addTo(airportLayerGroup);
  marker.bringToFront();
}

function highlightRoutes(iata) {

  drawnRoutes.forEach(routeLine => {

    const route = routeLine.routeData;

    if (route.origin === iata || route.destination === iata) {
      routeLine.setStyle({
        weight: 5,
        color: "#d00000"
      });
    } else {
      routeLine.setStyle({
        weight: 1,
        color: "#ccc"
      });
    }

  });
}

function resetRouteStyles() {

  drawnRoutes.forEach(routeLine => {
    routeLine.setStyle({
      weight: 2,
      color: "#444"
    });
  });

}

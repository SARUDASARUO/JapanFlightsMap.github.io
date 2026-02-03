let airports = [];
let routes = [];
let airlines = [];

function normalizeRoutes(rawRoutes) {
  const preferredOrder = ["HND", "NRT", "ITM", "KIX", "CTS", "NGO", "FUK", "OKA"];
  const preferredIndex = new Map(preferredOrder.map((code, index) => [code, index]));

  const normalizeAirlineCode = (code) => {
    if (code === "EH") return "NH";
    return code;
  };

  const canonicalizePair = (a, b) => {
    const aHas = preferredIndex.has(a);
    const bHas = preferredIndex.has(b);
    if (aHas && bHas) {
      return preferredIndex.get(a) <= preferredIndex.get(b) ? [a, b] : [b, a];
    }
    if (aHas) return [a, b];
    if (bHas) return [b, a];
    return a < b ? [a, b] : [b, a];
  };

  const merged = new Map(); // key: "ORIGIN|DEST"

  for (const route of rawRoutes || []) {
    if (!route || !route.origin || !route.destination) continue;

    const [origin, destination] = canonicalizePair(route.origin, route.destination);
    const key = `${origin}|${destination}`;

    const airlineCodes = (Array.isArray(route.airlines) ? route.airlines : [])
      .map(normalizeAirlineCode)
      .filter(Boolean);

    if (!merged.has(key)) {
      merged.set(key, { origin, destination, airlines: [] });
    }

    merged.get(key).airlines.push(...airlineCodes);
  }

  const normalized = [];
  for (const route of merged.values()) {
    route.airlines = [...new Set(route.airlines)].sort();
    normalized.push(route);
  }

  normalized.sort(
    (a, b) =>
      a.origin.localeCompare(b.origin) ||
      a.destination.localeCompare(b.destination)
  );

  return normalized;
}

async function loadData() {
  const airportRes = await fetch("data/airports.json");
  airports = await airportRes.json();

  const routeRes = await fetch("data/routes.json");
  routes = normalizeRoutes(await routeRes.json());

  const airlineRes = await fetch("data/airlines.json");
  airlines = await airlineRes.json();
}

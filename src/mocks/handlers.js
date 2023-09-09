import { rest } from "msw";
import { airports } from "../Data/airports";
import { flights } from "../Data/flights";

const airportsData = airports;
const flightsData = flights;

const filteredAirports = (airportName) => {
  return airportsData
    .filter((airport) => {
      return (
        airport.state.toLowerCase().includes(airportName.toLowerCase()) ||
        airport.iata.toLowerCase().includes(airportName.toLowerCase())
      );
    })
    .slice(0, 3);
};

const filteredFlights = (
  secilenNereden,
  secilenNereye,
  gidisTarihi,
  donusTarihi
) => {
  return flightsData.filter((flight) => {
    return (
      flight.nereden.toLowerCase() == secilenNereden.toLowerCase() &&
      flight.nereye.toLowerCase() == secilenNereye.toLowerCase() &&
      flight.gidisTarihi == gidisTarihi
    );
  });
};

export const handlers = [
  rest.get("/flight-icon.svg", (req, res, ctx) => {
    return res(ctx.status(200), ctx.text("title svg..."));
  }),

  //Airports Search

  rest.get(`/airports`, (req, res, ctx) => {
    const airportName = req.url.searchParams.get("airportName");

    if (airportName.length >= 2) {
      const filteredAirportsData = filteredAirports(airportName);
      return res(ctx.status(200), ctx.json(filteredAirportsData));
    }
  }),

  //Flights Search

  rest.get(`/flights`, (req, res, ctx) => {
    const secilenNereden = req.url.searchParams.get("secilenNereden");
    const secilenNereye = req.url.searchParams.get("secilenNereye");
    const gidisTarihi = req.url.searchParams.get("gidisTarihi");
    const donusTarihi = req.url.searchParams.get("donusTarihi");

    const filteredData = filteredFlights(
      secilenNereden,
      secilenNereye,
      gidisTarihi,
      donusTarihi
    );

    return res(ctx.status(200), ctx.delay(3000), ctx.json(filteredData));
  }),
];

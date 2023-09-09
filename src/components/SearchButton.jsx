import { useDispatch, useSelector } from "react-redux";
import { getFlights, setCategory, sortByCategory } from "../redux/flightSlice";
import RightArrow from "./Icons/RightArrow";
import { useEffect, useState } from "react";
import PlaneIcon from "./Icons/PlaneIcon";
import ClockIcon from "./Icons/ClockIcon";
import { ColorRing } from "react-loader-spinner";

const SearchButton = ({ isTekYon }) => {
  const dispatch = useDispatch();
  const {
    flights,
    secilenNereden,
    secilenNereye,
    gidisTarihi,
    donusTarihi,
    status,
    category,
  } = useSelector((state) => state.flight);

  const handleBiletBul = (e) => {
    e.preventDefault();

    if (!isTekYon) {
      const query = `secilenNereden=${secilenNereden.iata}&secilenNereye=${secilenNereye.iata}&gidisTarihi=${gidisTarihi.startDate}&donusTarihi=${donusTarihi.startDate}`;
      dispatch(getFlights(query));
    }
    if (isTekYon) {
      const query = `secilenNereden=${secilenNereden.iata}&secilenNereye=${secilenNereye.iata}&gidisTarihi=${gidisTarihi.startDate}`;
      dispatch(getFlights(query));
    }
  };

  const condition =
    (secilenNereye && secilenNereden && gidisTarihi && isTekYon) ||
    (secilenNereye &&
      secilenNereden &&
      gidisTarihi &&
      donusTarihi &&
      !isTekYon);

    useEffect(() => {
        dispatch(sortByCategory(category))
    },[category,dispatch])

    console.log(flights);

  return (
    <>
      <button
        disabled={!condition || status == "loading"}
        onClick={(e) => handleBiletBul(e)}
        className={`mt-4 w-full bg-app-green rounded-md p-3 !text-white transition-all duration-500 text-lg ${
          !condition && "opacity-75 cursor-not-allowed"
        }
        }`}>
        {status == "loading" ? (
          <div className="flex justify-center items-center ">
            <span>Uçuş Aranıyor</span>
            <ColorRing
              visible={true}
              height="28"
              width="28"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          </div>
        ) : (
          "Bilet Ara"
        )}
      </button>

      {condition && flights.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-3xl">Uçuş Listesi</p>
            <select onChange={(e)=>dispatch(setCategory(e.target.value))} className="p-2 outline-none">
              <option>Filtreleme</option>
              <option value={"price"}>En Düşük Fiyat</option>
              <option value={"time"}>Uçuş Uzunluğu</option>
            </select>
          </div>
          {flights.map((flight) => {
            return (
              <div
                className=" flex justify-between p-2"
                key={flight.ucus_numarasi}>
                <div className="flex flex-col gap-y-2">
                  <p>Ucus numarasi: {flight.ucus_numarasi}</p>
                  <p>{flight.havayolu}</p>
                  <div className="flex gap-x-1">
                    <p>{flight.nereden}</p>
                    <span>
                      <RightArrow size={24} />
                    </span>
                    <p>{flight.nereye}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-center items-center gap-x-2">
                    <p>{flight.kalkis_saati}</p>
                    <PlaneIcon size={24} />
                    <p>{flight.varis_saati}</p>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <span>
                      <ClockIcon />
                    </span>
                    <p>{flight.ucus_suresi}</p>
                  </div>
                  <p>
                    {flight.nereden_sehir} - {flight.nereye_sehir}{" "}
                  </p>
                </div>

                <div className="text-xl font-semibold">{flight.fiyat} ₺</div>
                <div className="my-auto">
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="bg-app-green p-3 text-lg rounded-lg !text-white font-semibold">
                    İncele
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchButton;

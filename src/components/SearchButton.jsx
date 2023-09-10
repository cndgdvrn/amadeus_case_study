import { useDispatch, useSelector } from "react-redux";
import { getFlights, setCategory, setDonusCategory, sortByCategory, sortByDonusCategory } from "../redux/flightSlice";
import RightArrow from "./Icons/RightArrow";
import { useEffect } from "react";
import PlaneIcon from "./Icons/PlaneIcon";
import ClockIcon from "./Icons/ClockIcon";
import { ColorRing } from "react-loader-spinner";
import { formatDate } from "../helpers/formatDate";
import { formatTime } from "../helpers/formatTime";

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
    donusCategory
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
    (gidisTarihi && isTekYon) || (gidisTarihi && donusTarihi && !isTekYon);

  useEffect(() => {
    dispatch(sortByCategory(category));
  }, [category, dispatch]);

  useEffect(()=>{
    dispatch(sortByDonusCategory(donusCategory));
  },[donusCategory, dispatch])

  console.log(flights);

  return (
    <>
      <button
        disabled={!condition || status == "loading"}
        onClick={(e) => handleBiletBul(e)}
        className={`mt-4 w-full bg-app-green rounded-md p-3 !text-white transition-all duration-500 text-lg ${
          (!condition || status=="loading") ? "opacity-60 cursor-not-allowed" : "opacity-100 cursor-pointer"
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

      <div className="flex gap-x-12 mt-8 h-full">
        {condition && flights.gidenUcaklar.length > 0 && (
          <div className="space-y-6 w-1/2">
            <div className="flex justify-between items-center">
              <p className="text-3xl">
                Uçuş Listesi - <b>Giden Yolcu</b>
              </p>
              <select
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className="p-2 outline-none">
                <option>Filtreleme</option>
                <option value={"price"}>En Düşük Fiyat</option>
                <option value={"time"}>Uçuş Uzunluğu</option>
                <option value={"airline"}>Hava Yolu</option>
              </select>
            </div>
            {flights.gidenUcaklar.map((flight, index) => {
              return (
                <div
                  className={` flex justify-between p-2 ${
                    index !== flights.gidenUcaklar.length - 1 &&
                    "border-b-2 border-gray-200"
                  }`}
                  key={flight.ucus_numarasi}>
                  <div className="flex flex-col gap-y-2">
                    <p>Ucus numarasi: {flight.ucus_numarasi}</p>
                    <div>{formatDate(flight.gidisTarihi)}</div>
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
                      <p>{formatTime(flight.ucus_suresi)}</p>
                    </div>
                    <p>
                      {flight.nereden_sehir} - {flight.nereye_sehir}{" "}
                    </p>
                  </div>

                  <div className="text-xl font-semibold my-auto">{flight.fiyat} ₺</div>
                  <div className="my-auto">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="bg-yellow-400 bg-opacity-75 p-3 text-lg tracking-wider rounded-lg !text-gray-100 font-semibold hover:bg-opacity-100 transition-all duration-300">
                      İncele
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {condition && flights.donenUcaklar?.length > 0 && flights.gidenUcaklar.length > 0 &&  (
          <div className="min-h-full w-[2px] bg-green-200"></div>
        )}

        {condition && flights.donenUcaklar?.length > 0 && (
          <div className="space-y-6 w-1/2">
            <div className="flex justify-between items-center">
              <p className="text-3xl">
                Uçuş Listesi - <b>Dönen Yolcu</b>
              </p>
              <select
                onChange={(e) => dispatch(setDonusCategory(e.target.value))}
                className="p-2 outline-none">
                <option>Filtreleme</option>
                <option value={"price"}>En Düşük Fiyat</option>
                <option value={"time"}>Uçuş Uzunluğu</option>
                <option value={"airline"}>Hava Yolu</option>
              </select>
            </div>
            {flights.donenUcaklar.map((flight, index) => {
              return (
                <div
                  className={` flex justify-between p-2 ${
                    index !== flights.donenUcaklar.length - 1 &&
                    "border-b-2 border-gray-200"
                  }`}
                  key={flight.ucus_numarasi}>
                  <div className="flex flex-col gap-y-2">
                    <p>Ucus numarasi: {flight.ucus_numarasi}</p>
                    <div>{formatDate(flight.gidisTarihi)}</div>
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
                      <PlaneIcon size={44} />
                      <p>{flight.varis_saati}</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <span>
                        <ClockIcon />
                      </span>
                      <p>{formatTime(flight.ucus_suresi)}</p>
                    </div>
                    <p>
                      {flight.nereden_sehir} - {flight.nereye_sehir}{" "}
                    </p>
                  </div>

                  <div className="text-xl font-semibold">{flight.fiyat} ₺</div>
                  <div className="my-auto">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="bg-yellow-400 bg-opacity-75 p-3 text-lg tracking-wider rounded-lg !text-gray-100 font-semibold hover:bg-opacity-100 transition-all duration-300">

                        
                      İncele
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchButton;

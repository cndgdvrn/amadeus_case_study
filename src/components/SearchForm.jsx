import TargetIcon from "./Icons/TargetIcon";
import ChangeIcon from "./Icons/ChangeIcon";
import LocationIcon from "./Icons/LocationIcon";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getAirports,
  getNereyeAirports,
  setDonusTarihi,
  setGidisTarihi,
  setNereden,
  setNereye,
  setSecilenNereden,
  setSecilenNereye,
  swapDate,
  swapLocation,
} from "../redux/flightSlice";
import Airport from "./Airport";
import NereyeAirport from "./NereyeAirport";
import SearchButton from "./SearchButton";

const SearchForm = () => {
  const dispatch = useDispatch();
  const {
    neredenAirports,
    nereden,
    secilenNereden,
    nereyeAirports,
    nereye,
    secilenNereye,
    gidisTarihi,
    donusTarihi,
    flights,
  } = useSelector((state) => state.flight);
  const [showNeredenAirports, setShowNeredenAirports] = useState(false);
  const [showNereyeAirports, setShowNereyeAirports] = useState(false);
  const [isTekYon, setIsTekYon] = useState(false);

  useEffect(() => {
    if (nereden.length >= 2) {
      setShowNeredenAirports(true);
    }
  }, [nereden]);

  useEffect(() => {
    if (nereye.length >= 2) {
      setShowNereyeAirports(true);
    }
  }, [nereye]);

  const neredenChange = (e) => {
    dispatch(setSecilenNereden(""));
    dispatch(setNereden(e.target.value));
    dispatch(getAirports(e.target.value));
  };

  const nereyeChange = (e) => {
    dispatch(setSecilenNereye(""));
    dispatch(setNereye(e.target.value));
    dispatch(getNereyeAirports(e.target.value));
  };

  const handleGidisChange = (value) => {
    dispatch(setGidisTarihi(value));
  };

  const handleDonusChange = (value) => {
    dispatch(setDonusTarihi(value));
  };

  const handleTekYon = (e) => {
    setIsTekYon(e.target.checked);
    if (e.target.checked) {
      dispatch(
        setDonusTarihi({
          startDate: "",
          endDate: "",
        })
      );
    }
  };


  return (
    <div className="w-[648px] bg-gray-300 p-4 font-gemunu">
      <p className="w-max border-b-2 border-b-gray-400 text-2xl mb-2 tracking-wider py-1">
        Uçak Bileti
      </p>

      <form className="flex flex-col gap-y-2">
        {/* NEREDEN NEREYE START */}
        <div className="flex justify-between items-center gap-x-4 h-max ">
          <div className="flex w-full flex-col justify-center gap-y-1">
            <label className="font-light">Nereden</label>
            <div className="relative">
              <input
                value={secilenNereden?.name || nereden}
                onChange={(e) => neredenChange(e)}
                className=" w-full py-2 px-2 border-2 border-gray-300 rounded-md outline-none focus:border-app-green"
                type="text"
                placeholder="Şehir veya Havalimanı Yazın"
              />
              <div className="absolute top-[9.6px] right-1">
                <TargetIcon size={24} />
              </div>

              {nereden.length >= 2 && showNeredenAirports && (
                <div className="w-96 bg-gray-200 absolute top-12 z-10 shadow-2xl rounded-md">
                  {neredenAirports.map((airport, i) => {
                    return (
                      <Airport
                        showNeredenAirports={showNeredenAirports}
                        setShowNeredenAirports={setShowNeredenAirports}
                        airport={airport}
                        key={i}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div onClick={() => dispatch(swapLocation())} className="mt-[24px]">
            <ChangeIcon size={20} />
          </div>
          <div className="flex w-full flex-col justify-center gap-y-1">
            <label className="font-light">Nereye</label>
            <div className="relative">
              <input
                value={secilenNereye?.name || nereye}
                onChange={(e) => nereyeChange(e)}
                className=" w-full py-2 px-2 border-2 border-gray-300 rounded-md outline-none focus:border-app-green"
                type="text"
                placeholder="Şehir veya Havalimanı Yazın"
              />
              <div className="absolute top-[9.6px] right-1">
                <LocationIcon size={24} />
              </div>

              {nereye.length >= 2 && showNereyeAirports && (
                <div className="w-96 bg-gray-200 absolute top-12 z-10 shadow-2xl rounded-md">
                  {nereyeAirports.map((airport, i) => {
                    return (
                      <NereyeAirport
                        airport={airport}
                        key={i}
                        showNereyeAirports={showNereyeAirports}
                        setShowNereyeAirports={setShowNereyeAirports}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* NEREDEN NEREYE END */}

        {/* GIDIS-DONUS TARIHI START */}
        <div className="flex justify-between items-center gap-x-4 h-max ">
          <div className="flex w-full flex-col justify-center gap-y-1">
            <label className="font-light">Gidiş Tarihi</label>
            <div className="datepicker">
              <Datepicker
                primaryColor={"green"}
                minDate={
                  new Date(
                    `${new Date().getFullYear()}-${
                      new Date().getMonth() + 1
                    }-${new Date().getDate()}`
                  )
                }
                asSingle={true}
                value={gidisTarihi}
                onChange={(e) => handleGidisChange(e)}
                placeholder="Gidiş Tarihi Seçin"
              />
            </div>
          </div>

          <div
            onClick={() => dispatch(swapDate())}
            className={`mt-[24px] ${isTekYon ? "opacity-0" : "opacity-100"}`}>
            <ChangeIcon size={20} />
          </div>

          <div className="flex w-full flex-col justify-center gap-y-1">
            <div className="flex justify-between">
              <label className="font-light">Dönüş Tarihi</label>
              <div className="flex gap-x-[2px]">
                <input onChange={(e) => handleTekYon(e)} type="checkbox" />
                <span className="font-light">Tek Yön</span>
              </div>
            </div>
            <div className="datepicker">
              <Datepicker
                primaryColor={"green"}
                minDate={
                  new Date(
                    `${new Date().getFullYear()}-${
                      new Date().getMonth() + 1
                    }-${new Date().getDate()}`
                  )
                }
                asSingle={true}
                value={!isTekYon ? donusTarihi : gidisTarihi}
                placeholder="Dönüş Tarihi Seçin"
                onChange={(e) => handleDonusChange(e)}
                disabled={isTekYon}
              />
            </div>
          </div>
        </div>
        {/* GIDIS-DONUS TARIHI END */}

        <SearchButton isTekYon={isTekYon} />
      </form>
    </div>
  );
};

export default SearchForm;

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
    <div className="w-full bg-gray-100 p-4 font-gemunu">
      <div className="flex justify-between">
        <p className="w-max border-b-2 border-b-gray-400 text-6xl mb-4 tracking-wider py-1">
          Flight Search App
        </p>
        <div className="font-mono font-[900]">
          <p>Örnek Uçuşlar</p>
          <p>ESB to ADA 15 Eylül / ADA to ESB 16 Eylül</p>
          <p>ESB to SAW 15 Eylül / SAW to ESB 20 Eylül</p>
          <p></p>
        </div>
      </div>

      <form className="flex flex-col gap-y-2">
        {/* NEREDEN NEREYE START */}
        <div className="flex justify-between items-center gap-x-4 h-max ">
          <div className="flex w-full flex-col justify-center gap-y-1">
            <label className="font-light">Nereden</label>
            <div className="relative">
              <input
                value={
                  secilenNereden
                    ? secilenNereden?.city + ", " + secilenNereden?.name
                    : nereden
                }
                onChange={(e) => neredenChange(e)}
                className=" w-full p-3  text-lg  rounded-md outline-none focus:outline-green-200"
                type="text"
                placeholder="Şehir veya Havalimanı Yazın"
              />
              <div className="absolute top-[15.6px] right-2">
                <TargetIcon size={24} />
              </div>

              {nereden.length >= 2 && showNeredenAirports && (
                <div className="w-[476px] bg-gray-200 absolute top-14 z-10 shadow-2xl rounded-md">
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
                value={
                  secilenNereye
                    ? secilenNereye?.city + ", " + secilenNereye?.name
                    : nereye
                }
                onChange={(e) => nereyeChange(e)}
                className=" w-full p-3  text-lg  rounded-md outline-none focus:outline-green-200"
                type="text"
                placeholder="Şehir veya Havalimanı Yazın"
              />
              <div className="absolute top-[15.6px] right-1">
                <LocationIcon size={24} />
              </div>

              {nereye.length >= 2 && showNereyeAirports && (
                <div className="w-[476px] bg-gray-200 absolute top-14 z-10 shadow-2xl rounded-md">
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
              <div className="flex items-center gap-x-[2px]">
                <input
                  className="w-5 h-5 border-none"
                  onChange={(e) => handleTekYon(e)}
                  type="checkbox"
                />
                <span className="font-semibold text-lg">Tek Yön</span>
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

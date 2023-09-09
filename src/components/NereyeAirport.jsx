/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { setSecilenNereye } from "../redux/flightSlice";

const NereyeAirport = ({airport,showNereyeAirports,setShowNereyeAirports}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSecilenNereye(airport));
        setShowNereyeAirports(!showNereyeAirports)
    }


   return (
    <div onClick={()=>handleClick()} className="flex justify-between py-2 px-4 items-center cursor-pointer hover:bg-gray-300 transition-all duration-300">
      <div className="flex flex-col gap-y-1 font-[400]">
        <p> {airport?.state}, {airport?.country} </p>
        <p>{airport?.name}</p>
      </div>
      <div>
        <p className="font-extralight">{airport?.iata}</p>
      </div>
    </div>
  );
}

export default NereyeAirport
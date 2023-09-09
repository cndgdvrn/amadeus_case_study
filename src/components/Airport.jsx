import { useDispatch, useSelector } from "react-redux";
import { setSecilenNereden } from "../redux/flightSlice";

/* eslint-disable react/prop-types */
const Airport = ({ airport,setShowNeredenAirports,showNeredenAirports }) => {
const dispatch = useDispatch();  

const {secilenNereden} = useSelector((state) => state.flight);

    const handleClick = () => {
        dispatch(setSecilenNereden(airport));
        setShowNeredenAirports(!showNeredenAirports)
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
};

export default Airport;

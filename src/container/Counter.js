import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decriment, increment } from "../redux/action/counter.action";

function Counter(props) {
  const dispatch = useDispatch();

  const c = useSelector(state=> state.count)
  const handleInc = () => {
    dispatch(increment());
  };
  const handleDec = () => {
    dispatch(decriment());
  };
  return (
    <div>
      <button onClick={() => handleInc()}>+</button>
      <p>{c.count}</p>
      <button onClick={() => handleDec()}>-</button>
    </div>
  );
}

export default Counter;

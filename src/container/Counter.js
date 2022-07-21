import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { decrement, increment } from '../redux/action/action';

function Counter(props) {
    const dispatch = useDispatch();
    const c = useSelector(state=> state.counter);

    const handleInc = () =>{
        dispatch(increment())
    }
    const handleDec = () =>{
        dispatch(decrement())
    }
    return (
        <div>
            <button onClick={()=>handleInc()}>+</button>
            {c.counter}
            <button onClick={()=>handleDec()}>-</button>
        </div>
    );
}

export default Counter;
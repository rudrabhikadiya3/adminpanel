import React from 'react';

function Counter(props) {
    return (
        <div>
            <button onClick={()=>handleInc()}>+</button>
            {}
            <button onClick={()=>handleDec()}>-</button>
        </div>
    );
}

export default Counter;
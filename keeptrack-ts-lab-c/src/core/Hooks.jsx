import React, {useState} from "react";

function Hooks(){
    const [count, setCount] = useState(8); 
    function decreaseValue(){
        // setCount(count-1);
        // setCount(count-1);
        // setCount(prevCount => prevCount - 1);
        setCount(prevCount => prevCount - 1);
    }
    function increaseValue(){
        setCount(prevCount => prevCount + 1);
    }
    return (
        <div>
        <span onClick={decreaseValue}>-</span>{count}<span onClick={increaseValue}>+</span>
        </div>
    )
}

export default Hooks;
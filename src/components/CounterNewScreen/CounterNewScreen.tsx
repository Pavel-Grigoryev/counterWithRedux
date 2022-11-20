import React from "react";
import s from "./CounterNewScreen.module.css"
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {NewStorageValuesType} from "../../state/newCounter-reducer";


export const CounterNewScreen = () => {

    const {maxValue, count} = useSelector<AppRootStateType, NewStorageValuesType>(state => state.newCounterSettings);

    const finalSpanClass = count === maxValue ? s.counter__errNum + " " + s.counter__Num : s.counter__Num;

    return (
        <div>
            <span className={finalSpanClass}>{count}</span>
        </div>
    );
}
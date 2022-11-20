import React from "react";
import s from "./CounterScreen.module.css"
import {CounterButton} from "../CounterButton/CounterButton";
import {incrementCounterAC, resetCounterAC, StorageValuesType} from "../../state/counter-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

export const CounterScreen = () => {

    const dispatch = useDispatch();

    const counterSettings = useSelector<AppRootStateType, StorageValuesType>(state => state.counterSettings);

    const {count,startValue, maxValue, buttonValue, error} = counterSettings;

    const incrementCounterHandler = () => {
        dispatch(incrementCounterAC());
    }
    const resetCountHandler = () => {
        dispatch(resetCounterAC());
    }

    const finalSpanClass = count === maxValue ? s.counter__errNum + " " + s.counter__Num : s.counter__Num;

    return (
        <div className={s.counter}>
            <div className={s.counter__board}> {buttonValue ? (<span className={s.counter__text}>{buttonValue}</span>) :
                error ? (<span className={s.counter__textErr}>{error}</span>) :
                    <span className={finalSpanClass}>{count}</span>}

            </div>
            <div className={s.counter__buttonBlock}>
                <CounterButton name={"inc"}
                               callback={incrementCounterHandler}
                               disabled={count >= maxValue || !!error || !!buttonValue}/>
                <CounterButton name={"reset"}
                               callback={resetCountHandler}
                               disabled={count === startValue || !!error || !!buttonValue}
                />
            </div>
        </div>
    );
}
import React, {useEffect} from 'react';
import s from "./CounterNew.module.css";
import {CounterButton} from "../CounterButton/CounterButton";
import {CounterNewSettings} from "../CounterNewSettings/CounterNewSettings";
import {CounterNewScreen} from "../CounterNewScreen/CounterNewScreen";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

import {
    newIncrementCounterAC, newResetCounterAC,
    newSetToLocalStorageAC,
    newSetValueFromLocStorageAC,
    NewStorageValuesType
} from "../../state/newCounter-reducer";


export const CounterNew = () => {

    const dispatch = useDispatch();

    const {
        setButton,
        startValue,
        maxValue,
        error,
        count
    } = useSelector<AppRootStateType, NewStorageValuesType>(state => state.newCounterSettings);

    useEffect(() => {
        let startValueStorage = localStorage.getItem('startValueNewCounter');
        let maxValueStorage = localStorage.getItem('maxValueNewCounter');
        if (startValueStorage && maxValueStorage) {
            let newStartValue = JSON.parse(startValueStorage);
            let newMaxValue = JSON.parse(maxValueStorage);
            dispatch(newSetValueFromLocStorageAC(newStartValue, newMaxValue))
        }

    }, [])

    const setToLocalStorage = () => {
        dispatch(newSetToLocalStorageAC());
    }


    const incrementCounter = () => {
        dispatch(newIncrementCounterAC());
    }
    const resetCounter = () => {
        dispatch(newResetCounterAC());
    }

    return (
        <div className={s.counter}>
            <div className={s.counter__board}>
                {setButton ?
                    <CounterNewSettings/> :
                    <CounterNewScreen/>
                }
            </div>
            <div className={s.counter__buttonBlock}>
                {!setButton && <>
                    <CounterButton name={"inc"}
                                   callback={incrementCounter}
                                   disabled={count >= maxValue}
                    />
                    <CounterButton name={"reset"}
                                   callback={resetCounter}
                                   disabled={count === startValue}
                    />
                </>}
                <CounterButton name={"set"}
                               callback={setToLocalStorage}
                               disabled={error !== ''}
                />
            </div>
        </div>
    );
};


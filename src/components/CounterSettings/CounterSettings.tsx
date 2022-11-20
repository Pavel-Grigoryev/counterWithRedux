import React, {useEffect} from "react";
import s from "./CounterSettings.module.css"
import {CounterButton} from "../CounterButton/CounterButton";
import {CounterInput} from "../CounterInput/CounterInput";
import {
    setMaxValueAC,
    setStartValueAC, setToLocalStorageAC,
    setValueFromLocStorageAC,
    StorageValuesType
} from "../../state/counter-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

export const CounterSettings = () => {

    const dispatch = useDispatch();

    const counterSettings = useSelector<AppRootStateType, StorageValuesType>(state => state.counterSettings);

    const {startValue, maxValue, buttonValue, error} = counterSettings;

    const setStartValue = (num: string) => {
        dispatch(setStartValueAC(+num));
    }

    const setMaxValue = (num: string) => {
        dispatch(setMaxValueAC(+num));
    }

    useEffect(() => {
        let startValueStorage = localStorage.getItem('startValue');
        let maxValueStorage = localStorage.getItem('maxValue');
        if (startValueStorage && maxValueStorage) {
            let newStartValue = JSON.parse(startValueStorage);
            let newMaxValue = JSON.parse(maxValueStorage);
            dispatch(setValueFromLocStorageAC(+newStartValue, +newMaxValue));
        }

    }, [])

    const setToLocalStorage = () => {
        dispatch(setToLocalStorageAC());
        localStorage.setItem('startValue', JSON.stringify(startValue));
        localStorage.setItem('maxValue', JSON.stringify(maxValue));
    }

    return (
        <div className={s.counterSet}>
            <div className={s.counterSet__board}>
                <CounterInput labelName={'max value:'}
                              onChangeNumber={setMaxValue}
                              value={maxValue}
                              errorInp={counterSettings.maxValue <= 1 || maxValue <= startValue}
                />
                <CounterInput labelName={'min value:'}
                              onChangeNumber={setStartValue}
                              value={startValue}
                              errorInp={startValue < 0 || maxValue <= startValue}

                />
            </div>
            <div className={s.counter__buttonBlock}>
                <CounterButton name={"set"}
                               callback={setToLocalStorage}
                               disabled={error !== '' || buttonValue === ''}
                />
            </div>
            </div>
    );
}
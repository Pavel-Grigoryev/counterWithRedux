import React from "react";
import {CounterInput} from "../CounterInput/CounterInput";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {newSetMaxValueAC, newSetStartValueAC, NewStorageValuesType} from "../../state/newCounter-reducer";


export const CounterNewSettings = () => {

    const dispatch = useDispatch();

    const {maxValue, startValue} = useSelector<AppRootStateType, NewStorageValuesType>(state => state.newCounterSettings);

    const setStartValue = (num: string) => {
        dispatch(newSetStartValueAC(+num));
    }

    const setMaxValue = (num: string) => {
        dispatch(newSetMaxValueAC(+num));
    }


    return (
        <>
            <CounterInput labelName={'max value:'}
                          onChangeNumber={setMaxValue}
                          value={maxValue}
                          errorInp={maxValue <= 1 || maxValue <= startValue}
            />
            <CounterInput labelName={'min value:'}
                          onChangeNumber={setStartValue}
                          value={startValue}
                          errorInp={startValue < 0 || maxValue <= startValue}

            />
        </>
    );
}
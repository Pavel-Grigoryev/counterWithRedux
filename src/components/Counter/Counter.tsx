import React from 'react';
import s from './Counter.module.css';
import {CounterSettings} from "../CounterSettings/CounterSettings";
import {CounterScreen} from "../CounterScreen/CounterScreen";

function Counter() {
    return (
        <div className={s.counter}>
            <CounterSettings/>
            <CounterScreen/>
        </div>
    );
}

export default Counter;

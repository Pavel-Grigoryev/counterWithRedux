import {combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./counter-reducer";
import {newCounterReducer} from "./newCounter-reducer";


const rootReducer = combineReducers({
    counterSettings: counterReducer,
    newCounterSettings: newCounterReducer
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
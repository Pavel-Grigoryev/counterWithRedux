
export type StorageValuesType = {
    startValue: number
    maxValue: number
    count: number
    error: string
    buttonValue: string
}


const initialState: StorageValuesType = {
    startValue: 0,
    maxValue: 5,
    count: 0,
    error: '',
    buttonValue: ''
}

type SetStartValueAT = ReturnType<typeof setStartValueAC>;
type SetMaxValueAT = ReturnType<typeof setMaxValueAC>;
type SetValueFromLocStorageAT = ReturnType<typeof setValueFromLocStorageAC>;
type SetToLocalStorageAT = ReturnType<typeof setToLocalStorageAC>;
type IncrementCounterAT = ReturnType<typeof incrementCounterAC>;
type ResetCounterAT = ReturnType<typeof resetCounterAC>;

type ActionsType = SetStartValueAT | SetMaxValueAT | SetValueFromLocStorageAT | SetToLocalStorageAT | IncrementCounterAT | ResetCounterAT;

export const counterReducer = (state = initialState, action: ActionsType): StorageValuesType => {
    switch (action.type) {
        case "SET-START-VALUE": {
            let copyState = {...state};
            copyState.startValue = action.num;
            copyState.buttonValue = 'enter values and press "set"';
            if (action.num >= 0 && action.num < copyState.maxValue) {
                copyState.error = '';
            } else {
                copyState.error = 'Incorrect value!'
                copyState.buttonValue = '';
            }
            return copyState;
        }
        case "SET-MAX-VALUE": {
            let copyState = {...state};
            copyState.maxValue = action.num;
            copyState.buttonValue = 'enter values and press "set"';
            if (action.num >= 1 && action.num > copyState.startValue && copyState.startValue >= 0) {
                copyState.error = '';
            } else {
                copyState.error = 'Incorrect value!';
            }
            return copyState;
        }
        case "SET-VALUE-FROM-LOCAL-STORAGE":
            return {...state, startValue: action.startValue, maxValue: action.maxValue, count: action.startValue}
        case "SET-TO-LOCAL-STORAGE":
            return {...state, buttonValue: '', error: '', count: state.startValue}
        case "INCREMENT-COUNTER": {
            let copyState = {...state};
            state.count < state.maxValue && (copyState.count = ++copyState.count);
            return copyState;
                   }
        case "RESET-COUNTER":
            return {...state, count: state.startValue}
        default:
            return state;
    }

}

export const setStartValueAC = (num: number) => ({
    type: 'SET-START-VALUE',
    num
}) as const;

export const setMaxValueAC = (num: number) => ({
    type: 'SET-MAX-VALUE',
    num: num
}) as const;


export const setValueFromLocStorageAC = (startValue: number, maxValue: number) => ({
    type: 'SET-VALUE-FROM-LOCAL-STORAGE',
    startValue,
    maxValue
}) as const;

export const setToLocalStorageAC = () => ({
    type: 'SET-TO-LOCAL-STORAGE'
}) as const;

export const incrementCounterAC = () => ({
    type: 'INCREMENT-COUNTER'
}) as const;

export const resetCounterAC = () => ({
    type: 'RESET-COUNTER'
}) as const;




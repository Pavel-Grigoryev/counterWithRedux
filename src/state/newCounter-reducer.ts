
export type NewStorageValuesType = {
    startValue: number
    maxValue: number
    count: number
    error: string
    setButton: boolean
}


const initialState: NewStorageValuesType = {
    startValue: 0,
    maxValue: 5,
    count: 0,
    error: '',
    setButton: false
}

type NewSetStartValueAT = ReturnType<typeof newSetStartValueAC>;
type SetMaxValueAT = ReturnType<typeof newSetMaxValueAC>;
type NewSetValueFromLocStorageAT = ReturnType<typeof newSetValueFromLocStorageAC>;
type NewSetToLocalStorageAT = ReturnType<typeof newSetToLocalStorageAC>;
type NewIncrementCounterAT = ReturnType<typeof newIncrementCounterAC>;
type NewResetCounterAT = ReturnType<typeof newResetCounterAC>;

type ActionsType = NewSetStartValueAT | SetMaxValueAT | NewSetValueFromLocStorageAT | NewSetToLocalStorageAT | NewIncrementCounterAT | NewResetCounterAT;

export const newCounterReducer = (state = initialState, action: ActionsType): NewStorageValuesType => {
    switch (action.type) {
        case "NEW-SET-START-VALUE": {
            let copyState = {...state};
            copyState.startValue = action.num;
            if (action.num >= 0 && action.num < copyState.maxValue) {
                copyState.error = '';
            } else {
                copyState.error = 'Incorrect value!'
            }
            return copyState;
        }
        case "NEW-SET-MAX-VALUE": {
            let copyState = {...state};
            copyState.maxValue = action.num;
            if (action.num >= 1 && action.num > copyState.startValue && copyState.startValue >= 0) {
                copyState.error = '';
            } else {
                copyState.error = 'Incorrect value!';
            }
            return copyState;
        }
        case "NEW-SET-VALUE-FROM-LOCAL-STORAGE":
            return {...state, startValue: action.startValue, maxValue: action.maxValue, count: action.startValue}
        case "NEW-SET-TO-LOCAL-STORAGE":
            return {...state, setButton: !state.setButton, error: '', count: state.startValue}
        case "NEW-INCREMENT-COUNTER": {
            let copyState = {...state};
            state.count < state.maxValue && (copyState.count = ++copyState.count);
            return copyState;
                   }
        case "NEW-RESET-COUNTER":
            return {...state, count: state.startValue}
        default:
            return state;
    }


}
export const newSetStartValueAC = (num: number) => ({
    type: 'NEW-SET-START-VALUE',
    num
}) as const;

export const newSetMaxValueAC = (num: number) => ({
    type: 'NEW-SET-MAX-VALUE',
    num: num
}) as const;


export const newSetValueFromLocStorageAC = (startValue: number, maxValue: number) => ({
    type: 'NEW-SET-VALUE-FROM-LOCAL-STORAGE',
    startValue,
    maxValue
}) as const;

export const newSetToLocalStorageAC = () => ({
    type: 'NEW-SET-TO-LOCAL-STORAGE'
}) as const;

export const newIncrementCounterAC = () => ({
    type: 'NEW-INCREMENT-COUNTER'
}) as const;

export const newResetCounterAC = () => ({
    type: 'NEW-RESET-COUNTER'
}) as const;




import { createStore } from 'redux';
import { Reducer, intialState } from './reducer';


export const ConfigureStore = () => {
    const store = createStore(
        Reducer, // reducer
        intialState,  // the intial state
    );
    return store;


}


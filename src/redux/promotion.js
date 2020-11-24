import * as ActionTyes from './ActionTypes';

export const Promotions = (state = {errMess: null,
                                    isLoading:true,
                                    promotions:[]}, action) => {
    switch (action.type) {
        case ActionTyes.PROMOS_LOADING:
            return {...state, isLoading:true, errMess: null, promotions:[] };
        case ActionTyes.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, promotions:[]};
        case ActionTyes.ADD_PROMOS:
            return {...state, isLoading: false, errMess: null, promotions:action.payload};

        default:
            return state;
    }
}
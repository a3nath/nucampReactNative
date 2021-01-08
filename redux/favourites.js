import { concat } from 'react-native-reanimated';
import * as ActionTypes from './ActionTypes';

export const favourites = (state= [], action) => {
    switch(action.type){
        case ActionTypes.ADD_FAVOURITE:
             if (state.includes(action.payload)) {
                return state
             }
            return state.concat(action.payload);
        default:
            return state;
    }
} 
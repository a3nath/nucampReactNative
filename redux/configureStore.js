import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import {favourites} from './favourites'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites,
            comments,
            promotions,
            partners,
            favourites
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
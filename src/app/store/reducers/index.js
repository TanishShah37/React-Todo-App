import {combineReducers} from 'redux';
import app from './app';
import auth from 'app/auth/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        app,
        ...asyncReducers
    });

export default createReducer;

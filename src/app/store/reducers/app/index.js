import {combineReducers} from 'redux';
import navigation from './navigation.reducer';
import settings from './settings.reducer';
import message from './message.reducer';
import dialog from './dialog.reducer';
import routes from './routes.reducer';

const AppReducers = combineReducers({
    navigation,
    settings,
    message,
    dialog,
    routes
});

export default AppReducers;

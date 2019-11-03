import Login from './Login';
import {authRoles} from 'app/auth';

export const LoginConfig = {
    settings: {
        layout: {
            config: {
                toolbar       : {
                    display: false
                },
            }
        }
    },
    auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/',
            component: Login
        }
    ]
};


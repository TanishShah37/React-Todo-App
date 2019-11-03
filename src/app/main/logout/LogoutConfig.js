import {authRoles} from 'app/auth';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions';

export const LogoutConfig = {
    auth  : authRoles.user,
    routes: [
        {
            path     : '/logout',
            component: () => {
                document.location.href = '/login';
                store.dispatch(logoutUser());
                return 'Logging out..'
            }
        }
    ]
};
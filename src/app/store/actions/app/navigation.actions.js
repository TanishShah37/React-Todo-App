import {Utils} from '@app';

export const GET_NAVIGATION = '[NAVIGATION] GET NAVIGATION';
export const SET_NAVIGATION = '[NAVIGATION] SET NAVIGATION';
export const RESET_NAVIGATION = '[NAVIGATION] RESET NAVIGATION';

export function getNavigation()
{
    return {
        type: GET_NAVIGATION
    }
}

export function setNavigation(navigation)
{
    return {
        type: SET_NAVIGATION,
        navigation
    }
}

export function resetNavigation()
{
    return {
        type: RESET_NAVIGATION
    }
}

export function appendNavigationItem(item, parentId)
{
    return (dispatch, getState) => {
        const {navigation} = getState().fuse;
        return dispatch({
            type      : SET_NAVIGATION,
            navigation: Utils.appendNavItem(navigation, item, parentId)
        });
    }
}

export function prependNavigationItem(item, parentId)
{
    return (dispatch, getState) => {
        const {navigation} = getState().fuse;
        return dispatch({
            type      : SET_NAVIGATION,
            navigation: Utils.prependNavItem(navigation, item, parentId)
        });
    }
}

export function updateNavigationItem(id, item)
{
    return (dispatch, getState) => {
        const {navigation} = getState().fuse;
        return dispatch({
            type      : SET_NAVIGATION,
            navigation: Utils.updateNavItem(navigation, id, item)
        });
    }
}

export function removeNavigationItem(id)
{
    return (dispatch, getState) => {
        const {navigation} = getState().fuse;
        return dispatch({
            type      : SET_NAVIGATION,
            navigation: Utils.removeNavItem(navigation, id)
        });
    }
}

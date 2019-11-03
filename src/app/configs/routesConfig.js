import React from 'react';
import {Redirect} from 'react-router-dom';
import {Utils} from '@app';
import {appsConfigs} from 'app/main/apps/appsConfigs';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';

const routeConfigs = [
    ...appsConfigs,
    LoginConfig,
    LogoutConfig,
];

const routes = [
    ...Utils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/"/>
    },
];

export default routes;

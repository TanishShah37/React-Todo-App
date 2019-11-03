import React from 'react';
import {Redirect} from 'react-router-dom';

export const TodoAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : [
                '/todo/label/:labelHandle/:todoId?',
                '/todo/filter/:filterHandle/:todoId?',
                '/todo/:folderHandle/:todoId?'
            ],
            component: React.lazy(() => import('./TodoApp'))
        },
        {
            path     : '/todo',
            component: () => <Redirect to="/todo/all"/>
        }
    ]
};

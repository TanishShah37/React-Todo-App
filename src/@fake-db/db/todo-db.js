import mock from '../mock';

const todoDB = {
    todos  : [
        {
            'id'       : '561551bd7fe2ff461101c192',
            'title'    : 'New FrontEnd Module Development',
            'notes'    : 'Module Description',
            'startDate': new Date(2019, 11, 3),
            'dueDate'  : new Date(2019, 11, 5),
            'completed': false,
            'starred'  : false,
            'important': true,
            'deleted'  : false,
            'labels'   : [1]
        },
        {
            'id'       : '561551bd4ac1e7eb77a3a750',
            'title'    : 'Scale EC2 instances and add cloudwatch monitoring on Grafana',
            'notes'    : 'EC2 and Grafana',
            'startDate': new Date(2019, 4, 3),
            'dueDate'  : new Date(2019, 4, 5),
            'completed': false,
            'starred'  : false,
            'important': true,
            'deleted'  : false,
            'labels'   : [2]
        },
        {
            'id'       : '561551bd917bfec2ddef2d49',
            'title'    : 'ElasticSearch Down Time issue',
            'notes'    : 'ElasticSearch Down Time',
            'startDate': new Date(2019, 5, 3),
            'dueDate'  : new Date(2019, 5, 5),
            'completed': false,
            'starred'  : true,
            'important': true,
            'deleted'  : false,
            'labels'   : [4]
        },

    ],
    folders: [
        {
            'id'    : 0,
            'handle': 'all',
            'title' : 'All',
            'icon'  : 'view_headline'
        }
    ],
    filters: [
        {
            'id'    : 0,
            'handle': 'starred',
            'title' : 'Starred',
            'icon'  : 'star'
        },
        {
            'id'    : 1,
            'handle': 'important',
            'title' : 'Priority',
            'icon'  : 'error'
        },
        {
            'id'    : 3,
            'handle': 'today',
            'title' : 'Today',
            'icon'  : 'today'
        },
        {
            'id'    : 4,
            'handle': 'completed',
            'title' : 'Done',
            'icon'  : 'check'
        },
        {
            'id'    : 5,
            'handle': 'deleted',
            'title' : 'Deleted',
            'icon'  : 'delete'
        }
    ],
    labels : [
        {
            'id'    : 1,
            'handle': 'frontend',
            'title' : 'Frontend',
            'color' : '#31111E3C'
        },
        {
            'id'    : 2,
            'handle': 'backend',
            'title' : 'Backend',
            'color' : '#F44336'
        },
        {
            'id'    : 3,
            'handle': 'api',
            'title' : 'API',
            'color' : '#FF91100'
        },
        {
            'id'    : 4,
            'handle': 'issue',
            'title' : 'Issue',
            'color' : '#0091EA'
        },
        {
            'id'    : 5,
            'handle': 'mobile',
            'title' : 'Mobile',
            'color' : '#9C27B0'
        }
    ]
};

mock.onGet('/api/todo-app/todos').reply((config) => {
    const params = config.params;
    let response = [];
    if ( params.labelHandle )
    {
        const labelId = todoDB.labels.find(label => label.handle === params.labelHandle).id;

        response = todoDB.todos.filter((todo) => todo.labels.includes(labelId) && !todo.deleted);
    }
    else if ( params.filterHandle )
    {
        if ( params.filterHandle === 'deleted' )
        {
            response = todoDB.todos.filter((todo) => todo.deleted);
        }
        else
        {
            response = todoDB.todos.filter((todo) => todo[params.filterHandle] && !todo.deleted);
        }
    }
    else
    {
        let folderHandle = params.folderHandle;
        if ( !folderHandle )
        {
            folderHandle = 'all';
        }

        if ( folderHandle === 'all' )
        {
            response = todoDB.todos.filter((todo) => !todo.deleted);
        }
        else
        {
            const folderId = todoDB.folders.find(folder => folder.handle === folderHandle).id;
            response = todoDB.todos.filter((todo) => todo.folder === folderId && !todo.deleted);
        }
    }

    return [200, response];
});

mock.onPost('/api/todo-app/update-todo').reply((request) => {
    const todo = JSON.parse(request.data);

    todoDB.todos = todoDB.todos.map((_todo) => {
        if ( _todo.id === todo.id )
        {
            return todo;
        }
        return _todo;
    });

    return [200, todo];
});

mock.onPost('/api/todo-app/new-todo').reply((request) => {
    const todo = JSON.parse(request.data);

    todoDB.todos = [
        todo,
        ...todoDB.todos
    ];

    return [200, todo];
});

mock.onPost('/api/todo-app/remove-todo').reply((request) => {
    const todoId = request.data;
    todoDB.todos = todoDB.todos.map((_todo) => {
        if ( _todo.id === todoId )
        {
            _todo.deleted = true
        }
        return _todo;
    });
    return [200, todoId];
});

mock.onGet('/api/todo-app/filters').reply(200, todoDB.filters);
mock.onGet('/api/todo-app/labels').reply(200, todoDB.labels);
mock.onGet('/api/todo-app/folders').reply(200, todoDB.folders);


mock.onPost('/api/todo-app/set-folder').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedTodoIds, folderId} = data;
    todoDB.todos = todoDB.todos.map((_todo) => {

        if ( selectedTodoIds.includes(_todo.id) )
        {
            return {
                ..._todo,
                folder: folderId
            };
        }
        return _todo;
    });

    return [200];
});

mock.onPost('/api/todo-app/toggle-label').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedTodoIds, labelId} = data;
    todoDB.todos = todoDB.todos.map((_todo) => {
        if ( selectedTodoIds.includes(_todo.id) )
        {
            return {
                ..._todo,
                labels: _todo.labels.includes(labelId) ? _todo.labels.filter(_id => _id !== labelId) : [..._todo.labels, labelId]
            };
        }
        return _todo;
    });

    return [200];
});
mock.onPost('/api/todo-app/delete-todos').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedTodoIds} = data;
    todoDB.todos = todoDB.todos.filter((_todo) => selectedTodoIds.includes(_todo.id) ? false : _todo);
    return [200];
});

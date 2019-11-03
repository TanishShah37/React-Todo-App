const navigationConfig = [
    {
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
         
            {
                'id'   : 'todo',
                'title': 'To-Do',
                'type' : 'item',
                'icon' : 'check_box',
                'url'  : '/todo',
                'badge': {
                    'title': 3,
                    'bg'   : 'rgb(255, 111, 0)',
                    'fg'   : '#FFFFFF'
                }
            },
        ]
    },
];

export default navigationConfig;

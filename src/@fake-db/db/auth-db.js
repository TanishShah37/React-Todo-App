import mock from '../mock';
import _ from '@lodash';
import jwt from 'jsonwebtoken';

const jwtConfig = {
    "secret"   : "some-secret-code-goes-here",
    "expiresIn": "2 days"
};

let authDB = {
    users: [
        {
            uuid    : 'XgbuVEXBU6gtSKdbTYR1Zbbby1i3',
            from    : 'custom-db',
            password: "fractalanalytics",
            role    : "test",
            data    : {
                'displayName': 'Test User',
                'photoURL'   : 'assets/images/avatars/Arnold.jpg',
                'email'      : 'testuser@fractalanalytics.com',
                settings     : {
                    layout          : {
                        style : 'layout',
                        config: {
                            mode   : 'boxed',
                            scroll : 'content',

                            toolbar: {
                                display : true,
                                position: 'below'
                            },
                        
                        }
                    },
                    customScrollbars: true,
                    theme           : {
                        main   : 'greeny',
                        navbar : 'mainThemeDark',
                        toolbar: 'mainThemeDark',
                    }
                },
            }
        }
    ]
};

mock.onGet('/api/auth').reply((config) => {
    const data = JSON.parse(config.data);
    const {email, password} = data;

    const user = _.cloneDeep(authDB.users.find(_user => _user.data.email === email));

    const error = {
        email   : user ? null : 'Check your username/email',
        password: user && user.password === password ? null : 'Check your password'
    };

    if ( !error.email && !error.password && !error.displayName )
    {
        delete user['password'];

        const access_token = jwt.sign({id: user.uuid}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});

        const response = {
            "user"        : user,
            "access_token": access_token
        };
        document.location.href = '/todo/all';
        return [200, response];
    }
    else
    {
        return [200, {error}];
    }
});

mock.onGet('/api/auth/access-token').reply((config) => {
    const data = JSON.parse(config.data);
    const {access_token} = data;

    try
    {
        const {id} = jwt.verify(access_token, jwtConfig.secret);

        const user = _.cloneDeep(authDB.users.find(_user => _user.uuid === id));
        delete user['password'];

        const updatedAccessToken = jwt.sign({id: user.uuid}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});

        const response = {
            "user"        : user,
            "access_token": updatedAccessToken
        };

        return [200, response];
    } catch ( e )
    {
        const error = "Invalid access token detected";
        return [401, {error}];
    }
});
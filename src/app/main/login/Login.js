import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {ReactAnimate} from '@app';
import clsx from 'clsx';
import LoginTab from './LoginTab';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
}));

function Login()
{
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <ReactAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="https://i2.wp.com/fractal.ai/wp-content/uploads/2018/02/header-logo.png?fit=126%2C43&ssl=1" alt="logo"/>
                </ReactAnimate>

                <ReactAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        React Todo App!
                    </Typography>
                </ReactAnimate>
            </div>

            <ReactAnimate animation={{translateX: [0, '100%']}}>
                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                        <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN</Typography>
                        <LoginTab/>
                    </CardContent>
                </Card>
            </ReactAnimate>
        </div>
    )
}

export default Login;

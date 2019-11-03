import React from 'react';
import {AppBar,Toolbar} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import UserMenu from 'app/layouts/shared-components/UserMenu';
import {useSelector} from 'react-redux';

function ToolbarLayout(props)
{
    const toolbarTheme = useSelector(({app}) => app.settings.toolbarTheme);

    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar id="app-toolbar" className="flex relative z-10" color="default">
                <Toolbar className="p-0">
                    <div className="flex flex-1">
                    </div>
                    <div className="flex">
                        <UserMenu/>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default ToolbarLayout;

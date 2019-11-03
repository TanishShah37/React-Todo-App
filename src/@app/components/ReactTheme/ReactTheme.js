import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {useSelector} from 'react-redux';

function ReactTheme(props)
{
    const mainTheme = useSelector(({app}) => app.settings.mainTheme);

    // console.warn('ReactTheme:: rendered',mainTheme);
    return (
        <ThemeProvider theme={mainTheme}>
            {props.children}
        </ThemeProvider>
    )
}

export default React.memo(ReactTheme);

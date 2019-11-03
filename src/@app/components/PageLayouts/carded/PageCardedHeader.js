import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {useSelector} from 'react-redux';

function PageCardedHeader(props)
{
    const mainThemeDark = useSelector(({app}) => app.settings.mainThemeDark);

    return (
        <div className={props.classes.header}>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    {props.header}
                </ThemeProvider>
            )}
        </div>
    )
}

export default PageCardedHeader;

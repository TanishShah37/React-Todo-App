import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {ScrollBars} from '@app';
import clsx from 'clsx';
import {useSelector} from 'react-redux';

function PageCardedSidebarContent(props)
{
    const mainThemeDark = useSelector(({app}) => app.settings.mainThemeDark);

    const classes = props.classes;

    return (
        <React.Fragment>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    <div className={clsx(classes.sidebarHeader, props.variant)}>
                        {props.header}
                    </div>
                </ThemeProvider>
            )}

            {props.content && (
                <ScrollBars className={classes.sidebarContent} enable={props.innerScroll}>
                    {props.content}
                </ScrollBars>
            )}
        </React.Fragment>
    )
}

export default PageCardedSidebarContent;

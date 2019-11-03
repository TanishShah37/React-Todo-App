import React, {useContext} from 'react';
import {renderRoutes} from 'react-router-config'
import {ScrollBars, Message, DialogBox, ReactSuspense} from '@app';
import {makeStyles} from '@material-ui/styles';
import {useSelector} from 'react-redux';
import ToolbarLayout from './components/ToolbarLayout';
import clsx from 'clsx';
import AppContext from 'app/AppContext';

const useStyles = makeStyles(theme => ({
    root          : {
        position          : 'relative',
        display           : 'flex',
        flexDirection     : 'row',
        width             : '100%',
        height            : '100%',
        overflow          : 'hidden',
        backgroundColor   : theme.palette.background.default,
        color             : theme.palette.text.primary,
        '&.boxed'         : {
            maxWidth : 1280,
            margin   : '0 auto',
            boxShadow: theme.shadows[3]
        },
        '&.scroll-body'   : {
            '& $wrapper'       : {
                height  : 'auto',
                flex    : '0 0 auto',
                overflow: 'auto'
            },
            '& $contentWrapper': {},
            '& $content'       : {}
        },
        '&.scroll-content': {
            '& $wrapper'       : {},
            '& $contentWrapper': {},
            '& $content'       : {}
        },
        '& .navigation'   : {
            '& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            },
        }
    },
    wrapper       : {
        display : 'flex',
        position: 'relative',
        width   : '100%',
        height  : '100%',
        flex    : '1 1 auto',
    },
    contentWrapper: {
        display      : 'flex',
        flexDirection: 'column',
        position     : 'relative',
        zIndex       : 3,
        overflow     : 'hidden',
        flex         : '1 1 auto'
    },
    content       : {
        position                    : 'relative',
        display                     : 'flex',
        overflow                    : 'auto',
        flex                        : '1 1 auto',
        flexDirection               : 'column',
        width                       : '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex                      : 2
    }
}));

function Layout(props)
{
    const config = useSelector(({app}) => app.settings.current.layout.config);

    const appContext = useContext(AppContext);
    const classes = useStyles(props);
    const {routes} = appContext;

    // console.warn('appLayout:: rendered');

    switch ( config.scroll )
    {
        case 'body':
        {
            return (
                <div id="app-layout" className={clsx(classes.root, config.mode, 'scroll-' + config.scroll)}>

                 

                    <div className="flex flex-1 flex-col overflow-hidden relative">

                        {config.toolbar.display && config.toolbar.style === 'fixed' && config.toolbar.position === 'above' && (
                            <ToolbarLayout/>
                        )}

                        <ScrollBars className="overflow-auto" scrollToTopOnChildChange>

                            {config.toolbar.display && config.toolbar.style !== 'fixed' && config.toolbar.position === 'above' && (
                                <ToolbarLayout/>
                            )}

                            <div className={classes.wrapper}>

                               

                                <div className={classes.contentWrapper}>

                                    {config.toolbar.display && config.toolbar.position === 'below' && (
                                        <ToolbarLayout/>
                                    )}

                                    <div className={classes.content}>

                                        <DialogBox/>

                                       
                                            {renderRoutes(routes)}
                                    

                                        {props.children}

                                    </div>



                                </div>

                               
                            </div>

                           

                        </ScrollBars>

                     

                    </div>

                  

                    <Message/>

                </div>
            );
        }
        case 'content':
        default:
        {
            return (
                <div id="app-layout" className={clsx(classes.root, config.mode, 'scroll-' + config.scroll)}>
                

                    <div className="flex flex-1 flex-col overflow-hidden relative">

                        {config.toolbar.display && config.toolbar.position === 'above' && (
                            <ToolbarLayout/>
                        )}

                        <div className={classes.wrapper}>

                          

                            <div className={classes.contentWrapper}>
                                {config.toolbar.display && config.toolbar.position === 'below' && config.toolbar.style === 'fixed' && (
                                    <ToolbarLayout/>
                                )}

                                <ScrollBars className={classes.content} scrollToTopOnChildChange>
                                    {config.toolbar.display && config.toolbar.position === 'below' && config.toolbar.style !== 'fixed' && (
                                        <ToolbarLayout/>
                                    )}

                                    <DialogBox/>

                                    <ReactSuspense>
                                        {renderRoutes(routes)}
                                    </ReactSuspense>

                                    {props.children}

                                 
                                </ScrollBars>



                            </div>

                          
                        </div>

                       
                    </div>

                    <Message/>
                </div>
            )
        }
    }
}

export default Layout;

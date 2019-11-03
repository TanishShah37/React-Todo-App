import React from 'react';
import {Icon} from '@material-ui/core';
import {ReactAnimate} from '@app';

function TodoSidebarHeader()
{

    return (
        <div className="flex flex-col justify-center h-full p-24">

            <div className="flex items-center flex-1">
                <ReactAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-16">check_box</Icon>
                </ReactAnimate>
                <ReactAnimate animation="transition.slideLeftIn" delay={300}>
                    <span className="text-24">To-Do</span>
                </ReactAnimate>
            </div>
        </div>
    );
}

export default TodoSidebarHeader;

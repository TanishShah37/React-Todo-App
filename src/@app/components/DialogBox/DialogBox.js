import React from 'react';
import {Dialog} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/store/actions';

function DialogBox(props)
{
    const dispatch = useDispatch();
    const state = useSelector(({app}) => app.dialog.state);
    const options = useSelector(({app}) => app.dialog.options);

    return (
        <Dialog
            open={state}
            onClose={ev => dispatch(Actions.closeDialog())}
            aria-labelledby="app-dialog-title"
            {...options}
        />
    );
}

export default DialogBox;

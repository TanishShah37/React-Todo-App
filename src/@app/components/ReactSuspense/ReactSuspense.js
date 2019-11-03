import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Typography, LinearProgress} from '@material-ui/core';
import {useTimeout} from '@app/hooks';
/**
 * React Suspense defaults
 * For to Avoid Repetition
 *
 */

function Loading(props)
{
    const [showLoading, setShowLoading] = useState(!props.delay);

    useTimeout(() => {
        setShowLoading(true);
    }, props.delay);

    if ( !showLoading )
    {
        return null;
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
            <LinearProgress className="w-xs" color="secondary"/>
        </div>
    );
}

Loading.propTypes = {
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

Loading.defaultProps = {
    delay: false
};


function ReactSuspense(props)
{
    return (
        <React.Suspense fallback={<Loading {...props.loadingProps} />}>
            {props.children}
        </React.Suspense>
    );
}

ReactSuspense.propTypes = {
    loadingProps: PropTypes.object,
};

ReactSuspense.defaultProps = {
    loadingProps: {
        delay: 300
    }
};

export default ReactSuspense;

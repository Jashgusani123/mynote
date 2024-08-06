import React from 'react'

const Alert = (props) => {
    const {alert} = props;
    return (
        <div className={`alert alert-${alert.type}`} role="alert">
           {alert.text}
        </div>
    )
}

export default Alert
import React from 'react';
import ReactDOM from 'react-dom';

export default function Alert (props) {
    // success, info, warning, danger
    const type = props.type
    const message = props.message
    const container = props.container

    function closeAlert () {
        ReactDOM.unmountComponentAtNode(container)
    }

    setTimeout(closeAlert, 5000);
    
    return (
        <div className={`alert alert-${type}`} role="alert">
            <strong>{(type === "info" && "Info:") || (type === "warning" && "Atenção!") || (type === "danger" && "Erro:")}</strong> {message}
        </div>
    );
}
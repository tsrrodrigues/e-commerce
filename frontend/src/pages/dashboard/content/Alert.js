import React from 'react';

export default function Alert (props) {
    // success, info, warning, danger
    const type = props.type
    const message = props.message
    
    return (
        <div className={`alert alert-${type}`} role="alert">
            <strong>{(type === "info" && "Info:") || (type === "warning" && "Atenção!") || (type === "danger" && "Erro:")}</strong> {message}
        </div>
    );
}
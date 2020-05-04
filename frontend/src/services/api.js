import React from 'react';
import ReactDOM from 'react-dom';

import Alert from './alert';

import axios from 'axios';

const api = axios.create ({
    baseURL: 'http://localhost:3000',
})

const isSuccessHandlerEnabled = (config = {}) => {
    return config.successHandler ? true : false
}

const isErrorHandlerEnabled = (config = {}) => {
    return config.errorHandler ? true : false
}

const successHandler = (response) => {
    if (isSuccessHandlerEnabled(response.config)) {
        const container = document.getElementById('info-div')

        const type = "success"
        const message = "As alterações foram salvas."

        ReactDOM.render(<Alert type={type} message={message} container={container} />, container)
    }

    return response
}

const errorHandler = (error) => {
    if (isErrorHandlerEnabled(error.config)) {
        const container = document.getElementById('info-div')

        let type
        let message

        if (error.response) {
            type = "danger"
            message = error.response.data.error

        } else if (error.request) {
            type = "warning"
            message = "Não foi possível se conectar ao servidor."

        } else {
            type = "danger"
            message = error.message
        }

        ReactDOM.render(<Alert type={type} message={message} container={container} />, container)
    }

    return Promise.reject(error)
}

api.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)

export default api;
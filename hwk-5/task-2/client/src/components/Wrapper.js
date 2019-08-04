import React, { Component } from 'react'
import App from '../containers/appContainer';

export default class Wrapper extends Component {
    render() {
        return (
            <div className="wrapper">
                <App />
            </div>
        )
    }
}
import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class toastr extends Component {
    render() {
        return (
            <div>
                <ToastContainer />
            </div>
        )
    }
}

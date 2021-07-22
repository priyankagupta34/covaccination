import React, { Component } from 'react'
import './ErrorModalPopupComponent.css'

export default class ErrorModalPopupComponent extends Component {
    render() {
        const { errorMessage, closeError, errortype } = this.props;
        return (
            <div className="errobody">
                <div className="errops">
                    <div className="relative">

                        <div className="move"></div>
                        <div className="moveIcon">
                            {errortype === 'success' ? <i className="material-icons  material-icons-outlined vimicon" style={{ color: 'green' }}>task_alt</i> : <></>}
                            {errortype === 'error' ? <i className="material-icons  material-icons-outlined vimicon" style={{ color: 'red' }}>error_outline</i> : <></>}
                            {errortype === 'info' ? <i className="material-icons  material-icons-outlined vimicon" style={{ color: 'skyblue' }}>priority_high</i> : <></>}
                        </div>
                        <div className="errder">{errorMessage}</div>
                        <div className="bnahyts">
                            <button className="closgh" onClick={closeError}>Close</button>
                        </div>
                        <div className="infoer">Make sure to use chrome in windows/android only</div>
                    </div>
                </div>
            </div>
        )
    }
}

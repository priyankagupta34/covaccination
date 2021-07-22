import React, { Component } from 'react'
import './TitleNIconCcomponent.css'

export default class TitleNIconCcomponent extends Component {
    render() {
        const { icon, title, description } = this.props;
        return (
            <div className="bv4s">
                <div className="icmdiv1"><i className="material-icons  material-icons-outlined icmns">{icon}</i></div>
                <div className="icmdiv2">{title}</div>
                <div className="icmdiv3">{description}</div>
            </div>
        )
    }
}

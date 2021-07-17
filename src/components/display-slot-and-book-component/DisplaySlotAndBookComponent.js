import React, { Component } from 'react'
import './DisplaySlotAndBookComponent.css'
// import { beneficiaries } from '../../services/test'

export default class DisplaySlotAndBookComponent extends Component {
    render() {
        const { beneficiaries} = this.props;
        const { selectedCenter, selectedSession } = this.props;
        console.log('this.props', this.props);
        console.log(beneficiaries, selectedSession);
        return (
            <div>
                <div>
                    <div>Name</div>
                    <div>{selectedCenter.name}</div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
// import { beneficiaries } from '../../services/test'
import './BeneficiariesListCcomponent.css'

export default class BeneficiariesListCcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFull: -1
        }
    }

    expandDetails(showFull, e) {
        console.log(e);
        this.setState({
            ...this.state,
            showFull: this.state.showFull===showFull?-1:showFull
        })
    }
    render() {
        const {beneficiaries} = this.props;
        console.log('beneficiaries', beneficiaries);
        const { showFull } = this.state;

        return (
            <div>
                <div className="nmag">Found<b> {beneficiaries.length} </b>beneficiaries linked with this Number</div>
                {beneficiaries.map((item, index) => (
                    <div>
                        <div className="titlbenf1">
                            <div>{item.name}</div>
                            <div>{item.vaccination_status}</div>
                            <span className={`${showFull === index ? 'turna' : 'turnb'}`} onClick={this.expandDetails.bind(this,index)}>&#5123;</span>
                        </div>
                        {showFull === index ?
                            <div className="titlbenf2">

                                <div>
                                    <div>Birth Year: {item.birth_year}</div>
                                    <div>Gender: {item.gender}</div>
                                    <div>Vaccine: {item.vaccine}</div>
                                </div>

                                {item.appointments.length !== 0 ?
                                    <div>
                                        {item.appointments.map((appo) => (
                                            <div>

                                                <div className="dose4f">Dose: {appo.dose}</div>

                                                <div>Center: {appo.name}, {appo.block_name}, {appo.block_name}</div>
                                                <div>Date of vaccination: {appo.date}</div>
                                                <div>Slot of Vaccination: {appo.slot}</div>
                                            </div>
                                        ))}

                                        
                                    </div>
                                    :
                                    <></>
                                }

                            </div>
                            : <></>}
                    </div>
                ))}
            </div>
        )
    }
}

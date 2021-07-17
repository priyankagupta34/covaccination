import React, { Component } from 'react'
import { beneficiaries } from '../../services/test'
import './BeneficiariesListCcomponent.css'

export default class BeneficiariesListCcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFull: 0
        }
    }

    expandDetails(showFull, e) {
        console.log(e);
        this.setState({
            ...this.state,
            showFull: this.state.showFull === showFull ? -1 : showFull
        })
    }
    render() {
        // const {beneficiaries} = this.props;
        // console.log('beneficiaries', beneficiaries);
        const { showFull } = this.state;

        return (
            <div>
                {/* <div className="nmag">Found<b> {beneficiaries.length} </b>beneficiaries linked with this Number</div> */}
                {beneficiaries.map((item, index) => (
                    <div className="relative">
                        <div className="titlbenf1">
                            <div>{item.name}<span className="bonji"><small className="extras voicet kwid"><b>REF ID :</b>{item.beneficiary_reference_id}</small><small className="extras voicet"><b>Secret:</b> <span className="deng">{item.beneficiary_reference_id.slice(-4)}</span></small></span></div>
                            <div className="flexg">
                            <div className={`tben1 ${item.vaccination_status === 'Vaccinated' && 'vaccinated'}  ${item.vaccination_status === 'Not Vaccinated' && 'notvaccinated'}  ${item.vaccination_status === 'Partially Vaccinated' && 'partiallyvaccinated'} `}>
                                {item.vaccination_status}
                            </div>
                            <span className={`${showFull === index ? 'turna' : 'turnb'} vots`} onClick={this.expandDetails.bind(this, index)}>&#5123;</span>
                            </div>
                        </div>
                        {showFull === index ?
                            <div className="titlbenf2">

                                <div className="myinf">
                                    <div className="ops opk"><b>Birth Year</b> {item.birth_year}</div>
                                    <div className="ops opk"><b>Gender</b> {item.gender}</div>
                                </div>

                                {item.appointments.length !== 0 ?
                                    <div className="nopi">
                                        {item.appointments.map((appo) => (
                                            <div className="kopi">
                                                <div>
                                                    <div className="ops2"><b>Dose:</b> {appo.dose}</div>
                                                    <div className="ops1"><b>Vaccine:</b> {item.vaccine}</div>
                                                </div>


                                                <div className="opscont">

                                                    <div className="ops"><b>Center</b>&nbsp;{appo.name}, {appo.block_name}, {appo.block_name}</div>
                                                    <div className="ops"><b>Date</b>&nbsp;{appo.date}</div>
                                                    <div className="ops"><b>Slot</b>&nbsp;{appo.slot}</div>
                                                </div>
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

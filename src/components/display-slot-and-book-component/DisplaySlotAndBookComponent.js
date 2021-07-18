import React, { Component } from 'react'
import './DisplaySlotAndBookComponent.css'
// import { beneficiaries } from '../../services/test'
import { CoServices } from '../../services/CoServices';

export default class DisplaySlotAndBookComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBeneficiary: 0
        }
    }

    selectdBenefHandler(selectedBeneficiary, e) {
        this.setState({
            ...this.state,
            selectedBeneficiary
        })
    }
    render() {
        const { beneficiaries } = this.props;
        const { selectedCenter, selectedSession } = this.props;
        const { selectedBeneficiary } = this.state;
        // console.log('this.props', this.props);
        // console.log(beneficiaries, selectedSession);
        return (
            <div className="slotdisp">
                <div className="addrese">
                    <div className="addname">{selectedCenter.name}</div>
                    <div className="blockname">{selectedCenter.address}</div>
                    <div className="blockname">{selectedCenter.block_name}, {selectedCenter.pincode}</div>
                </div>
                <div className="datefor"><span>Booking for Date</span> {selectedSession.date}</div>
                <div className="feeknow">
                    <div className="terts">{selectedSession.vaccine}</div>
                    <div className="terts">{selectedCenter.fee_type} </div>
                    <div className="paidr terts">INR {selectedCenter.fee_type === 'Paid' ? selectedCenter.vaccine_fees ? (selectedCenter.vaccine_fees.filter(a => a.vaccine === selectedSession.vaccine).length !== 0) ? selectedCenter.vaccine_fees.filter(a => a.vaccine === selectedSession.vaccine)[0]['fee'] : 'N/A' : 'N/A' : 0}</div>
                </div>

                <div>
                    <div className="selectBene">Please select one beneficiary from below to proceed for vaccination slot booking</div>
                    <div className="detailbenef">
                        <div className="beneflist">
                            {beneficiaries.map((benef, index) => (
                                <div className={`${index === selectedBeneficiary && 'selectedbenefnam'} benefnam`} onClick={this.selectdBenefHandler.bind(this, index)}>
                                    <span className="checkits">{index === selectedBeneficiary ? <>&#9989;</> : <></>}</span>
                                    {benef.name}
                                </div>

                            ))}
                        </div>
                        <div className="benefdetails">
                            {beneficiaries[selectedBeneficiary].vaccination_status === 'Partially Vaccinated' ?
                                <>
                                    {CoServices.checkDateDifference(new Date(), CoServices.getTodaysDate(CoServices.getRightDateFromCowinFormat(beneficiaries[selectedBeneficiary]['dose1_date']), 84)) ?
                                        <>

                                            {selectedSession.available_capacity_dose2 > 0 ?
                                                <>
                                                    <div className="koli">Elible Candidate. Please proceed by clicking on button below</div>
                                                    <div className="proceedDiv"><button className="proceed">Proceed Booking...</button></div>
                                                </>
                                                :
                                                <>
                                                    <div className="koli">Elible Candidate. But unfortunately slots are not available. Try later.</div>
                                                    <div className="proceedDiv"><button className="proceed" disabled={true}>Booking not Possible</button></div>
                                                </>
                                            }
                                        </> :
                                        <>
                                            <div className="koli">Not Eligible Yet!! You still have {CoServices.checkNumberOfDaysLeftforDose2(beneficiaries[selectedBeneficiary]['dose1_date'])} Left for second dose</div>
                                            <div className="proceedDiv"><button className="proceed" disabled={true}>Booking not Possible</button></div>
                                        </>
                                    }
                                </>
                                :
                                <>
                                    {beneficiaries[selectedBeneficiary].vaccination_status === 'Not Vaccinated' ?

                                        <>
                                            {CoServices.checkIfAgeIsElibleAsperSlot(selectedSession['allow_all_age'], selectedSession['min_age_limit'], selectedSession['max_age_limit'], beneficiaries[selectedBeneficiary]['birth_year']) ?
                                                <>
                                                    {selectedSession.available_capacity_dose1 > 0 ?
                                                        <>
                                                            <div className="koli">Elible Candidate. Please proceed by clicking on button below</div>
                                                            <div className="proceedDiv"><button className="proceed">Proceed Booking...</button></div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="koli">Elible Candidate. But unfortunately slots are not available. Try later.</div>
                                                            <div className="proceedDiv"><button className="proceed" disabled={true}>Booking not Possible</button></div>
                                                        </>}
                                                </>
                                                :
                                                <>
                                                    <div className="koli">Candidate's age is not eligible for this slot</div>
                                                    <div className="proceedDiv"><button className="proceed" disabled={true}>Booking not Possible.</button></div>

                                                </>
                                            }
                                        </>
                                        :
                                        <>
                                            {beneficiaries[selectedBeneficiary].vaccination_status === 'Vaccinated' ?

                                                <>
                                                    <div className="koli">Glad to know you are vaccinated citizen. :) </div>
                                                    <div className="proceedDiv"><button className="proceed" disabled={true}>Booking not Possible</button></div>
                                                </>
                                                :
                                                <></>
                                            }
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>

                </div>

                <div className="selectBene1">See complete details on beneficiaries below</div>






            </div >
        )
    }
}

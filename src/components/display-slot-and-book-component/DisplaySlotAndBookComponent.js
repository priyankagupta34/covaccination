import React, { Component } from 'react'
import './DisplaySlotAndBookComponent.css'
import { beneficiaries } from '../../services/test'

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
        // const { beneficiaries } = this.props;
        const { selectedCenter, selectedSession } = this.props;
        const { selectedBeneficiary } = this.state;
        console.log('this.props', this.props);
        console.log(beneficiaries, selectedSession);
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
                            {beneficiaries[selectedBeneficiary].name}
                        </div>
                    </div>

                </div>
                <button className="proceed">Proceed Booking...</button>
                <div className="selectBene1">See complete details on beneficiaries below</div>



                {/* {selectedCenter.fee_type === 'PaidHide' ? < div className="vaccinfee">
                    <div className="vaccH">Vaccine</div>
                    <div className="vaccH">Fee</div>
                    {selectedCenter.vaccine_fees.map((fee) => (
                        <>
                            <div className="vacc vaccH">
                                {fee.vaccine}
                            </div>
                            <div className="vacc">
                                {fee.fee}
                            </div>
                        </>

                    ))}
                </div> : <></>}
            
             */}



            </div >
        )
    }
}

import React, { Component } from 'react'
import './DisplaySlotAndBookComponent.css'
// import { beneficiaries } from '../../services/test'

export default class DisplaySlotAndBookComponent extends Component {
    render() {
        const { beneficiaries } = this.props;
        const { selectedCenter, selectedSession } = this.props;
        console.log('this.props', this.props);
        console.log(beneficiaries, selectedSession);
        return (
            <div className="slotdisp">
                <div className="addrese">
                    <div className="addname">{selectedCenter.name}</div>
                    <div className="blockname">{selectedCenter.address}</div>
                    <div className="blockname">{selectedCenter.block_name}, {selectedCenter.pincode}</div>
                </div>

                <div className="feeknow">
                    <div className="ferts">Fee Type</div>
                    <div className="terts">{selectedCenter.fee_type} </div>
                    <div className="paidr terts">INR {selectedCenter.fee_type === 'Paid' ? selectedCenter.vaccine_fees ? (selectedCenter.vaccine_fees.filter(a => a.vaccine === selectedSession.vaccine).length !== 0) ? selectedCenter.vaccine_fees.filter(a => a.vaccine === selectedSession.vaccine)[0]['fee'] : 'N/A' : 'N/A' : 0}</div>
                </div>




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

import React, { Component } from 'react'
import './TableViewCalenderSessionsComponent.css';
import { centers } from './../../services/test'

export default class TableViewCalenderSessionsComponent extends Component {
    render() {
        const service = centers
        return (
            <div>
                <div className="kla">
                    <div>
                        <div className="fresd">Fee Type</div>
                        <label htmlFor="free">Free</label><input type="checkbox" id="free" />
                        <label htmlFor="paid">Paid</label><input type="checkbox" id="paid" />
                    </div>
                    <div>
                        <div className="fresd">Age Limit</div>
                        <label htmlFor="tya">45+</label><input type="checkbox" id="tya" />
                        <label htmlFor="tyb">18-44</label><input type="checkbox" id="tyb" />
                    </div>
                </div>

                <div className="tabs">
                    <div className="hjab">
                        <div className="grfsd">
                            <div className="uih">Name</div>
                            {/* <div className="uih">Address</div> */}
                            <div className="uih">Fee Type </div>
                            <div className="uih">Min Age</div>
                            <div className="uih">All Slots</div>
                            <div className="uih">Dose 1</div>
                            <div className="uih">Dose 2</div>
                        </div>
                    </div>
                    {service.map((item, index) => (
                        <div className="grfsd">

                            {/* <div className="ui">{item.address}</div> */}

                            {item.sessions.map((item2, index2) =>
                                <>
                                    <div className="ui">{item.name}</div>
                                    <div className="ui">{item.fee_type}</div>
                                    <div className="ui">{item2.min_age_limit}</div>
                                    <div className="ui">{item2.available_capacity}</div>
                                    <div className="ui">{item2.available_capacity_dose1}</div>
                                    <div className="ui">{item2.available_capacity_dose2}</div>
                                </>
                            )}

                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

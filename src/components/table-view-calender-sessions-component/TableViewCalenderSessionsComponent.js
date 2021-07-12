import React, { Component } from 'react'
import './TableViewCalenderSessionsComponent.css';
import { centers } from './../../services/test'

export default class TableViewCalenderSessionsComponent extends Component {
    render() {
        // const {centers} = this.props; 
        return (
            <div>
                <div className="kla">
                    <div className="chbc">
                        <div className="fresd">Fee Type</div>
                        <div className="ghfd"> <label htmlFor="free">Free</label><input type="checkbox" id="free" /></div>
                        <div className="ghfd"> <label htmlFor="paid">Paid</label><input type="checkbox" id="paid" /></div>
                    </div>
                    <div className="chbc">
                        <div className="fresd">Age Limit</div>

                        <div className="ghfd">  <label htmlFor="tya">45+</label><input type="checkbox" id="tya" /></div>
                        <div className="ghfd"><label htmlFor="tyb">18-44</label><input type="checkbox" id="tyb" /></div>
                    </div>
                </div>

                <div className="tabs">
                    <div className="viab">
                        <div className="hjab">
                            <div className="grfsd">
                                <div className="uih tys hj7">Name</div>
                                <div className="uih hj7">Fee Type </div>
                                <div className="uih hj7">Min Age</div>
                                <div className="uih hj7">All Slots</div>
                                <div className="uih hj7">Dose 1</div>
                                <div className="uih hj7">Dose 2</div>
                                <div className="uih hj7">Action</div>
                            </div>
                        </div>
                        {centers.map((item, index) => (
                            <div className="grfsd">

                                {item.sessions.map((item2, index2) =>
                                    <>
                                        <div className="ui tys hj7 as4">{item.name}</div>
                                        <div className="ui">{item.fee_type}</div>
                                        <div className="ui">{item2.min_age_limit}</div>
                                        <div className="ui">{item2.available_capacity}</div>
                                        <div className="ui">{item2.available_capacity_dose1}</div>
                                        <div className="ui">{item2.available_capacity_dose2}</div>
                                        <div className="ui">
                                            <div className="bookn">Book</div>
                                        </div>
                                    </>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

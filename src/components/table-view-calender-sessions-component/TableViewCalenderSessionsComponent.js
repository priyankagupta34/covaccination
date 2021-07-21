import React, { Component } from 'react'
import FilterComponent from '../filter-component/FilterComponent';
import './TableViewCalenderSessionsComponent.css';
// import { centers } from './../../services/test'

export default class TableViewCalenderSessionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openFilter: false
        };
        this.openFilterHandler = this.openFilterHandler.bind(this);
        this.closeFilterHandler = this.closeFilterHandler.bind(this);
    }
    openFilterHandler() {
        this.setState({
            ...this.state,
            openFilter: this.state.openFilter ? false : true
        })
    }
    closeFilterHandler() {
        console.log('here')
        const id = document.getElementById('ndh7agd');
        id && id.classList.add('retractKle');
        setTimeout(() => {
            id && id.classList.remove('retractKle');
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    openFilter: false
                })
            }, 0);


        }, 400);
    }
    render() {
        // console.log('centers', centers)
    //     <div className="loader">
    //     <FilterComponent />
    // </div>
        const { centers } = this.props;
        const { openFilter } = this.state;
        return (
            <div className="relative">
                    {!openFilter && <div className="filterload">
                        <FilterComponent closeFilterHandler={this.closeFilterHandler} />
                    </div>}

                <div className="tabs">
                    <div className="filt6" onClick={this.openFilterHandler}>Filter</div>
                    <div className="viab" >
                        <div className="hjab" >
                            <div className="grfsd">
                                <>
                                    <div className="uih">Name</div>
                                    <div className="uih">Vaccine</div>
                                    <div className="uih">Date</div>
                                    <div className="uih">Pincode</div>
                                    <div className="uih">Fee Type </div>
                                    <div className="uih">Min Age</div>
                                    <div className="uih">Dose1 Slots</div>
                                    <div className="uih">Dose2 Slots</div>
                                    {/* <div className="uih">Dose 1</div>
                                <div className="uih">Dose 2</div> */}
                                    <div className="uih">Action</div>
                                </>
                                {centers.map((item, index) => (
                                    <>
                                        {item.sessions.map((item2, index2) =>
                                            <>
                                                <div className="ui stickToIt">{item.name}</div>
                                                <div className="ui ">{item2.vaccine}</div>
                                                <div className="ui ">{item2.date}</div>
                                                <div className="ui ">{item.pincode}</div>
                                                <div className="ui ">{item.fee_type}</div>
                                                <div className="ui ">{item2.min_age_limit}</div>
                                                {/* <div className="ui ">{item2.available_capacity}</div> */}
                                                <div className="ui ">{item2.available_capacity_dose1}</div>
                                                <div className="ui ">{item2.available_capacity_dose2}</div>
                                                <div className="ui ">
                                                    <div className="bookn" onClick={() => this.props.bookThisDose(item, item2)}>Book</div>
                                                </div>
                                            </>
                                        )}

                                    </>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import FilterComponent from '../filter-component/FilterComponent';
import './TableViewCalenderSessionsComponent.css';
// import { centers } from './../../services/test'

export default class TableViewCalenderSessionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openFilter: false,
            centerToShow: []
        };
        this.openFilterHandler = this.openFilterHandler.bind(this);
        this.closeFilterHandler = this.closeFilterHandler.bind(this);
        // this.updateTableAfterNewFilter = this.updateTableAfterNewFilter.bind(this);
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            centerToShow: this.props.centers
        })
    }
    componentDidUpdate(prev) {
        if (prev !== this.props) {
            this.setState({
                ...this.state,
                centerToShow: this.props.centers
            })
        }
    }

    // updateTableAfterNewFilter(stateFromFiltercomp) {
    //     const { typesOfVaccination, feeTypeList, ageLimit, doseType } = stateFromFiltercomp;
    //     const filtered = this.props.centers.filter(item => {
    //         if (!feeTypeList.includes(item.fee_type)) return false;
    //         if (!typesOfVaccination.includes(item['selectedSession']['vaccine'])) return false;
    //         if (doseType.includes('Dose 1') && item['selectedSession']['available_capacity_dose1'] === 0) return false;
    //         if (doseType.includes('Dose 2') && item['selectedSession']['available_capacity_dose2'] === 0) return false;
    //         if (['selectedSession']['allow_all_age']) return true;
    //         if (ageLimit.includes('18') && item['selectedSession']['min_age_limit'] !== 18) return false;
    //         if (ageLimit.includes('45') && item['selectedSession']['min_age_limit'] !== 45) return false;
    //         return true;
    //     });
    //     this.setState({
    //         ...this.state,
    //         centerToShow: filtered
    //     })
    // }

    openFilterHandler() {
        this.setState({
            ...this.state,
            openFilter: this.state.openFilter ? false : true
        })
    }
    closeFilterHandler() {
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
        const { selectFilterTypeHandler, typesOfVaccination, feeTypeList, ageLimit, doseType, clearAllFilters } = this.props;
        // console.log(this.po)
        const { openFilter, centerToShow } = this.state;
        return (
            <div className="relative">
                {openFilter && <div className="filterload">
                    <FilterComponent closeFilterHandler={this.closeFilterHandler} 
                        selectFilterTypeHandler={selectFilterTypeHandler} typesOfVaccination={typesOfVaccination} feeTypeList={feeTypeList} ageLimit={ageLimit} doseType={doseType} />
                </div>}

                <div className="tabs">

                <div className="filt7">
                        <span className="fixbluffer fixfilter1" onClick={this.openFilterHandler}>Filter 
                        </span>
                        <span className="fixbluffer fixfilter2" onClick={clearAllFilters}>Clear
                        </span>
                    </div>

                    <div className="filt6">
                        <span className="afilt6" onClick={this.openFilterHandler}>Filter <span class="material-icons-outlined filticon">
                            filter_list
                        </span></span>
                        <span className="bfilt6" onClick={clearAllFilters}>Clear Filter
                            <span class="material-icons-outlined filticon">
                                clear
                            </span>
                        </span>
                    </div>

                 
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
                                    <div className="uih">Action</div>
                                </>
                                {centerToShow.map((item, index) => (
                                    <>
                                        <div className="ui stickToIt">{item.name}</div>
                                        <div className="ui ">{item.selectedSession.vaccine}</div>
                                        <div className="ui ">{item.selectedSession.date}</div>
                                        <div className="ui ">{item.pincode}</div>
                                        <div className="ui ">{item.fee_type}</div>
                                        <div className="ui ">{item.selectedSession.min_age_limit}</div>
                                        <div className="ui ">{item.selectedSession.available_capacity_dose1}</div>
                                        <div className="ui ">{item.selectedSession.available_capacity_dose2}</div>
                                        <div className={`ui ${item.selectedSession.available_capacity? 'clickiyenable': 'clickiydisable'}`}
                                        onClick={() => this.props.bookThisDose(item, item.selectedSession)}> Book
                                            {/* <div className="bookn" onClick={() => this.props.bookThisDose(item, item.selectedSession)}>Book</div> */}
                                        </div>

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

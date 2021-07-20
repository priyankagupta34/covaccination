import React, { Component } from 'react'
import { FilterService } from '../../services/FilterService'
import './FilterComponent.css'

export default class FilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typesOfVaccination: [],
            feeType: [],
            ageLimit: [],
            doseType: [],
        }
    }

    selectFeeTypeHandler() {

    }

    selectDoseTypeHandler() {

    }

    selectAgelimitHandler() {

    }

    selectVaccinationType() {

    }


    componentDidMount() {
        const { TypesOfVaccination, FeeType, AgeLimit, DoseType } = FilterService;
        this.setState({
            ...this.state,
            typesOfVaccination: TypesOfVaccination,
            feeType: FeeType,
            ageLimit: AgeLimit,
            doseType: DoseType
        })
    }

    render() {
        const { TypesOfVaccination, FeeType, AgeLimit, DoseType } = FilterService;
        const { typesOfVaccination, feeType, ageLimit, doseType } = this.state;
        const { closeFilterHandler } = this.props;
        return (
            <div className="tieup">
                <span className="newmti">Please select the required checkboxes</span>
                <div className="chbc">
                    <div className="fresd">Fee Type</div>
                    <div className="filterlst">
                        {FeeType.map((item, index) => (
                            <div key={index} onClick={this.selectFeeTypeHandler.bind(this, index)} className={feeType.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span style={{ marginRight: 3 }}>{feeType.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chbc">
                    <div className="fresd">Age Limit</div>
                    <div className="filterlst">
                        {AgeLimit.map((item, index) => (
                            <div key={index} onClick={this.selectAgelimitHandler.bind(this, item)} className={ageLimit.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span style={{ marginRight: 3 }}>{ageLimit.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chbc">
                    <div className="fresd">Vaccine</div>
                    <div className="filterlst">
                        {TypesOfVaccination.map((item, index) => (
                            <div key={index} onClick={this.selectVaccinationType.bind(this, item)} className={typesOfVaccination.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span style={{ marginRight: 3 }}>{typesOfVaccination.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chbc">
                    <div className="fresd">Dose</div>
                    <div className="filterlst">
                        {DoseType.map((item, index) => (
                            <div key={index} onClick={this.selectDoseTypeHandler.bind(this, item)} className={doseType.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span style={{ marginRight: 3 }}>{doseType.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="closgh" onClick={closeFilterHandler} style={{marginTop: 0}}>Close</button>
            </div>
        )
    }
}

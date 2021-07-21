import React, { Component } from 'react'
import { FilterService } from '../../services/FilterService'
import './FilterComponent.css'

const { TypesOfVaccination, FeeType, AgeLimit, DoseType } = FilterService;

export default class FilterComponent extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         typesOfVaccination: TypesOfVaccination,
    //         feeTypeList: FeeType,
    //         ageLimit: AgeLimit,
    //         doseType: DoseType
    //     }
    //     console.log('here')
    // }

    // selectFilterTypeHandler(type, item_, e) {
    //     const item = item_;
    //     let listHere = [...this.state[type]];
    //     const index = listHere.indexOf(item);
    //     if (index === -1) listHere.push(item);
    //     else listHere.splice(index, 1);
    //     this.setState({
    //         ...this.state,
    //         [type]: listHere
    //     }, () => {
    //         this.props.updateTableAfterNewFilter(this.state);
    //     })
    // }



    render() {
        // const { typesOfVaccination, feeTypeList, ageLimit, doseType } = this.state;
        const { closeFilterHandler, selectFilterTypeHandler,  typesOfVaccination, feeTypeList, ageLimit, doseType } = this.props;
        // console.log(this.props);
        return (
            <div className="tieup">
                <span className="newmti">Please select the required checkboxes</span>
                <div className="chbc">
                    <div className="fresd">Fee Type</div>
                    <div className="filterlst">
                        {FeeType.map((item, index) => (
                            <div key={index} onClick={() => selectFilterTypeHandler('feeTypeList', item)}
                                className={feeTypeList.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span className="checkVout">{feeTypeList.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chbc">
                    <div className="fresd">Slot availability for Age</div>
                    <div className="filterlst">
                        {AgeLimit.map((item, index) => (
                            <div key={index} onClick={() => selectFilterTypeHandler('ageLimit', item)} className={ageLimit.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span className="checkVout">{ageLimit.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chbc">
                    <div className="fresd">Dose Availability</div>
                    <div className="filterlst">
                        {DoseType.map((item, index) => (
                            <div key={index} onClick={() => selectFilterTypeHandler('doseType', item)} className={doseType.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span className="checkVout">{doseType.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chbc">
                    <div className="fresd">Vaccine</div>
                    <div className="filterlst">
                        {TypesOfVaccination.map((item, index) => (
                            <div key={index} onClick={() => selectFilterTypeHandler('typesOfVaccination', item)} className={typesOfVaccination.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span className="checkVout">{typesOfVaccination.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="closgh btnu" onClick={closeFilterHandler} style={{ marginTop: 0, fontSize: '0.7em' }}>Close</button>
            </div>
        )
    }
}

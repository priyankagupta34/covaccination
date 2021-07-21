import React, { Component } from 'react'
import { FilterService } from '../../services/FilterService'
import './FilterComponent.css'

const { TypesOfVaccination, FeeType, AgeLimit, DoseType } = FilterService;

export default class FilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typesOfVaccination: TypesOfVaccination,
            feeTypeList: FeeType,
            ageLimit: AgeLimit,
            doseType: DoseType
        }
    }

    selectFilterTypeHandler(type, item_, e) {
        const item = item_;
        let listHere = [...this.state[type]];
        const index = listHere.indexOf(item);
        if (index === -1) listHere.push(item);
        else listHere.splice(index, 1);
        this.setState({
            ...this.state,
            [type]: listHere
        })


        // this.setState(state => {
        //     let listHere = [...state.feeTypeList];
        //     const index = listHere.indexOf(item);
        //     console.log('this lets ', index)
        //     if(index === -1) listHere.push(item);
        //     else listHere.splice(index, 1);
        //     console.log('listHere ', listHere);
        //     state.feeTypeList = listHere;
        //     return state;
        //   })

        // this.setState(state=>{
        //     const index = state.feeTypeList.indexOf(item);
        //     console.log('index', index, state.feeTypeList);
        //     if(index===-1){
        //         console.log('pusing');
        //         state.feeTypeList.push(item);
        //         return state;
        //     }
        //     else{
        //         console.log('splicing');    
        //      state.feeTypeList.splice(index, 1);
        //      console.log(state.feeTypeList);
        //      return state;
        //     }
        //     // console.log(this.state);
        //     // return state;
        // })
    }

    selectDoseTypeHandler(item) {
        this.setState(state => {
            const i = state.doseType.indexOf(item);
            if (i === -1) state.doseType.push(item);
            else state.doseType.splice(i, 1);
            return state;
        })
    }

    selectAgelimitHandler(item) {
        this.setState(state => {
            const i = state.ageLimit.indexOf(item);
            if (i === -1) state.ageLimit.push(item);
            else state.ageLimit.splice(i, 1);
            return state;
        })
    }

    selectVaccinationType(item) {
        this.setState(state => {
            const i = state.typesOfVaccination.indexOf(item);
            if (i === -1) state.typesOfVaccination.push(item);
            else state.typesOfVaccination.splice(i, 1);
            return state;
        })
    }


    componentDidMount() {
        // const { TypesOfVaccination, FeeType, AgeLimit, DoseType } = FilterService;
        // this.setState({
        //     ...this.state, 
        //     typesOfVaccination: this.state.typesOfVaccination.concat(TypesOfVaccination),
        //     feeTypeList:  this.state.feeTypeList.concat(FeeType),
        //     ageLimit:this.state.ageLimit.concat(AgeLimit),
        //     doseType: this.state.doseType.concat(DoseType),
        // })
    }

    render() {
        // const { TypesOfVaccination, FeeType, AgeLimit, DoseType } = FilterService;
        const { typesOfVaccination, feeTypeList, ageLimit, doseType } = this.state;
        const { closeFilterHandler } = this.props;
        console.log(this.state);
        return (
            <div className="tieup">
                <span className="newmti">Please select the required checkboxes</span>
                <div className="chbc">
                    <div className="fresd">Fee Type</div>
                    <div className="filterlst">
                        {FeeType.map((item, index) => (
                            <div key={index} onClick={this.selectFilterTypeHandler.bind(this, 'feeTypeList', item)}
                                className={feeTypeList.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span className="checkVout">{feeTypeList.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chbc">
                    <div className="fresd">Age Limit</div>
                    <div className="filterlst">
                        {AgeLimit.map((item, index) => (
                            <div key={index} onClick={this.selectFilterTypeHandler.bind(this, 'ageLimit', item)} className={ageLimit.includes(item) ? 'selectedFilter' : 'filter'}>
                                <span className="checkVout">{ageLimit.includes(item) ? <>&#9989;</> : <>&#11036;</>}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chbc">
                    <div className="fresd">Dose</div>
                    <div className="filterlst">
                        {DoseType.map((item, index) => (
                            <div key={index} onClick={this.selectFilterTypeHandler.bind(this, 'doseType', item)} className={doseType.includes(item) ? 'selectedFilter' : 'filter'}>
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
                            <div key={index} onClick={this.selectFilterTypeHandler.bind(this, 'typesOfVaccination', item)} className={typesOfVaccination.includes(item) ? 'selectedFilter' : 'filter'}>
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

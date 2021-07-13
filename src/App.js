import React, { Component } from 'react';
import './App.css';
import DisplaySlotAndBookComponent from './components/display-slot-and-book-component/DisplaySlotAndBookComponent';
import MotivateComponent from './components/motivate-component/MotivateComponent';
import TableViewCalenderSessionsComponent from './components/table-view-calender-sessions-component/TableViewCalenderSessionsComponent';
import { CoServices } from './services/CoServices';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByPin: true,
      pincode: '',
      mobile: '',
      txnId: '',
      otp: 0,
      selectedStateId: '',
      selectedStateName: '',
      loaderOfOtp: false,
      loadState: false,
      stateList: [],
      availableSession: [],
      centers: [],
      book: false
    };
    this.handlerForPincode = this.handlerForPincode.bind(this);
    this.changeSearchBy = this.changeSearchBy.bind(this);
    this.findCalenderSlotByPin = this.findCalenderSlotByPin.bind(this);
  }

  findCalenderSlotByPin(e){
    e.preventDefault();
    CoServices.calenderByPin(this.state.pincode)
    .then((result) => {
      // console.log('result', result);
      this.setState(state=>{
        state.centers = result.data.centers;
        return state;
      })
    }).catch((err) => {
      
    });
  }

  handlerForPincode(event) {
    this.setState({
      ...this.state,
      pincode: event.target.value
    })
  }
  componentDidMount() {
    // CoServices.test(5)
    //   .then((result) => {
    //     console.log(result);
    //   }).catch((err) => {

    //   });

  }

  changeSearchBy(){
    this.setState({
      ...this.state,
      searchByPin: this.state.searchByPin?false:true
    })
  }

  getAllStates() {
    this.setState(state => {
      state.loadState = true;
      return state;
    })
    CoServices.getStatesList()
      .then((result) => {
        this.setState(state => {
          state.loadState = false;
          state.stateList = result.data.states;
          return state;
        })
      }).catch((err) => {

      });
  }



  generateOTP() {
    this.setState(state => {
      state.loaderOfOtp = true;
      return state;
    })
    CoServices.getOTPToRegister(this.state.mobile)
      .then((result) => {
        this.setState(state => {
          state.loaderOfOtp = false;
          state.txnId = result.data.txnId;
          return state;
        })
      }).catch((err) => {

      });
  }

  confirmOtp() {
    this.setState(state => {
      state.loaderOfOtp = true;
      return state;
    })
    const { otp, txnId } = this.state;
    CoServices.confirmOTPToRegister(otp, txnId)
      .then((result) => {
        this.setState(state => {
          state.loaderOfOtp = false;
          state.txnId = result.data.txnId;
          return state;
        })
      }).catch((err) => {

      });
  }

  sha256Conversion(otp) {
    CoServices.sha256Conversion(otp)
      .then((result) => {
        console.log(result);
      }).catch((err) => {

      });
  }

  render() {
    const { pincode, searchByPin, selectedState, centers, book } = this.state;
    return (
      <div className="App">

        <article className={`${ !centers.length && "whenNoList1" } articleBody`}>
          <div className="part">
            <div className="firstPart">
              <MotivateComponent />
            </div>

            <div className={`${ !centers.length && "whenNoList2" } scndPart`}>
              <div className="searchSl">Let's Vaccinate</div>
              <div className="searchS2">Search Slots</div>
              <div className="slider">
                <div className={`${searchByPin && 'selectedSlider goLeft'} oiq1`} onClick={this.changeSearchBy}>Pincode</div>
                <div className={`${!searchByPin && 'selectedSlider goRight'} oiq2`} onClick={this.changeSearchBy}>District</div>
              </div>


              {searchByPin ? <div className="pinclas">
                <label htmlFor="ji8">Pincode*</label>
                <form className="flex" onSubmit={this.findCalenderSlotByPin}>
                <input id="ji8" value={pincode} onChange={this.handlerForPincode}/> 
                <button className="go" onClick={this.findCalenderSlotByPin} type="submit" disabled={pincode===''}>Go</button></form>
              </div> :
                <div className="pinclas">
                  <input value={selectedState} />
                </div>}

               {!book ? <>{centers.length ? <div>
                  <TableViewCalenderSessionsComponent centers={centers} />
                </div>:<></>}</>:
                
                <div>
                  <DisplaySlotAndBookComponent />
                </div>}

            </div>
          </div>
        </article>
      </div>
    )
  }
}

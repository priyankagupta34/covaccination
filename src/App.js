import React, { Component } from 'react';
import './App.css';
import { CoServices } from './services/CoServices';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: '',
      mobile: '',
      txnId: '',
      otp: 0,
      selectedStateId: '',
      selectedStateName: '',
      loaderOfOtp: false,
      loadState: false,
      stateList: [],
      availableSession: []
    };
    this.handlerForPincode = this.handlerForPincode.bind(this);
  }

  handlerForPincode(event){
    this.setState({
      ...this.state,
      pincode: event.target.value
    })
  }
  componentDidMount() {
    CoServices.test(5)
      .then((result) => {
        console.log(result);
      }).catch((err) => {

      });

  }


  getAllStates(){
    this.setState(state=>{
      state.loadState=true;
      return state;
    })
    CoServices.getStatesList()
    .then((result) => {
      this.setState(state=>{
        state.loadState=false;
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
    const {pincode} = this.state;
    return (
      <div className="App">

        <article className="articleBody">
        <div className="searchSl">Search Slots</div>
          <div>
            <input value={pincode} onChange={this.handlerForPincode} />
          </div>
        </article>
      </div>
    )
  }
}

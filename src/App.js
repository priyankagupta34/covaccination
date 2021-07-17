import { sha256 } from 'js-sha256';
import React, { Component } from 'react';
import './App.css';
import BeneficiariesListCcomponent from './components/beneficiaries-list-component/BeneficiariesListCcomponent';
import DisplaySlotAndBookComponent from './components/display-slot-and-book-component/DisplaySlotAndBookComponent';
import FooterCcomponent from './components/footer-component/FooterCcomponent';
import MotivateComponent from './components/motivate-component/MotivateComponent';
import TableViewCalenderSessionsComponent from './components/table-view-calender-sessions-component/TableViewCalenderSessionsComponent';
import TitleNIconCcomponent from './components/title-n-icon-component/TitleNIconCcomponent';
import { CoServices } from './services/CoServices';
// import { sha256 } from './services/Sha256';
// import { stateList } from './services/test';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByPin: true,
      pincode: '',
      mobile: '',
      txnId: '',
      otp: null,
      selectedStateId: '',
      selectedStateName: '',
      selectedDistrict: '',
      errorMessage: '',
      loaderOfOtp: false,
      showState: false,
      showDistrict: false,
      showError: false,
      stateList: [],
      filteredStateList: [],
      districtList: [],
      filteredDistrictList: [],
      availableSession: [],
      centers: [],
      book: false,
      logged: false,
      expandArtic3: false,
      showOtpModal: false,
      beneficiaries: [],
      allIdTypes: [],
      errortype: ''

    };
    this.onchangeHandler = this.onchangeHandler.bind(this);
    this.changeSearchBy = this.changeSearchBy.bind(this);
    this.findCalenderSlotByPin = this.findCalenderSlotByPin.bind(this);
    this.showStateList = this.showStateList.bind(this);
    this.hideStateList = this.hideStateList.bind(this);
    this.hideDistrictList = this.hideDistrictList.bind(this);
    this.showDistrictList = this.showDistrictList.bind(this);
    this.handleStateChangeFilter = this.handleStateChangeFilter.bind(this);
    this.handleDistrictChangeFilter = this.handleDistrictChangeFilter.bind(this);
    this.bookThisDose = this.bookThisDose.bind(this);
    this.generateOTP = this.generateOTP.bind(this);
    this.confirmOtp = this.confirmOtp.bind(this);
    this.closeError = this.closeError.bind(this);
    this.expandArtic3Handler = this.expandArtic3Handler.bind(this);
  }

  expandArtic3Handler(){
    this.setState({
      ...this.state,
      expandArtic3: this.state.expandArtic3?false:true
    })
  }


  closeError() {
    this.setState({
      ...this.state,
      showError: false
    });
  }


  bookThisDose(main, sessiondata) {
    // console.log('main', main);
    // console.log('sessiondata', sessiondata);
    this.setState({
      ...this.state,
      book: true
    })
  }

  handleStateChangeFilter(e) {
    this.setState(state => {
      state.selectedState = e.target.value;
      state.filteredStateList = state.stateList.filter(a => a.state_name.toLowerCase().search(e.target.value.toLowerCase()) !== -1).map(a => a.state_name);
      return state;
    })
  }

  handleDistrictChangeFilter(e) {
    this.setState(state => {
      state.selectedDistrict = e.target.value;
      state.filteredDistrictList = state.districtList.filter(a => a.district_name.toLowerCase().search(e.target.value.toLowerCase()) !== -1).map(a => a.district_name);
      return state;
    })
  }


  showStateList() {
    this.setState({
      ...this.state,
      showState: true
    })
  }

  hideStateList() {
    setTimeout(() => {
      this.setState(state => {
        state.showState = false;
        return state;
      })
    }, 800);
  }

  /* Click in drop down to select state */
  clickToSelecteState(selectedState) {
    const state = this.state.stateList.filter(a => a.state_name === selectedState)[0].state_id;
    CoServices.getAllDistricts(state)
      .then((result) => {

        this.setState(state => {
          state.showDistrict = true;
          state.selectedState = selectedState;
          state.districtList = result.data.districts;
          state.filteredDistrictList = result.data.districts.map(a => a.district_name);
          state.showState = false;
          return state;
        })
      }).catch((err) => {

      });

  }

  /* Click in drop down to select district */
  clickToSelecteDistrict(selectedDistrict) {
    const district_id = this.state.districtList.filter(a => a.district_name === selectedDistrict)[0].district_id;
    CoServices.calenderByDistrict(district_id)
      .then((result) => {
        // console.log('result', result.data);

        this.setState(state => {
          state.book = false;
          state.selectedDistrict = selectedDistrict;
          state.showOtpModal = false;
          state.centers = result.data.centers;
          // state.districtList = result.data.districts;
          if(result.data.centers.length === 0){
            state.errortype = 'info';
            state.errorMessage = 'Could not find any slots. Try again later!';
            state.showError = true;
          }
          state.showDistrict = false;
          return state;
        })
      }).catch((err) => {

      });
  }


  showDistrictList() {
    this.setState({
      ...this.state,
      showDistrict: true
    })
  }

  hideDistrictList() {

    setTimeout(() => {
      this.setState(state => {
        state.showDistrict = false;
        return state;
      })
    }, 800);
  }

  findCalenderSlotByPin(e) {
    e.preventDefault();
    CoServices.calenderByPin(this.state.pincode)
      .then((result) => {
        // console.log('result', result);
        this.setState(state => {
          state.book = false;
          state.centers = result.data.centers;
          return state;
        })
      }).catch((err) => {

      });
  }


  selectStateHandler() {

  }

  onchangeHandler(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }
  componentDidMount() {
    // CoServices.test(5)
    //   .then((result) => {
    //     console.log(result);
    //   }).catch((err) => {

    //   });

    this.getAllStates();

  }

  changeSearchBy() {
    this.setState({
      ...this.state,
      searchByPin: this.state.searchByPin ? false : true
    })
  }

  getAllStates() {
    // this.setState(state => {
    //   state.loadState = true;
    //   return state;
    // })
    CoServices.getStatesList()
      .then((result) => {
        this.setState(state => {
          // state.loadState = false;
          state.stateList = result.data.states;
          state.filteredStateList = result.data.states.map(a => a.state_name);
          return state;
        })
      }).catch((err) => {

      });
  }

  /* Get Valid Id-types */
  getIDTypes() {
    CoServices.getIDTypes()
      .then(res => {
        this.setState(state => {
          state.allIdTypes = res.data.types;
          return state;
        })
      })
      .catch(er => { });
  }

  generateOTP(e) {
    e.preventDefault();
    this.setState(state => {
      state.loaderOfOtp = true;
      return state;
    })
    CoServices.getOTPToRegister(this.state.mobile)
      .then((result) => {
        this.setState(state => {
          state.loaderOfOtp = false;
          state.showOtpModal = true;
          state.txnId = result.data.txnId;
          return state;
        })
      }).catch((err) => {
        this.setState({
          ...this.state,
          showError: true,
          errorMessage: 'Could not send OTP for some reason',
          errortype: 'error'
        })
      });
  }

  /* Confirm otp by converting it into sh256 */
  confirmOtp(e) {
    e.preventDefault();
    this.setState(state => {
      state.loaderOfOtp = true;
      return state;
    })
    const { otp, txnId } = this.state;
    // const result1 = CryptoJS.SHA256(otp).toString(CryptoJS.enc.Hex);
    console.log('typeofff ', typeof otp)
    const result1 = sha256(otp.toString());
    console.log('result1', result1)
    // CoServices.sha256Conversion(otp)
    //   .then((result) => {
    CoServices.confirmOTPToRegister(result1, txnId)
      .then((result) => {
        this.setState(state => {
          state.loaderOfOtp = false;
          state.logged = true;
          state.showOtpModal = false;
          state.token = result.data.token;
          return state;
        }, () => {
          CoServices.getBeneficiaries(this.state.token)
            .then((result) => {
              console.log('beneficiaries', result.data);
              this.setState(state => {
                // state.beneficiaries = beneficiaries;
                state.beneficiaries = result.data.beneficiaries;
                return state;
              })
            }).catch((err) => {

            });
        })
      }).catch((err) => {

      });
    // }).catch((err) => {

    // });

  }

  render() {
    // console.log('sha256(otp);', sha256('261294'))
    const { pincode, searchByPin, selectedState, centers, book, showState, districtList, showDistrict, selectedDistrict, stateList
      , filteredDistrictList, filteredStateList, logged, mobile, otp, showOtpModal, beneficiaries, showError, errorMessage,
      expandArtic3, errortype } = this.state;
    // console.log('stateList', this.state);
    return (
      <div className={`${!centers.length && "whenNoList3"} App`}>

        <article className={`${!centers.length && "whenNoList1"} articleBody`}>
          <div className="part">
            <div className="firstPart">
              <MotivateComponent />
            </div>

            <div className={`${!centers.length && "whenNoList2"} scndPart`}>
              <div className="searchSl">Let's Vaccinate</div>
              {/* <div className="searchS2"></div> */}

              <article className="artic1">
                <TitleNIconCcomponent icon="search" title="Search Slots" description="Find slots via pincode or district." />
                <div className="slider">
                  <div className={`${searchByPin && 'selectedSlider goLeft'} oiq1`} onClick={this.changeSearchBy}>Pincode</div>
                  <div className={`${!searchByPin && 'selectedSlider goRight'} oiq2`} onClick={this.changeSearchBy}>District</div>
                </div>


                {/* By pincode and district */}

                {searchByPin ? <div className="pinclas">
                  {/* <label htmlFor="ji8">Pincode*</label> */}
                  <form className="flex" onSubmit={this.findCalenderSlotByPin}>
                    <input id="ji8" value={pincode} onChange={this.onchangeHandler} placeholder="Pincode" className="gh65" name="pincode" />
                    <button className="go" onClick={this.findCalenderSlotByPin} type="submit" disabled={pincode === ''}>Go</button></form>
                </div> :
                  <div className=" drivg">
                    <div className="pinclas pinclagh relative">
                      {/* <label htmlFor="ji8">State*</label> */}
                      <div className="flex">
                        <input value={selectedState} onFocus={this.showStateList} onBlur={this.hideStateList}
                          onChange={this.handleStateChangeFilter}
                          className="gh65"
                          placeholder="State" />
                        <span className="go bh"> <span className={`${showState ? 'turna' : 'turnb'}`}>&#5123;</span></span>
                      </div>
                      {(showState && stateList.length) ? <div className={`${!centers.length && "optionListWhen4"} option opt1`}>
                        {filteredStateList.map(item => (
                          <div key={item} className={`${((selectedState && item) && selectedState.toLowerCase() === item.toLowerCase()) ? 'seletsfd' : ''} keysta`} onClick={this.clickToSelecteState.bind(this, item)}>
                            {item}
                          </div>
                        ))}
                      </div> : <></>}
                    </div>
                    <div className="pinclas pinclagh relative">
                      <div className="flex">
                        <input value={selectedDistrict} onFocus={this.showDistrictList} onBlur={this.hideDistrictList}
                          disabled={districtList.length === 0}
                          onChange={this.handleDistrictChangeFilter}
                          className="gh65"
                          placeholder="District"
                        />
                        <span className="go bh"> <span className={`${showDistrict ? 'turna' : 'turnb'}`}>&#5123;</span></span>
                      </div>
                      {(showDistrict && districtList.length) ? <div className={`${!centers.length && "optionListWhen4"} option opt2`}>
                        {filteredDistrictList.map(item => (
                          <div key={item} className={`${((selectedDistrict && item) && selectedDistrict.toLowerCase() === item.toLowerCase()) ? 'seletsfd' : ''} keysta`} onClick={this.clickToSelecteDistrict.bind(this, item)}>
                            {item}
                          </div>
                        ))}
                      </div> : <></>}
                    </div>

                  </div>}

              </article>

              {!book ?

                <>{centers.length ?
                  <div>
                    {/* <TitleNIconCcomponent title="Slot" description="Please scroll table to view all info" icon="table_view"/> */}
                    <TableViewCalenderSessionsComponent centers={centers} bookThisDose={this.bookThisDose} /></div> :
                  <></>}</>
                :

                <>
                  <div>
                    <DisplaySlotAndBookComponent />
                  </div>

                  {logged === false ?
                    <article className="artic2">
                      {/* <div className="bngf littleInf">Please login with your registered mobile before booking the slot</div> */}
                      <TitleNIconCcomponent title="Cowin Login" description="Please login with your registered mobile before booking the slot"
                        icon="phone" />

                      <div className="pinclas relative">
                        <form className="flex" onSubmit={this.generateOTP}>
                          <input value={mobile}
                            name="mobile"
                            onChange={this.onchangeHandler}
                            className="gh65"
                            placeholder="Mobile Number"
                          />
                          <button className="go" type="submit">OTP</button>
                        </form>
                      </div>

                      {(!logged && showOtpModal) ? <div className="modalkl">
                        <TitleNIconCcomponent title="Fill OTP" description="OTP is valid for 3 minutes." icon="api" />
                        <div className="pinclas relative">
                          <form className="flex" onSubmit={this.confirmOtp}>
                            <input value={otp}
                              name="otp"
                              onChange={this.onchangeHandler}
                              className="gh65"
                              placeholder="OTP"
                            />
                            <button className="go" type="submit">Ok</button>
                          </form>
                        </div>

                      </div> : <></>}



                    </article> :
                    <>
                    <button className={`${expandArtic3 && "expbtnOn"} expbtn`} onClick={this.expandArtic3Handler}><span className="exspan">Expand Panel</span> <i className="material-icons  material-icons-outlined icmns">fullscreen</i></button>
                    <article className={`${expandArtic3 && 'expandedArtic3'} artic3`}>
                      <TitleNIconCcomponent icon="groups" title="Beneficiaries" description={`Found ${beneficiaries.length} beneficiaries linked with this number`} />
                      <div>
                        <BeneficiariesListCcomponent beneficiaries={beneficiaries} />
                      </div>
                    </article>
                    </>
                  }
                </>

              }


            </div>
          </div>
        </article>

        <footer>
          <FooterCcomponent />
        </footer>

        {showError && <div className="errobody">
          <div className="errops">
            <div className="relative">
             
              <div className="move"></div>
              <div className="moveIcon">
              {errortype==='success'? <i  className="material-icons  material-icons-outlined vimicon" style={{color: 'green'}}>task_alt</i>:<></>}
              {errortype==='error'? <i  className="material-icons  material-icons-outlined vimicon" style={{color: 'red'}}>error_outline</i>:<></>}
              {errortype==='info'? <i  className="material-icons  material-icons-outlined vimicon" style={{color: 'skyblue'}}>priority_high</i>:<></>}
              </div>
              <div className="errder">{errorMessage}</div>
              <div className="bnahyts">
                <button className="closgh" onClick={this.closeError}>Close</button>
              </div>
              <div className="infoer">Make sure to use chrome in windows/android only</div>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

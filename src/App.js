import { sha256 } from 'js-sha256';
import React, { Component } from 'react';
import './App.css';
import BeneficiariesListCcomponent from './components/beneficiaries-list-component/BeneficiariesListCcomponent';
import DisplaySlotAndBookComponent from './components/display-slot-and-book-component/DisplaySlotAndBookComponent';
import ErrorModalPopupComponent from './components/error-modal-popup-component/ErrorModalPopupComponent';
import FooterCcomponent from './components/footer-component/FooterCcomponent';
import MotivateComponent from './components/motivate-component/MotivateComponent';
import TableViewCalenderSessionsComponent from './components/table-view-calender-sessions-component/TableViewCalenderSessionsComponent';
import TitleNIconCcomponent from './components/title-n-icon-component/TitleNIconCcomponent';
import { CoServices } from './services/CoServices';
import { FilterService } from './services/FilterService';


const { TypesOfVaccination, FeeType, AgeLimit, DoseType } = FilterService;


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
      centersToShow: [],
      book: false,
      logged: false,
      expandArtic3: false,
      showOtpModal: false,
      beneficiaries: [],
      allIdTypes: [],
      errortype: '',
      loader: false,
      selectedSession: null,
      selectedCenter: null,
      typesOfVaccination: TypesOfVaccination,
      feeTypeList: FeeType,
      ageLimit: AgeLimit,
      doseType: DoseType

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
    // this.generateOTPTest = this.generateOTPTest.bind(this);
    this.confirmOtp = this.confirmOtp.bind(this);
    // this.test = this.test.bind(this);
    this.closeError = this.closeError.bind(this);
    this.expandArtic3Handler = this.expandArtic3Handler.bind(this);
    this.getIDTypes = this.getIDTypes.bind(this);
    this.backToList = this.backToList.bind(this);
    this.logout = this.logout.bind(this);
    this.closeOtpBox = this.closeOtpBox.bind(this);
    this.updateTableAfterNewFilter = this.updateTableAfterNewFilter.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.somethingWentWrong = this.somethingWentWrong.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);
    this.getBeneficiaries = this.getBeneficiaries.bind(this);
    this.downloadCertificate = this.downloadCertificate.bind(this);
  }

  downloadCertificate(name, beneficiary_reference_id) {
    this.setState(state => {
      state.loader = true;
      return state;
    })
    CoServices.downloadCertificate(beneficiary_reference_id, this.state.token)
      .then(downloadedFile => {

        var downloadLink      = document.createElement('a');
        downloadLink.target   = '_blank';
        downloadLink.download = 'name_to_give_saved_file.pdf';
      
        // convert downloaded data to a Blob
        var blob = new Blob([downloadedFile.data], { type: 'application/pdf' });
      
        // create an object URL from the Blob
        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);
      
        // set object URL as the anchor's href
        downloadLink.href = downloadUrl;
      
        // append the anchor to document body
        document.body.append(downloadLink);
      
        // fire a click event on the anchor
        downloadLink.click();
      
        // cleanup: remove element and revoke object URL
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);
        this.setState(state => {
          state.loader = false;
          return state;
        })
      })
      .catch(err => {
        this.somethingWentWrong({ ...err });
      })
  }



  confirmBooking() {
    this.setState({
      ...this.state,
      showError: true,
      errorMessage: 'I will soon enable this feature after finding enough response documents to support !',
      errortype: 'info'
    })
  }

  clearAllFilters() {
    this.setState({
      ...this.state,
      centersToShow: this.state.centers,
      typesOfVaccination: TypesOfVaccination,
      feeTypeList: FeeType,
      ageLimit: AgeLimit,
      doseType: DoseType
    })
  }


  updateTableAfterNewFilter() {
    const { typesOfVaccination, feeTypeList, centers, doseType } = this.state;
    const filtered = centers.filter(item => {
      if (!feeTypeList.includes(item.fee_type)) return false;
      if (typesOfVaccination.filter(a => a.toLowerCase() === item['selectedSession']['vaccine'].toLowerCase()).length === 0) return false;
      if (doseType.includes('Any')) return true;
      if (doseType.includes('Dose 1')) if (item['selectedSession']['available_capacity_dose1'] === 0) return false;
      if (doseType.includes('Dose 2')) if (item['selectedSession']['available_capacity_dose2'] === 0) return false;

      // if (item['selectedSession']['allow_all_age']) return true;
      // // console.log(item['selectedSession'])
      // if (ageLimit.includes('18')) if (item['selectedSession']['min_age_limit'] !== 18) return false;
      // if (ageLimit.includes('45')) if (item['selectedSession']['min_age_limit'] !== 45) return false;
      return true;
    });
    // console.log(filtered );
    this.setState({
      ...this.state,
      centersToShow: filtered
    })
  }


  selectFilterTypeHandler(type, item_, e) {
    const item = item_;
    // console.log(type, item_);
    let listHere = [...this.state[type]];
    const index = listHere.indexOf(item);
    if (index === -1) listHere.push(item);
    else listHere.splice(index, 1);
    this.setState({
      ...this.state,
      [type]: listHere
    }, () => {
      this.updateTableAfterNewFilter();
    })
  }

  changingDataWitTableView(value) {
    let updatedValue = [];
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < value[i]['sessions'].length; j++) {
        value[i]['selectedSession'] = value[i]['sessions'][j];
        updatedValue.push(value[i]);
      }
    }
    return updatedValue;
  }

  closeOtpBox() {
    this.setState({
      ...this.state,
      showOtpModal: false
    })
  }

  logout() {
    localStorage.removeItem('demtake');
    this.setState(state => {
      state.logged = false;
      state.txnId = '';
      state.mobile = '';
      state.txnId = '';
      state.otp = null;
      state.beneficiaries = [];
      return state;
    })
  }

  backToList() {
    this.setState(state => {
      state.book = false
      return state;
    })
  }

  expandArtic3Handler() {
    this.setState({
      ...this.state,
      expandArtic3: this.state.expandArtic3 ? false : true
    })
  }


  closeError() {
    this.setState({
      ...this.state,
      showError: false
    });
  }


  bookThisDose(selectedCenter, selectedSession) {
    this.setState({
      ...this.state,
      book: true,
      selectedCenter,
      selectedSession
    }, () => {
      setTimeout(() => {
        const id = document.getElementById('bookslot');
        id && id.scrollIntoView();
      }, 0);
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
    this.setState(state => {
      state.loader = true;
      return state;
    })
    const state = this.state.stateList.filter(a => a.state_name === selectedState)[0].state_id;
    CoServices.getAllDistricts(state)
      .then((result) => {

        this.setState(state => {
          state.loader = false;
          state.showDistrict = true;
          state.selectedDistrict = '';
          state.selectedState = selectedState;
          state.districtList = result.data.districts;
          state.filteredDistrictList = result.data.districts.map(a => a.district_name);
          state.showState = false;
          return state;
        })
      }).catch((err) => {

        this.somethingWentWrong({ ...err });
      });

  }

  /* Click in drop down to select district */
  clickToSelecteDistrict(selectedDistrict) {
    this.setState(state => {
      state.loader = true;
      state.showState = false;
      return state;
    })
    const district_id = this.state.districtList.filter(a => a.district_name === selectedDistrict)[0].district_id;
    CoServices.calenderByDistrict(district_id)
      .then((result) => {
        // console.log('result', result.data);

        this.setState(state => {
          state.book = false;
          state.selectedDistrict = selectedDistrict;
          state.showOtpModal = false;
          state.loader = false;
          state.centers = this.changingDataWitTableView([...result.data.centers]);
          state.centersToShow = this.changingDataWitTableView([...result.data.centers]);
          if (result.data.centers.length === 0) {
            state.errortype = 'info';
            state.errorMessage = 'Could not find any slots. Try again later!';
            state.showError = true;
          }
          state.showDistrict = false;
          return state;
        })
      }).catch((err) => {

        this.somethingWentWrong({ ...err });
      });
  }

  somethingWentWrong(err) {
    console.log(err);
    this.setState(state => {
      state.loader = false;
      state.showError = true;
      state.errortype = 'error';
      if (err.response === undefined) {
        state.errorMessage = 'Internet or server down. Please reload or Try later';
      } else {
        if (err.response.status === 504) state.errorMessage = err.response.data.message;
        else if(err.response.status === 500) state.errorMessage = 'Internal Server Error';
        else if (err.response.status === 401) {
          state.errorMessage = err.response.data;
          state.logged = false;
          localStorage.removeItem('demtake');
          this.logout();
        } else
          state.errorMessage = err.response.data.error;
      }
      return state;
    })
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
    this.setState(state => {
      state.loader = true;
      return state;
    })
    CoServices.calenderByPin(this.state.pincode)
      .then((result) => {
        this.setState(state => {
          state.book = false;
          state.loader = false;
          state.centers = this.changingDataWitTableView([...result.data.centers]);
          state.centersToShow = this.changingDataWitTableView([...result.data.centers]);
          if (result.data.centers.length === 0) {
            state.errortype = 'info';
            state.errorMessage = 'Could not find any slots. Try again later!';
            state.showError = true;
          }
          return state;
        })
      }).catch((err) => {

        this.somethingWentWrong({ ...err });
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
    this.getAllStates();
    this.getIDTypes();
    const token = localStorage.getItem('demtake');
    if (token !== null) {
      this.setState(state => {
        state.token = token;
        state.logged = true; 
        return state;
      }, () => {
        this.getBeneficiaries();
      });

    }

  }

  changeSearchBy() {
    this.setState({
      ...this.state,
      searchByPin: this.state.searchByPin ? false : true
    })
  }

  getAllStates() {
    this.setState(state => {
      state.loader = true;
      return state;
    })
    CoServices.getStatesList()
      .then((result) => {
        this.setState(state => {
          state.loader = false
          // state.loadState = false;
          state.stateList = result.data.states;
          state.filteredStateList = result.data.states.map(a => a.state_name);
          return state;
        })
      }).catch((err) => {

        this.somethingWentWrong({ ...err });
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
      .catch(err => {

        this.somethingWentWrong({ ...err });
      });
  }

  /* Generate cowin otp */
  generateOTP(e) {
    e.preventDefault();
    this.setState(state => {
      state.loader = true;
      return state;
    })
    CoServices.getOTPToRegister(this.state.mobile)
      .then((result) => {
        this.setState(state => {
          state.loader = false;
          state.showOtpModal = true;
          state.txnId = result.data.txnId;
          return state;
        })
      }).catch((err) => {

        this.somethingWentWrong({ ...err });
        // this.setState({
        //   ...this.state,
        //   showError: true,
        //   loader: false,
        //   errorMessage: 'Could not send OTP for some reason',
        //   errortype: 'error'
        // }, ()=>{
        //   
        //   this.somethingWentWrong({...err});
        // })
      });
  }

  generateOTPTest(e) {
    e.preventDefault();
    this.setState(state => {
      state.loader = true;
      return state;
    }, () => {
      setTimeout(() => {
        this.setState(state => {
          state.showOtpModal = true;
          state.loader = false;
          return state;

        })
      }, 500);
    })
  }

  test(e) {
    e.preventDefault();
    this.setState(state => {
      state.loader = true;
      return state;
    }, () => {
      setTimeout(() => {
        this.setState(state => {
          state.loader = false;
          state.logged = true;
          state.showOtpModal = false;
          return state;

        })
      }, 500);
    })
  }


  /* Confirm otp by converting it into sh256 */
  confirmOtp(e) {
    e.preventDefault();
    this.setState(state => {
      state.loader = true;
      return state;
    })
    const { otp, txnId } = this.state;
    const result1 = sha256(otp.toString());
    CoServices.confirmOTPToRegister(result1, txnId)
      .then((result) => {
        localStorage.setItem('demtake', result.data.token);
        this.setState(state => {
          state.logged = true;
          state.showOtpModal = false;
          state.token = result.data.token;
          state.beneficiaries = [];
          return state;
        }, () => {
          this.getBeneficiaries();
        })
      }).catch((err) => {

        this.somethingWentWrong({ ...err });
      });
    // }).catch((err) => {

    // });

  }

  getBeneficiaries() {
    this.setState(state=>{
      state.loader = true;
      return state;
    })
    CoServices.getBeneficiaries(this.state.token)
      .then((result) => {
        this.setState(state => {
          state.loader = false;
          // state.beneficiaries = beneficiaries;
          state.beneficiaries = result.data.beneficiaries;
          return state;
        })
      }).catch((err) => {
        this.somethingWentWrong({ ...err });
      });
  }

  render() {
    // console.log('sha256(otp);', sha256('261294'))
    const { pincode, searchByPin, selectedState, centers, centersToShow, book, showState, districtList, showDistrict, selectedDistrict, stateList
      , filteredDistrictList, filteredStateList, logged, mobile, otp, showOtpModal, beneficiaries, showError, errorMessage,
      expandArtic3, errortype, allIdTypes, loader, selectedCenter, selectedSession,
      typesOfVaccination, feeTypeList, ageLimit, doseType } = this.state;
    // console.log('stateList', this.state);
    return (
      <div className={`${!centers.length && "whenNoList3"} App`}>

        <article className={`${!centers.length && "whenNoList1"} articleBody`}>
          <div className="part">
            <div className="createdf"><div className="flexBetween"> <span className="about">By Priyanka </span> <span class="material-icons-outlined spn">
            facebook
            </span></div></div>
            <div className="firstPart">
              <MotivateComponent />
            </div>

            <div className={`${!centers.length && "whenNoList2"} scndPart`}>
              <div className="searchSl">
                <div className={`${logged && "slideLeft"}`}>Let's Vaccinate</div>
                {logged ? <button className="logoutbtn" onClick={this.logout}>Logout
                  <span className="material-icons-outlined log1">
                    logout
                  </span>
                </button> : <></>}
              </div>

              <article className="mainArticle">

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
                      <TableViewCalenderSessionsComponent centers={centersToShow} bookThisDose={this.bookThisDose} selectFilterTypeHandler={this.selectFilterTypeHandler.bind(this)}
                        typesOfVaccination={typesOfVaccination} feeTypeList={feeTypeList} ageLimit={ageLimit} doseType={doseType}
                        clearAllFilters={this.clearAllFilters}
                      /></div> :
                    <></>}</>
                  :

                  <>

                    {logged === false ?
                      <article className="artic2">
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
                          <button className="closgh" onClick={this.closeOtpBox}>Close</button>

                        </div> : <></>}
                      </article> :
                      <div className="relative bonki" id="bookslot">
                        <button className="fixbluffer" onClick={this.backToList}>Back</button>
                        {beneficiaries.length>0 ?<article className={`${expandArtic3 && 'expandedArtic3'} artic3`}>
                          <TitleNIconCcomponent icon="groups" title="Beneficiaries" description={`Found ${beneficiaries.length} beneficiaries linked with this number`} />
                          <BeneficiariesListCcomponent beneficiaries={beneficiaries} allIdTypes={allIdTypes}  />
                        </article> : <></>}
                        <article className={beneficiaries.length>0 ? 'artic4': 'artic3'}  >
                          <TitleNIconCcomponent icon="book_online" title="Book Slot" description={`Proceed for book vaccination slot online`} />
                          <DisplaySlotAndBookComponent confirmBooking={this.confirmBooking} selectedSession={selectedSession} selectedCenter={selectedCenter} beneficiaries={beneficiaries} />
                        </article>

                      </div>
                    }
                  </>

                }

              </article>
            </div>
          </div>
        </article>

        <footer>
          <FooterCcomponent />
        </footer>

        {showError &&
          <>
            <ErrorModalPopupComponent errortype={errortype} closeError={this.closeError} errorMessage={errorMessage} />
          </>}

        {loader ? <div className="loader">
          <span className="material-icons-outlined loaderIcon">
            hourglass_bottom
          </span>
        </div> : <></>}
      </div>
    )
  }
}

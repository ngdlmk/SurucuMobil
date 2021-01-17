import React, { Component } from 'react';
import { Container,  Content, Icon,Tabs,Tab,TabHeading, Fab, Button, View} from 'native-base';
import {CarInformationScreen,CarImageScreen, LicenseImageScreen,InsuranceImageScreen,ImmsImageScreen,
  ExaminationImageScreen,RoutePermissionDocumentImageScreen} from './tabs/car'
import { Dropdown } from 'react-native-material-dropdown-v2';
import {MapService,PuantajService} from '../services';
import {GetCarsModel,GetAracDetailsByAracId} from '../models';
import TokenRequestModel from '../models/TokenRequestModel'
import {AsyncStorage, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

var StorageKeys=require('../data/StorageKeys.json');

export default class CarScreen extends Component {
  mapService=new MapService();
  puantajService=new PuantajService();

  constructor(props){
    super(props);

    this.state = {
      active: false,
      selectedTab:-1,
      cars:[],      
      selectedCarId:0,   
      tokenRequestModel: new TokenRequestModel(),   
      carDetail: {
        plaka: "",
        wehicleRentAmount: "",
        modelYear: "",
        gpsBedeli: "",
        description: "",
        owner: {
            name: "",
            surname: ""
        },
        wehicleBrand: {
            brand: ""
        },
        wehicleModel: {
            model: "",
            wehicleCapacity: {
                capacityName: ""
            }
        }
      },
      carInsuranceInfo:{},
      carImages:[],
      carLicenseResponse:{},
      licenseImages:[],
      insuranceImages:[],
      carInsuranceResponse:{},      
      immsImages:[],
      carImmsResponse:{},
      examinationImages:[],
      carExaminationResponse:{},
      routePermissionDocumentImages:[],
      carRoutePermissionDocumentResponse:{},
    };

    this.getCars=this.getCars.bind(this);
    this.getCarImages=this.getCarImages.bind(this);
    this.getCarLicense=this.getCarLicense.bind(this);
    this.getCarInsurance=this.getCarInsurance.bind(this);
    this.getCarImms=this.getCarImms.bind(this);
    this.getCarExamination=this.getCarExamination.bind(this);
    this.getCarRoutePermissionDocument=this.getCarRoutePermissionDocument.bind(this);

    this.onCarChangeEvent = this.onCarChangeEvent.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem(StorageKeys.UserDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);

      this.getCars(parsedUserDetail["UserDetail"]["PersonId"]);

      let tempTokenObject = {Token: parsedUserDetail.Token };
      this.setState({ tokenRequestModel: tempTokenObject });
    })
  }

  render() {
    return (     
      <View style={{flex: 1}}>
          <Dropdown label='Araçlar' data={this.state.cars} onChangeText={this.onCarChangeEvent}/>
          <Tabs initialPage={0} page={this.state.selectedTab} locked={true}>
            <Tab heading={<TabHeading><Icon name="bus" /></TabHeading>}>
                <CarInformationScreen carDetail={this.state.carDetail}/>
            </Tab>
            <Tab heading={<TabHeading><Icon type="MaterialIcons" name="car-repair" /></TabHeading>}>
              <CarImageScreen carInsuranceInfo={this.state.carInsuranceInfo} carImages={this.state.carImages} 
                              reloadCarImages={this.getCarImages} token={this.state.tokenRequestModel.Token} 
                              selectedCarId={this.state.selectedCarId}/>
            </Tab>
            <Tab heading={<TabHeading><Icon type="AntDesign" name="idcard" /></TabHeading>}>              
              <LicenseImageScreen licenseImages={this.state.licenseImages} carLicenseResponse={this.state.carLicenseResponse}
                              reloadLicenseImages={this.getCarLicense} token={this.state.tokenRequestModel.Token} 
                              selectedCarId={this.state.selectedCarId}/>
            </Tab>
            <Tab heading={<TabHeading><Icon name="md-git-compare" /></TabHeading>}>                     
              <InsuranceImageScreen insuranceImages={this.state.insuranceImages} carInsuranceResponse={this.state.carInsuranceResponse}
                              reloadInsuranceImages={this.getCarInsurance} token={this.state.tokenRequestModel.Token} 
                              selectedCarId={this.state.selectedCarId} navigation={this.props.navigation}/>          
            </Tab>
            <Tab heading={<TabHeading><Icon name="car" /></TabHeading>}>
              <ImmsImageScreen immsImages={this.state.immsImages} carImmsResponse={this.state.carImmsResponse}
                              reloadImmsImages={this.getCarImms} token={this.state.tokenRequestModel.Token} 
                              selectedCarId={this.state.selectedCarId}/>
            </Tab>
            <Tab heading={<TabHeading><Icon name="ios-body" /></TabHeading>}>
               <ExaminationImageScreen examinationImages={this.state.examinationImages} carExaminationResponse={this.state.carExaminationResponse}
                              reloadExaminationImages={this.getCarExamination} token={this.state.tokenRequestModel.Token} 
                              selectedCarId={this.state.selectedCarId} navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={<TabHeading><Icon name="ios-document" /></TabHeading>}>
            <RoutePermissionDocumentImageScreen routePermissionDocumentImages={this.state.routePermissionDocumentImages} carRoutePermissionDocumentResponse={this.state.carRoutePermissionDocumentResponse}
                              reloadRoutePermissionDocumentImages={this.getCarRoutePermissionDocument} token={this.state.tokenRequestModel.Token} 
                              selectedCarId={this.state.selectedCarId} navigation={this.props.navigation}/>
            </Tab>
          </Tabs>  
       </View>     
    );
  }

  //get items from api
  getCars(personId){
    var model=new GetCarsModel();
    model.PersonId=personId;
    
    this.mapService.getCars(model).then(responseJson => {
        if (!responseJson.IsSuccess) {          
            return;       
        }
        responseJson.Data.Cars.map(car=>{
            this.state.cars.push({
              key:car.CarId,
              value:car.Plate
            })
        });
    }).catch((error) => {
        console.log(error);
    });
  }

  getCarDetails(carId) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = carId;

    this.puantajService.getAracDetailsByAracId(request).then(responseJson => {
        this.setState({
            carDetail: responseJson.Data.wehicleList[0],
            selectedTab:0
        });

        this.getCarImages(carId,false);
        this.getCarLicense(carId,false);
        this.getCarInsurance(carId,false);
        this.getCarImms(carId,false);
        this.getCarExamination(carId,false);
        this.getCarRoutePermissionDocument(carId,false);

    }).catch((error) => {
        console.error(error);
    });
  }

  getCarImages(carId,isSelectedTab) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = carId;
    request.SType = "9";
    request.DType = "9";

    this.puantajService.getAracResimlerByAracId(request).then(responseJson => {
        if (responseJson.Data) {
            this.setState({
                carInsuranceInfo: responseJson.Data.insurance,
                selectedTab:isSelectedTab?1:0
            });
            if (responseJson.Data.imageList.length > 0) {
                this.setState({
                  carImages: responseJson.Data.imageList
                });
            }
        }           
    }).catch((error) => {
        console.error(error);
    });
  }

  getCarLicense(carId,isSelectedTab) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = carId;

    this.puantajService.getAracRuhsatByAracId(request).then(responseJson => {
        if (responseJson.Data) {
            this.setState({
                carLicenseResponse: responseJson.Data.ruhsat,
                selectedTab:isSelectedTab?2:0
            });
            if (responseJson.Data.imageList.length > 0) {
                this.setState({
                    licenseImages: responseJson.Data.imageList
                });
            }
        }

    }).catch((error) => {
        console.error(error);
    });
  }

  getCarInsurance(carId,isSelectedTab) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = carId;
    request.SType = 1;
    request.DType = "2";

    this.puantajService.getAracSigortaByAracId(request).then(responseJson => {
        if (responseJson.Data && responseJson.Data.imageList.length > 0) {            
             this.setState({
                insuranceImages: responseJson.Data.imageList,
                carInsuranceResponse : responseJson.Data.insurance,
                selectedTab:isSelectedTab?3:0
             });
        }
    }).catch((error) => {
        console.error(error);
    });
  }
  
  getCarImms(carId,isSelectedTab) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = carId;
    request.SType = 2;
    request.DType = "3";

    this.puantajService.getAracSigortaByAracId(request).then(responseJson => {
        if (responseJson.Data) {
            this.setState({
                carImmsResponse: responseJson.Data.insurance,
                selectedTab:isSelectedTab?4:0
            });
            if (responseJson.Data.imageList.length > 0) {
                this.setState({
                    immsImages: responseJson.Data.imageList
                });
            }
        }
    }).catch((error) => {
        console.error(error);
    });
}

getCarExamination(carId,isSelectedTab) {
  var request = new GetAracDetailsByAracId();
  request.Token = this.state.tokenRequestModel.Token;
  request.AracId = carId;
  request.SType = 3;
  request.DType = "4";

  this.puantajService.getAracSigortaByAracId(request).then(responseJson => {
      if (responseJson.Data) {
          this.setState({
              carExaminationResponse: responseJson.Data.insurance,
              selectedTab:isSelectedTab?5:0
          });
          if (responseJson.Data.imageList.length > 0) {
              this.setState({
                examinationImages: responseJson.Data.imageList
              });
          }
      }
  }).catch((error) => {
      console.error(error);
  });
}

getCarRoutePermissionDocument(carId,isSelectedTab) {
  var request = new GetAracDetailsByAracId();
  request.Token = this.state.tokenRequestModel.Token;
  request.AracId = carId;

  this.puantajService.getGuzergahIzinByAracId(request).then(responseJson => {
      if (responseJson.Data) {             
          this.setState({
              carRoutePermissionDocumentResponse: responseJson.Data.guzergahIzin,
              selectedTab:isSelectedTab?6:0
          }); 
          if (responseJson.Data.imageList.length > 0) {
              this.setState({
                routePermissionDocumentImages: responseJson.Data.imageList
              });
          }
      }
  }).catch((error) => {
      console.error(error);
  });
}

  //dropdown change event
  onCarChangeEvent(selectedValue) {
    this.state.cars.map(car=>{
      if(car.value==selectedValue && car.key!=this.state.selectedCarId){  
        this.getCarDetails(car.key);

        this.setState({
          selectedCarId:car.key
        });
      }
    })
  }  
}
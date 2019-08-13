import React, { Component } from 'react';
import { Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,  Content, Text, Button, Icon,Header,Tabs,Tab,TabHeading} from 'native-base';
import {CarInformationScreen,CarImageScreen} from './tabs/car'
import { Dropdown } from 'react-native-material-dropdown';
import {MapService,PuantajService} from '../services';
import {GetCarsModel,GetAracDetailsByAracId} from '../models';
import TokenRequestModel from '../models/TokenRequestModel'
import {AsyncStorage} from 'react-native';

var StorageKeys=require('../data/StorageKeys.json');

export default class CarScreen extends Component {
  mapService=new MapService();
  puantajService=new PuantajService();

  constructor(props){
    super(props);

    this.state = {
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
      selectedTab:-1
    };

    this.getCars=this.getCars.bind(this);
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
      <Container>
        <Content> 
          <Dropdown label='Araçlar' data={this.state.cars} onChangeText={this.onCarChangeEvent}/>
          <Tabs initialPage={-1} page={this.state.selectedTab} style={{paddingTop:5}} locked={true}>
            <Tab heading={<TabHeading><Icon name="bus" /></TabHeading>}>
              <CarInformationScreen carDetail={this.state.carDetail}/>
            </Tab>
            <Tab heading={<TabHeading><Icon name="bus" /></TabHeading>}>
              <CarImageScreen carInsuranceInfo={this.state.carInsuranceInfo} carImages={this.state.carImages}/>
            </Tab>
            <Tab heading={<TabHeading><Icon name="ios-filing" /></TabHeading>}>
            </Tab>
            <Tab heading={<TabHeading><Icon name="md-git-compare" /></TabHeading>}>
            </Tab>
            <Tab heading={<TabHeading><Icon name="car" /></TabHeading>}>
            </Tab>
            <Tab heading={<TabHeading><Icon name="ios-body" /></TabHeading>}>
            </Tab>
            <Tab heading={<TabHeading><Icon name="ios-document" /></TabHeading>}>
            </Tab>
          </Tabs>  
        </Content>
       </Container>     
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

        this.getCarImages(carId);
    }).catch((error) => {
        console.error(error);
    });
  }

  getCarImages(carId) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = carId;
    request.SType = "9";
    request.DType = "9";

    this.puantajService.getAracResimlerByAracId(request).then(responseJson => {
        if (responseJson.Data) {
            this.setState({
                carInsuranceInfo: responseJson.Data.insurance,
            });
            if (responseJson.Data.imageList.length > 0) {
                this.setState({
                  carImages: responseJson.Data.imageList,
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
      }
    })
  }  
}
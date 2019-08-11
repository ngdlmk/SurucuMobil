import React, { Component } from 'react';
import { Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,  Content, Text, Button, Icon,Header,Tabs,Tab,TabHeading} from 'native-base';
import {CarInformationScreen} from './tabs/car'
import { Dropdown } from 'react-native-material-dropdown';
import {MapService,PuantajService} from '../services';
import {GetCarsModel,GetAracDetailsByAracIdModel} from '../models';
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
          <Tabs initialPage={-1} page={this.state.selectedTab} style={{paddingTop:5}} >
            <Tab heading={<TabHeading><Icon name="bus" /></TabHeading>}>
              <CarInformationScreen carDetail={this.state.carDetail}/>
            </Tab>
            <Tab heading={<TabHeading><Icon name="bus" /></TabHeading>}>
            <Text>Second tab</Text>
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

  getAracDetails(wehicleId) {
    var request = new GetAracDetailsByAracIdModel();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = wehicleId;

    this.puantajService.getAracDetailsByAracId(request).then(responseJson => {
        this.setState({
            carDetail: responseJson.Data.wehicleList[0],
            selectedTab:0
        });
    }).catch((error) => {
        console.error(error);
    });
}

  //dropdown change event
  onCarChangeEvent(selectedValue) {
    this.state.cars.map(car=>{
      if(car.value==selectedValue && car.key!=this.state.selectedCarId){  
        this.getAracDetails(car.key);
      }
    })
  }  
}
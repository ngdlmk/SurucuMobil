import React, { Component } from 'react';
import { Container,  Content,  Grid, Row, Col, Button, Text } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import {GetCarsModel} from '../../models';
import MapService from '../../services/MapService';
import {AsyncStorage} from 'react-native';

var StorageKeys=require('../../data/StorageKeys.json');

export default class RouteModalScreen extends Component {
  mapService=new MapService();

  constructor(props){
    super(props);

    this.state = {
      animateLogin: false,
      cars:[],
      personId:0
    };

    this.getCars=this.getCars.bind(this);
    this.getPersonId=this.getPersonId.bind(this);
    this.carChangeEvent=this.carChangeEvent.bind(this);
  }

  componentWillMount(){
    this.getPersonId();
    this.getCars();
}

  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }, {
      value: '1',
    }, {
      value: '2',
    }, {
      value: '3',
    }];

    return (
      <Container>
        <Content style={{ paddingLeft: 5, paddingRight: 5,paddingTop:30 }}> 
          {this.state.animateLogin &&         
              <Spinner
                      visible={this.state.animateLogin}
                      textContent={Constant.LoadingText}
                      textStyle={{color: '#FFF' }}
                      />
            }
          <Dropdown label='Araçlar'data={this.state.cars} onChangeText={this.carChangeEvent()}/>
          <Dropdown label='Projeler'data={data} />
          <Dropdown label='Güzergahlar'data={data} />
          <Dropdown label='Seferler'data={data} />

          <Grid style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, marginTop: 20  }}>
              <Row style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                   <Button block rounded light
                          onPress={this.filterOperation.bind(this)}>
                          <Text>Filtrele</Text>
                      </Button>
                 </Col>
              </Row>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
              <Row style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                     <Button block transparent 
                         onPress={() => this.props.navigation.goBack()} >
                        <Text style={{color:"#B22222"}}>İptal</Text>
                    </Button>
                  </Col>
              </Row>
          </Grid>
      </Content>
       </Container>
    );
  }

  filterOperation(){

  }

  getPersonId(){
    AsyncStorage.getItem(StorageKeys.UserDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);
      this.setState({
        personId:parsedUserDetail["UserDetail"]["PersonId"]
      });
    })
  }

  //get items
  getCars(){
    var model=new GetCarsModel();
    model.PersonId=603;//this.state.personId;

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

  //dropdown change event
  carChangeEvent(key, value){
    alert(key);
  }
}
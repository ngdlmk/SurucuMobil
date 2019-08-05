import React, { Component } from 'react';
import { Container,  Content,  Grid, Row, Col, Button, Text } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import {GetCarsModel,GetProjectsModel,GetRoutesModel,GetVoyagesModel} from '../../models';
import MapService from '../../services/MapService';
import {AsyncStorage,Alert} from 'react-native';
import * as Constant from '../../data/Constants';

var StorageKeys=require('../../data/StorageKeys.json');

export default class RouteModalScreen extends Component {
  mapService=new MapService();

  constructor(props){
    super(props);

    this.state = {
      cars:[],
      projects:[],
      routes:[],
      voyages:[],
      selectedCarId:0,
      selectedProjectId:0,
      selectedRouteId:0,
      selectedVoyageId:0
    };

    this.getCars=this.getCars.bind(this);
    this.getProjects=this.getProjects.bind(this);
    this.getRoutes=this.getRoutes.bind(this);
    this.getVoyages=this.getVoyages.bind(this);

    this.filterOperation=this.filterOperation.bind(this);
    this.exitOperation=this.exitOperation.bind(this);
    
    this.onCarChangeEvent = this.onCarChangeEvent.bind(this);
    this.onProjectChangeEvent = this.onProjectChangeEvent.bind(this);
    this.onRouteChangeEvent = this.onRouteChangeEvent.bind(this);
    this.onVoyageChangeEvent = this.onVoyageChangeEvent.bind(this);
  }

  //component lifecycle
  shouldComponentUpdate( nextProps, nextState ){
    let isStateSame=(nextState.selectedCarId === this.state.selectedCarId && nextState.selectedProjectId === this.state.selectedProjectId &&
                     nextState.selectedRouteId === this.state.selectedRouteId && nextState.selectedVoyageId === this.state.selectedVoyageId);

    return !isStateSame;
  }

  componentWillMount(){
    AsyncStorage.getItem(StorageKeys.UserDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);
      this.getCars(parsedUserDetail["UserDetail"]["PersonId"]);
    })
  }

  componentDidMount(){
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        let carId="0",projectId="0",routeId="0",voyageId="0";

        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];

          if(key==StorageKeys.SelectedCarId)
            carId=value;
          else if(key==StorageKeys.SelectedProjectId)
            projectId=value;
          else if(key==StorageKeys.SelectedRouteId)
            routeId=value;
          else if(key==StorageKeys.SelectedVoyageId)
            voyageId=value;
        });

        this.setState({
          selectedCarId:carId,
          selectedProjectId:projectId,
          selectedRouteId:routeId,
          selectedVoyageId:voyageId
        });

      });
    });
  }

  render() {
    return (
      <Container>
        <Content style={{ paddingLeft: 5, paddingRight: 5,paddingTop:30 }}> 
          <Dropdown label='Araçlar' data={this.state.cars} onChangeText={this.onCarChangeEvent}/>
          <Dropdown label='Projeler' data={this.state.projects} onChangeText={this.onProjectChangeEvent}/>
          <Dropdown label='Güzergahlar' data={this.state.routes} onChangeText={this.onRouteChangeEvent}/>
          <Dropdown label='Seferler' data={this.state.voyages} onChangeText={this.onVoyageChangeEvent}/>

          <Grid style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, marginTop: 20  }}>
              <Row style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                   <Button block rounded light
                          onPress={this.filterOperation}>
                          <Text>Filtrele</Text>
                      </Button>
                 </Col>
              </Row>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
              <Row style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                     <Button block transparent 
                         onPress={this.exitOperation} >
                        <Text style={{color:"#B22222"}}>İptal</Text>
                    </Button>
                  </Col>
              </Row>
          </Grid>
      </Content>
       </Container>
    );
  }

  //button events
  filterOperation(){       
    if(this.state.selectedCarId==0){
      Alert.alert(Constant.ErrorText,"Araç seçmelisiniz")
      return;
    }     
    if(this.state.selectedProjectId==0){
      Alert.alert(Constant.ErrorText,"Proje seçmelisiniz")
      return;
    }   
    if(this.state.selectedRouteId==0){
      Alert.alert(Constant.ErrorText,"Güzergah seçmelisiniz")
      return;
    }   
    if(this.state.selectedVoyageId==0){
      Alert.alert(Constant.ErrorText,"Sefer seçmelisiniz")
      return;
    } 

    this.saveLocalStorage(true);
  }

  exitOperation(){    
    this.saveLocalStorage(false);
  }

  //operation
  saveLocalStorage(isPressFilter){
    let carId=isPressFilter?this.state.selectedCarId:0;
    let projectId=isPressFilter?this.state.selectedProjectId:0;
    let routeId=isPressFilter?this.state.selectedRouteId:0;
    let voyageId=isPressFilter?this.state.selectedVoyageId:0;

    AsyncStorage.multiSet([[StorageKeys.SelectedCarId,carId.toString()],
                         [StorageKeys.SelectedProjectId,projectId.toString()],
                         [StorageKeys.SelectedRouteId,routeId.toString()],
                         [StorageKeys.SelectedVoyageId,voyageId.toString()]]);

    this.props.navigation.goBack();
  }

  //dropdown change event
  onCarChangeEvent(selectedValue) {
    this.state.cars.map(car=>{
      if(car.value==selectedValue && car.key!=this.state.selectedCarId){  
        this.getProjects(car.key);

        this.setState({
          selectedCarId:car.key
        });
      }
    })
  }  

  onProjectChangeEvent(selectedValue) {
    this.state.projects.map(project=>{
      if(project.value==selectedValue && project.key!=this.state.selectedProjectId){   
        this.getRoutes(project.key);

        this.setState({
          selectedProjectId:project.key
        });
      }
    })
  }

  onRouteChangeEvent(selectedValue) {
    this.state.routes.map(route=>{
      if(route.value==selectedValue && route.key!=this.state.selectedRouteId){    
        this.getVoyages(route.key);
            
        this.setState({
          selectedRouteId:route.key
        });
      }
    })
  }

  onVoyageChangeEvent(selectedValue) {
    this.state.voyages.map(voyage=>{
      if(voyage.value==selectedValue && voyage.key!=this.state.selectedVoyageId){        
        this.setState({
          selectedVoyageId:voyage.key
        });
      }
    })
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

  getProjects(carId){
    var model=new GetProjectsModel();
    model.CarId=carId;

    this.mapService.getProjects(model).then(responseJson => {
        if (!responseJson.IsSuccess) {     
            return;       
        }

        responseJson.Data.Projects.map(project=>{
            this.state.projects.push({
              key:project.ProjectId,
              value:project.ProjectName
            })
        });
    }).catch((error) => {
        console.log(error);
    });
  }

  getRoutes(projectId){
    var model=new GetRoutesModel();
    model.CarId=this.state.selectedCarId;
    model.ProjectId=projectId;

    this.mapService.getRoutes(model).then(responseJson => {
        if (!responseJson.IsSuccess) {       
            return;       
        }

        responseJson.Data.Routes.map(route=>{
            this.state.routes.push({
              key:route.RouteId,
              value:route.RouteName
            })
        });
    }).catch((error) => {
        console.log(error);
    });
  }

  getVoyages(routeId){
    var model=new GetVoyagesModel();
    model.CarId=this.state.selectedCarId;
    model.RouteId=routeId;

    this.mapService.getVoyages(model).then(responseJson => {
        if (!responseJson.IsSuccess) {       
            return;       
        }

        responseJson.Data.Voyages.map(voyage=>{
            this.state.voyages.push({
              key:voyage.VoyageId,
              value:voyage.VoyageDescription
            })
        });
    }).catch((error) => {
        console.log(error);
    });
  }
}

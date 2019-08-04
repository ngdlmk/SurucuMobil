import React, { Component } from 'react';
import { View, Text,Alert } from 'react-native';
import { Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import {GetStationsModel,GetDirectionsModel} from '../models';
import MapService from '../services/MapService';
import getDirections from 'react-native-google-maps-directions'
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Constant from '../data/Constants';

var StorageKeys=require('../data/StorageKeys.json');

export default class RouteScreen extends Component {
  mapService=new MapService();
  mapView=null;

  constructor(props){
    super(props); 
    
    this.state={
      stations:[],
      direction:{},
      waypoints:[],
      selectedVoyageId:0
    }
  }  

  //compoenent life cycle
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 9 }}
            ref = {(ref)=>this.mapView=ref}
            initialRegion={
              {
                latitude:  41.0441,
                longitude: 29.0017,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            }
            zoomEnabled={true}
          >
            <Polyline
              coordinates={this.state.waypoints}
              strokeWidth={2}
              strokeColor="red"/>
            {this.state.stations.map((station,index) => (
                <Marker 
                  key={index}
                  coordinate={station.coordinate}
                  title={station.title}
                  description={station.description}
                />
              ))}
        </MapView>
        <View style={{ paddingTop:20, flex: 1 }}>
          <Button rounded block info  onPress={this.openGoogleMapApplication}>
               <Text>Google Map i Aç</Text>
          </Button> 
        </View>
      </View>
    );
  }

  componentWillMount(){
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
        this.getStationAndDirections();
    });
  }
  
  componentWillUnmount() {
    this.focusListener.remove();
  }

  //operation methods
  getStationAndDirections=()=>{
    AsyncStorage.multiGet([ StorageKeys.SelectedVoyageId]).then(response => {
        let selectedVoyageId=response[0][1];
        if(selectedVoyageId==0)
          return;

        this.getDirections(selectedVoyageId);
        this.getStations(selectedVoyageId);

        this.setState({
          selectedVoyageId:selectedVoyageId
        });
    })
  }

  //get items from api
  getStations=(voyageId)=>{
    var model=new GetStationsModel();
    model.VoyageId=voyageId;

    this.mapService.getStations(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            return;       
        }
        this.setState({
          stations:responseJson.Data.Stations
        });
    }).catch((error) => {
        console.log(error);
    });
  }

  getDirections=(voyageId)=>{
    var model=new GetDirectionsModel();
    model.VoyageId=voyageId;

    this.mapService.getDirections(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            return;       
        }
  
        let latitude=(JSON.parse(responseJson.Data.Direction.Source).location.lat+JSON.parse(responseJson.Data.Direction.Destination).location.lat)/2;
        let longitude=(JSON.parse(responseJson.Data.Direction.Source).location.lng+JSON.parse(responseJson.Data.Direction.Destination).location.lng)/2;
        let newRegion = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        };

        this.mapView.animateToRegion(newRegion, 2000);

        this.setState({
          direction:responseJson.Data.Direction,
          waypoints:JSON.parse(responseJson.Data.Direction.Waypoints)
        });
    }).catch((error) => {
        console.log(error);
    });
  }

  //open google map application
  openGoogleMapApplication = () => {
    if(this.state.selectedVoyageId==0){
      Alert.alert(Constant.ErrorText,"Rota seçmelisiniz")
      return;
    }
    const {direction}=this.state;  
    let source =JSON.parse(direction.Source);
    let destination =JSON.parse(direction.Destination);
    let waypointList =JSON.parse(direction.Waypoints)

    const data = {
        source: {
        latitude: source.location.lat,
        longitude: source.location.lng
      },
      destination: {
        latitude: destination.location.lat,
        longitude: destination.location.lng
      },
      params: [
        {
          key: "travelmode",
          value: "driving" 
        },
        {
          key: "dir_action",
          value: "navigate" 
        }
      ],
      waypoints: waypointList
    }

    getDirections(data)
  }


}

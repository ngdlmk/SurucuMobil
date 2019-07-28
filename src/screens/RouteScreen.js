import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import {GetStationsModel,GetDirectionsModel} from '../models';
import MapService from '../services/MapService';
import getDirections from 'react-native-google-maps-directions'

var StorageKeys=require('../data/StorageKeys.json');

export default class RouteScreen extends Component {
  mapService=new MapService();

  constructor(props){
    super(props); 
    
    this.state={
      stations:[],
      direction:{}
    }
  }  
  
  render() {
    return (
      <View style={styles.MainContainer}>
             <Button rounded block info 
              onPress={this.handleGetDirections}>
              <Text>Get Directions</Text>
            </Button>
      </View>
    );
  }

  componentWillMount(){
    this.getDirections(5);
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

        console.warn("seçilen yolId:"+selectedVoyageId);

        this.getDirections(selectedVoyageId);
        this.getStations(selectedVoyageId);
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
          responseJson.Data.Stations.map(station=>{
              this.state.stations.push({
                stationNo:station.StationNo,
                title:station.Title,
                latitude:station.Latitude,
                longtitude:station.Longtitude
              })
          });
          //console.warn(this.state.stations);
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
          
          this.setState({
            direction:responseJson.Data.Direction
          });
          console.warn("ok")
      }).catch((error) => {
          console.log(error);
      });
    }

    //google map operation
    handleGetDirections = () => {
      const {direction}=this.state;  
      let source =JSON.parse(direction.Source);
      let destination =JSON.parse(direction.Destination);
      let waypointList =JSON.parse(direction.Waypoints);      
      let waypoints=[];

      waypointList.map(waypoint=>{
        if(waypoint.location.location!=null){
          let lat=parseFloat(waypoint.location.location.lat);
          waypoints.push(   {
            latitude: lat,
            longitude: 28.912081400000034
          });
        }
      });
      
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
        waypoints: waypoints
      }

      getDirections(data)
    }
 }
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});
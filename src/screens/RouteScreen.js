import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import {GetStationsModel,GetDirectionsModel} from '../models';
import MapService from '../services/MapService';

var StorageKeys=require('../data/StorageKeys.json');

export default class RouteScreen extends Component {
  mapService=new MapService();

  constructor(props){
    super(props); 
    
    this.state={
      stations:[],
      directions:[]
    }
  }
  
  render() {
    return (
      <View style={styles.MainContainer}>{
      }
        <Text style={{ fontSize: 23 }}> Route Screen </Text>
      </View>
    );
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
    AsyncStorage.multiGet([StorageKeys.SelectedRouteId, StorageKeys.SelectedVoyageId]).then(response => {
        let selectedRouteId=response[0][1];
        let selectedVoyageId=response[1][1];
        if(selectedRouteId==0 || selectedVoyageId==0)
          return;

        //console.warn("seçilen seferId:"+selectedRouteId);
        //console.warn("seçilen yolId:"+selectedVoyageId);

        this.getStations(selectedRouteId,selectedVoyageId);
        this.getDirections(selectedRouteId,selectedVoyageId);
    })
  }
  //get items from api
    getStations=(routeId,voyageId)=>{
      var model=new GetStationsModel();
      model.RouteId=routeId;
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

    getDirections=(routeId,voyageId)=>{
      var model=new GetDirectionsModel();
      model.RouteId=routeId;
      model.VoyageId=voyageId;

      this.mapService.getDirections(model).then(responseJson => {
          if (!responseJson.IsSuccess) {             
              return;       
          }
          responseJson.Data.Directions.map(direction=>{
              this.state.directions.push({
                directionJsonFormat:direction.DirectionJsonFormat,
                directionId:direction.DirectionId
              })
          });
          //console.warn(this.state.directions);
      }).catch((error) => {
          console.log(error);
      });
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
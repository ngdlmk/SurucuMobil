import React, { Component } from 'react';
import {AsyncStorage,WebView} from 'react-native';
import {GetDirectionsModel} from '../models';
import MapService from '../services/MapService';

var StorageKeys=require('../data/StorageKeys.json');

export default class RouteScreen extends Component {
  mapService=new MapService();
  mapView=null;

  constructor(props){
    super(props); 
    
    this.state={
      stations:[],
      direction:{},
      webViewSource:"https://www.google.com/maps/"
    }
  }  

  //compoenent life cycle
  render() {
    return (
       <WebView source={{uri: this.state.webViewSource}} />
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
    })
  }

  //get items from api
  getDirections=(voyageId)=>{
    var model=new GetDirectionsModel();
    model.VoyageId=voyageId;

    this.mapService.getDirections(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            return;       
        }      
        this.openGoogleMapApplication(responseJson.Data.Direction);
    }).catch((error) => {
        console.log(error);
    });
  }

  //open google map application
  openGoogleMapApplication = (direction) => {
    let source =JSON.parse(direction.Source);
    let destination =JSON.parse(direction.Destination);
    let waypointList =JSON.parse(direction.Waypoints);  

    var webViewSource = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${destination.location.lat},${destination.location.lng}&origin=${source.location.lat},${source.location.lng}`

    if (waypointList.length !== 0) {
      const params = waypointList
        .map(value => `${value.latitude},${value.longitude}`)
        .join('|')
    
        webViewSource=webViewSource+`&waypoints=${params}`
    }
  
    this.setState({
      webViewSource:webViewSource
    });
  }


}

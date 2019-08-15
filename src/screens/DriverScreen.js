import React, { Component } from 'react';
import { Container,  Content, Icon,Tabs,Tab,TabHeading} from 'native-base';
import {DriverInformationScreen} from './tabs/driver'
import {DriverService} from '../services';
import TokenRequestModel from '../models/TokenRequestModel'
import {AsyncStorage} from 'react-native';
import {GetDriverInformationRequestModel} from '../models';

var StorageKeys=require('../data/StorageKeys.json');
 
export default class DriverScreen extends Component {
  driverService=new DriverService();

  constructor(props){
    super(props);

    this.state = {
      personId:-1,  
      tokenRequestModel: new TokenRequestModel(),
      driverInformation:{}
    };

    this.getDriverInformation=this.getDriverInformation.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem(StorageKeys.UserDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);

      let tempTokenObject = {Token: parsedUserDetail.Token };

      this.setState({ 
        personId:parsedUserDetail["UserDetail"]["PersonId"],
        tokenRequestModel: tempTokenObject 
      });

      this.getDriverInformation(parsedUserDetail["UserDetail"]["PersonId"]);
    })
  }

  render() {
    return (     
      <Container>
        <Content> 
          <Tabs initialPage={-1} page={this.state.selectedTab} style={{paddingTop:5}} locked={true}>
            <Tab heading={<TabHeading><Icon name="bus" /></TabHeading>}>
              <DriverInformationScreen driverInformation={this.state.driverInformation}/>
            </Tab>
          </Tabs>  
        </Content>
       </Container>     
    );
  }

  //api methods
  getDriverInformation(personId){
    var model=new GetDriverInformationRequestModel();
    model.PersonId=personId;
    
    this.driverService.getDriverInformation(model).then(responseJson => {
        if (!responseJson.IsSuccess) {          
            return;       
        }
        this.setState({
          driverInformation:responseJson.Data.DriverInformation
        });

    }).catch((error) => {
        console.log(error);
    });
  }
}
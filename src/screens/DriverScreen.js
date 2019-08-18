import React, { Component } from 'react';
import { Container,  Content, Icon,Tabs,Tab,TabHeading} from 'native-base';
import {DriverInformationScreen,LicenseInformationScreen} from './tabs/driver'
import {DriverService,PuantajService} from '../services';
import TokenRequestModel from '../models/TokenRequestModel'
import {AsyncStorage} from 'react-native';
import {GetDriverInformationRequestModel,GetLicenseInformationRequestModel,GetAracDetailsByAracId} from '../models';

var StorageKeys=require('../data/StorageKeys.json');
 
export default class DriverScreen extends Component {
  driverService=new DriverService();
  puantajService=new PuantajService();

  constructor(props){
    super(props);

    this.state = {
      selectedTab:0,
      personId:-1,  
      tokenRequestModel: new TokenRequestModel(),
      driverInformation:{},
      licenseInsuranceInfo:{},
      licenseImages:[],
    };

    this.getDriverInformation=this.getDriverInformation.bind(this);
    this.getLicenseInformation=this.getLicenseInformation.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem(StorageKeys.UserDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);

      let tempTokenObject = {Token: parsedUserDetail.Token };
      let personId=parsedUserDetail["UserDetail"]["PersonId"];

      this.setState({ 
        personId:personId,
        tokenRequestModel: tempTokenObject 
      });

      this.getDriverInformation(personId);
      this.getLicenseInformation(personId,false);
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
            <Tab heading={<TabHeading><Icon name="ios-filing" /></TabHeading>}>              
              <LicenseInformationScreen licenseImages={this.state.licenseImages} personId={this.state.personId}
                    licenseInsuranceInfo={this.state.licenseInsuranceInfo} token={this.state.tokenRequestModel.Token} />
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

  getLicenseInformation(personId,isSelectedTab) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = personId;
    request.SType = "4";
    request.DType = "6";

    this.puantajService.getAracResimlerByAracId(request).then(responseJson => {
        if (responseJson.Data) {
            this.setState({
                licenseInsuranceInfo: responseJson.Data.insurance,
                selectedTab:isSelectedTab?1:0
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
}
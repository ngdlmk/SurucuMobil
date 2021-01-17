import React, { Component } from 'react';
import { Container,  Content, Icon,Tabs,Tab,TabHeading, View} from 'native-base';
import {DriverInformationScreen,LicenseInformationScreen,Src2ImageScreen,PsychoTechniqueImageScreen} from './tabs/driver'
import {DriverService,PuantajService} from '../services';
import TokenRequestModel from '../models/TokenRequestModel'
import {AsyncStorage} from 'react-native';
import {GetDriverInformationRequestModel,GetAracDetailsByAracId} from '../models';

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
      src2InsuranceInfo:{},
      src2Images:[],
      psychoTechniqueInsuranceInfo:{},
      psychoTechniqueImages:[],
    };

    this.getDriverInformation=this.getDriverInformation.bind(this);
    this.getLicenseInformation=this.getLicenseInformation.bind(this);
    this.getSrc2Information=this.getSrc2Information.bind(this);
    this.getPsychoTechniqueInformation=this.getPsychoTechniqueInformation.bind(this);
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
      this.getSrc2Information(personId,false);
      this.getPsychoTechniqueInformation(personId,false);
    })
  }

  render() {
    return (     
      <View style={{flex: 1}}>
          <Tabs initialPage={-1} page={this.state.selectedTab} style={{paddingTop:5}} locked={true}>
            <Tab heading={<TabHeading><Icon type="FontAwesome" name="drivers-license" /></TabHeading>}>
              <DriverInformationScreen driverInformation={this.state.driverInformation}/>
            </Tab>
            <Tab heading={<TabHeading><Icon type="Entypo" name="images" /></TabHeading>}>              
              <LicenseInformationScreen licenseImages={this.state.licenseImages} personId={this.state.personId}
                    licenseInsuranceInfo={this.state.licenseInsuranceInfo} token={this.state.tokenRequestModel.Token}
                    reloadLicenseImages={this.getLicenseInformation} />
            </Tab>
            <Tab heading={<TabHeading><Icon name="md-git-compare" /></TabHeading>}>                     
              <Src2ImageScreen src2Images={this.state.src2Images} src2InsuranceInfo={this.state.src2InsuranceInfo}
                              reloadSrc2Images={this.getSrc2Information} token={this.state.tokenRequestModel.Token} 
                              personId={this.state.personId} navigation={this.props.navigation}/>          
            </Tab> 
            <Tab heading={<TabHeading><Icon name="ios-body" /></TabHeading>}>                     
              <PsychoTechniqueImageScreen psychoTechniqueImages={this.state.psychoTechniqueImages} psychoTechniqueInsuranceInfo={this.state.psychoTechniqueInsuranceInfo}
                              reloadPsychoTechniqueImages={this.getPsychoTechniqueInformation} token={this.state.tokenRequestModel.Token} 
                              personId={this.state.personId} navigation={this.props.navigation}/>          
            </Tab> 
          </Tabs>  
        </View>   
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

  getSrc2Information(personId,isSelectedTab) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = personId;
    request.SType = "5";
    request.DType = "7";

    this.puantajService.getAracResimlerByAracId(request).then(responseJson => {
        if (responseJson.Data) {
            this.setState({
                src2InsuranceInfo: responseJson.Data.insurance,
                selectedTab:isSelectedTab?2:0
            });
            if (responseJson.Data.imageList.length > 0) {
                this.setState({
                  src2Images: responseJson.Data.imageList
                });
            }
        }           
    }).catch((error) => {
        console.error(error);
    });
  }

  getPsychoTechniqueInformation(personId,isSelectedTab) {
    var request = new GetAracDetailsByAracId();
    request.Token = this.state.tokenRequestModel.Token;
    request.AracId = personId;
    request.SType = "6";
    request.DType = "8";

    this.puantajService.getAracResimlerByAracId(request).then(responseJson => {
        if (responseJson.Data) {
            this.setState({
                psychoTechniqueInsuranceInfo: responseJson.Data.insurance,
                selectedTab:isSelectedTab?3:0
            });
            if (responseJson.Data.imageList.length > 0) {
                this.setState({
                  psychoTechniqueImages: responseJson.Data.imageList
                });
            }
        }           
    }).catch((error) => {
        console.error(error);
    });
  }

}
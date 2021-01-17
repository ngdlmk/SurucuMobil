import React,{Component} from "react";
import { Text, AsyncStorage,Alert,Image } from 'react-native';
import { Container,  Content, Item, Input, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {LoginService} from '../services'
import * as Constant from '../data/Constants'; 
import {UpdatePasswordMobileModel} from '../models';
import Spinner from 'react-native-loading-spinner-overlay';
import { TouchableOpacity } from "react-native-gesture-handler";

var StorageKeys=require('../data/StorageKeys.json');
var NavigateKeys=require('../data/NavigateKeys.json');

var personId=0;
export default class ChangePasswordScreen extends Component {
  loginService = new LoginService();

  constructor(props){
    super(props);

    this.state = {
      oldPassword:"",
      newPassword1:"",
      newPassword2:""
    };
  }

  componentDidMount (){
    AsyncStorage.getItem(StorageKeys.UserDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);
      personId=parsedUserDetail["UserDetail"]["PersonId"];
    })
  }

  render() {
    return (
      <Container>
      <Content style={{ paddingHorizontal: 30,paddingTop:5 }}>    
        <Grid style={{ marginTop: 20 }}>          
              <Row size={40} style={{ marginBottom: 40 }}>
                  <Col size={100} style={{ alignContent: "center", alignItems: "center" }}>
                      <Image source={require('../../assets/otp-image.png')} />
                  </Col>
              </Row>
              <Row size={20} style={{ marginBottom: 5 }}>
                    <Col size={100}>
                        <Item>
                            <Input value={this.state.oldPassword} 
                                placeholderTextColor="rgba(0,0,0,0.4)"
                                onChangeText={(value) => this.setState({ oldPassword: value })}
                                placeholder='Eski Şifre' />
                        </Item>
                    </Col>
                </Row>                
                <Row size={20} style={{ marginBottom: 5 }}>
                    <Col size={100}>
                        <Item>
                            <Input secureTextEntry={true} value={this.state.newPassword1} 
                                placeholderTextColor="rgba(0,0,0,0.4)"
                                onChangeText={(value) => this.setState({ newPassword1: value })}
                                placeholder='Yeni Şifre' />
                        </Item>
                    </Col> 
                </Row>                     
                <Row size={20} style={{ marginBottom: 5 }}>                 
                    <Col size={100}>
                        <Item>
                            <Input secureTextEntry={true} value={this.state.newPassword2} 
                                placeholderTextColor="rgba(0,0,0,0.4)"
                                onChangeText={(value) => this.setState({ newPassword2: value })}
                                placeholder='Yeni Şifre Tekrar' />
                        </Item>
                    </Col>
                </Row>
          </Grid>
          <Grid tyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>
              <Row size={20} style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                      <TouchableOpacity 
                        onPress={this.updatePassword.bind(this)} 
                        style={{width: '80%', height: 48, borderRadius: 7, backgroundColor: '#4983B7', justifyContent: 'center', alignSelf: 'center', marginTop: 32}}>
                          <Text style={{color: 'white', fontSize: 17, fontWeight: '600', textAlign: 'center'}}>Onayla</Text>
                      </TouchableOpacity>
                 </Col>
              </Row>
          </Grid>
      </Content>
       </Container>
    );
  }

  updatePassword(){    
    //control
    var model=new UpdatePasswordMobileModel();
    model.PersonId=personId;
    model.OldPassword=this.state.oldPassword;
    model.NewPassword1=this.state.newPassword1;
    model.NewPassword2=this.state.newPassword2;

    this.loginService.updatePasswordMobile(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);        
        }
        else{
            Alert.alert(Constant.SuccessText, "Şifreniz değiştirildi"); 

            AsyncStorage.setItem(StorageKeys.IsLoginKey,"false");

            this.props.navigation.navigate(NavigateKeys.LoginKey);
        } 
    }).catch((error) => {
        console.log(error);
    });
  }
}
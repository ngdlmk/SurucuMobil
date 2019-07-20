import React,{Component} from "react";
import { View, Alert, Image, Text, ActivityIndicator,AsyncStorage } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {LoginService} from '../services'
import * as Constant from '../data/Constants';

var NavigateKeys=require('../data/NavigateKeys.json');
var StorageKeys=require('../data/StorageKeys.json');

export default class LoginScreen extends Component {
    loginService = new LoginService();

    constructor(props){
      super(props);

      this.state = {
        userName: "",
        userPassword: "",
        animateLogin: false
      };
    }

    componentWillMount(){
      AsyncStorage.getItem(StorageKeys.IsLoginKey)
                  .then( value => {
                    if(value=="true"){
                      this.props.navigation.navigate(NavigateKeys.MenuKey);
                    }
                  })
    }

  render() {
    const isLoading = this.state.animateLogin;
    return (
      <Container>
      <Content style={{ paddingLeft: 5, paddingRight: 5 }}>
          <Grid style={{ marginTop: 70 }}>
              <Row size={40} style={{ marginBottom: 40 }}>
                  <Col size={100} style={{ alignContent: "center", alignItems: "center" }}>
                      <Image source={require('../../assets/bmsLoginLogo.png')} />
                  </Col>
              </Row>
              <View style={{ justifyContent: 'space-around', }}>
                  {isLoading && (
                      <ActivityIndicator
                          animating={this.state.animateLogin}
                          style={{ height: 80 }}
                          color="#0000ff"
                          size="large"
                          hidesWhenStopped={true}
                      />
                  )}
              </View>
              <Row size={20} style={{ marginBottom: 5 }}>
                  <Col size={100}>
                      <Item>
                          <Icon style={{ color: '#E9E5E4', padding: 0 }} name="ios-document"></Icon>
                          <Input value={this.state.userName} keyboardType="email-address"
                              onChangeText={(value) => this.setState({ userName: value })}
                              placeholder='Email' />
                      </Item>
                  </Col>
              </Row>
              <Row size={20} style={{ marginBottom: 15 }}>
                  <Col size={100}>
                      <Item>
                          <Icon style={{ color: '#E9E5E4', padding: 0 }} name="lock"></Icon>
                          <Input secureTextEntry={true} onChangeText={(value) => this.setState({ userPassword: value })}
                              value={this.state.userPassword} 
                              placeholder='Şifre' />
                      </Item>
                  </Col>
              </Row>
          </Grid>
          <Grid tyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>
              <Row size={20} style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                   <Button block rounded light
                          onPress={this.loginOperation.bind(this)}>
                          <Text>Giriş</Text>
                      </Button>
                 </Col>
              </Row>
          </Grid>
          <Grid style={{ marginTop: 50 }}>
              <Row size={20} style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                     <Button block transparent 
                         onPress={() => this.props.navigation.navigate('OtpSms')} >
                        <Text style={{color:"#B22222"}}>Şifre Oluştur</Text>
                    </Button>
                  </Col>
              </Row>
          </Grid>
          <Grid style={{ marginTop: 70 }}>
              <Row size={100}>
                  <Col size={100} style={{ alignContent: "center", alignItems: "center" }}>
                      <Image style={{ width: 150, height: 38 }} source={require('../../assets/ceturlogo.png')} />
                  </Col>
              </Row>
          </Grid>
      </Content>
  </Container>
    );
  }

  //methods
  loginOperation(){
    //validation
    if(this.state.userName===""){
        Alert.alert(Constant.ErrorText,"Email adresinizi giriniz")
        return;
    }
    if(this.state.userPassword===""){
        Alert.alert(Constant.ErrorText,"Şifrenizi giriniz")
        return;
    }

    //control
    this.setState({ animateLogin: true });

    this.loginService.login(this.state.userName, this.state.userPassword).then(responseJson => {
        this.setState({ animateLogin: false });

        if (responseJson.IsSuccess == true) {
            AsyncStorage.setItem(StorageKeys.UserDetailKey,JSON.stringify(responseJson.Data));
            AsyncStorage.setItem(StorageKeys.IsLoginKey,"true");
            
            this.props.navigation.navigate(NavigateKeys.MenuKey);
        }
        else {
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);
        }
    }).catch((error) => {
        console.log(error);
    });
  }
}
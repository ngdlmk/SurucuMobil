import React,{Component} from "react";
import { Alert, Image, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {LoginService} from '../services'
import * as Constant from '../data/Constants';
import Spinner from 'react-native-loading-spinner-overlay';

var NavigateKeys=require('../data/NavigateKeys.json');
var StorageKeys=require('../data/StorageKeys.json');

export default class LoginScreen extends Component {
    loginService = new LoginService();

    constructor(props){
      super(props);

      this.state = {
        gsmNumber: "",
        userPassword: "",
        isSpinnerShow: false
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
    return (
      <Container>
      <Content style={{ paddingLeft: 5, paddingRight: 5 }}>
      {this.state.isSpinnerShow &&
      <Spinner visible={this.state.isSpinnerShow} 
        textContent={Constant.LoadingText}  
        textStyle={{color: '#FFF' }} />
        }
          <Grid style={{ marginTop: 70, marginHorizontal: 30 }}>
              <Row size={40} style={{ marginBottom: 40 }}>
                  <Col size={100} style={{ alignContent: "center", alignItems: "center" }}>
                      <Image source={require('../../assets/bmsLoginLogo.png')} />
                  </Col>
              </Row>
              <Row size={20} style={{ marginBottom: 5 }}>
                  <Col size={100}>
                      <Item>
                          <Input value={this.state.gsmNumber} keyboardType="numeric"
                              placeholderTextColor="rgba(0,0,0,0.4)"
                              onChangeText={(value) => this.setState({ gsmNumber: value })}
                              placeholder='Gsm Numarası' />
                      </Item>
                  </Col>
              </Row>
              <Row size={20} style={{ marginBottom: 15 }}>
                  <Col size={100}>
                      <Item>
                          <Input secureTextEntry={true} onChangeText={(value) => this.setState({ userPassword: value })}
                              placeholderTextColor="rgba(0,0,0,0.4)"
                              value={this.state.userPassword} 
                              placeholder='Şifre' />
                      </Item>
                  </Col>
              </Row>
          </Grid>
          <Grid tyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>
              <Row size={20} style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                  <TouchableOpacity 
                        onPress={this.loginOperation.bind(this)}
                        style={{width: '80%', height: 48, borderRadius: 7, backgroundColor: '#4983B7', justifyContent: 'center', alignSelf: 'center', marginTop: 32}}>
                          <Text style={{color: 'white', fontSize: 17, fontWeight: '600', textAlign: 'center'}}>Giriş</Text>
                      </TouchableOpacity>
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
          <Grid style={{ marginTop: 20 }}>
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
    if(this.state.gsmNumber===""){
        Alert.alert(Constant.ErrorText,"Telefon numaranızı giriniz")
        return;
    }
    if(this.state.userPassword===""){
        Alert.alert(Constant.ErrorText,"Şifrenizi giriniz")
        return;
    }

    //control
    this.setState({ isSpinnerShow: true });
 
    this.loginService.login(this.state.gsmNumber, this.state.userPassword).then(responseJson => {        
        setTimeout(()=>{
            this.setState({ 
                isSpinnerShow:false
            });     
        }, 1500);        
            
        if (responseJson.IsSuccess ) {
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
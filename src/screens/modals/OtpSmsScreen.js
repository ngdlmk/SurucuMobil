import React,{Component} from "react";
import { View, Text, ActivityIndicator,Alert,Image } from 'react-native';
import { Container,  Content, Item, Input, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {LoginService} from '../../services'
import * as Constant from '../../data/Constants'; 
import {CreatePasswordMobileModel} from '../../models';
import Spinner from 'react-native-loading-spinner-overlay';

export default class OtpSmsScreen extends Component {
  loginService = new LoginService();

  constructor(props){
    super(props);

    this.state = {
      personId:0,
      personMobileTelephoneId:0,
      gsmNumber: "",
      smsText:"",
      newPassword1:"",
      newPassword2:"",
      animateLogin: false,
      messageSend:false
    };

    this.sendOtpSms=this.sendOtpSms.bind(this);
    this.createPassword=this.createPassword.bind(this);
  }

  render() {
    return (
      <Container>
      <Content style={{ paddingLeft: 5, paddingRight: 5,paddingTop:30 }}>          
      <Spinner
            visible={this.state.animateLogin}
            textContent={Constant.LoadingText}
            textStyle={{color: '#FFF' }}
            />
      <Grid style={{ marginTop: 20 }}>          
              <Row size={40} style={{ marginBottom: 40 }}>
                  <Col size={100} style={{ alignContent: "center", alignItems: "center" }}>
                      <Image source={require('../../../assets/otp-image.png')} />
                  </Col>
              </Row>
              
              {this.state.messageSend && (
                <Row size={20} style={{ marginBottom: 5 }}>
                    <Col size={100}>
                        <Item>
                            <Icon style={{ color: '#E9E5E4', padding: 0 }} name="ios-document"></Icon>
                            <Input value={this.state.smsText} keyboardType="numeric"
                                onChangeText={(value) => this.setState({ smsText: value })}
                                placeholder='Sms Şifre' />
                        </Item>
                    </Col>
                </Row>
            )}
            {this.state.messageSend && (
                <Row size={20} style={{ marginBottom: 5 }}>
                    <Col size={100}>
                        <Item>
                            <Icon style={{ color: '#E9E5E4', padding: 0 }} name="md-key"></Icon>
                            <Input secureTextEntry={true} value={this.state.newPassword1} 
                                onChangeText={(value) => this.setState({ newPassword1: value })}
                                placeholder='Yeni Şifre 1' />
                        </Item>
                    </Col> 
                </Row>
            )}
            {this.state.messageSend && (                
                <Row size={20} style={{ marginBottom: 5 }}>                 
                    <Col size={100}>
                        <Item>
                            <Icon style={{ color: '#E9E5E4', padding: 0 }} name="lock"></Icon>
                            <Input secureTextEntry={true} value={this.state.newPassword2} 
                                onChangeText={(value) => this.setState({ newPassword2: value })}
                                placeholder='Yeni Şifre 2' />
                        </Item>
                    </Col>
                </Row>
            )}
            {!this.state.messageSend && (
              <Row size={20} style={{ marginBottom: 5 }}>
                  <Col size={100}>
                      <Item>
                          <Icon style={{ color: '#E9E5E4', padding: 0 }} name="ios-phone-portrait"></Icon>
                          <Input value={this.state.gsmNumber} keyboardType="numeric"
                              onChangeText={(value) => this.setState({ gsmNumber: value })}
                              placeholder='Gsm Numarası' />
                      </Item>
                  </Col>
              </Row>
              )}
          </Grid>
          <Grid tyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>
              <Row size={20} style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                   <Button block rounded light
                          onPress={this.operation.bind(this)}>
                          <Text>{!this.state.messageSend?"Gönder":"Onayla"}</Text>
                      </Button>
                 </Col>
              </Row>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
              <Row size={20} style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                     <Button block transparent 
                         onPress={() => this.props.navigation.goBack()} >
                        <Text style={{color:"#B22222"}}>İptal</Text>
                    </Button>
                  </Col>
              </Row>
          </Grid>
      </Content>
       </Container>
    );
  }

 //methods
  operation(){
    if(!this.state.messageSend){
        this.sendOtpSms();
    }
    else{
        this.createPassword();
    }
  }

  sendOtpSms(){
    //validation
    if(this.state.gsmNumber===""){
        Alert.alert(Constant.ErrorText,"Telefon numaranızı giriniz")
        return;
    }

    //control
    this.setState({ animateLogin: true });
    const message="Sürücü mobil uygulamasına giriş için oluşturulan şifre"

    this.loginService.sendOtpSms(this.state.gsmNumber, message).then(responseJson => {      
        if (!responseJson.IsSuccess) {             
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);        
        }
        setTimeout(()=>
            this.setState({ 
                animateLogin:false,
                messageSend:responseJson.IsSuccess,
                personId:responseJson.Data!=null? responseJson.Data.PersonId:0,
                personMobileTelephoneId:responseJson.Data!=null?responseJson.Data.PersonMobileTelephoneId:0
            })
         , 1000); 
    }).catch((error) => {
        console.log(error);
    });
  }

  createPassword(){
    //control
    //this.setState({ animateLogin: true });

    var model=new CreatePasswordMobileModel();
    model.PersonId=this.state.personId;
    model.PersonMobileTelephoneId=this.state.personMobileTelephoneId;
    model.SmsText=this.state.smsText;
    model.NewPassword1=this.state.newPassword1;
    model.NewPassword2=this.state.newPassword2;

    this.loginService.createPasswordMobile(model).then(responseJson => {
        // setTimeout(()=>
        //     this.setState({ 
        //         animateLogin:false
        //     })
        // , 1000); 

        if (!responseJson.IsSuccess) {             
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);        
        }
        else{
            Alert.alert(Constant.SuccessText, "Şifreniz oluşturuldu"); 
            this.props.navigation.goBack();
        }
    }).catch((error) => {
        console.log(error);
    });
  }
}
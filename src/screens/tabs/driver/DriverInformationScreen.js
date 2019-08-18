import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container,  Content, Card, CardItem,  Text,  Icon, Left, Body, Right, Footer } from 'native-base';

export default class DriverInformationScreen extends Component {
    render() {
      return (
     <Container>
        <Content>
          <Card style={{flex: 0}}>
               <CardItem style={{backgroundColor:"#5F99D7"}}>
                    <Left >
                         <Image source={require('../../../../assets/tcimage.png')} />
                         <Body>
                         <Text style={{color:"#FFF"}}>SÜRÜCÜ BELGESİ</Text>
                         </Body>
                         <Image source={require('../../../../assets/flagimage.png')} />
                    </Left>
               </CardItem>
               <CardItem>
                    <Left >
                         {this.props.driverInformation.Avatar!=undefined && this.props.driverInformation.Avatar!=""?
                         <Image style={{width: 125, height: 125}} source={{uri: this.props.driverInformation.Avatar}}/>:
                         <Image style={{width: 125, height: 125}} source={require('../../../../assets/noperson.png')}/>} 
                    </Left>
                    <Body>                    
                         <Text>Ad : {this.props.driverInformation.Name}</Text>
                         <Text>Soyad : {this.props.driverInformation.Surname}</Text>
                    </Body>
               </CardItem>
               <CardItem >
                     <Text>Sınıfı : {this.props.driverInformation.DriverType}</Text>
               </CardItem>
           </Card>
           <Card>                
               <CardItem style={{paddingTop:20}}>
                    <Icon active name="ios-apps" />
                    <Text>Bağlılık  :</Text>
                    <Text> {this.props.driverInformation.DriverOwner}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-person" />
                    <Text>Ad Soyad:</Text>
                    <Text> {this.props.driverInformation.DriverName}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="md-calculator" />
                    <Text>Maaş:</Text>
                    <Text> {this.props.driverInformation.Salary} ₺</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-phone-portrait" />
                    <Text>Telefon-1:</Text>
                    <Text> {this.props.driverInformation.PhoneNumber1}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-phone-portrait" />
                    <Text>Telefon-2:</Text>
                    <Text> {this.props.driverInformation.PhoneNumber2}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-book" />
                    <Text>Email:</Text>
                    <Text> {this.props.driverInformation.MailAddress}</Text>
               </CardItem>
           </Card>
         </Content>
       </Container>
  
      );
     }
   }
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container,  Content, Card, CardItem,  Text,  Icon, Left, Body } from 'native-base';
import { ScrollView } from 'react-native';

export default class CarInformationScreen extends Component {
    render() {
      return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Card>
               <CardItem>
                    <Left>
                         <Image source={require('../../../../assets/plaka_tr.png')} />
                         <Body>
                         <Text>{this.props.carDetail.plaka}</Text>
                         <Text note>Detaylı Bilgileri</Text>
                         </Body>
                    </Left>
               </CardItem>
               <CardItem style={{paddingTop:20}}>
                    <Icon active name="ios-person" />
                    <Text>Sahibi :</Text>
                    <Text> {this.props.carDetail.owner.name + " " + this.props.carDetail.owner.surname}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-archive" />
                    <Text>Plaka :</Text>
                    <Text> {this.props.carDetail.plaka}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-pin" />
                    <Text>Marka :</Text>
                    <Text> {this.props.carDetail.wehicleBrand.brand}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-pint" />
                    <Text>Model :</Text>
                    <Text> {this.props.carDetail.wehicleModel.model}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="md-wallet" />
                    <Text>Araç kirası :</Text>
                    <Text> {this.props.carDetail.wehicleRentAmount}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-podium" />
                    <Text>Kapasite :</Text>
                    <Text> {this.props.carDetail.wehicleModel.wehicleCapacity.capacityName}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-remove" />
                    <Text>Model yılı :</Text>
                    <Text> {this.props.carDetail.modelYear}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-pricetag" />
                    <Text>GPS Bedeli :</Text>
                    <Text> {this.props.carDetail.gpsBedeli}</Text>
               </CardItem>
               <CardItem >
                    <Icon active name="ios-radio-button-on" />
                    <Text>Açıklama :</Text>
                    <Text> {this.props.carDetail.description}</Text>
               </CardItem>
           </Card>
         </ScrollView>
      );
     }
   }
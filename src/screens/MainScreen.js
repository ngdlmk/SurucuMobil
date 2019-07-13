import React, { Component } from 'react';
import {AsyncStorage,Image,StyleSheet  } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
 
var StorageKeys=require('../data/StorageKeys.json');

export default class MainScreen extends Component {
  constructor(props){
    super(props);

    this.state={
      FirstName:"",
      LastName:""
    }
  }

  render() {
    return (
      <Container style={styles.MainContainer}>
        <Content>
          <Card>
            <CardItem header bordered>
              <Image style={{ width: 150, height: 38 }} source={require('../../assets/ceturlogo.png')} />
            </CardItem>
            <CardItem>
              <Body>
                <Text>Sayın {this.state.FirstName} {this.state.LastName}</Text>
                <Text></Text>
                <Text>Sürücüm Mobil uygulamasına hoşgeldiniz</Text>
                <Text>Yandaki menuden seçimlerinizi yapabilirsiniz </Text>              
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }  

  componentDidMount (){
    AsyncStorage.getItem(StorageKeys.UserDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);
      this.setState({
        FirstName:parsedUserDetail["UserDetail"]["FirstName"],
        LastName:parsedUserDetail["UserDetail"]["LastName"]
      });
    })
  }

}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: 150,
    justifyContent: 'center',
  },
});
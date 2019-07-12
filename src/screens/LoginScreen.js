import React,{Component} from "react";
import { View, Text,Button, AsyncStorage  } from "react-native";

var NavigateKeys=require('../data/NavigateKeys.json');
var StorageKeys=require('../data/StorageKeys.json');

export default class LoginScreen extends Component {
    constructor(props){
      super(props);
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button
          title="Anasayfaya git"
          onPress={this.loginOperation.bind(this)}
        />
      </View>
    );
  }

  //methods
  loginOperation(){
    AsyncStorage.setItem(StorageKeys.IsLoginKey,"true");
    this.props.navigation.navigate(NavigateKeys.MenuKey);
  }
}
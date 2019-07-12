import React,{Component} from "react";
import { View, Text,Button } from "react-native";

export default class LoginScreen extends Component {
    // static navigationOptions = {
    //     header: null
    // }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button
          title="Anasayfaya git"
          onPress={() => this.props.navigation.navigate('Menu')}
        />
      </View>
    );
  }
}
import React, { Component } from 'react';
import { StyleSheet, View, Picker } from 'react-native';
 
export default class RouteModalScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      language: ""
    };
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});
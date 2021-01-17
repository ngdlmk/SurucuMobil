import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export default class NavigationDrawerStructure extends Component {
    toggleDrawer = () => {
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Image
              source={require('./../../../assets/drawer.png' )}
              style={{ width: 25, height: 25, marginLeft: 5, tintColor: "#fff" }}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }
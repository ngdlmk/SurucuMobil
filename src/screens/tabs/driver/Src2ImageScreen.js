import React, { Component } from 'react';
import { Button, Content, Text, Icon, Fab } from 'native-base';
import { View, ScrollView, Image } from 'react-native';

export default class Src2ImageScreen extends Component {
    constructor(props) {
        super(props);

        this.addSrc2Image = this.addSrc2Image.bind(this);
    }

    render() {
        const src2Images = [];
        this.props.src2Images.map((image, index) => (
            src2Images.push(image.fullPath)
        ));
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flexGrow: 1, marginTop: 10}}>
                    {
                        src2Images.map(image => {
                            return (
                                <Image resizeMode="contain" style={{ width: "100%", height: 300 }} source={{ uri: image }} />
                            )
                        })
                    }
                </ScrollView>
                <Fab
                    direction="up"
                    style={{ backgroundColor: '#4983B7' }}
                    position="bottomRight"
                    onPress={this.addSrc2Image}>
                    <Icon name="cloudupload" type="AntDesign" />
                </Fab> 
            </View>
        );
    }

    addSrc2Image() {
        this.props.navigation.navigate('Src2ImageModal',
            {
                src2InsuranceInfo: this.props.src2InsuranceInfo,
                token: this.props.token,
                personId: this.props.personId
            }
        )
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadSrc2Images(this.props.personId, true);
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
}
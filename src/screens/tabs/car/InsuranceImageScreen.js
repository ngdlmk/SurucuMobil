import React, { Component } from 'react';
import { Fab, Icon } from 'native-base';
import { View, Alert, ScrollView, Image } from 'react-native';
import * as Constant from '../../../data/Constants';

export default class InsuranceImageScreen extends Component {
    constructor(props) {
        super(props);
        this.addInsuranceImage = this.addInsuranceImage.bind(this);
    }

    render() {
        const insuranceImages = [];
        this.props.insuranceImages.map((image, index) => (
            insuranceImages.push(image.fullPath)
        ));

        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}>
                    {
                        insuranceImages.map(image => {
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
                    onPress={this.addInsuranceImage}>
                    <Icon name="cloudupload" type="AntDesign" />
                </Fab>
            </View>
        );
    }

    addInsuranceImage() {
        if (this.props.selectedCarId === 0) {
            Alert.alert(Constant.ErrorText, "Araç seçiniz")
            return;
        }

        this.props.navigation.navigate('InsuranceImageModal',
            {
                carInsuranceResponse: this.props.carInsuranceResponse,
                token: this.props.token,
                selectedCarId: this.props.selectedCarId
            }
        )
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadInsuranceImages(this.props.selectedCarId, true);
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
}
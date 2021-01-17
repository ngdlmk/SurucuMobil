import React, { Component } from 'react';
import { Icon, Fab } from 'native-base';
import { View, Alert, Image, ScrollView } from 'react-native';
import * as Constant from '../../../data/Constants';

export default class routePermissionDocumentImagescreen extends Component {
    constructor(props) {
        super(props);

        this.addRoutePermissionDocumentImage = this.addRoutePermissionDocumentImage.bind(this);
    }

    render() {
        const routePermissionDocumentImages = [];
        this.props.routePermissionDocumentImages.map((image, index) => (
            routePermissionDocumentImages.push(image.fullPath)
        ));

        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}>
                    {
                        routePermissionDocumentImages.map(image => {
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
                    onPress={this.addRoutePermissionDocumentImage}>
                    <Icon name="cloudupload" type="AntDesign" />
                </Fab>
            </View>
        );
    }

    addRoutePermissionDocumentImage() {
        if (this.props.selectedCarId === 0) {
            Alert.alert(Constant.ErrorText, "Araç seçiniz")
            return;
        }

        this.props.navigation.navigate('RoutePermissionDocumentImageModal',
            {
                carRoutePermissionDocumentResponse: this.props.carRoutePermissionDocumentResponse,
                token: this.props.token,
                selectedCarId: this.props.selectedCarId
            }
        )
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadRoutePermissionDocumentImages(this.props.selectedCarId, true);
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
}
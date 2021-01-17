import React, { Component } from 'react';
import { Button, Text, Fab, Icon } from 'native-base';
import Utils from '../../../common/utils';
import { PuantajService } from '../../../services';
import { AddWehicleImageRequestModel } from '../../../../src/models';
import { Alert, View, ScrollView, Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as Constant from '../../../data/Constants';

export default class LicenseInformationScreen extends Component {
    utils = new Utils();
    puantajService = new PuantajService();

    constructor(props) {
        super(props);
    }

    render() {
        const licenseImages = [];
        this.props.licenseImages.map((image, index) => (
            licenseImages.push(image.fullPath)
        ));

        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1, marginTop: 10}}>
                    {
                        licenseImages.map(image => {
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
                    onPress={() => this.utils.pickImage().then(t => this.addLicenseImage(t))}>
                    <Icon name="cloudupload" type="AntDesign" />
                </Fab> 
            </View>
        );
    }

    //api methods
    addLicenseImage(image) {
        var request = new AddWehicleImageRequestModel();
        request.Token = this.props.token;
        request.ID = this.props.licenseInsuranceInfo.ID;
        request.startDate = "";
        request.endDate = "";
        request.entryID = this.props.personId;
        request.startEndDocumentType = "4"; //ehliyet bilgi
        request.fileLocationType = "6"; //ehliyet bilgi
        request.force = "false";
        request.image = image.uri;
        request.sigortaID = this.props.licenseInsuranceInfo.sigortaID;
        request.plaka = this.props.licenseInsuranceInfo.plaka;
        request.isDateRequired = "false";
        request.entryType = request.fileLocationType;

        this.puantajService.addImage(request).then(responseJson => {
            if (responseJson.IsSuccess) {
                Alert.alert("Ehliyet resmi eklendi");
                this.props.reloadLicenseImages(request.entryID, true);
            }
            else {
                Alert.alert(responseJson.ExceptionMsg);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}
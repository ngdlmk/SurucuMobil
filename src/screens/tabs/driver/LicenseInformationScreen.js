import React, { Component } from 'react';
import { Button,  Text} from 'native-base';
import Utils from '../../../common/utils';
import {PuantajService} from '../../../services';
import {AddWehicleImageRequestModel} from '../../../../src/models';
import {Alert,View, ScrollView, Image} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as Constant from '../../../data/Constants';

export default class LicenseInformationScreen extends Component {
    utils = new Utils();
    puantajService=new PuantajService();

    constructor(props) {
        super(props);
    }

    render() {
        const licenseImages=[];
        this.props.licenseImages.map((image, index) => (
            licenseImages.push(image.fullPath)
        ));

        return (
            <ScrollView style={{paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>         
                <Button light onPress={()=>this.utils.pickImage().then(t=> this.addLicenseImage(t))}>
                    <Text>Yeni Ehliyet Resmi Ekle</Text>
                </Button> 
                {
                    licenseImages.map(image => {
                        return (
                            <Image resizeMode="contain" style={{width: "100%", height: 300}} source={{uri: image}} />
                        )
                    })      
                }        
            </ScrollView>
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
        request.entryType=request.fileLocationType;

        this.puantajService.addImage(request).then(responseJson => {         
            if (responseJson.IsSuccess) {
                Alert.alert("Ehliyet resmi eklendi");
                this.props.reloadLicenseImages(request.entryID,true);
            }
            else {
                Alert.alert(responseJson.ExceptionMsg);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}
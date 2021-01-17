import React, { Component } from 'react';
import { Button, Text, Fab, Icon} from 'native-base';
import Utils from '../../../common/utils';
import {PuantajService} from '../../../services';
import {AddWehicleImageRequestModel} from '../../../../src/models';
import {Alert,View,Image, ScrollView} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as Constant from '../../../data/Constants';

export default class LicenseImageScreen extends Component {
    utils = new Utils();
    puantajService=new PuantajService();

    constructor(props) {
        super(props);
    
        this.imageOperation=this.imageOperation.bind(this);
    }

    render() {
        const licenseImages=[];
        this.props.licenseImages.map((image, index) => (
            licenseImages.push(image.fullPath)
        ));
        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1, marginTop: 10}}>         
                    {
                        licenseImages.map(image => {
                            return (
                                <Image resizeMode="contain" style={{width: "100%", height: 300}} source={{uri: image}} />
                            )
                        })      
                    }
                </ScrollView>
                <Fab
                    direction="up"
                    style={{ backgroundColor: '#4983B7' }}
                    position="bottomRight"
                    onPress={this.imageOperation}>
                    <Icon name="cloudupload" type="AntDesign" />
                </Fab> 
            </View>
        );
     }

     //api methods
     addLicenseImage(image) {
        var request = new AddWehicleImageRequestModel();
        request.Token = this.props.token;
        request.ID = this.props.carLicenseResponse.ID;
        request.startDate = "";
        request.endDate = "";
        request.entryID = this.props.selectedCarId;
        request.startEndDocumentType = "1"; //Ruhsat
        request.fileLocationType = "1"; //Ruhsat
        request.force = "false";
        request.image = image.uri;
        request.sigortaID = this.props.carLicenseResponse.ruhsatID;
        request.plaka = this.props.carLicenseResponse.plaka;
        request.isDateRequired = "false";

        this.puantajService.addImage(request).then(responseJson => {
            this.props.reloadLicenseImages(this.props.selectedCarId,true);
            if (responseJson.IsSuccess) {
                Alert.alert("Ruhsat resmi eklendi");
            }
            else {
                Alert.alert(responseJson.ExceptionMsg);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    //other operation
    imageOperation(){
        if(this.props.selectedCarId===0){
            Alert.alert(Constant.ErrorText,"Araç seçiniz")
            return;
        }

        this.utils.pickImage().then(t=> this.addLicenseImage(t))
     }
   }
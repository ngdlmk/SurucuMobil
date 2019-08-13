import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import { Button,  Content, Text} from 'native-base';
import Gallery from 'react-native-image-gallery'
import Utils from '../../../common/utils';
import {PuantajService} from '../../../services';
import {AddWehicleImageRequestModel} from '../../../../src/models';
import {Alert} from 'react-native';

export default class LicenseImageScreen extends Component {
    utils = new Utils();
    puantajService=new PuantajService();

    render() {
        const licenseImages=[];
        this.props.licenseImages.map((image, index) => (
            licenseImages.push({
                source:{
                    uri:image.fullPath
                }
            })
        ));

        return (
            <Grid style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>
                <Row size={10} style={{ marginBottom: 5 }}>
                    <Button full light onPress={() => this.utils.pickImage().then(t=> this.addLicenseImage(t))}>
                        <Text>Yeni Resim Ekle</Text>
                    </Button>
                </Row>
                <Row size={80}  style={{ paddingLeft: 5, paddingRight: 5, paddingTop: -50 }}>
                    <Gallery
                        style={{flex:1, backgroundColor: 'white' }}
                        images={licenseImages}
                    />
                </Row>
            </Grid>
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
            this.props.reloadLicenseImages(this.props.selectedCarId);
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
   }
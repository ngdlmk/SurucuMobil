import React, { Component } from 'react';
import { Button, Text, Fab, Icon} from 'native-base';
import { SliderBox } from 'react-native-image-slider-box';
import Utils from '../../../common/utils';
import {PuantajService} from '../../../services';
import {AddWehicleImageRequestModel} from '../../../../src/models';
import {Alert,View,ScrollView} from 'react-native';
import * as Constant from '../../../data/Constants';

export default class CarImageScreen extends Component {
    utils = new Utils();
    puantajService=new PuantajService();

    constructor(props) {
        super(props);
    
        this.imageOperation=this.imageOperation.bind(this);
    }

    render() {
        const carImages=[];
        this.props.carImages.map((image, index) => (
            carImages.push(image.fullPath)
        ));
        return (
            <View style={{flex: 1}}> 
                <ScrollView contentContainerStyle={{flexGrow: 1, marginTop: 10}}>           
                    {
                        carImages.map(image => {
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
     addImage(image) {
        var request = new AddWehicleImageRequestModel();
        request.Token = this.props.token;
        request.ID = this.props.carInsuranceInfo.ID;
        request.startDate = "";
        request.endDate = "";
        request.entryID = this.props.selectedCarId;
        request.startEndDocumentType = "9"; //Image
        request.fileLocationType = "9"; //Image
        request.force = "false";
        request.image = image.uri;
        request.sigortaID = this.props.carInsuranceInfo.sigortaID;
        request.plaka = this.props.carInsuranceInfo.plaka;
        request.isDateRequired = "false";

        this.puantajService.addImage(request).then(responseJson => {         
            if (responseJson.IsSuccess) {
                Alert.alert("Araba resmi eklendi");
                this.props.reloadCarImages(request.entryID,true);
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

        this.utils.pickImage().then(t=> this.addImage(t))
     }
   }
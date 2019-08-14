import React, { Component } from 'react';
import { Button,  Text} from 'native-base';
import Utils from '../../../common/utils';
import {PuantajService} from '../../../services';
import {AddWehicleImageRequestModel} from '../../../../src/models';
import {Alert,View} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as Constant from '../../../data/Constants';

export default class ImmsImageScreen extends Component {
    utils = new Utils();
    puantajService=new PuantajService();

    constructor(props) {
        super(props);
    
        this.imageOperation=this.imageOperation.bind(this);
    }

    render() {
        const immsImages=[];
        this.props.immsImages.map((image, index) => (
            immsImages.push(image.fullPath)
        ));

        return (
            <View style={{paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>         
                <Button light onPress={this.imageOperation}>
                    <Text>Yeni IMMS Resmi Ekle</Text>
                </Button>       
                <SliderBox images={immsImages} sliderBoxHeight={400} style={{paddingTop: 10 }}/>
            </View>
        );
     }

     //api methods
     addImmsImage(image) {
        var request = new AddWehicleImageRequestModel();
        request.Token = this.props.token;
        request.ID = this.props.carImmsResponse.ID;
        request.startDate = "";
        request.endDate = "";
        request.entryID = this.props.selectedCarId;
        request.startEndDocumentType = "3"; //IMMS
        request.fileLocationType = "3"; //IMMS
        request.force = "false";
        request.image = image.uri;
        request.sigortaID = this.props.carImmsResponse.sigortaID;
        request.plaka = this.props.carImmsResponse.plaka;
        request.isDateRequired = "false";

        this.puantajService.addImage(request).then(responseJson => {
            this.props.reloadImmsImages(this.props.selectedCarId,true);

            Alert.alert("IMMS resmi eklendi");
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

        this.utils.pickImage().then(t=> this.addImmsImage(t))
     }
   }
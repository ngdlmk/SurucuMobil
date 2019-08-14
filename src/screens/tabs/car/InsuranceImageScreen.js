import React, { Component } from 'react';
import { Button,  Content, Text} from 'native-base';
import {View,Alert } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as Constant from '../../../data/Constants';

export default class InsuranceImageScreen extends Component {
    constructor(props) {
        super(props);
    
        this.addInsuranceImage=this.addInsuranceImage.bind(this);
    }

    render() {
        const insuranceImages=[];
        this.props.insuranceImages.map((image, index) => (
            insuranceImages.push(image.fullPath)
        ));

        return (
            <View>   
                <Content>
                    <Button light onPress={this.addInsuranceImage}>
                        <Text>Yeni Sigorta Resmi Ekle</Text>
                    </Button>       
                    <SliderBox images={insuranceImages} sliderBoxHeight={400} style={{paddingTop: 30 }}/>
                </Content>  
            </View>
        );
     }

     addInsuranceImage(){
        if(this.props.selectedCarId===0){
            Alert.alert(Constant.ErrorText,"Araç seçiniz")
            return;
        }

        this.props.navigation.navigate('InsuranceImageModal',
        {
           carInsuranceResponse: this.props.carInsuranceResponse,
           token: this.props.token,
           selectedCarId:this.props.selectedCarId
         }
       )
     }

     componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadInsuranceImages(this.props.selectedCarId,true);
        });
      }
      
      componentWillUnmount() {
        this.focusListener.remove();
      }
   }
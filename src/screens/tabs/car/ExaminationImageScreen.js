import React, { Component } from 'react';
import { Button,  Content, Text} from 'native-base';
import {View,Alert } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as Constant from '../../../data/Constants';

export default class ExaminationImageScreen extends Component {
    constructor(props) {
        super(props);
    
        this.addExaminationImage=this.addExaminationImage.bind(this);
    }

    render() {
        const examinationImages=[];
        this.props.examinationImages.map((image, index) => (
            examinationImages.push(image.fullPath)
        ));

        return (
            <View>   
                <Content>
                    <Button light onPress={this.addExaminationImage}>
                        <Text>Yeni Muayene Resmi Ekle</Text>
                    </Button>       
                    <SliderBox images={examinationImages} sliderBoxHeight={400} style={{paddingTop: 30 }}/>
                </Content>  
            </View>
        );
     }

     addExaminationImage(){
        if(this.props.selectedCarId===0){
            Alert.alert(Constant.ErrorText,"Araç seçiniz")
            return;
        }

        this.props.navigation.navigate('ExaminationImageModal',
        {
           carExaminationResponse: this.props.carExaminationResponse,
           token: this.props.token,
           selectedCarId:this.props.selectedCarId
         }
       )
     }

     componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadExaminationImages(this.props.selectedCarId,true);
        });
      }
      
      componentWillUnmount() {
        this.focusListener.remove();
      }
   }
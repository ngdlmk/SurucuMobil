import React, { Component } from 'react';
import { Button,  Content, Text} from 'native-base';
import {View,Alert } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as Constant from '../../../data/Constants';

export default class routePermissionDocumentImagescreen extends Component {
    constructor(props) {
        super(props);
    
        this.addRoutePermissionDocumentImage=this.addRoutePermissionDocumentImage.bind(this);
    }

    render() {
        const routePermissionDocumentImages=[];
        this.props.routePermissionDocumentImages.map((image, index) => (
            routePermissionDocumentImages.push(image.fullPath)
        ));

        return (
            <View>   
                <Content>
                    <Button light onPress={this.addRoutePermissionDocumentImage}>
                        <Text>Yeni Güzergah İzin Belgesi Resmi Ekle</Text>
                    </Button>       
                    <SliderBox images={routePermissionDocumentImages} sliderBoxHeight={400} style={{paddingTop: 30 }}/>
                </Content>  
            </View>
        );
     }

     addRoutePermissionDocumentImage(){
        if(this.props.selectedCarId===0){
            Alert.alert(Constant.ErrorText,"Araç seçiniz")
            return;
        }

        this.props.navigation.navigate('RoutePermissionDocumentImageModal',
        {
           carRoutePermissionDocumentResponse: this.props.carRoutePermissionDocumentResponse,
           token: this.props.token,
           selectedCarId:this.props.selectedCarId
         }
       )
     }

     componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadRoutePermissionDocumentImages(this.props.selectedCarId,true);
        });
      }
      
      componentWillUnmount() {
        this.focusListener.remove();
      }
   }
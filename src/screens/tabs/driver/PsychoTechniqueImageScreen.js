import React, { Component } from 'react';
import { Button,  Content, Text} from 'native-base';
import {View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

export default class PsychoTechniqueImageScreen extends Component {
    constructor(props) {
        super(props);
    
        this.addPsychoTechniqueImage=this.addPsychoTechniqueImage.bind(this);
    }

    render() {
        const psychoTechniqueImages=[];
        this.props.psychoTechniqueImages.map((image, index) => (
            psychoTechniqueImages.push(image.fullPath)
        ));

        return (
            <View>   
                <Content>
                    <Button light onPress={this.addPsychoTechniqueImage}>
                        <Text>Yeni Psikoteknik Resmi Ekle</Text>
                    </Button>       
                    <SliderBox images={psychoTechniqueImages} sliderBoxHeight={400} style={{paddingTop: 30 }}/>
                </Content>  
            </View>
        );
     }

     addPsychoTechniqueImage(){
        this.props.navigation.navigate('PsychoTechniqueImageModal',
        {
           psychoTechniqueInsuranceInfo: this.props.psychoTechniqueInsuranceInfo,
           token: this.props.token,
           personId:this.props.personId
         }
       )
     }

     componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadPsychoTechniqueImages(this.props.personId,true);
        });
      }
      
      componentWillUnmount() {
        this.focusListener.remove();
      }
   }
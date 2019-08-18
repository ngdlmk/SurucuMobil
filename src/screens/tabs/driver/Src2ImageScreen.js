import React, { Component } from 'react';
import { Button,  Content, Text} from 'native-base';
import {View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

export default class Src2ImageScreen extends Component {
    constructor(props) {
        super(props);
    
        this.addSrc2Image=this.addSrc2Image.bind(this);
    }

    render() {
        const src2Images=[];
        this.props.src2Images.map((image, index) => (
            src2Images.push(image.fullPath)
        ));

        return (
            <View>   
                <Content>
                    <Button light onPress={this.addSrc2Image}>
                        <Text>Yeni SRC2 Resmi Ekle</Text>
                    </Button>       
                    <SliderBox images={src2Images} sliderBoxHeight={400} style={{paddingTop: 30 }}/>
                </Content>  
            </View>
        );
     }

     addSrc2Image(){
        this.props.navigation.navigate('Src2ImageModal',
        {
           src2InsuranceInfo: this.props.src2InsuranceInfo,
           token: this.props.token,
           personId:this.props.personId
         }
       )
     }

     componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadSrc2Images(this.props.personId,true);
        });
      }
      
      componentWillUnmount() {
        this.focusListener.remove();
      }
   }
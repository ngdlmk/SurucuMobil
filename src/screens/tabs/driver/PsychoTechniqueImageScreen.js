import React, { Component } from 'react';
import { Fab, Icon } from 'native-base';
import { View, ScrollView, Image } from 'react-native'

export default class PsychoTechniqueImageScreen extends Component {
    constructor(props) {
        super(props);

        this.addPsychoTechniqueImage = this.addPsychoTechniqueImage.bind(this);
    }

    render() {
        const psychoTechniqueImages = [];
        this.props.psychoTechniqueImages.map((image, index) => (
            psychoTechniqueImages.push(image.fullPath)
        ));
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}>
                    {
                        psychoTechniqueImages.map(image => {
                            return (
                                <>
                                    <Image resizeMode="contain" style={{ width: "100%", height: 300 }} source={{ uri: image }} />
                                </>
                            )
                        })
                    }
                </ScrollView>
                <Fab
                    direction="up"
                    style={{ backgroundColor: '#4983B7' }}
                    position="bottomRight"
                    onPress={this.addPsychoTechniqueImage}>
                    <Icon name="cloudupload" type="AntDesign" />
                </Fab> 
            </View>
        );
    }

    addPsychoTechniqueImage() {
        this.props.navigation.navigate('PsychoTechniqueImageModal',
            {
                psychoTechniqueInsuranceInfo: this.props.psychoTechniqueInsuranceInfo,
                token: this.props.token,
                personId: this.props.personId
            }
        )
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.props.reloadPsychoTechniqueImages(this.props.personId, true);
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
}
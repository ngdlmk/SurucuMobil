import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import { Button,  Content, Text} from 'native-base';
import Gallery from 'react-native-image-gallery'

export default class CarImageScreen extends Component {
    render() {

    const carImages=[];
    this.props.carImages.map((image, index) => (
        carImages.push({
            source:{
                uri:image.fullPath
            }
        })
    ));

      return (
        <Grid style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>
        <Row size={10} style={{ marginBottom: 5 }}>
            <Button full light onPress={() => this.utils.pickImage().then(t=> this.addImage(t))}>
                <Text>Yeni Resim Ekle</Text>
            </Button>
        </Row>
        <Row size={80}>
        <Gallery keyExtractor={item => item.index_id.toString()}
            style={{ flex: 1, backgroundColor: 'white' }}
            images={carImages}
        />
        </Row>
    </Grid>
      );
     }
   }
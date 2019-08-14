import React, { Component } from 'react';
import { Row, Grid,Col } from 'react-native-easy-grid';
import { Button,  Content, Text, DatePicker,Icon,Container} from 'native-base';
import Utils from '../../common/utils';
import {PuantajService} from '../../services';
import {AddWehicleImageRequestModel} from '../../models';
import {Alert} from 'react-native';
import * as Constant from '../../data/Constants';

export default class InsuranceImageModalScreen extends Component {
  utils = new Utils();
  puantajService=new PuantajService();
  
  constructor(props) {
    super(props);

    this.state = {
        datePickerDefaultDate: new Date(),
        chosenStartDate: new Date(),
        chosenEndDate: new Date(),
        selectedImageUri: ""
    }
  } 

  render() {
    return (
      <Container>
        <Content>
          <Grid style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 50 }}>
              <Row size={10}>
                  <Col size={40} style={{ borderWidth: 1, borderColor: '#d6d7da', marginBottom: 5 }}>
                      <DatePicker
                          defaultDate={this.state.datePickerDefaultDate}
                          minimumDate={this.state.datePickerDefaultDate}
                          maximumDate={new Date(2100, 12, 31)}
                          locale={"tr"}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType={"fade"}
                          androidMode={"default"}
                          placeHolderText="Başlangıç Tarihini Seçiniz"
                          textStyle={{ color: "green" }}
                          placeHolderTextStyle={{ color: "#d3d3d3" }}
                          onDateChange={(dt) => {
                              var d = new Date(dt);
                              d.setMinutes(d.getMinutes() + d.getTimezoneOffset() * -1);
                              this.setState({ chosenStartDate: d });
                          }} />
                  </Col>
                  <Col size={40} style={{ borderWidth: 1, borderColor: '#d6d7da', marginBottom: 5 }}>
                      <DatePicker
                          defaultDate={this.state.datePickerDefaultDate}
                          minimumDate={this.state.datePickerDefaultDate}
                          maximumDate={new Date(2100, 12, 31)}
                          locale={"tr"}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType={"fade"}
                          androidMode={"default"}
                          placeHolderText="Bitiş Tarihini Seçiniz"
                          textStyle={{ color: "green" }}
                          placeHolderTextStyle={{ color: "#d3d3d3" }}
                          onDateChange={(dt) => {
                              var d = new Date(dt);
                              d.setMinutes(d.getMinutes() + d.getTimezoneOffset() * -1);
                              this.setState({ chosenEndDate: d });
                          }} />
                  </Col>
              </Row>
              <Row size={20} style={{ marginBottom: 10 }}>
                  <Col size={100}>
                      <Button full light onPress={() => this.utils.pickImage().then(t => this.setSelectedImage(t))}>
                          <Text>Resim Seç</Text>
                      </Button>
                  </Col>
              </Row>
              <Row size={20}>
                  <Col size={50}>
                      <Button full light onPress={() => this.addInsuranceImage()}>
                          <Text>Kaydet</Text>
                      </Button>
                  </Col>
              </Row>
              <Row style={{ paddingTop:30, alignContent: "center", alignItems: "center" }}>
                  <Col size={50}>
                      <Button block transparent  onPress={() => this.props.navigation.goBack()}>
                          <Text style={{color:"#B22222"}}>İptal</Text>
                      </Button>
                  </Col>
              </Row>
          </Grid>
      </Content>
    </Container>
    );
  }

  //api methods
  addInsuranceImage() {  
    //validation
    if(this.state.chosenStartDate.toString()===""){
      Alert.alert(Constant.ErrorText,"Başlangıç tarihini seçiniz")
      return;
    }
    if(this.state.chosenEndDate.toString()===""){
      Alert.alert(Constant.ErrorText,"Bitiş tarihini seçiniz")
      return;
    }
    if(this.state.selectedImageUri===""){
        Alert.alert(Constant.ErrorText,"Resim seçiniz")
        return;
    }
    if(this.state.chosenStartDate>this.state.chosenEndDate){
      Alert.alert(Constant.ErrorText,"Başlangıç tarihi bitiş tarihinden büyük olmalıdır")
      return;
    }

    //control  
    const { navigation } = this.props;
    const token = navigation.getParam('token', '');
    const carInsuranceResponse = navigation.getParam('carInsuranceResponse', {});
    const selectedCarId = navigation.getParam('selectedCarId', '-1');

    var request = new AddWehicleImageRequestModel();
    request.Token = token;
    request.ID = carInsuranceResponse.ID;
    request.startDate = this.state.chosenStartDate.toString();
    request.endDate = this.state.chosenEndDate.toString();
    request.entryID = selectedCarId;
    request.startEndDocumentType = "2"; //Sigorta
    request.fileLocationType = "2"; //Sigorta
    request.force = "false";
    request.image = this.state.selectedImageUri;
    request.sigortaID = carInsuranceResponse.sigortaID;
    request.plaka = carInsuranceResponse.plaka;
    request.isDateRequired = "false";

    this.puantajService.addImage(request).then(responseJson => {
        if (responseJson.IsSuccess) {
            Alert.alert("Sigorta resmi eklendi");
        }
        else {
            Alert.alert(responseJson.ExceptionMsg);
        }
        this.props.navigation.goBack()
    }).catch((error) => {
        console.error(error);
    });
 }

  //other methods
  setSelectedImage(image) {
      this.setState({ selectedImageUri: image.uri })
  }
}
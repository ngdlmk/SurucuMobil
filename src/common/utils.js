import { ImagePicker, Permissions } from 'expo';
import { Platform} from 'react-native'

export default class Utils {
    pickImage = async () => {
        return await this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
          alert('Uygulama kamera erişimi verilmelidir!');
      }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            return result;
        }
    }

    requestCameraPermission= async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Çetur Driver Kamera Erişim İsteği',
              message:
                'Çetur driver kamera erişimine ihtiyacı var',
              buttonNeutral: 'Sonra sor',
              buttonNegative: 'Iptal',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
        }
      }
    
}
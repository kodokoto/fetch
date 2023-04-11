import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { api } from '../utils/trpc';
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import * as ImagePicker from 'expo-image-picker';

export default function AddPictureButton(props) {
    const [session, _] = useAtom(sessionAtom)

    const mutation = api.image.create.useMutation()

    const selectPhotoTapped = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
          });
          
          cloudinaryUpload(result.assets[0].uri, result.assets[0].base64);
      }

      const cloudinaryUpload = (photo, base64Data) => {
        const data = new FormData()
        const uriArr = photo.split(".");
        const fileType = uriArr[uriArr.length - 1];
        const file = `data:${fileType};base64,${base64Data}`
        data.append('file', file)
        data.append('upload_preset', 'ml_default')
        data.append("cloud_name", "dfuiyl9sr")
        fetch("https://api.cloudinary.com/v1_1/dfuiyl9sr/upload", {
          method: "post",
          body: data
        }).then(res => res.json()).
          then(data => {
            console.log(data.url)
            mutation.mutate({
                sitterId: session.sitterId,
                url: data.url
            })
          }).catch(err => {
            console.log("An Error Occured While Uploading")
          })
      }
    return (
        <>
        {props.showAddPictureButton && (
            <Button onPress={() => selectPhotoTapped()} className="bg-white absolute top-20 mt-20 right-0">
            <Ionicons name='camera-outline' size={20} color="black" />
            </Button>
        )}
        </>
    )
}
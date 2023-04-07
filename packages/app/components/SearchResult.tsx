import { View, Text, TouchableOpacity, Image } from 'react-native'
import { api } from '../utils/trpc';
import { Avatar } from 'native-base';
import SettingsComponent from 'app/components/SettingsMenu'
import { useRouter } from 'expo-router'

export default function SearchResult(props) {
    const router = useRouter()
    console.log(props.searchResult);
    const { data } = api.user.byId.useQuery(props.searchResult.userId, { enabled: !!props.searchResult.userId });
    const petType = api.service.bySitterId.useQuery(props.searchResult.id).data;
    console.log("Pet Type: " + JSON.stringify(petType));
  return (
    <View style={{
        marginLeft: 'auto',
        marginRight: 'auto'
    }}>
        {/* {data ? (
            <Image style={{
                height: 50,
                width:  50
              }} source={{ uri: data.imageUrl }} />
        ) : null}
      <Text>{props.searchResult.userId}!!</Text>
      <Text>{data ? data.name : null}</Text>
      <Text>London</Text>
      <Text>{props.searchResult.services}</Text>
      <Text>{petType && petType.petType.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();})}
      </Text>
      <Text>{data ? data.imageUrl : null}</Text> */}
      <TouchableOpacity style={{
        borderWidth: 1,
        borderColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 300,
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
    }} onPress={() =>
        router.push({
          pathname: `/sitter/${data.id}`,
          params: {
            name: data.name,
            userId: data.id,
            imageUrl: data.imageUrl
          },
        })
      }>
        {data ? (
            <Avatar style={{
                height: 50,
                width:  50,
                borderWidth: 1,
                borderColor: 'black'
              }} source={{ uri: data.imageUrl }} />
        ) : null}
        <View style={{
            marginLeft: 10
        }}>
        <Text style={{
            fontSize: 20
        }}>{data ? data.name : null}</Text>
        <Text>Location: London</Text>
        <Text>Helps with: {petType && petType.petType.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();})}</Text>
        </View>
        <Text style={{
            alignSelf: 'flex-start',
            marginLeft: 'auto'
        }}>£200</Text>
      </TouchableOpacity>
    </View>
  )
}

import { View, Text, TouchableOpacity, Image } from 'react-native'
import { api } from '../utils/trpc'
import { Avatar } from 'native-base'
import SettingsComponent from 'app/components/SettingsMenu'
import { useRouter } from 'expo-router'
import { Sitter } from 'db'

export default function SearchResult(props) {
  const router = useRouter()

  const petType = api.service.bySitterId.useQuery(props.searchResult.id).data
  console.log('Pet Type: ' + JSON.stringify(petType))
  return (
    <View
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <TouchableOpacity
        style={{
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
        }}
        onPress={() =>
          router.push({
            pathname: `/sitter/${props.searchResult.id}`,
            params: {
              name: props.searchResult.name,
              userId: props.searchResult.id
            },
          })
        }
      >
        {props.searchResult ? (
          <Avatar
            style={{
              height: 50,
              width: 50,
              borderWidth: 1,
              borderColor: 'black',
            }}
            source={{ uri: props.searchResult.imageUrl }}
          />
        ) : null}
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {props.searchResult ? props.searchResult.name : null}
          </Text>
          <Text>Location: London</Text>
          <Text>
            Helps with:{' '}
            {petType &&
              petType.petType.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase()
              })}
          </Text>
        </View>
        <Text
          style={{
            alignSelf: 'flex-start',
            marginLeft: 'auto',
          }}
        >
          £200
        </Text>
      </TouchableOpacity>
    </View>
  )
}

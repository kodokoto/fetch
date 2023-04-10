import { View, Text, TouchableOpacity, Image } from 'react-native'
import { api } from '../utils/trpc'
import { Avatar } from 'native-base'
import { useRouter } from 'expo-router'
import { Box } from 'native-base'

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
        className='bg-slate-100 rounded-2xl p-4 w-80 h-25 m-auto mb-2 flex-wrap flex-row justify-between border-[#4c8ab9] border-solid border-2'
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
        <Box className="float-left" style={{ flexDirection: 'row' }}>
          {props.searchResult ? (
            <Avatar
              className="w-12 h-12 ml-4 float-left"
              source={{ uri: props.searchResult.imageUrl }}
            />
          ) : null}
          <Box className="ml-4 float-left">
            <Text>
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
          </Box>
        </Box>
        <Text
          className="flex-end"
        >
          £{petType? petType.price : null}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

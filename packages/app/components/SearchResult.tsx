import { View, TouchableOpacity } from 'react-native'
import { api } from '../utils/trpc'
import { Avatar, Box, Text } from 'native-base'
import { useRouter, useSearchParams } from 'expo-router'
import { Sitter } from 'db'
import { Sitter } from 'db'

export default function SearchResult(props: Sitter) {
  const router = useRouter()
  const {date, service, availability, maxPrice, dateTime} = useSearchParams();
  console.log(props.searchResult)
  const { data } = api.sitter.byId.useQuery(props.searchResult.id, { enabled: !!props.searchResult.id })
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
        style={{ flexDirection: 'row' }}
        className='m-auto rounded-2xl w-80 bg-slate-100 mt-6 h-24 border-solid border-[#4c8ab9] border-2'
        onPress={() =>
          router.push({
            pathname: `/booking/addBooking`,
            params: {
              userId: data.id,
              date: date,
              availability: availability,
              dateTime: dateTime,
              service: service
            },
          })
        }
      >
        {data ? (
          <Avatar className="w-12 h-12 ml-4 mt-4 float-left" source={{ uri: data.imageUrl }}/>
        ) : null}
        <Box className="ml-4 float-left">
          <Text>{data ? data.name : null}</Text>
          <Text>
            {data ? data.description : null}
          </Text>
        </Box>
        <Text
          style={{
            alignSelf: 'flex-start',
            // marginLeft: 'auto',
          }}
          className='ml-auto'
        >
          £{petType? petType.price : null}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

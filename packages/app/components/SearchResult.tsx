import { View, TouchableOpacity } from 'react-native'
import { api } from '../utils/trpc'
import { Avatar, Box, Text } from 'native-base'
import { useRouter, useSearchParams } from 'expo-router'
import { Sitter } from 'db'

export default function SearchResult(props: Sitter) {
  const router = useRouter()
  const {date, service, availability, maxPrice, dateTime} = useSearchParams();
  const petType = api.service.bySitterId.useQuery(props.id).data
  console.log('Pet Type: ' + JSON.stringify(petType))
  return (
    <View
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <TouchableOpacity
        // style={{
        //   borderWidth: 1,
        //   borderColor: 'black',
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   flexDirection: 'row',
        //   width: 300,
        //   height: 100,
        //   padding: 5,
        //   borderRadius: 10,
        //   marginTop: 15,
        // }}
        style={{ flexDirection: 'row' }}
        className='m-auto rounded-2xl w-80 bg-slate-100 mt-6 h-32 border-solid border-[#4c8ab9] border-2'
        onPress={() =>
          router.push({
            pathname: `/booking/addBooking`,
            params: {
              userId: props.id,
              date: date,
              availability: availability,
              dateTime: dateTime,
              service: service
            },
          })
        }
      >
        {props ? (
          <Avatar className="w-12 h-12 ml-4 mt-4 float-left" source={{ uri: props.imageUrl }}
          />
        ) : null}
        <Box className="ml-4 float-left">
          <Text>{props ? props.name : null}</Text>
          <Text>
            {props ? props.description : null}
          </Text>
        </Box>
        <Text
          style={{
            alignSelf: 'flex-start',
            marginLeft: 'auto',
          }}
        >
          £{petType? petType.price : null}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

import { View, Text, TouchableOpacity, Image } from 'react-native'
import { api } from '../utils/trpc'
import { Avatar } from 'native-base'
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
        style={{
          borderWidth: 1,
          borderColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: 300,
          height: 100,
          padding: 5,
          borderRadius: 10,
          marginTop: 15,
        }}
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
          <Avatar
            style={{
              height: 50,
              width: 50,
              borderWidth: 1,
              borderColor: 'black',
            }}
            source={{ uri: props.imageUrl }}
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
            {props ? props.name : null}
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
          {petType? petType.price : null}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

import { View, Text, TouchableOpacity, Image } from 'react-native'
import { api } from '../utils/trpc'
import { Avatar } from 'native-base'
import { useRouter } from 'expo-router'
import { Box } from 'native-base'
import { Sitter } from '@prisma/client'

type SitterDescriptionCardProps = {
  sitter: Sitter
  searchParams: {
    serviceType: string
    day: string
    timeOfDay: string
  }
}

function capitalizeWords(inputString) {
  return inputString.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
}

function formatLocation(location) {
  // 1800 Ellis St, San Francisco, CA 94115
  // to San Francisco, CA
  const splitLocation = location.split(',')
  return splitLocation[1] + ', ' + splitLocation[3]  
}

export default function SitterDescriptionCard(props: SitterDescriptionCardProps) {
  const router = useRouter()
  const {data: service} = api.service.byServiceType.useQuery(props.searchParams.serviceType)
  
  return (
    <View
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <TouchableOpacity
        className='rounded-2xl p-4 w-80 m-auto flex-row justify-between my-4'
        onPress={() =>
          router.push({
            pathname: `/sitter/${props.sitter.id}`,
            params: props.searchParams
          })
        }
      >
        <Box className="flex-row">
          {props.sitter ? (
            <Avatar
              className="w-12 h-12 "
              source={{ uri: props.sitter.imageUrl }}
            />
          ) : null}
          <Box className="ml-4">
            <Text className='text-lg'>
              {props.sitter ? props.sitter.name : null}
            </Text>
            <Text className='text-xs'>{props.sitter.bio}</Text>
            <Text>
            </Text>
          </Box>
        </Box>
        <View>
          <Text className=''>
            £{service? service.price : null}
          </Text>
          <Text className='text-xs'>
            per visit
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

import { View, Text, TouchableOpacity, Image } from 'react-native'
import { api } from '../utils/trpc'
import { Avatar } from 'native-base'
import { useRouter } from 'expo-router'
import { Box } from 'native-base'
import { Sitter, Service } from '@prisma/client'

type SitterDescriptionCardProps = {
  sitter: Sitter
  searchParams: {
    serviceType: string
    day: string
    timeOfDay: string,
    petTypes: string[],
  }
}



export default function SitterDescriptionCard({sitter, searchParams}: SitterDescriptionCardProps) {
  const router = useRouter()
  const {data: service} = api.service.byServiceType.useQuery(searchParams.serviceType)

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
            pathname: `/sitter/${sitter.id}`,
            params: searchParams
          })
        }
      >
        <Box className="flex-row">
          {sitter ? (
            <Avatar
              className="w-12 h-12 "
              source={{ uri: sitter.imageUrl }}
            />
          ) : null}
          <Box className="ml-4">
            <Text className='text-lg'>
              {sitter ? sitter.name : null}
            </Text>
            <Text className='text-xs'>{sitter.bio}</Text>
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

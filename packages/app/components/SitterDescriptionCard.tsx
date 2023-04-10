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

export default function SitterDescriptionCard(props: SitterDescriptionCardProps) {
  const router = useRouter()
  const {data: petType} = api.service.byServiceType.useQuery(props.searchParams.serviceType)

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
            pathname: `/sitter/${props.sitter.id}`,
            params: props.searchParams
          })
        }
      >
        <Box className="float-left" style={{ flexDirection: 'row' }}>
          {props.sitter ? (
            <Avatar
              className="w-12 h-12 ml-4 float-left"
              source={{ uri: props.sitter.imageUrl }}
            />
          ) : null}
          <Box className="ml-4 float-left">
            <Text>
              {props.sitter ? props.sitter.name : null}
            </Text>
            <Text>Location: London</Text>
            {/* <Text>
              Helps with:{' '}
              {petType &&
                petType.petType.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                  return letter.toUpperCase()
                })}
            </Text> */}
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

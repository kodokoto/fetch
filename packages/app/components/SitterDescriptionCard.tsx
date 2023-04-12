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
    timeOfDay: string
  }
}

function capitalizeWords(inputString) {
  return inputString.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
}

export default function SitterDescriptionCard(props: SitterDescriptionCardProps) {
  const router = useRouter()
  const {data: service} = api.service.byServiceType.useQuery(props.searchParams.serviceType)
  const {data: petType} = api.animal.byServiceId.useQuery(service ? service.id : null)
  const {data: sitter} = api.sitter.byId.useQuery(props.sitter.id)

  console.log("Sitter: " + JSON.stringify(sitter));


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
            pathname: `/sitter/${sitter.id}`,
            params: props.searchParams
          })
        }
      >
        <Box className="float-left" style={{ flexDirection: 'row' }}>
          {sitter ? (
            <Avatar
              className="w-12 h-12 ml-4 float-left"
              source={{ uri: sitter.imageUrl }}
            />
          ) : null}
          <Box className="ml-4 float-left">
            <Text>
              {sitter ? sitter.name : null}
            </Text>
            <Text>Location: {sitter ? sitter.location : null}</Text>
            <Text>
              Helps with:{' '}
              {petType ? petType.map((pet) => capitalizeWords(pet.type)).join(", ") : null}
            </Text>
          </Box>
        </Box>
        <Text
          className="flex-end"
        >
          £{service? service.price : null}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

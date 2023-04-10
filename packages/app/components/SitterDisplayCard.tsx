import { View, Text, TouchableOpacity, Image } from 'react-native'
import { api } from '../utils/trpc'
import { Avatar } from 'native-base'
import SettingsComponent from 'app/components/SettingsMenu'
import { useRouter } from 'expo-router'
import { Sitter } from 'db'

type SitterDisplayCardProps = {
  sitter: Sitter
  searchParams: {
    serviceType: string
    date: string
    availability: string
    maxPrice: number
  }
}

export default function SitterDisplayCard(props: SitterDisplayCardProps) {
  const router = useRouter()

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
            pathname: `/sitter/${props.sitter.id}`,
            params: props.searchParams
          })
        }
      >
        {props.sitter ? (
          <Avatar
            style={{
              height: 50,
              width: 50,
              borderWidth: 1,
              borderColor: 'black',
            }}
            source={{ uri: props.sitter.imageUrl }}
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
            {props.sitter ? props.sitter.name : null}
          </Text>
          <Text>Location: London</Text>
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

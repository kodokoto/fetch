import { Button, View, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

export default function AddButton({ onPress, title }: { onPress: () => void; title: string }) {
  return (
    <Button className="bg-transparent h-24" onPress={onPress}>
      <View className="flex-row items-center justify-start">
        <Ionicons name="add" size={24} color="black" />
        <Text className="ml-4">{title}</Text>
      </View>
    </Button>
  )
}

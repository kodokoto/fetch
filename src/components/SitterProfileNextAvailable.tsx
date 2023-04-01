import { Text, View, StyleSheet} from 'react-native'
import { Button, Box, NativeBaseProvider } from 'native-base'
import React from 'react'

interface Props {
    available: boolean[][]
}

const styles = StyleSheet.create({
    notAvailable: {
        width: 16,
        height: 10,
        backgroundColor: 'red',
    },
    available: {
        width: 16,
        height: 10,
        backgroundColor: 'green',
    }
})

function getAvailability(availableHours: boolean[]) {
    let availability = []
    for (let i = 0; i < availableHours.length; i++) {
        let style = ""
        if (i == 6 || i == 12 || i == 18) {
            style = "border-l-2"
        }
        if (availableHours[i]) {
            availability.push(<View className={style} key={i} style={styles.available}></View>)
        } else {
            availability.push(<View className={style} key={i} style={styles.notAvailable}></View>)
        }
    }
    return availability
}

export default function SitterProfileNextAvailable(props: Props) {
  return (
    <View>
      <Text className="text-xl">Next Available Hours</Text>
      <Box className='border-2'>
        <Text className="text-lg">Tomorrow</Text>
        <View className="flex-row">
            {getAvailability(props.available[0])}
        </View>
        <Text className="text-lg">Tuesday</Text>
        <View className="flex-row">
            {getAvailability(props.available[1])}
        </View>
        <Text className="text-lg">Wednesday</Text>
        <View className="flex-row">
            {getAvailability(props.available[2])}
        </View>
      </Box>
    </View>
  )
}

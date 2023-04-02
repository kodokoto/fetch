import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'

function ScreenResolutionSetting() {
    const [screenResolution, setScreenResolution] = useState(0)

    return (
        <View>
            <Text>Screen Resolution</Text>
            <Slider
                value={screenResolution}
                onValueChange={setScreenResolution}
                minimumValue={0}
                maximumValue={100}
                step={1}
            />
        </View>
    )
}

export default ScreenResolutionSetting
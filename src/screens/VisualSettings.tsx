import { View, Text, Button, TextInput } from 'react-native'
import React from 'react'



export default function VisualSettings() {

    return (
        <View>
            <Text className="text-green-500">Test</Text>
            {/* text size - type in the size */}
            <Text className="text-green-500">Text Size</Text>
            {/* user is able to type in the size of the text */}
            <TextInput className="text-green-500" placeholder="Text Size"/>
            {/*Screen resolution - drag from 0 to 100 */}
            <Text className="text-green-500">Screen Resolution</Text>
            
        </View>

    )
}


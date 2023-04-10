import React from 'react';
import { View, Text, Button } from 'native-base';
import { titleCase } from 'app/utils/helpers';

type AvailableTimes = {
    MORNING: boolean;
    AFTERNOON: boolean;
    EVENING: boolean;
}

export default function AvailableTimeSelect({value, onChange} : {value: AvailableTimes, onChange: (value: AvailableTimes) => void}) {

    const handleChange = (key, newValue) => {
        onChange({
            ...value,
            [key]: newValue,
        });
    };

    return (
        <View className='flex-row justify-center divide-x-8 '>
            <TimeSelectButton time='MORNING' value={value.MORNING} onChange={handleChange} />
            <TimeSelectButton time='AFTERNOON' value={value.AFTERNOON} onChange={handleChange} />
            <TimeSelectButton time='EVENING' value={value.EVENING} onChange={handleChange} />
        </View>
    )
}

function TimeSelectButton({ time, value, onChange }: { time: string, value: boolean, onChange: (time: string,value: boolean) => void}) {

    return (
        <Button 
            className={`flex-row w-24 h-12 mx-3 justify-center items-center text-center bg-transparent border-2 rounded-[10px]`}
            onPress={() => onChange(time, !value)}
            style={{ 
                borderColor: value ? '#808080' : '#C5C5C5',
            }}
        >   
            <Text>{titleCase(time)}</Text>
        </Button>
    )
}

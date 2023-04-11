import React from 'react';
import { View, Text, Button } from 'native-base';
import { titleCase } from 'app/utils/helpers';
import { FontAwesome5 } from '@expo/vector-icons';

type AvailablepetType = {
    DOG: boolean;
    CAT: boolean;
    OTHER: boolean;
}

export default function PetTypeToggle({value, onChange} : {value: AvailablepetType, onChange: (value: AvailablepetType) => void}) {

    const handleSingleSelectChange = (key, newValue) => {
        const newValues = {
            DOG: false,
            CAT: false,
            OTHER: false,
            [key]: newValue,
        };
        onChange(newValues);
    };

    return (
        <View className='flex-row justify-center divide-x-8 '>
            <AnimalSelectButton animal='DOG' value={value.DOG} onChange={handleSingleSelectChange} icon={ <FontAwesome5 name="dog" size={16} color="black" />}/>
            <AnimalSelectButton animal='CAT' value={value.CAT} onChange={handleSingleSelectChange} icon={ <FontAwesome5 name="cat" size={16} color="black" />}/> 
            <AnimalSelectButton animal='OTHER' value={value.OTHER} onChange={handleSingleSelectChange} /> 
        </View>
    )
}


function AnimalSelectButton({ animal, value, onChange, icon }: { animal: string, value: boolean, onChange: (animal: string,value: boolean) => void, icon?: JSX.Element}) {
  
    return (
        <Button
            className={`flex-row w-24 h-12 mx-3 justify-center items-center text-center bg-transparent border-2 rounded-[10px]`}
            onPress={() => onChange(animal, !value)}
            style={{
                borderColor: value ? '#808080' : '#C5C5C5',
            }}
        >
          <View className='flex-row items-center'>
            { icon && <View className='mr-2'>{ icon }</View> }
            <Text>{titleCase(animal)}</Text>
          </View>
         
        </Button>
    )
}

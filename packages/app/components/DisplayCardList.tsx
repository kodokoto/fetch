import { ComponentType } from "react";
import AddButton from "./AddButton";
import { Text, View } from "react-native";


type DisplayCardListProps<T> = {
    value: T[],
    Card: ComponentType<DisplayCard | EditableDisplayCard<T>>
    editable?: boolean,
    addButtonTitle?: string,
    onAdd?: () => void,
    onEdit?: (value: T) => void,
    onDelete?: (value: T) => void
    maxCards?: number
}

export type DisplayCard = {
    value: any,
}

export type EditableDisplayCard<T> = {
    value: T,
    editable?: boolean,
    onAdd?: () => void,
    onEdit?: (value: T) => void,
    onDelete?: (value: T) => void
}

export default function DisplayCardList({ value, Card, addButtonTitle, editable, onAdd, onDelete, maxCards=6 } : DisplayCardListProps<any>) {

    return (
        <View className="flex flex-col space-y-4">
            {value && value.map((v, i) => (
                <Card value={v} key={i} editable={editable} onDelete={onDelete}/>
            ))}
            {
                editable
                ? (
                <AddButton title={addButtonTitle} onPress={onAdd} />
                ) 
                : (value?.length > maxCards) 
                    ? <Text>You have reached your maximum amout of pets, please subscribe to our pro plan to get more!</Text>
                    : null
            }
        </View>
    );
}
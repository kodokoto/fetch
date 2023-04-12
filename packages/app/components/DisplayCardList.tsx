import { ComponentType } from "react";
import AddButton from "./AddButton";
import { Text, View } from "react-native";


type DisplayCardListProps<T> = {
    value: T[],
    Card: ComponentType<DisplayCard | EditableDisplayCard<T>>
    addButtonTitle?: string,
    emptyMessage?: string,
    maxedOutMessage?: string,
    editable?: boolean,
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

export default function DisplayCardList({ value, Card, addButtonTitle, editable, onAdd, onEdit, onDelete, emptyMessage, maxedOutMessage, maxCards=6 } : DisplayCardListProps<any>) {

    return (
        <View className="flex flex-col space-y-4">
            {value && value.map((v, i) => (
                <Card value={v} key={i} editable={editable} onEdit={onEdit} onDelete={onDelete}/>
            ))}
            {value?.length === 0 && <Text>{emptyMessage}</Text>}
            {
                editable
                ? (
                <AddButton title={addButtonTitle} onPress={onAdd} />
                ) 
                : (value?.length > maxCards) 
                    ? <Text>{maxedOutMessage}</Text>
                    : null
            }
        </View>
    );
}
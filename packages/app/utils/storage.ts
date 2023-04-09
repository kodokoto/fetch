import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

const storage = createJSONStorage<Session>(() => AsyncStorage)    

const content = {
    currentProfile: 'None',
    ownerId: null,
    sitterId: null,
}

function checkIfSessionExists(): any {
    return storage.getItem('session').then((session) => {
        if (session) {
            return session
        } else {
            storage.setItem('session', content)
            return content
        }
    })
}

export const sessionAtom = atomWithStorage<Session>('session', checkIfSessionExists(), storage)

type Session = {
    currentProfile: string;
    ownerId: number | null;
    sitterId: number | null;
}



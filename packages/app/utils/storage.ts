import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

const storage = createJSONStorage<Session>(() => AsyncStorage)    

type Session = {
    currentProfile: Profile;
    ownerId: number | null;
    sitterId: number | null;
}

export enum Profile {
    NONE = 'None',
    OWNER = 'Owner',
    SITTER = 'Sitter',
}

const content = {
    currentProfile: Profile.NONE,
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



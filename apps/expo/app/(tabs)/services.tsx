import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import { api } from 'app/utils/trpc'
import React from 'react'

export default function Services() {
    const router = useRouter();
    const [session, setSession] = useAtom(sessionAtom);
    console.log("Sesh: " + JSON.stringify(session));

    const { data } = api.service.manyBySitterId.useQuery(session.sitterId);
    console.log("Data in services: " + JSON.stringify(data));

    let type = "Walk";
    
    
  return (
    <ScrollView>
      <Button className='rounded-full mb-10 mt-5 w-11/12 ml-auto mr-auto'
                         onPress={() => router.push('/create/service')}
                       >
        <Text className='text-white'>Add Service</Text>
        </Button>
        <Text className="text-2xl ml-auto mr-auto">Current Services: </Text>
        {data && data.map((service, key) => {
            return (
                <TouchableOpacity key={key} className="border mt-5 ml-14 mr-14 rounded p-5">
                    <Text>Service Type: {service.type.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase()).replace(/\w\S*/g,
                        function(txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                        }
                    )}</Text>
                    <Text>Pet Types: {service.petTypes.map(
                        (type) => type.type
                    ).join(', ')
                    .replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    }
                    )}</Text>
                    <Text>Description: {service.description}</Text>
                </TouchableOpacity>
            )
        })}
    </ScrollView>
  )
}

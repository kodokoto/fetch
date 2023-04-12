import { View, Text, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import { api } from 'app/utils/trpc'
import React from 'react'
import DisplayCardList from 'app/components/DisplayCardList'
import ServiceDisplayCard from 'app/components/ServiceDisplayCard'
import { Service, Animal } from '@prisma/client'


type ServiceWithPetType = Service & { petTypes: Animal[] }

export default function Services() {
    const router = useRouter();
    const [session, _] = useAtom(sessionAtom);
    const [services, setServices] = React.useState<ServiceWithPetType[]>([])

    const { isLoading } = api.service.bySitterId.useQuery(session.sitterId, {
        cacheTime: 0,
        onSuccess: (data) => {
            setServices(data)
        }
    });    

    const deleteService = api.service.delete.useMutation()

    const handleOnAdd = () => {
        router.push('/create/service')
    }

    const handleOnedit = (service: Service) => {
        router.push(`/edit/service/${service.id}`)
    }

    const handleOnDelete = (service: Service) => {
        deleteService.mutateAsync({
            serviceId: service.id
        }).then(() => {
            setServices(services.filter((s: Service) => s.id !== service.id))
        })
    }


  if (isLoading) return <Text>Loading...</Text>

  return (
    <ScrollView>
      <View className='my-2 m-6'>
        <Text className='text-2xl font-semibold mb-6'>Your services</Text>
        <DisplayCardList editable Card={ServiceDisplayCard} value={services} onAdd={handleOnAdd} onEdit={handleOnedit} onDelete={handleOnDelete} addButtonTitle='Add Service'/>
      </View>
    </ScrollView>
  )
}

import React, { useState } from 'react'
import { ScrollView } from 'native-base'
import ServiceForm from 'app/screens/ServiceForm'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'

export default function EditService() {

    const { serviceId } = useSearchParams()
    const router = useRouter()

    const [serviceType, setServiceType] = useState("");
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');

    const [days, setDays] = useState({
        "MONDAY": false,
        "TUESDAY": false,
        "WEDNESDAY": false,
        "THURSDAY": false,
        "FRIDAY": false,
        "SATURDAY": false,
        "SUNDAY": false,
    });

    const [times, setTimes] = useState({
        "MORNING": false,
        "AFTERNOON": false,
        "EVENING": false,
    });

    const [petTypes, setPetTypes] = useState({
        "DOG": false,
        "CAT": false,
        "OTHER": false,
    });

    const id = Number(serviceId)


    const { isLoading } = api.service.byIdWith.useQuery({
        id: Number(id),
        include: ['availableTimes', 'petTypes']
    }, {
        enabled: !!serviceId,
        cacheTime: 0,
        onSuccess: (data) => {
            setServiceType(data.type)
            setPrice(String(data.price))
            setDescription(data.description)
            setDuration(String(data.duration))
            
            for (const availableTime of data.availableTimes) {
                setDays({
                    ...days,
                    [availableTime.day]: true
                })
                setTimes({
                    ...times,
                    [availableTime.time]: true
                })
            }

            for (const petType of data.petTypes) {
                setPetTypes({
                    ...petTypes,
                    [petType.type]: true
                })
            }
        }
    })

    const mutation = api.service.update.useMutation()

    const handleSubmit = () => {
        const availableTimes = [];
        for (const day in days) {
            if (days[day]) {
                for (const time in times) {
                    if (times[time]) {
                        availableTimes.push({
                            day,
                            time,
                        })
                    }
                }
            }
        }

        const pts = [];
        for (const pet in petTypes) {
            if (petTypes[pet]) {
                pts.push(pet)
            }
        }

        mutation.mutateAsync({
            serviceId: Number(serviceId),
            serviceType: serviceType,
            price: Number(price),
            petTypes: pts,
            description: description,
            duration: Number(duration),
            availableTimes,
        }).then(
            () => {
                router.replace('/services')
            }
        )
    }

    if (isLoading) return null


  return (
    <>
        <Stack.Screen
            options={{
                headerTitle: 'Edit Service',
            }}
        />
        <ScrollView>
        <ServiceForm {
            ...{
                serviceType,
                price,
                duration,
                description,
                petTypes,
                days,
                times,
                setServiceType,
                setPrice,
                setDuration,
                setDescription,
                setPetTypes,
                setDays,
                setTimes,
                handleSubmit,
            }
        } />
    </ScrollView>

    </>
  )
}
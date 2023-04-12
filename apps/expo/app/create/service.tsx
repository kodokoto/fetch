import React, { useState } from 'react';
import { ScrollView } from 'native-base';
import { useRouter } from 'expo-router';
import { api } from 'app/utils/trpc'
import { sessionAtom } from 'app/utils/storage';
import { useAtom } from 'jotai';
import ServiceForm from 'app/screens/ServiceForm';

export default function services() {
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

    const [session, _] = useAtom(sessionAtom)
    const mutation = api.service.create.useMutation()


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

        const petTypes = [];
        for (const pet in petTypes) {
            if (petTypes[pet]) {
                petTypes.push(pet)
            }
        }

        mutation.mutateAsync({
            sitterId: session.sitterId,
            serviceType: serviceType,
            price: Number(price),
            petTypes: petTypes,
            description: description,
            duration: Number(duration),
            availableTimes,
        }).then(
          () => {
            router.replace('/services')
          }
        )
    }

    return (
        <>
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
            }/>
          </ScrollView>
        </>
    );
}

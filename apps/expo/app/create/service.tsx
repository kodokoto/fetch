import React, { useState } from 'react';
import { View, Input, Text, Button, Checkbox, Select, ScrollView } from 'native-base';

const services = () => {
    const [selectedService, setSelectedService] = useState("");
    const [rate, setRate] = useState('');
    const [availability, setAvailability] = useState('');
    const [days, setDays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
    });
    const [times, setTimes] = useState({
        early: false,
        midday: false,
        evening: false,
        none: false,
    });

    const [size, setSize] = useState({
        small: false,
        medium: false,
        large: false,
        cat: false,
    });

    const handleSizeChange = (sizeType) => {
        setSize({ ...size, [sizeType]: !size[sizeType] });
    };

    const [selectedCancellationTime, setSelectedCancellationTime] = useState("");

    const handleCancellationTimeChange = (time) => {
        setSelectedCancellationTime(time);
    };

    const handleSave = () => {
        console.log('Rate:', rate);
        console.log('Availability:', availability);
        console.log('Days:', days);
    };

    const handleDayChange = (day) => {
        setDays({
            ...days,
            [day]: !days[day],
        });
    };

    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Services</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Choose a Service:</Text>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>what service do you want to offer?</Text>
                {/*Dropdown*/}
                <Select
                    placeholder="Select a service"
                    selectedValue={selectedService}
                    onValueChange={(value) => setSelectedService(value)}
                >
                    <Select.Item label="Walk" value="WALK" />
                    <Select.Item label="Pet Care" value="PET_CARE" />
                    <Select.Item label="House Sitting" value="HOUSE_SITTING" />
                </Select>

                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 30 }}>Rates:</Text>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>What do you want pet owners to pay per visit?</Text>
                <Input placeholder="Enter rate" value={rate} onChangeText={setRate} />


                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>Availability:</Text>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>How many pet owners can you serve per day?</Text>
                <Input placeholder="Enter availability" value={availability} onChangeText={setAvailability} />


                <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>Which days of the week will you be typically available for drop-offs?</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={days.mon} onPress={() => handleDayChange('mon')} />
                    <Text>Mon</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={days.tue} onPress={() => handleDayChange('tue')} />
                    <Text>Tue</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={days.wed} onPress={() => handleDayChange('wed')} />
                    <Text>Wed</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={days.thu} onPress={() => handleDayChange('thu')} />
                    <Text>Thu</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={days.fri} onPress={() => handleDayChange('fri')} />
                    <Text>Fri</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={days.sat} onPress={() => handleDayChange('sat')} />
                    <Text>Sat</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={days.sun} onPress={() => handleDayChange('sun')} />
                    <Text>Sun</Text>
                </View>
                <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>What times are you available for visits?</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={times.slot1} onPress={() => handleTimeChange('slot1')} />
                    <Text>6am-11am</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={times.slot2} onPress={() => handleTimeChange('slot2')} />
                    <Text>11am-3pm</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={times.slot3} onPress={() => handleTimeChange('slot3')} />
                    <Text>3pm-10pm</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={times.none} onPress={() => handleTimeChange('none')} />
                    <Text>None</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>Pet Preferences:</Text>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>What types of pets do you prefer to care for?</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox checked={size.small} onPress={() => handleSizeChange('small')} />
                        <Text>Small dog (0-7 kg)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox checked={size.medium} onPress={() => handleSizeChange('medium')} />
                        <Text>Medium dog (7-18 kg)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox checked={size.large} onPress={() => handleSizeChange('large')} />
                        <Text>Large dog (18 kg or more)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox checked={size.cat} onPress={() => handleSizeChange('cat')} />
                        <Text>Cat</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>Cancellation Time:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={selectedCancellationTime === "same-day"} onPress={() => handleCancellationTimeChange("same-day")} />
                    <Text>Same Day</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={selectedCancellationTime === "one-day"} onPress={() => handleCancellationTimeChange("one-day")} />
                    <Text>One Day In Advance</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={selectedCancellationTime === "three-days"} onPress={() => handleCancellationTimeChange("three-days")} />
                    <Text>Three Days In Advance</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={selectedCancellationTime === "seven-days"} onPress={() => handleCancellationTimeChange("seven-days")} />
                    <Text>Seven Days In Advance</Text>
                </View>
                <Button block style={{ marginTop: 20 }} onPress={handleSave}>
                    <Text style={{ color: '#fff' }}>Save</Text>
                </Button>
            </View>
        </ScrollView >
    );
};

export default services;

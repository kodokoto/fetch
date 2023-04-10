import React, { useState } from 'react';
import { Container, Content, Text, Form, Item, Input, Label, Checkbox, Button, Box, View} from 'native-base';

export default function preferences() {
    const [rate, setRate] = useState('');
    const [availability, setAvailability] = useState('');
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [time, setTime] = useState('');

    const handleSave = () => {
        console.log('Saved!');
    };

    return (
        <View className="flex-2">
            <Text>Drop-In Visits</Text>
            <Text style={{ marginTop: 20, marginLeft: 20 }}>Drop-In Visits</Text>
            <Text style={{ marginLeft: 20, marginBottom: 20 }}>Pet care at your pet owner's home</Text>

            <Form>
                <Item stackedLabel>
                    <Label>Rates (in pounds)</Label>
                    <Input value={rate} onChangeText={setRate} />
                </Item>

                <Item stackedLabel>
                    <Label>Availability (in hours)</Label>
                    <Input value={availability} onChangeText={setAvailability} />
                </Item>

                <Text style={{ marginLeft: 20, marginTop: 20 }}>Days Available:</Text>

                <Item inlineLabel>
                    <Label>Monday</Label>
                    <Checkbox checked={monday} onPress={() => setMonday(!monday)} />
                </Item>

                <Item inlineLabel>
                    <Label>Tuesday</Label>
                    <Checkbox checked={tuesday} onPress={() => setTuesday(!tuesday)} />
                </Item>

                <Item inlineLabel>
                    <Label>Wednesday</Label>
                    <Checkbox checked={wednesday} onPress={() => setWednesday(!wednesday)} />
                </Item>

                <Item inlineLabel>
                    <Label>Thursday</Label>
                    <Checkbox checked={thursday} onPress={() => setThursday(!thursday)} />
                </Item>

                <Item inlineLabel>
                    <Label>Friday</Label>
                    <Checkbox checked={friday} onPress={() => setFriday(!friday)} />
                </Item>

                <Item inlineLabel>
                    <Label>Saturday</Label>
                    <Checkbox checked={saturday} onPress={() => setSaturday(!saturday)} />
                </Item>

                <Item inlineLabel>
                    <Label>Sunday</Label>
                    <Checkbox checked={sunday} onPress={() => setSunday(!sunday)} />
                </Item>

                <Text style={{ marginLeft: 20, marginTop: 20 }}>Times Available:</Text>

                <Item inlineLabel>
                    <Label>6am-11am</Label>
                    <Checkbox checked={time === '6am-11am'} onPress={() => setTime('6am-11am')} />
                </Item>

                <Item inlineLabel>
                    <Label>11am-4pm</Label>
                    <Checkbox checked={time === '11am-4pm'} onPress={() => setTime('11am-4pm')} />
                </Item>

                <Item inlineLabel>
                    <Label>4pm-9pm</Label>
                    <Checkbox checked={time === '4pm-9pm'} onPress={() => setTime('4pm-9pm')} />
                </Item>
                <Item inlineLabel>
                    <Label>9pm-6am</Label>
                    <Checkbox checked={time === '9pm-6am'} onPress={() => setTime('9pm-6am')} />
                </Item>

                <Item inlineLabel>
                    <Label>None</Label>
                    <Checkbox checked={time === 'none'} onPress={() => setTime('none')} />
                </Item>

                <Item stackedLabel>
                    <Label>Service Area Radius</Label>
                    <Input />
                </Item>

                <Text style={{ marginLeft: 20, marginTop: 20 }}>Pet Preferences:</Text>

                <Item inlineLabel>
                    <Label>Small Dog</Label>
                    <Checkbox />
                </Item>

                <Item inlineLabel>
                    <Label>Medium Dog</Label>
                    <Checkbox />
                </Item>

                <Item inlineLabel>
                    <Label>Large Dog</Label>
                    <Checkbox />
                </Item>

                <Item inlineLabel>
                    <Label>Cat</Label>
                    <Checkbox />
                </Item>

                <Item stackedLabel>
                    <Label>Cancellation Policy</Label>
                    <Input />
                </Item>

                <Button onPress={handleSave} style={{ margin: 20 }}>
                    <Text>Save Settings</Text>
                </Button>
            </Form>
        </View>
    );
}
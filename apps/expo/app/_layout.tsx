import { Stack } from 'expo-router'
import Provider from 'app/provider'

export default function root() {

  return (
    <Provider>
        <Stack />
    </Provider>
  )
}
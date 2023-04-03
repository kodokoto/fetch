import { View, Text } from 'react-native'
import { Box } from 'native-base'
import React from 'react'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import BookingPreview from 'app/components/BookingPreview';
import { useAuth, useUser } from "@clerk/clerk-expo";
import { trpc } from 'app/utils/trpc';


export default function Home() {
    // const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { isLoaded, isSignedIn, user } = useUser();

    
    if (!isLoaded) return null;

    const { data, error, isLoading } = trpc.booking.byOwnerEmail.useQuery(user.primaryEmailAddress.emailAddress);

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>{error.message}</Text>;


    return (
      <View>
        <Box className="flex-wrap flex-row">
          <WelcomeMessage name={user.firstName} />
          <ProfileIcon iconUrl={user.profileImageUrl} />
        </Box>
        <Text className='font-bold text-xl ml-2'>Upcoming Appointments</Text>
        {
          isLoading ? <Text>Loading...</Text> :
          error ? <Text>{error.message}</Text> :
          data.map((data, index) => (
            <BookingPreview key={index} {...data} />
          ))
        }
      </View>
    )
  }
  
import { View, Text } from 'react-native'
import React from 'react'
import { Sitter } from '@prisma/client'
import { api } from '../utils/trpc';
import { FilterSearchParams } from './Filter';

export default function SearchResults(SearchParams: FilterSearchParams) {
    for (let i = 0; i < 10; i++) {
        console.log("SearchResults");
    }
    console.log(SearchParams);
    const { data, error, isLoading } = api.sitter.bySearchParams.useQuery({
        service: "WALK",
        frequency: "WEEKLY",
        proximity: "10",
        date: "2021-08-01",
    });
    return (
        <View>
        <Text>SearchResults</Text>
        </View>
    )
}
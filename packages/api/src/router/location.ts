import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import z from "zod";

export const locationRouter = router({
    byLatLng: publicProcedure
    .input(
        z.object({
            lat: z.number(), 
            lng: z.number()
        })
    )
    .query(({ input }) => {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${input.lat},${input.lng}&key=AIzaSyBCnTM1belgInQLg4uh4RyEJT9MLhWQtoU`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
    })
})
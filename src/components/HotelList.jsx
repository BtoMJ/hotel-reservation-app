import { Card, CardContent, CardMedia, CardActions, Typography, Stack, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

const fetchHotels = async () => {
    const res = await fetch ("http://localhost:3001/hotels");
    if(!res.ok) {
        throw new Error ("Network response was not OK");
    }
    return res.json();
}

function HotelList (){
    
    const {
        data: hotels,
        isLoading,
        errors,
    } = useQuery ({ queryKey: ["hotels"], queryFn: fetchHotels});

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(errors) {
        return <div>Error fetching Hotels! {errors.message}</div>
    }

    return (
        <>
            <Typography variant="h4" component="h2">
                Booking App
            </Typography>
            <Stack spacing={2}>
                {
                    hotels.map (hotel => (
                        <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
                            <Card sx={{ maxWidth: 345, backgroundColor: "#E8E8E8"}}>
                                <CardMedia 
                                    sx={{ height: 140}}
                                    image={hotel.image}
                                    title={hotel.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        { hotel.name }
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        { hotel.description }
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    <Button size="small">See Details</Button>
                                </CardActions>
                            </Card> 
                        </Link>
                    ))
                }
            </Stack>
        </>
    )
}

export default HotelList;
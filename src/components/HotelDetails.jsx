import { Card, CardActions, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import BookingForm from "./BookingForm";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import AssignmentIcon from '@mui/icons-material/Assignment';

const fetchHotel = async (id) => {
    const res = await fetch(`http://localhost:3001/hotels/${id}`);
    if(!res.ok) {
        throw new Error("Network response was not OK");
    }
    return res.json();
}

function HotelDetails (){

    const [match, params] = useRoute("/hotel/:id");
    const {
        data: hotel,
        isLoading,
        error,
    } = useQuery ({
        queryKey : ["hotel", params.id],
        queryFn : () => fetchHotel(params.id)
    });

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error fetching Hotel! {errors.message}</div>
    }

    return (
        <div className="hotel-detail-container">
            <Card 
                sx={{ 
                    maxWidth: 750,
                    height: 620, 
                    background: "linear-gradient(0deg, rgba(230,230,230,1) 0%, rgba(255,255,255,1) 35%)" 
                }}
            >
                <CardMedia 
                    sx={{ height: 300 }} 
                    image={ hotel.image } 
                    title={ hotel.name }
                />
                <div className="flags2">
                    <CardActions >
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="call">
                            <PermPhoneMsgIcon />
                        </IconButton>
                        <IconButton aria-label="check list">
                            <AssignmentIcon />
                        </IconButton>
                    </CardActions>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" sx={{ fontWeight: "bold"}}>
                        { hotel.name }
                    </Typography>
                    <Typography sx={{ fontSize: 20}} >
                        { hotel.description }
                    </Typography>
                </CardContent>
                <CardActions>
                    <BookingForm hotel={ hotel } />
                </CardActions>
            </Card>
        </div>
    )
}

export default HotelDetails;
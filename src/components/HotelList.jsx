import { Card, CardContent, CardMedia, CardActions, Typography, Stack, Button, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HotelIcon from '@mui/icons-material/Hotel';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import AttractionsIcon from '@mui/icons-material/Attractions';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import HikingIcon from '@mui/icons-material/Hiking';
import gif from '../../public/img/loader-hotel.gif'

const fetchHotels = async () => {
    const res = await fetch ("http://localhost:3001/hotels");
    if(!res.ok) {
        throw new Error ("Network response was not OK");
    }
    return res.json();
}

function changeColor ( index ) {
    // index.event.preventDefault()
    var divID = "#heart" + index

    // alert(divID)
    // console.log(divID+"hola")
    var element = document.querySelector(divID)
    console.log(element)
    // element.classList.toggle('liked')
}


function HotelList (){
    
    const {
        data: hotels,
        isLoading,
        errors,
    } = useQuery ({ queryKey: ["hotels"], queryFn: fetchHotels});

    if(isLoading) {
        return <div className="loading-container"> <img src={gif} /> </div>
    }

    if(errors) {
        return <div>Error fetching Hotels! {errors.message}</div>
    }

    return (
        <>
            <div className="header">
                <div className="nav">
                    <div className="options">
                        <Button 
                            sx={{ 
                                background: "transparent",
                                border: "1px solid #FFFFFF20",
                                "&:hover":{
                                    background: "#FFFFFF20"
                                }
                            }}
                            startIcon={<HotelIcon sx={{marginBottom: "5px", color: "#fbd305" }}/>}
                        >Alojamientos
                        </Button>           
                        <Button 
                            sx={{ 
                                background: "transparent",
                                border: "1px solid #FFFFFF20",
                                "&:hover":{
                                    background: "#FFFFFF20"
                                }
                            }}
                            startIcon={<AirplanemodeActiveIcon sx={{marginBottom: "3px", color: "#fbd305" }}/>}
                        >Vuelos
                        </Button>           
                        <Button 
                            sx={{ 
                                background: "transparent",
                                border: "1px solid #FFFFFF20",
                                "&:hover":{
                                    background: "#FFFFFF20"
                                }
                            }}
                            startIcon={<DepartureBoardIcon sx={{marginBottom: "5px", color: "#fbd305" }}/>}
                        >Renta de autos
                        </Button>           
                        <Button 
                            sx={{ 
                                background: "transparent",
                                border: "1px solid #FFFFFF20",
                                "&:hover":{
                                    background: "#FFFFFF20"
                                }
                            }}
                            startIcon={<AttractionsIcon sx={{marginBottom: "3px", color: "#fbd305" }}/>}
                        >Atracciones
                        </Button>           
                        <Button 
                            sx={{ 
                                background: "transparent",
                                border: "1px solid #FFFFFF20",
                                "&:hover":{
                                    background: "#FFFFFF20"
                                }
                            }}
                            startIcon={<LocalTaxiIcon sx={{marginBottom: "3px", color: "#fbd305" }}/>}
                        >Taxis
                        </Button>           
                    </div>
                    <div className="sesion">
                        <Button 
                             sx={{ 
                                background: "transparent",
                                border: "1px solid #FFFFFF20",
                                "&:hover":{
                                    background: "#FFFFFF20"
                                }
                            }}
                            startIcon={<AccountCircleIcon sx={{marginBottom: "3px", color: "#fbd305" }}/>}
                        >Inicia Sesión
                        </Button>
                    </div>
                </div>
                <Typography variant="h2" component="h1" sx={{ fontWeight: 500}}>
                    <HikingIcon sx={{ fontSize: "5rem", color: "#fbd305", position:"relative", top: "15px"}}/>
                      Booking App
                </Typography>
                <input className="search" type="text" placeholder="Busca tu hotel favorito" />
            </div>
            <Stack className="stack-container"
                spacing={3} 
                direction="row" 
                sx={{ width: "100%", 
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
            >
                {
                    hotels.map ((hotel,index) => (
                            <Card 
                                sx={{ 
                                        maxWidth: 300, 
                                        background: "linear-gradient(0deg, rgba(240,240,240,1) 0%, rgba(255,255,255,1) 35%)",
                                        boxShadow: "0 7px 7px -3px rgba(0,0,0,.15)",
                                        transition: ".5s all ease",
                                        "&:hover":{
                                            cursor: "pointer",
                                            transform: "translateY(-15px)",
                                            background: "linear-gradient(0deg, rgba(120, 66, 18,.12) 0%, rgba(255,255,255,1) 55%)",
                                        }
                                }}

                                key={index}
                            >
                                <CardMedia 
                                    sx={{ height: 180, transition: ".5s all", "&:hover":{ transform: "scale(1.1"}}}
                                    image={hotel.image}
                                    title={hotel.name}
                                />
                                <div className="flags">
                                    <CardActions >
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon onClick={changeColor(index)} id={`heart${index}`}  />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                    </CardActions>
                                </div>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        { hotel.name }
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        { hotel.description }
                                    </Typography> 
                                </CardContent>
                                <CardActions >
                                    <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
                                        <Button 
                                            size="small"
                                            sx={{ 
                                                background: "linear-gradient(0deg, rgba(251,170,5,1) 0%, rgba(253,239,29,1) 100%)",
                                                color: "#454545",
                                                margin: "0 auto",
                                                transition:".5s all ease",
                                                "&:hover":{
                                                    borderRadius: 5,
                                                    fontWeight: "bold",
                                                    transform: "translateY(-5px)",
                                                    background: "linear-gradient(0deg, rgba(253,239,29,1) 0%,  rgba(251,170,5,1) 100%)",
                                                }
                                                }}
                                        >
                                            + info</Button>
                                    </Link>
                                </CardActions>
                            </Card> 
                    ))
                }
            </Stack>
            <div className="footer"> © Derechos Reservados <span> Booking App </span> | Desarrollo a cargo de <span> Daniel Mena </span></div>
        </>
    )
}

export default HotelList;
import { Button, Input, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useStore from "../store";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "wouter";


function BookingForm ({ hotel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const addReservation = useStore((state) => state.addReservation);

    const onSubmit = (data) => {
        addReservation(hotel, data);
        toast.success("Reservation made!");
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit)}> 
            <div className="data-container">
                <div className="item-data-detail">
                    <Typography style={{ fontWeight: "bold", fontSize: 23 }}>Llegada</Typography>
                    <Input type="date" {...register("startDate", { required : true })}/>
                        { errors.startDate && (
                            <Typography style={{ color : "red" }}>Fecha de entrada requerida</Typography>
                            )}
                </div>
                <div className="item-data-detail">
                    <Typography style={{ fontWeight: "bold", fontSize: 23 }}>Salida</Typography>
                    <Input type="date" sx={{ "&:hover":{ cursor: "pointer"} }} {...register("endDate", { required : true })}/>
                        { errors.endDate && (
                            <Typography style={{ color : "red", position: "relative", top: 10 }}>Fecha de salida requerida</Typography>
                        )}
                </div>
                <div className="item-data-detail">
                    <Button  
                        type="submit"
                        size="large"
                        sx={{ 
                            background: "linear-gradient(0deg, rgba(251,170,5,1) 0%, rgba(253,239,29,1) 100%)",
                            color: "#454545"
                            }}
                    >Reservar</Button>
                </div>
                <div className="item-data-detail">
                    <div className="back-button">
                        <Link href="/">
                            <ArrowBackIcon 
                                sx={{ 
                                        fontSize: 45,
                                        transition: "0.5s all"
                                      
                                        
                                    }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <br />
        </form>
    )
}

export default BookingForm;
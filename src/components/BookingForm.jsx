import { Button, Input, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useStore from "../store";


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
            <Input type="date" {...register("startDate", { required : true })}/>
                { errors.startDate && (
                    <Typography style={{ color : "red" }}>Start Date is Required</Typography>
                )}
            <br />
            <Input type="date" {...register("endDate", { required : true })}/>
                { errors.endDate && (
                    <Typography style={{ color : "red" }}>End Date is Required</Typography>
                )}
            <br />
            <Button variant="contained" type="submit">Make Reservation</Button>
        </form>
    )
}

export default BookingForm;
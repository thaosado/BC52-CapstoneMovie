import { configureStore } from "@reduxjs/toolkit";
import movieTicketReducer from "./redux/movieTicketSlice";

const store = configureStore({
    reducer: {
        movieTicket: movieTicketReducer
    }
})

export default store;
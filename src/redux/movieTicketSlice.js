import { createSlice } from "@reduxjs/toolkit";

const movieTicketSlice = createSlice({
    name: "movieTicket",
    initialState: {
        selectedSeats: [],
        totalPrice: 0
    },
    reducers: {
        selectedSeat: (state, action) => {
            const { giaVe, isSelected, ...seat } = action.payload;
            if (isSelected) {
                state.selectedSeats.push(seat)
                state.totalPrice = state.totalPrice + giaVe
            } else {
                state.selectedSeats = state.selectedSeats.filter((item) => {
                    return item.stt !== seat.stt
                })
                state.totalPrice = state.totalPrice - giaVe
            }
        },
        purchase: (state, action) => {
            state.selectedSeats = [];
        }
    }
})

export const { selectedSeat } = movieTicketSlice.actions
export default movieTicketSlice.reducer
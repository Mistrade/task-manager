import {Routes} from "react-router-dom"
import {Route, useParams} from "react-router";
import {CalendarMode} from "./types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const CalendarBody = () => {
	
	const {layout} = useParams<{ layout: CalendarMode['layout'] }>()
	
	return (
		<Routes>
			<Route/>
		</Routes>
	)
}
import React from 'react'
import './App.scss'
import {ThemeProvider} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import theme from "./theme";
import {LandingPage} from "./pages/LandingPage";
import {EscapeRoomBookingPage} from "./pages/EscapeRoomBookingPage";
import { GraphQLClient, ClientContext } from 'graphql-hooks'

export const AppContext = React.createContext<undefined | { apiKey: string }>(undefined)

//const apiKey = "1a6a606f0a56bde210db59c9fbf601"
const apiKey = "7c7cb63b2a47fef9d2c7a1e462f78f"

const client = new GraphQLClient({
    url: "https://graphql.datocms.com/",
    headers: {
      "Authorization": `${apiKey}`,
    }
  });

function App() {
    return (
        <ClientContext.Provider value={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <AppContext.Provider
                        value={{apiKey}}
                    >
                        <Routes>
                            <Route index element={<LandingPage/>}/>
                        </Routes>
                    </AppContext.Provider>
                </Router>
            </ThemeProvider>
        </ClientContext.Provider>
    )
}

export default App


// 114819974

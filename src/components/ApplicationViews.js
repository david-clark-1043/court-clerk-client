import React from "react"
import { Route } from "react-router-dom"
import { Docket } from "./dockets/Docket"
import { DocketList } from "./dockets/DocketList"
import { CreateFiling } from "./filings/CreateFiling"
import { Home } from "./home/Home"
import { Profile } from "./profiles/Profile"

export const ApplicationViews = () => {
    return <>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/dockets">
            <DocketList />
        </Route>
        <Route exact path="/dockets/:docketId(\d+)">
            <Docket />
        </Route>
        <Route exact path="/filings/new">
            <CreateFiling />
        </Route>
        <Route exact path="/dockets/filers/:filerId(\d+)">
            <DocketList />
        </Route>
        <Route exact path="/profiles/:filerId(\d+)">
            <Profile />
        </Route>
    </>
}
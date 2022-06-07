import React from "react"
import { Route } from "react-router-dom"
import { Docket } from "./dockets/Docket"
import { DocketList } from "./dockets/DocketList"
import { CreateFiling } from "./filings/CreateFiling"
import { Home } from "./home/Home"
import { Profile } from "./filers/Profile"
import { Filing } from "./filings/Filings"
import { AssignManagers } from "./adminTools/AssignManagers"
import { Filers } from "./filers/Filers"
import { EditFiler } from "./filers/EditFiler"
import { EditDocket } from "./dockets/EditDocket"

export const ApplicationViews = () => {
    return <>
    <main style={{ margin: "1em" }}>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/dockets">
            <DocketList />
        </Route>
        <Route exact path="/dockets/:docketId(\d+)">
            <Docket />
        </Route>
        <Route exact path="/dockets/:docketId(\d+)/edit">
            <EditDocket />
        </Route>
        <Route exact path="/filings/new">
            <CreateFiling />
        </Route>
        <Route exact path="/filings/:filingId(\d+)">
            <Filing />
        </Route>
        <Route exact path="/dockets/filers/:filerId(\d+)">
            <DocketList />
        </Route>
        <Route exact path="/profiles/:filerId(\d+)">
            <Profile />
        </Route>
        <Route exact path="/filers">
            <Filers />
        </Route>
        <Route exact path="/filers/:filerId(\d+)/edit">
            <EditFiler newFiler={false} />
        </Route>
        <Route exact path="/filers/new">
            <EditFiler newFiler={true} />
        </Route>
        <Route exact path="/dockets/:docketId(\d+)/assignManagers">
            <AssignManagers />
        </Route>
        </main>
    </>
}
import React from "react"
import { Route } from "react-router-dom"
import { DocketList } from "./dockets/DocketList"
import { Home } from "./home/Home"

export const ApplicationViews = () => {
    return <>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/dockets">
            <DocketList />
        </Route>
    </>
}
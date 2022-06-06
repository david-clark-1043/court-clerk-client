import { useHistory } from "react-router-dom"
import { DocketList } from "../dockets/DocketList"
import "./Home.css"

export const Home = () => {
    const history = useHistory()
    return <div className="home">
        <div className="docketList">
            <DocketList home={true}/>
        </div>
        <div className="homeButtonDiv">
            <button
                className="startFilingButton"
                onClick={() => history.push("/filings/new")}>
                Start Filing
            </button>
            <button
                className="searchCasesButton"
                onClick={() => history.push("/dockets")}>
                Search Cases
            </button>
        </div>
    </div>
}
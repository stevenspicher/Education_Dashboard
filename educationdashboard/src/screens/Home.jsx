import '../index.css';
import '../css/search.css';
import LiveMap from "../components/Home/DistrictMap/LiveMap.jsx";
import {Container} from "react-bootstrap";
import SchoolTable from "../components/Home/Table/Table.jsx";
import FullSearch from "../components/Home/HomePageSearch/FullSearch.jsx";


function Home() {



  return (
      <Container >
          <div id="title">
              <h1>South Carolina Schools Explorer</h1>
          </div>
        <FullSearch/>

          <h1>Districts</h1>
            <LiveMap/>

          <h1>Schools</h1>
          <SchoolTable/>


</Container>
  )
}

export default Home

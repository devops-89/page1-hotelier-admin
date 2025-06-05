import { useEffect,useState } from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";
import { HotlierController } from "../api/hotlierController.js";
import HotelList from "../components/HotelList.jsx";
const AllHotel = () => {

    const [hotelList,setHotelList]=useState([]);
    const [loading,setLoading]=useState(true);


      useEffect(()=>{
          HotlierController.getHotels().then((response)=>{
           
              setHotelList(response.data.data);
          }).catch((error)=>{
                console.log(error);
          }).finally(()=>{
            setLoading(false);
          })
      },[]);



    const handleView = (id) => {
        console.log("View flight Detail:", id);
    };

    const table_heading = {
        heading: "All Available Hotels",
        para: "Browse through our extensive list of hotels to find the perfect stay for your next trip."
    };

    if(loading){
        return (
            <div>
                <h2>Loading..</h2>
            </div>
        )
    }

    return (
      
        <HotelList
            data={hotelList}
            onActionClick={handleView}
            table_heading={table_heading}
        />
    );
};


export default AllHotel
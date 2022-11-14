import React, {useEffect,useState} from "react";
import {useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as spotActions from '../../store/spots'
import EditFormModal from "../EditFormModal";
import CreateNewSpot from "../CreateNewSpot";
import { Modal } from '../../context/Modal';
import { getSpotsOfCurrentUser } from "../../store/currentSpot";

import "./index.css"







function HostingHomePage(){
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(0);
    const [clicked, setClicked] = useState({})

    const [showModal, setShowModal] = useState(false);

    


    useEffect(()=>{
        console.log('useEffect hitted')
        
        dispatch(getSpotsOfCurrentUser())
    },[])



        const currentSpots = useSelector((state)=>{return(state.currentSpots)})
        console.log(currentSpots)
        const spotsArray = Object.values(currentSpots);
        console.log(spotsArray)

    // const currentUserId = useSelector((state)=>{return(state.session.user.id)})
    // console.log("currentUserId",currentUserId)
    // const spots = useSelector((state)=>{return(state.allSpots)})
    // console.log(spots)
    // const spotsArray = Object.values(spots);
    // console.log(spotsArray)

    // const currentUserSpots = spotsArray.filter((spot)=>{return(spot.ownerId == currentUserId)})
    // console.log("currentUserSpots",currentUserSpots)


    const removeSpot = ()=>{
        dispatch(spotActions.deleteSpot(spotId))

    }

    const handleEditClick = (id) => {
        console.log('id:', id);
        setClicked({ [id]: !clicked[id] });
    }

    // return (
    //     <div>This is current spot page</div>
    // )

    
    return(
        <div className="hosting-container">
        
        <button className="create-button" onClick={() => setShowModal(true)}>Create a New Spot</button>
      
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <CreateNewSpot setShowModal={setShowModal}/>
        </Modal>
      )}
      {spotsArray.length > 0 && 
        spotsArray.map(spot=>{return(
                <div key={spot.id} className='spot-card'>
                <h3>{spot.name}</h3>
                <img src={spot.previewImage}></img>
                <p>{spot.address}</p>
                <p>{spot.city}</p>
                <p>{spot.country}</p>
                <p>{spot.price}</p>
                {(!spot.aveRating && <p><span>&#9733;</span>New</p>) || (spot.aveRating && <p><span>&#9733;</span>{Number(spot.aveRating).toFixed(1)}</p>) }
                
                <form onSubmit={removeSpot}>
                <button className="delete-button" type="submit" id={spot.id} onClick={e=>setSpotId(e.target.id)}>Delete</button>
                </form>
                <span>
                    <button className="edit-button" onClick={() => handleEditClick(spot.id)}>Edit</button>
                    {/* {clicked[spot.id] === true && 
                    <Modal>
                        <EditFormModal />
                    </Modal> } */}
                    {clicked[spot.id] === true && 
                    <Modal >
                    <EditFormModal closeModal={() => setClicked({ ...clicked, [spot.id]: false })} spot={spot}/>
                    </Modal>}
                </span>
                
                </div>
            )})
      }
            

            

        </div> 
    )}







export default HostingHomePage;
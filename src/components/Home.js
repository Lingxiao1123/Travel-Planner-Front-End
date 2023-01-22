import React, { useRef, useState } from 'react';
import{ Col, Row, Divider, message } from 'antd';
import { nanoid } from 'nanoid';


import PlaceList from './PlaceList';
import CategoryButtons from './CategoryButtons';

import DayGallery from './DayGallery';
import { Map } from './Map';



function Home(props) {

    const { planName, planList, isPlanVisible, placeList, toMapPlaceList, directionsResponse } = props;
    //curDayId 最新box的id
    const [curDayId, setCurDayId] = useState(Date.now());
    const [showCard, setShowCard] = useState(false);
    const [showMarker, setShowMarker] = useState();
    const [dayList, setDayList] = useState(
        [
            {
                dayId: curDayId,
                placesArr: []
            }
        ]
    )

    const handleShow = (item) => {
        setShowCard(true);
        setShowMarker(item);
    }

    const handleShowBack = () => {
        setShowCard(false);
    }

    const handleSearch = (selected) => {
        props.search(selected);
    }

    const getSelectedPlace = (obj) => {
        addPlace(curDayId, obj);
    }

    //给DayGellery传的回调函数
    //链接dayGallery和map之间的回调函数
    const addDay = (day) => {
        const newDay = Date.now()
        setDayList(
            [...dayList, {
                dayId: newDay,
                placesArr: []
            }]
        );
        setCurDayId(newDay);
      }

    const deleteDay = (day) => {
        //delete the day
        if (window.confirm(`Are you sure you want to delete this day?`)) {
            const newDayList = dayList.filter((e) => e.dayId !== day);
            setDayList(newDayList);
            
            if (newDayList.length === 0) {
                setDayList(
                    [
                        {
                            dayId: Date.now(),
                            placesArr: []
                        }
                    ]
                );
            }

            if (curDayId === day) {
                setCurDayId(dayList[0].dayId);
            }
        };
      }

    const addPlace = (day, place) => {
        //加到当前place所在box中
        const newPlace = {
            // dayId: place.dayId,
            place_id: place.place_id,
            id: nanoid(),
            name: place.name,
            category: place.category,
            latitude: place.latitude,
            longitude: place.longitude,
            intro: place.intro
        }
        let indexForDay = 0;
        dayList.forEach((element, index) => {
            if (element.dayId === day) {
                indexForDay = index;
            }
        }
        );
        const placesForTheDay = [...dayList[indexForDay].placesArr, newPlace];
        const newDayList = [...dayList];
        newDayList.splice(indexForDay, 1, {dayId: day, placesArr: placesForTheDay});
        // setPlacesArr(newPlacesArr);
        console.log(newDayList);
        // console.log(day);
        // console.log(curDayId);
        setDayList(newDayList);
        setCurDayId(day);
    }

    const deletePlace = (day, place) => {
        //place进来，place带有place id，placename， place_dayid
        if (window.confirm(`Are you sure you want to delete this place?`)) {
        // const newPlacesArr = placesArr.filter((e) => e.id !== place.id);
        // setPlacesArr(newPlacesArr);
            let indexForDay = 0;
            dayList.forEach((element, index) => {
                if (element.dayId === day) {
                    indexForDay = index;
                }
            }
            );
            console.log(indexForDay);
            console.log(dayList);
            const placesForTheDay = [...dayList[indexForDay].placesArr.filter((p) => p.id !== place.id)];
            const newDayList = [...dayList];
            newDayList.splice(indexForDay, 1, {dayId: day, placesArr: placesForTheDay});
            setDayList(newDayList);
            setCurDayId(day);
        };
      }
  
    
    const renderRoute = async function(curDayPlaces) {
        props.showRoute(curDayPlaces);          
    }

    // const { placelist, placesArr, dayArr, routeList,directionsResponse, toMapPlaceList } = this.state;
        
    const dragItem = useRef();
    const dragDay = useRef();
    const dragOverItem = useRef();  
    const dragOverDay = useRef();
        
    const dragStart = (e, day, position) => {
        dragItem.current = position;
        dragDay.current = day;
    };

    const dragEnter = (e, day, position) => {
        dragOverItem.current = position;
        dragOverDay.current = day;
        // console.log(e.target.innerHTML);
    };
    
    const drop = (e) => {
        let indexForDay = 0;
        dayList.forEach((element, index) => {
            if (element.dayId === dragDay.current) {
                indexForDay = index;
            }
        }
        );
        console.log(dayList);
        // console.log(dragDay.current, dragItem.current, dragOverDay.current, dragOverItem.current);
        const placesForTheDay = [...dayList[indexForDay].placesArr];
        const newDayList = [...dayList];
        // const copyListItems = [...placesArr];
        const dragItemContent = placesForTheDay[dragItem.current];
        // console.log(dragItem.current);
        // console.log(dragOverItem.current);
        placesForTheDay.splice(dragItem.current, 1);
        placesForTheDay.splice(dragOverItem.current, 0, dragItemContent);
        newDayList.splice(indexForDay, 1, {dayId: dragOverDay.current, placesArr: placesForTheDay});
        setDayList(newDayList);
        dragItem.current = null;
        dragDay.current = null;
        dragOverItem.current = null;
        dragOverDay.current = null;
    };

    const handleBack = () => {
        props.goBack();
    }

    return (
        <Row className='main'>
            <Col span={6} className="left-side">
                <DayGallery dayList={dayList} getRoute={renderRoute} 
                    addDay={addDay} deleteDay={deleteDay} addCurPlace={addPlace} 
                    deletePlace={deletePlace} drop={drop} dragStart={dragStart} dragEnter={dragEnter}
                    planName={planName} planList={planList} isPlanVisible={isPlanVisible} handleBack={handleBack}
                />
            </Col>
            <Col span={6} className='middle-side'>
                <CategoryButtons onSearch={handleSearch} />
                <Divider />
                <PlaceList placelist={placeList} getSelectedPlace={getSelectedPlace} 
                    planList={planList} isPlanVisible={isPlanVisible} showCard={showCard} 
                    handleShow={handleShow} handleShowBack={handleShowBack} 
                    selectedPlace={showMarker}/>
            </Col>
            <Col span={12} className="right-side">
                <Map placelist={toMapPlaceList} directionsResponse={directionsResponse} 
                    isPlanVisible={isPlanVisible} showCard={showCard} showMarker={showMarker}
                />
            </Col>
        </Row>
    )
}

export default Home

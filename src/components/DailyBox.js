import { useState  } from "react";
import { List, Avatar, Button } from 'antd';
import hotel from "../assets/images/hotel.png";
import restaurant from "../assets/images/restaurant.png";
import tour from "../assets/images/tour.png";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import React, { Component } from 'react'

function DailyBox(props) {  

    const { day, places } = props;
    // const [placeList, setList] = useState(places)

    return (
        <List
            className="daily-place-list"
            itemLayout="horizontal"
            size="small"
            dataSource={places}
            // actions={addPlace}//待实现
            renderItem={(place, index) => (
                <List.Item                    
                key={index}
                onDragStart={(e) => props.dragStart(e, day, index)}
                onDragEnter={(e) => props.dragEnter(e, day, index)}
                onDragEnd={props.drop}
                draggable
                    extra={
                        <div>
                            <Button 
                                style={{marginTop: "10px", marginLeft: "5px"}}
                                key="deletePlace"
                                type="primary"
                                size="small"
                                onClick={(e) => {props.deletePlace(e, day, place)}}
                            >
                                <DeleteOutlined  />
                            </Button>
                            <Button 
                                style={{ marginTop: "10px", marginLeft: "5px" }}
                                key="addPlace"
                                type="primary"
                                size="small"
                                onClick={(e) => {props.addPlace(e, day, place)}}
                            >
                                <PlusSquareOutlined />
                            </Button>
                        </div>
                    }
                >
                <List.Item.Meta
                    avatar={<Avatar size={20} src={place.category==="sight" ? tour: (place.category === "restaurant" ? restaurant : hotel)} />}
                    title={<p>{place.name}</p>}
                    />
                </List.Item>
                )}
        />
        )}
    

export default DailyBox;
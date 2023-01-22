//home下面是dayGallery，playList和map
//playlist加了place要和daygallery联动
//那么home就要设一个回调函数，回调函数改变显示的地点，传给DayGallery
//待做事项：1.生成route，在home组件中有一个回调函数，把这里的place传给home回调函数，home再传给map
//2. 点击save保存信息到myplan上
//3.从placelist中获取数据
import { List, Avatar, Button, Card } from 'antd';
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useState } from "react";

import DailyBox from './DailyBox';
import sunlight from "../assets/images/sunlight.svg";
import SaveButton from './SaveButton';

function DayGallery(props) {

  // const { dayArr, placesArr } = props;
  const { dayList, planName, planList, isPlanVisible, handleBack } = props;
  const [ routeVisible, setRouteVisible ] = useState(true);

  // function getCurDayPlaces (day) {
  //   return placesArr.filter((place) => place.dayId === day.id);
  // }


  const handleAddPlace = (e, day, place) => {
    props.addCurPlace(day, place);    
  }

  const handleDeletePlace = (e, day, place) => {
    props.deletePlace(day, place);
   
  }

  const drop = (e) => {
    props.drop(e);
  }

  const dragStart = (e, day, position) => {
    props.dragStart(e, day, position)
  } 

  const dragEnter = (e, day, position) => {
    props.dragEnter(e, day, position)
  } 

  const handleAddDay = (e, day) => {
    e.stopPropagation();
    props.addDay(day);
    // showRoute(null);
  }

  const handleDeleteDay = (e, day) => {
    //delete the day
    e.stopPropagation();
    props.deleteDay(day);
  }

  const showRoute = (day) => {
    // console.log(day);
    setRouteVisible(preState => !preState);
    // console.log(routeVisible);
    if (routeVisible) {
      if (isPlanVisible) {
        props.getRoute(day);
        return ;
      }
      const curDayPlaces = day.placesArr;
      props.getRoute(curDayPlaces);
    } else {
      props.getRoute([]);
    }    
  }

  const goBack = () => {
    handleBack();
  }

  //保存plan
  // const operations = <CreatePostButton onShowPost={showPost} />

  return (
    <>
        {isPlanVisible ?
        <Card className = "plan_list">
              <Card.Meta 
                  title={<>
                          <p>{planName}</p>
                          <Button type='primary'
                                  className='back'
                                  onClick={() => goBack()}
                          > back </Button>
                          </>}
              />
              <List
                className="plan-list"
                itemLayout="horizontal"
                size="small"
                dataSource={planList}
                renderItem={(day, index) => (
                  <div>
                    <List.Item
                      onClick={() => showRoute(day)}
                      >
                      <List.Item.Meta
                          avatar={<Avatar size={30} src={sunlight} />}
                          title={<p>{"day " + (index + 1)}</p>}
                          />                 
                    </List.Item>
                    <List
                      className="plan-list"
                      itemLayout="horizontal"
                      size="small"
                      dataSource={day}
                      renderItem={(place, idx) => (
                        <div>
                          <List.Item>
                          <List.Item.Meta
                            title={<p>{place.name}</p>}
                          />                
                          </List.Item>                                              
                        </div>
                      )}
                    />
                  </div>
                )}
              />
          </Card> 
          :


    <div className="planner-content">
        <List
          className="day-list"
          itemLayout="horizontal"
          size="small"
          dataSource={dayList}
          renderItem={(day, index) => (
            <div>
              <List.Item
                onClick={() => showRoute(day)}
                extra={
                  <div>
                      <Button 
                          style={{marginTop: "10px", marginLeft: "5px" }}
                          key="deleteDay"
                          type="primary"
                          size="small"
                          onClick={(e) => {handleDeleteDay(e, day.dayId)}}
                      >
                          <DeleteOutlined  />
                      </Button>
                      <Button 
                          style={{ marginTop: "10px", marginLeft: "5px" }}
                          key="addDay"
                          type="primary"
                          size="small"
                          onClick={(e) => {handleAddDay(e, day.dayId)}}
                      >
                          <PlusSquareOutlined />
                      </Button>
                  </div>
              }>
                <List.Item.Meta
                    avatar={<Avatar size={30} src={sunlight} />}
                    title={<p>{"day " + (index + 1)}</p>}
                    />                 
              </List.Item>
              <DailyBox day={day.dayId} places={day.placesArr} addPlace={handleAddPlace} deletePlace={handleDeletePlace} drop={drop} dragEnter={dragEnter} dragStart={dragStart}/>
            </div>
          )}
        />
        <hr/>
        <SaveButton dayList={dayList} />
      </div>
      }
      </>
  )
}

export default DayGallery;


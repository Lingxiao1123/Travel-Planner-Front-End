import { Button, List, Card } from 'antd'
import React, { Component } from 'react'

import { getPlaceDetails} from "./Map";

class PlaceList extends Component {

    state = {
        // selectedPlace:{},
        // show:false,
        photos: '',
        website: '',
        placeIntro: ""
    }

    onClick = (e, item) => {
        e.stopPropagation();
        this.props.getSelectedPlace(item);
    }

    handleClick = (item) => {
        this.props.getSelectedPlace(item);
    }

    showDetails = async (item) => {
        // this.setState({show:true});
        this.props.handleShow(item);
        // this.setState({selectedPlace:item});
        const result = await getPlaceDetails(item);
        // console.log(result);
        this.setState({
            website:result.website
        })
        if (result.photos ) {
            // console.log(result.photos[0].getUrl());
            this.setState({
                photos: result.photos[0].getUrl()
            })
        }
        const intro = this.getPlaceIntro(result, item);
        this.setState({
            placeIntro: intro
        });   
    }

    goBack = () => {
        // this.setState({show:false});
        this.props.handleShowBack();
    }

    addOrRemove = (item, status, list) => {

        const found = list.some( entry => entry.id === item.id);
        if(!found && status) {
            list = [...list, item];
        }
        if(found && !status) {
            list = list.filter( entry=> entry.id !== item.id);
        }

        return list;
    }

    //从google API拿来selectedplace的photos，reviews， website，phone number， close time

    getPlaceIntro = (result, item) => {
        return (
                <div>
                    <div><hr color='white'></hr></div>
                    <div className="place-intro">
                        <div className="icon icon-${type}">
                            <p><i className="material-icons">Type: {item.category}</i></p>
                        </div>
                        {/* <p class="place-name">{result.name}</p> */}
                    </div>
                        <p><i className="place-address">Address: </i> {result.formatted_address}</p>
                    <div className="place-contact">
                        <p><i className="material-icons">Local_phone: </i> {result.formatted_phone_number}</p>
                        <p><i className="material-icons">Description: </i>{item.intro}</p>
                        <p><i className="material-icons">website: </i><a src={result.website}>{result.website}</a></p>
                    </div>
                </div>
                )
      }


    render () {

        const { isPlanVisible, placelist, showCard, selectedPlace } = this.props;
        //console.log(placelist);
        const { photos, placeIntro } = this.state;

        const {Meta} = Card;        

        return (
            <>
            {
                // show ?
                showCard?                
                <Card
                    cover={
                        <img src = {photos}/>
                    }
                >
                    <Meta 
                        title={<>
                                <p>{selectedPlace.name}</p>
                                </>}
                    />
                    <Button type='primary'
                                        className='back'
                                        onClick={this.goBack}
                                >
                                back   </Button>
                    {isPlanVisible? null : <Button type="primary" 
                                        className='add'
                                        onClick={
                                            () => this.handleClick(selectedPlace)
                                        }
                                >+</Button>}
                    {placeIntro}
                </Card>              
                :
                <List
                className='placelist'
                itemLayout='horizontal'
                size='medium'
                dataSource={placelist}
                renderItem={(item) => (
                    <List.Item
                        className='detail'
                        onClick={()=>this.showDetails(item)}
                        actions={isPlanVisible?null : [<Button type="primary" 
                        onClick={
                            (e) => this.onClick(e, item)
                        }
                        >+</Button>]}

                    >
                        <List.Item.Meta 
                            title={<p>{item.name}</p>}
                            description={`${item.address}`}
                        />
                    </List.Item>
                )}
            />
            }
            </>
        )
    }
}

export default PlaceList
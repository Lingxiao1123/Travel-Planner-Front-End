import React, { Component } from 'react'
import {Button, Modal, Form, Input, message} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { savePlan } from "../utils";

class SaveButton extends Component {
    state = {
        displayModal: false
    }
    saveOnClick = () => {
        this.setState({displayModal: true})
    }
    handleCancel = () => {
        this.setState({displayModal: false})
    }
    onFinish = (data) => {
        // console.log('Received values of form', values);
        //1.collect all values
        //2. send save request to the server
        //3. analyze the response from the server
        //case1: success
        //case2: fail        
        const { dayList } = this.props;
        if (dayList[0].placesArr.length == 0) {
            alert("please add places");
            return;
        }
        console.log(dayList);
        const route = [];
        for (let i = 0; i < dayList.length; i++) {
            // console.log(dayList[i]);
            const tmp = [];
            for (let j = 0; j < dayList[i].placesArr.length; j++) {
                // console.log(dayList[i].placesArr[j].place_id);
                tmp.push(dayList[i].placesArr[j].place_id);
            }
            route.push(tmp);
            // console.log(route);
        }

        console.log(route)

        const tripObj = {
          name: data.planName,
          route: route,
          routeString: ""
        }
        console.log(tripObj);
        
        savePlan(tripObj)
        .then(() => {
            this.setState({
                displayModal: false,
            });
            message.success(`Successfully saved`);
        })
        .catch((err) => {
            message.error(err.message);
        });
    }


    render () {
        return (
            <>
                <Button shape="round" type="primary" onClick={this.saveOnClick}>
                    save
                </Button>
                <Modal 
                    title="please input your plan name" 
                    open={this.state.displayModal} 
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    
                <Form
                    name="normal_register"
                    onFinish={this.onFinish}
                    preserve={false}
                >
                    <Form.Item
                        name="planName"
                        rules={[
                            { required: true, message: "Please input your first name!" },
                        ]}
                        >
                        <Input placeholder="your plan name" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" shape="round" >
                                save
                        </Button>
                    </Form.Item>
                </Form>
                </Modal>
            </>
        )
    }
}

export default SaveButton
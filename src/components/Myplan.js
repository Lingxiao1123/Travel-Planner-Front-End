import { Button, Drawer, List, message, Typography } from "antd";
import { useState, useEffect } from "react";
import { getPlan } from "../utils";

const { Text } = Typography;

function Myplan(props) {
  const [planVisible, setPlanVisible] = useState(false);
  const [planData, setPlanData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!planVisible) {
      return;
    }

    setLoading(true);
    getPlan()
      .then((data) => {
        setPlanData(data);
        console.log(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [planVisible]);

  const onCloseDrawer = () => {
    setPlanVisible(false);
  };

  const onOpenDrawer = () => {
    setPlanVisible(true);
  };

  const showPlan = (plan) => {
    //把这个plan的数据传给app， app再把数据传给home，home再给daybox，placelist和map
    //是一个obj，里面有name和route
    // console.log(plan)
    props.getPlan(plan);
    onCloseDrawer();
  }

 
  return (
    <>
    <Button type="primary" shape="round" onClick={onOpenDrawer} className="myplan">
      myplans
    </Button>
    <Drawer
      title="My Plans"
      onClose={onCloseDrawer}
      open={planVisible}
      width={520}
    >
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={planData}
        renderItem={(plan) => (
          <List.Item 
            onClick={() => showPlan(plan)}
          >
            <List.Item.Meta
              title={plan.name}
              // description={`$${item.price}`}
            />
          </List.Item>
        )}
      />
    </Drawer>
  </>
  )
  
}

export default Myplan;
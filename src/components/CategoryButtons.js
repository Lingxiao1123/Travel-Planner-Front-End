import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const options = ['sight', 'hotel', 'restaurant'];
//const defaultCheckedList = ['scenic spot'];
function CategoryButtons (props) {

  //const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onShowSearch = () => {
    props.onSearch(checkedList)
  }

  
  return (
    <>
      <CheckboxGroup options={options} value={checkedList} onChange={onChange} />
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Select all
      </Checkbox>
      <Button type='primary' onClick={onShowSearch}>Search</Button>
    </>
  );
};

export default CategoryButtons;
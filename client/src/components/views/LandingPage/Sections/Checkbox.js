import React from 'react'
import {Collapse, Checkbox} from 'antd';

const {Panel} = Collapse;

  function checkBox(props) {
    // props.list 가 존재하면 loop
    const renderCheckboxLists = () => props.list && props.list.map((value,index) => (
        <React.Fragment key={index}>
            <Checkbox onChange>
                <span>{value.name}</span>
            </Checkbox>
        </React.Fragment>
    ))

    return (
        <div>
             <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="This is panel header 1" key="1">    
                    {renderCheckboxLists()}
                    
                </Panel>
            </Collapse>
        </div>
    )

  }

export default checkBox
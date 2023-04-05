import { Card, Col, Row } from 'antd'
import React from 'react'

import { ExclamationCircleOutlined } from '@ant-design/icons'

const CardCustom = ({myProp: props}: any) => {
  return (
    <Card style={{width: '300px', padding: "12px"}}>
        <Col>
            <Row style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center', paddingBottom: '12px'}}>
                <p style={{fontSize: '16px', fontWeight: '500', color: 'black'}}>{props.title}</p>
                <ExclamationCircleOutlined onClick={props.onClick} />
            </Row>
            <Row style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                {props.icon}
                <div style={{fontSize: '32px', fontWeight: 700, color: props.contentColor}}>
                    {props.content}
                </div>
            </Row >
        </Col>
    </Card>
  )
}

export default CardCustom
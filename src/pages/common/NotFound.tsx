import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <Result
        status="404"
        title={<p style={{ fontSize: '48px', fontWeight: '600', margin: '0px' }}>404</p>}
        subTitle="Sorry, the page you visited does not exits."
        extra={
            <Button type='primary' onClick={() => navigate("/")}>
                Back Home
            </Button>
        }
    />
  )
}

export default NotFound
import React, { useState } from 'react'
import './Login.scss';
import { Col, Row, Form, Input, Button } from 'antd'



const Login = () => {

  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value})
  }

  return (
    <>
      <Row>
        <Col span={12} className='img'></Col>
        <Col span={12} className='content'>
          <Col className='content-form'>
            <h2 className='text-title'>
              Sign In with HK Solution
            </h2>
            <Form layout='vertical'>
              <Form.Item 
                label='Email' 
                name="email"
                rules={[
                  {
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input className='myInput' placeholder="Enter your email" size='large' onChange={handleChangeInput} value={email} name="email"/>
              </Form.Item>
              <Form.Item 
                label='Password' 
                name="password"
                rules={[
                  {
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password placeholder="Enter your password" size='large' onChange={handleChangeInput} value={password} name="password"/>
              </Form.Item>
            </Form>
            <p className='forgot-password' style={{color: '#1C6758', fontSize: '12px', display: 'flex', justifyContent: 'flex-end'}}>Forgot Password?</p>
            <Button block id='common-button' size='large'
              disabled = {email && password ? false : true}>
              LOGIN
            </Button>
          </Col>
        </Col>
      </Row>
    </>
  )
}

export default Login

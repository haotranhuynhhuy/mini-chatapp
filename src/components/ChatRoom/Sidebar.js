import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import RoomList from './RoomList'
import UserInfor from './UserInfor'


const SidebarStyled = styled.div`
    background: #3f0e40;
    color: #fff;
    height: 100vh
`
const Sidebar = () => {
    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <UserInfor />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </SidebarStyled>
    )
}

export default Sidebar
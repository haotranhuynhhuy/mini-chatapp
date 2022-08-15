import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd'
import React, { useContext } from 'react'
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header, p {
            color: white;
        }
        .ant-collapse-content-box {
            padding: 0 40px;
        }
        .add-btn{
            color: white;
            padding:0
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    color: white;
    margin-bottom: 5px
`

const RoomList = () => {
    const { rooms, setIsVisibleModal, setSelectedRoomId } = useContext(AppContext);
    const handleAddButton = () =>{
        setIsVisibleModal(true);
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled key={1} header="Danh sach room">
                {
                    rooms.map(item => <LinkStyled key={item.id} onClick={()=>setSelectedRoomId(item.id)} >{item.name}</LinkStyled>)
                }
                <Button
                    type='text'
                    icon={<PlusSquareOutlined />}
                    className="add-btn"
                    onClick={handleAddButton}
                    >Add Room</Button>
            </PanelStyled>
        </Collapse>
    )
}

export default RoomList
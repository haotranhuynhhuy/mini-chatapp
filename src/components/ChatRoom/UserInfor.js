import { Avatar, Button, Typography} from 'antd'
import React, { useContext} from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../Context/AuthProvider';
import { auth} from '../firebase/config';
const {Text} = Typography
const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82,38,83);

    .userName {
        color: white;
        margin-left: 5px;
    }
`;
const UserInfor = () => {

    const user = useContext(AuthContext);
    const {displayName, photoURL } = user;
    return (
        <WrapperStyled>
                <div>
                    <Avatar src={photoURL} >{photoURL?'':displayName.charAt(0).toUpperCase()}</Avatar>
                    <Text className='userName'>{displayName}</Text>
                </div>
                <Button ghost onClick={()=> auth.signOut()}>Log out</Button>
        </WrapperStyled>
    )
}

export default UserInfor
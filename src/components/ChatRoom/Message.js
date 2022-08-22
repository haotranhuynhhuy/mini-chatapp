import { Avatar, Image, Typography} from 'antd'
import { formatRelative } from 'date-fns'
import React from 'react'
import styled from 'styled-components'
const WrapperStyled = styled.div`
    margin-bottom: 10px;

    .displayName{
        font-weight:bold;
        margin-left: 5px;
    }

    .createAt{
        margin-left: 10px;
        color: #a7a7a7;
        font-size: 11px;
    }

    .content{
        margin-left:30px
    }
`
const formatDate = (seconds) =>{
    let formatDate = ''

    if(seconds) {
        formatDate = formatRelative(new Date(seconds * 1000), new Date());

        formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    }
    return formatDate;
}

const Message = ({ text, displayName, photoURL, createAt, image}) => {
    return (
        <WrapperStyled>
        <div>
            <Avatar size={'small'} src={photoURL}>{photoURL? '' : displayName.charAt(0).toUpperCase()}</Avatar>
            <Typography.Text className='displayName'>{displayName}</Typography.Text>
            <Typography.Text className='createAt'>{formatDate(createAt?.seconds)}</Typography.Text>
        </div>
        <div>
            <Typography.Text className='content'>{text? text : <Image src={image} width={200} />}</Typography.Text>
        </div>
    </WrapperStyled>
       
    )
}

export default Message
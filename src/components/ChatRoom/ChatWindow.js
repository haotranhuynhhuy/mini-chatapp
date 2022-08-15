import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Tooltip, Input, Alert } from 'antd'
import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import useFirestore from '../../hooks/useFirestore'
import { addDocument } from '../firebase/services'
import Message from './Message'
const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);
    padding: 12px 16px;
    height: 57px;
    .header{
        &-info{
            display: flex;
            flex-direction: column;
            justify-content:center;
        }

        &-title{
            margin:0;
            font-weight: bold;
        }
        &-description{
            font-size: 12px;
        }
    }
`
const ButtonGroupStyled = styled.div`
    display:flex;
    align-items: center;
`
const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 11px;
    height: calc(100vh - 57px)
`
const FormStyled = styled(Form)`
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item{
        flex: 1;
        margin-bottom: 0;
    }
`
const MessageStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`
const WrappedStyled = styled.div`
    height: 100vh;
`
const ChatWindow = () => {
    const { selectedRoom, members, setIsInviteVisibleModal } = useContext(AppContext);
    const user = useContext(AuthContext);

    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState('')
    const handleInputChange = (e) =>{
        setInputValue(e.target.value)
    }
    const handleSubmit = () =>{
        addDocument('messages',{
            text: inputValue,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectedRoom.id,
            displayName: user.displayName
        })

        form.resetFields(['messages']);
    }
    
    const messagesCondition = useMemo(()=>{
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom.id
        }
    },[selectedRoom.id])

    const messages = useFirestore('messages',messagesCondition);
    console.log(messages);
    return (
        <WrappedStyled>
            {
                selectedRoom.id ? (
                    <>
                        <HeaderStyled>
                            <div className='header-info'>
                                <p className='header-title'>{selectedRoom.name}</p>
                                <span className='header-description'>{selectedRoom.description}</span>
                            </div>
                            <ButtonGroupStyled>
                                <Button
                                    icon={<UserAddOutlined />}
                                    type='text'
                                    onClick={() => setIsInviteVisibleModal(true)}
                                >
                                    Invite
                                </Button>

                                <Avatar.Group size={'small'} maxCount={2}>
                                    {
                                        members.map((member) => {
                                            return (
                                                <Tooltip title={member.displayName} key={member.id}>
                                                    <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName.charAt(0)}</Avatar>
                                                </Tooltip>
                                            )
                                        })
                                    }
                                </Avatar.Group>
                            </ButtonGroupStyled>
                        </HeaderStyled>

                        <ContentStyled>
                            <MessageStyled>
                               {
                                messages.map(message=>{
                                    return(
                                        <Message 
                                        key={message.id}
                                        text={message.text}
                                        displayName= {message.displayName}
                                        photoURL={message.photoURL}
                                        createAt={message.createAt}
                                        />
                                    )
                                })
                               }
                            </MessageStyled>
                            <FormStyled form={form} name='messages'>
                                <Form.Item>
                                    <Input 
                                    bordered={false} 
                                    autoComplete='off' 
                                    onChange={handleInputChange}
                                    onPressEnter={handleSubmit}
                                    />
                                </Form.Item>
                                <Button type='primary' onClick={handleSubmit}>Send</Button>
                            </FormStyled>
                        </ContentStyled>
                    </>
                ) : (<Alert message='Select room to chat' type='info' showIcon closable />)
            }
        </WrappedStyled>
    )
}

export default ChatWindow
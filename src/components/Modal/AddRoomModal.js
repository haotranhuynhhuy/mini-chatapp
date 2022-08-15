import { Form, Input, Modal } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import { addDocument } from '../firebase/services'


const AddRoomModal = () => {
    const { isVisibleModal, setIsVisibleModal } = useContext(AppContext);
    const user = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleCancel = () => {
        form.resetFields();
        setIsVisibleModal(false);
    }
    const handleOk = () => {

        addDocument('rooms',{
            ...form.getFieldValue(),
            members: [user.uid]
        })
        form.resetFields();
        setIsVisibleModal(false);
    }

    return (
        <div>
            <Modal
                title="Create Room"
                visible={isVisibleModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label="Room name" name='name'>
                        <Input placeholder='Enter room name' />
                    </Form.Item>
                    <Form.Item label='Room description' name='description'>
                        <Input.TextArea placeholder='Enter room description' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddRoomModal
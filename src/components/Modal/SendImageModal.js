import { Form, Input, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider';
import { storage } from '../firebase/config';
import { addDocument } from '../firebase/services';

const SendImageModal = () => {
    const { selectedRoom, isImageVisibleModal, setIsImageVisibleModal } = useContext(AppContext);
    const user = useContext(AuthContext);
    const [form] = Form.useForm();

    const [imageUpload, setImageUpload] = useState(null);

    const handleCancel = () => {
        form.resetFields();
        setIsImageVisibleModal(false);
    }

    const handleOk = () => {
        const imageRef = storage.ref(`images/${selectedRoom.id}/${imageUpload.name}`);

       imageRef.put(imageUpload)
            .then((res) => {
                res.ref.getDownloadURL().then(url => {
                    addDocument('messages', {
                        imageUrl: url,
                        uid: user.uid,
                        photoURL: user.photoURL,
                        roomId: selectedRoom.id,
                        displayName: user.displayName
                    })
                })
            });

        form.resetFields();
        setIsImageVisibleModal(false);
    }
    return (
        <div>
            <Modal
                title="Select Image"
                visible={isImageVisibleModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Input
                        placeholder='Enter room name'
                        type={'file'}
                        onChange={e => setImageUpload(e.target.files[0])} />
                </Form>
            </Modal>
        </div>
    )
}

export default SendImageModal
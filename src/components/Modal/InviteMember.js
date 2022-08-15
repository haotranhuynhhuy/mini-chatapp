
import { Avatar, Form, Modal, Select, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../firebase/config';

function DebounceSelect({
    fetchOptions,
    debounceTimeout = 700,
    curMembers,
    ...props
}) {

    // Searching

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, props.curMembers]);

    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);


    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option
                    key={opt.value}
                    value={opt.value}
                    title={opt.label}
                >
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

const fetchUserList = async (search, curMembers) => {
    return db.collection('users')
        .where('keywords', 'array-contains', search.toLowerCase())
        .orderBy('displayName')
        .limit(10)
        .get()
        .then((snapshot) => {
            return snapshot.docs.map(doc => ({
                label: doc.data().displayName,
                photoURL: doc.data().photoURL,
                value: doc.data().uid,
            }))
                .filter((opt) => !curMembers.includes(opt.value));
        });
}

const InviteMember = () => {
    const { isInviteVisibleModal, setIsInviteVisibleModal, selectedRoomId, selectedRoom } = useContext(AppContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        //update member in current room
        const memberRef = db.collection('rooms').doc(selectedRoomId);
        memberRef.update({
            members: [...selectedRoom.members, ...value.map(item => item.value)]
        })
        form.resetFields();
        setValue([]);
        setIsInviteVisibleModal(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setValue([]);
        setIsInviteVisibleModal(false);
    }
    return (
        <div>
            <Modal
                visible={isInviteVisibleModal}
                onOk={handleOk}
                onCancel={handleCancel}
                title='Add user'
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}

export default InviteMember
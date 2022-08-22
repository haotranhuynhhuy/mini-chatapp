import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [isInviteVisibleModal, setIsInviteVisibleModal] = useState(false);
    const [isImageVisibleModal, setIsImageVisibleModal] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const user = useContext(AuthContext);

    const roomCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid,
        }
    }, [user.uid]);

    const rooms = useFirestore('rooms', roomCondition);


    const selectedRoom = useMemo(
        () => rooms.find(item => item.id === selectedRoomId) || {}
        , [selectedRoomId, rooms]);
    
    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        }
    }, [ selectedRoom.members])

    const members = useFirestore('users', userCondition);



    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                selectedRoom,
                isVisibleModal,
                setIsVisibleModal,
                selectedRoomId,
                setSelectedRoomId,
                isInviteVisibleModal, 
                setIsInviteVisibleModal,
                isImageVisibleModal, 
                setIsImageVisibleModal
            }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
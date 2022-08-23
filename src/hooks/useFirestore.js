import { useEffect, useState } from 'react'
import { db } from '../components/firebase/config'

const useFirestore = (collection, condition = {}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt');

        if (collection) {
            if (!condition.compareValue|| condition.compareValue.length === 0) {
                setData([]);
                return;
            }
            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            )
        }

        const unsubsribe = collectionRef.onSnapshot((snapshot) => {
            const rooms = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setData(rooms);
        });

        return ()=>unsubsribe;
    }, [collection, condition]);
    return data;
}

export default useFirestore;
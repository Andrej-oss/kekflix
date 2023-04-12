import {useEffect, useState} from "react";
import {Movie} from "../../models/movie";
import {collection, DocumentData, onSnapshot} from "@firebase/firestore";
import {db} from "../../firebase";

function UserList(uid: string | undefined) {
    const [movieList, setMovieList] = useState<Movie[] | DocumentData[]>();

    useEffect(() => {
        if (!uid) return;

        return onSnapshot(collection(db, "customer", uid, "myList"),
            (snapshot) => setMovieList(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })));
    }, [db, uid])

    return movieList;
}

export default UserList;
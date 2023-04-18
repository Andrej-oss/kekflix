import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    getDocumentaryMoviesSuccess,
    getDocumentaryMoviesFailure,
    getDocumentaryMoviesStart,
    useGetDocumentaryMoviesQuery
} from "../../services/api/documentaryMovies.api";
import {useEffect} from "react";

function useDocumentaryMovies({page}: {page: number}) {
    const dispatch = useDispatch();
    const documentaryMovies = useSelector<RootState>(state => state.documentaryMovies);

    const {data, isFetching, isSuccess, isError, error, isLoading} = useGetDocumentaryMoviesQuery({page});

    useEffect(() => {
        // Обработка статусов запроса и диспатч соответствующих действий
        if (isFetching) {
            dispatch(getDocumentaryMoviesStart());
        } else if (isSuccess) {
            debugger
            dispatch(getDocumentaryMoviesSuccess({results: data?.results, page: data?.page, total_pages: data?.total_pages}));
        } else if (isError) {
            dispatch(getDocumentaryMoviesFailure(error));
        }
    }, [isFetching, isSuccess, isError, error, data, page, dispatch])

    return {documentaryMovies, isFetching, isError, error, isLoading};
}

export default useDocumentaryMovies;
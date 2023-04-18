import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    getActionMoviesFailure,
    getActionMoviesStart,
    getActionMoviesSuccess,
    useGetActionMoviesQuery
} from "../../services/api/actionMovies.api";
import {useEffect} from "react";

function useActionMovies({page}: {page: number}) {
    const dispatch = useDispatch();
    const actionMovies = useSelector<RootState>(state => state.actionMovies);

    const {data, isFetching, isSuccess, isError, error, isLoading} = useGetActionMoviesQuery({page});

    useEffect(() => {
        // Обработка статусов запроса и диспатч соответствующих действий
        if (isFetching) {
            dispatch(getActionMoviesStart());
        } else if (isSuccess) {
            debugger
            dispatch(getActionMoviesSuccess({results: data?.results, page: data?.page, total_pages: data?.total_pages}));
        } else if (isError) {
            dispatch(getActionMoviesFailure(error));
        }
    }, [isFetching, isSuccess, isError, error, data, page, dispatch])

    return {actionMovies, isFetching, isError, error, isLoading};
}

export default useActionMovies;
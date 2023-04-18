import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    getComedyMoviesFailure,
    getComedyMoviesStart,
    getComedyMoviesSuccess,
    useGetComedyMoviesQuery
} from "../../services/api/comedyMovies.api";
import {useEffect} from "react";

function useComedyMovies({ page }:  { page: number }) {
    const dispatch = useDispatch();
    const comedyMovies = useSelector<RootState>(state => state.comedyMovies);

    const {data, isFetching, isSuccess, isError, error, isLoading} = useGetComedyMoviesQuery({page});

    useEffect(() => {
        // Обработка статусов запроса и диспатч соответствующих действий
        if (isFetching) {
            dispatch(getComedyMoviesStart());
        } else if (isSuccess) {
            debugger
            dispatch(getComedyMoviesSuccess({results: data?.results, page: data?.page, total_pages: data?.total_pages}));
        } else if (isError) {
            dispatch(getComedyMoviesFailure(error));
        }
    }, [isFetching, isSuccess, isError, error, data, page, dispatch])

    return {comedyMovies, isFetching, isError, error, isLoading};
}

export default useComedyMovies;
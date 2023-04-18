import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    getTrendedMoviesStart,
    getTrendedMoviesFailure,
    getTrendedMoviesSuccess,
    useGetTrendedMoviesQuery
} from "../../services/api/trendMovies.api";

function useTrendedMovies({ page }: { page: number }) {
    const dispatch = useDispatch();
    const trendedMovies = useSelector<RootState>(state => state.trendedMovies);

    const {data, isFetching, isSuccess, isError, error, isLoading} = useGetTrendedMoviesQuery({page});
    useEffect(() => {
        // Обработка статусов запроса и диспатч соответствующих действий
        if (isFetching) {
            dispatch(getTrendedMoviesStart());
        } else if (isSuccess) {
            debugger
            dispatch(getTrendedMoviesSuccess({results: data?.results, page: data?.page, total_pages: data?.total_pages}));
        } else if (isError) {
            dispatch(getTrendedMoviesFailure(error));
        }
    }, [isFetching, isSuccess, isError, error, data, page, dispatch])

    return {trendedMovies, isFetching, isError, error, isLoading};
}

export default useTrendedMovies;
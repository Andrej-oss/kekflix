import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    getTopRateMoviesSuccess,
    getTopRateMoviesFailure,
    getTopRateMoviesStart,
    useGetTopRateMoviesQuery
} from "../../services/api/topRateMovies.api";
import {useEffect} from "react";

function useTopRateMovies({ page }: { page: number }) {
    const dispatch = useDispatch();
    const topRateMovies = useSelector<RootState>(state => state.topRateMovies);

    const {data, isFetching, isSuccess, isError, error, isLoading} = useGetTopRateMoviesQuery({page});
    useEffect(() => {
        // Обработка статусов запроса и диспатч соответствующих действий
        if (isFetching) {
            dispatch(getTopRateMoviesStart());
        } else if (isSuccess) {
            debugger
            dispatch(getTopRateMoviesSuccess({results: data?.results, page: data?.page, total_pages: data?.total_pages}));
        } else if (isError) {
            dispatch(getTopRateMoviesFailure(error));
        }
    }, [isFetching, isSuccess, isError, error, data, page, dispatch])

    return {topRateMovies, isFetching, isError, error, isLoading};
}

export default useTopRateMovies;
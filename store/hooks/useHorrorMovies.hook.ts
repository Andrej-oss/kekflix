import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    getHorrorMoviesStart,
    getHorrorMoviesFailure,
    getHorrorMoviesSuccess,
    useGetHorrorMoviesQuery
} from "../../services/api/horrorMovies.api";
import {useEffect} from "react";

function useHorrorMovies({page}: { page: number }) {
    const dispatch = useDispatch();
    const horrorMovies = useSelector<RootState>(state => state.horrorMovies);

    const {data, isFetching, isSuccess, isError, error, isLoading} = useGetHorrorMoviesQuery({page});

    useEffect(() => {
        // Обработка статусов запроса и диспатч соответствующих действий
        if (isFetching) {
            dispatch(getHorrorMoviesStart());
        } else if (isSuccess) {
            debugger
            dispatch(getHorrorMoviesSuccess({results: data?.results, page: data?.page, total_pages: data?.total_pages}));
        } else if (isError) {
            dispatch(getHorrorMoviesFailure(error));
        }
    }, [isFetching, isSuccess, isError, error, data, page, dispatch])

    return {horrorMovies, isFetching, isError, error, isLoading};
}

export default useHorrorMovies;
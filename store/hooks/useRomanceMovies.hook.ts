import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    useGetRomanceMoviesQuery,
    getRomanceMoviesFailure,
    getRomanceMoviesStart,
    getRomanceMoviesSuccess
} from "../../services/api/romanceMovies.api";
import {useEffect} from "react";

function useRomanceMovies({page}: { page: number }) {
    const dispatch = useDispatch();
    const romanceMovies = useSelector<RootState>(state => state.romanceMovies);

    const {data, isFetching, isSuccess, isError, error, isLoading} = useGetRomanceMoviesQuery({page});

    useEffect(() => {
        if (isFetching) {
            dispatch(getRomanceMoviesStart());
        } else if (isSuccess) {
            dispatch(getRomanceMoviesSuccess({results: data?.results, page: data?.page, total_pages: data?.total_pages}));
        } else if (isError) {
            dispatch(getRomanceMoviesFailure(error));
        }
    }, [isFetching, isSuccess, isError, error, data, page, dispatch])
    return {romanceMovies, isFetching, isError, error, isLoading};
}

export default useRomanceMovies;
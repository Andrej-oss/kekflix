import Head from "next/head"
import {useRecoilValue} from "recoil";
import {Banner, CardContent, Header, Modal, Plans} from "../components/index";
import useAuth from "../store/hooks/useAuth";
import {modalState, movieState} from '../atoms/modalAtom';
import {useSubscription} from "../store/hooks/useSubscription";
import userList from "../store/hooks/userList";
import {useState} from "react";
import useTrendedMovies from "../store/hooks/useTrendedMovies.hook";
import useTopRateMovies from "../store/hooks/useTopRateMovies.hook";
import useActionMovies from "../store/hooks/useActionMovies.hook";
import useComedyMovies from "../store/hooks/useComedyMovies.hook";
import useHorrorMovies from "../store/hooks/useHorrorMovies.hook";
import useRomanceMovies from "../store/hooks/useRomanceMovies.hook";
import useDocumentaryMovies from "../store/hooks/useDocumentaryMovies.hook";

const Home = () => {
    const [page, setPage] = useState<number>(1);
    const [topRatedPage, setTopRatedPage] = useState<number>(1);
    const [actionPage, setActionPage] = useState<number>(1);
    const [comedyPage, setComedyPage] = useState<number>(1);
    const [horrorPage, setHorrorPage] = useState<number>(1);
    const [romancePage, setRomancePage] = useState<number>(1);
    const [documentaryPage, setDocumentaryPage] = useState<number>(1);
    const handlePageChange = (nextPage: number) => {
            setPage(nextPage);
    }
    const handleTopRatePageChange = (nextPage: number) => {
      setTopRatedPage(nextPage);
    }
    const handleActionPageChange = (nextPage: number) => {
        setActionPage(nextPage);
    }
    const handleComedyPageChange = (nextPage: number) => {
        setComedyPage(nextPage);
    }
    const handleHorrorPageChange = (nextPage: number) => {
        setHorrorPage(nextPage);
    }
    const handleRomancePageChange = (nextPage: number) => {
        setRomancePage(nextPage);
    }
    const handleDocumentaryPageChange = (nextPage: number) => {
        setDocumentaryPage(nextPage);
    }
    const { trendedMovies, isError, isFetching, error, isLoading: isLoadingTrending } = useTrendedMovies({page});
    const { topRateMovies, isError: isTopRateMovieError, isFetching: isFetchinTopRateMovies,
        error: topRateMovieError, isLoading: isLoadingTopRateMovies } = useTopRateMovies({page: topRatedPage});
    const { actionMovies, isError: isActionMovieError, isFetching: isFetchinActionMovies,
        error: actionMovieError, isLoading: isLoadingActionMovies } = useActionMovies({page: actionPage});
    const { comedyMovies, isError: isComedyError, isFetching: iseComedyMoviesError,
        error: ComedyError, isLoading: isLoadingComedyMovies } = useComedyMovies({page: comedyPage});
    const { horrorMovies, isError: isHorrorMoviesError, error: horrorMoviesError,
        isFetching: isFetchingHorrorMovies, isLoading: isLoadingHorrorMovies } = useHorrorMovies({page: horrorPage});
    const { romanceMovies, isLoading: isLoadingRomanceMovies, isError: isRomanceMoviesError,
    isFetching: isFetchingRomanceMovies, error: romanceMoviesError } = useRomanceMovies({page: romancePage});
    const { documentaryMovies, isLoading: isLoadingDocMovies, isError: isDocMoviesError,
        isFetching: isFetchingDocMovies, error: romanceDocError } = useDocumentaryMovies({page: documentaryPage});

    // const {data: romanceMovies, isLoading: isLoadingRomance} = movieHook.useGetRomanceMoviesQuery();
    // @ts-ignore
    const { user } = useAuth();
    const showModal = useRecoilValue(modalState);
    const subscriptions = useSubscription(user);
    const isSubscription = !!subscriptions.length;
    const movie = useRecoilValue(movieState);
    const myList = userList(user?.uid);
    // if (loading || !subscription) return 'loading...';
    if (!isSubscription) return <Plans/>

    return (
        <div className={`relative h-screen bg-gradient-to-b  lg:h-[150vh] ${showModal && '!h-screen overflow-hidden'}`}>
            <Head>
                <title>kekflix</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className="pl-4 pb-20 lg:space-y-24 lg:pl-16 lg:py-10">
                {!isLoadingTrending && trendedMovies && <Banner netflixOriginals={trendedMovies.results}/>}
                <section className="space-y-24">
                    {!isLoadingTrending && trendedMovies &&
                        <CardContent title="Trending Now" movies={trendedMovies.results} page={page} handlePageChange={handlePageChange}/>}
                    {topRateMovies && !isLoadingTopRateMovies &&
                        <CardContent page={topRatedPage} handlePageChange={handleTopRatePageChange} title="Top Rated" movies={topRateMovies.results}/>}
                    {!isLoadingActionMovies && actionMovies &&
                        <CardContent page={actionPage} handlePageChange={handleActionPageChange} title="Action Thrillers" movies={actionMovies.results}/>}
                    {/*/!* My List *!/*/}
                    {/*{!!myList && <CardContent title={"My List"} movies={myList} />}*/}
                    {!isLoadingComedyMovies && comedyMovies &&
                        <CardContent page={comedyPage} handlePageChange={handleComedyPageChange} title="Comedies" movies={comedyMovies.results}/>}
                    {!isLoadingHorrorMovies && horrorMovies &&
                        <CardContent page={horrorPage} handlePageChange={handleHorrorPageChange} title="Scary Movies" movies={horrorMovies.results}/>}
                    {!isLoadingRomanceMovies && romanceMovies &&
                        <CardContent page={romancePage} handlePageChange={handleRomancePageChange} title="Romance Movies" movies={romanceMovies.results}/>}
                    {!isLoadingDocMovies && documentaryMovies &&
                        <CardContent page={documentaryPage} handlePageChange={handleDocumentaryPageChange} title="Documentaries" movies={documentaryMovies.results}/>}
                </section>
            </main>
            {showModal && <Modal/>}
        </div>
    )
}

export default Home;

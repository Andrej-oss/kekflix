import {CheckIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon} from "@heroicons/react/outline";
import MuiModal from "@mui/material/modal";
import {useEffect, useState} from "react";
import {FaPause, FaPlay} from "react-icons/fa";
import ReactPlayer from "react-player";
import {useRecoilState} from "recoil";
import {modalState, movieState} from "../atoms/modalAtom";
import {Element} from "../models/Element";
import {Genre} from "../models/genre";
import {deleteDoc, doc, setDoc} from "@firebase/firestore";
import {db} from "../firebase";
import useAuth from "../store/hooks/useAuth";
import {toast, Toaster} from "react-hot-toast";

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [movie, setMovie] = useRecoilState(movieState);
    const [trailerUrl, setTrailerUrl] = useState<string>('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [muted, setMuted] = useState(false);
    const [paused, setPaused] = useState(true);
    const [addedToList, setAddedToList] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (!movie) {
            return;
        }

        async function getMovieVideo() {
            const movieVideo =
                await fetch(
                    `https://api.themoviedb.org/3/${movie?.media_type === "tv"
                        ? "tv"
                        : "movie"}/${movie?.id}?api_key=${
                        process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}&language=en-US&append_to_response=videos`)
                    .then(data => data.json());
            if (movieVideo?.videos) {
                const trailerIndex = movieVideo.videos.results.findIndex((element: Element) => element.type === 'Trailer');
                setTrailerUrl(movieVideo.videos.results[trailerIndex]?.key);
            }
            if (movieVideo?.genres) {
                setGenres(movieVideo.genres);
            }
        }

        getMovieVideo();
    }, [movie]);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleMovieList = async () => {
        if (addedToList) {
             await deleteDoc(doc(db, "customer", user!.uid, "myList", movie?.id));
            toast(`Movie ${movie?.title} has been removed from my list`, {
                duration: 7000,
            });
        } else {
            await setDoc(doc(db, "customer", user!.uid, "myList", String(movie?.id)), movie);
            toast(`Movie ${movie?.title} has been added to the my list`);
        }
    }

    return (
        <MuiModal open={showModal} onClose={handleClose}
                  className="fixed !top-20 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll no-scrollbar rounded-mg"
        >
            <>
                <Toaster position="bottom-center"/>
                <div className="relative pt-[50.25%]">
                    <ReactPlayer
                        style={{position: "absolute", top: 0, left: 0}}
                        url={`https://www.youtube.com/watch?v=${trailerUrl}`}
                        width="100%"
                        height="100%"
                        playsinline={true}
                        muted={muted}
                        playing={paused}
                    />
                    <button onClick={handleClose} className="button-modal absolute right-5 top-5">
                        <XIcon height={16}/>
                    </button>
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button className="flex items-center gap-x-2 rounded
                 bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
                                    onClick={() => setPaused(!paused)}>
                                {paused ? <FaPause className="h-7 w-7 text-black"/> :
                                    <FaPlay className="h-7 w-7 text-black"/>}
                                {paused ? "Pause" : "Play"}
                            </button>
                            <button className="button-modal" onClick={() => setMuted(!muted)}>
                                {addedToList ? (
                                    <CheckIcon className="h-7 w-7"/>
                                ) : (
                                    <PlusIcon
                                        onClick={handleMovieList}
                                        className="h-7 w-7"/>
                                )}
                            </button>
                            <button className="button-modal">
                                <ThumbUpIcon className="h-6 w-6"/>
                            </button>
                        </div>
                        <button className="button-modal" onClick={() => setMuted(!muted)}>
                            {muted ? (
                                <VolumeOffIcon className="h-6 w-6"/>
                            ) : (
                                <VolumeUpIcon className="h-6 w-6"/>
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="font-semibold text-green-400">{movie?.vote_average * 10}% Matches</p>
                            <p className="font-light"> {movie?.release_date || movie?.first_air_date}</p>
                            <div
                                className="flex h-4 items-center justify-center rounded border
                                 border-white/40 px-1.5 text-xs">
                                HD
                            </div>
                        </div>
                        <div className="flex flex-col space-x-10 font-light md:flex-row">
                            <p className="w-5/6">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-[gray]">Genres: </span>
                                    {genres.map(genre => genre.name).join(', ')}
                                </div>
                                <div className="text-[gray]">Original language:
                                    <span>{movie?.original_language}</span>
                                </div>
                                <div>
                    <span className="text-[gray]">Total votes:
                        {movie?.vote_count}
                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
}

export default Modal;
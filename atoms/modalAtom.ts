import firebase from "firebase/compat";
import { atom } from "recoil";
import { Movie } from "../models/movie";
import DocumentData = firebase.firestore.DocumentData;

export const modalState = atom({
  key: 'modalState',
  default: false
})

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null
})
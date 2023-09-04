import axios from "axios";
import { Usuario } from "../models/Usuario";


const API = "http://localhost:4000"

export const getVideos = async () => {
  return await axios.get<Usuario[]>(`${API}/Usuarios`);
};

export const getVideoById = async (id: string) => {
  return await axios.get<Usuario>(`${API}/Usuario/${id}`);
};

export const createNewVideo = async (usuario: Usuario) => {
  return await axios.post(`${API}/Usuarios`,usuario);
};



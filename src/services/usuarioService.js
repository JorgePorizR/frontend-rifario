import axios from "axios";
import { getCommonHeaders, redirectOnError } from "../utils/serviceUtils";

export const createUsuarioParticipante = async (usuario) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_BASE_URL + 'usuariosp', usuario, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const getRifaUsariosNoParticipantes = async (rifaId) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_BASE_URL + 'usuarios/noprifas/' + rifaId, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const getRifaUsuariosNoParticipantesSearch = async (rifaId, search) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_BASE_URL + 'usuarios/noprifas/search/' + rifaId + '?nombre=' + search, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const generarUsuariosGanadores = async (rifaId, body) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_BASE_URL + 'usuarios/partganadores/' + rifaId, body,getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const listaUsuariosGanadores = async (rifaId) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_BASE_URL + 'usuarios/ganadores/' + rifaId, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}
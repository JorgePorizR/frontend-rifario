import axios from "axios";
import { getCommonHeaders, redirectOnError } from "../utils/serviceUtils";

export const getRifaList = async () => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_BASE_URL + 'rifas', getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const getRifaListSearch = async (search) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_BASE_URL + 'rifas/search?nombre=' + search, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });

}

export const getMyRifaList = async () => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_BASE_URL + 'rifas/me', getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const getRifaById = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_BASE_URL + 'rifas/' + id, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const createRifa = async (rifa) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_BASE_URL + 'rifas', rifa, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const updateRifa = async (id, rifa) => {
    return new Promise((resolve, reject) => {
        axios.put(import.meta.env.VITE_BASE_URL + 'rifas/' + id, rifa, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const updateRifaPatch = async (id, rifa) => {
    return new Promise((resolve, reject) => {
        axios.patch(import.meta.env.VITE_BASE_URL + 'rifas/' + id, rifa, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}

export const deleteRifa = async (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(import.meta.env.VITE_BASE_URL + 'rifas/' + id, getCommonHeaders())
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                redirectOnError(error, reject);
            });
    });
}
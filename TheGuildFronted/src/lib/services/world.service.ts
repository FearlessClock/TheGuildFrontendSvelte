import type { Country } from "$lib/types/Country";
import type { Profession } from "$lib/types/Profession";
import {Get, attachAuthToken} from "../api";

export const getCountries = async () => {
    attachAuthToken();
    const getResponse = await Get("country/");
    
    const countries : Country[] = getResponse.data;
    return countries;
};

export const getProfessions = async () => {
    attachAuthToken();
    const getResponse = await Get("professioninformation/");

    const professions : Profession[] = getResponse.data;
    return professions;
};
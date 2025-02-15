import type { Cart } from "$lib/types/CartInformation";
import type { Workshop } from "$lib/types/Workshop";
import {api, attachAuthToken} from "../api";

export const getWorkshops = async (countryId: number) => {
    attachAuthToken();
    const getResponse = await api.get("workshop/country/" + countryId + "/");
    console.log(getResponse);
    const workshop : Workshop = getResponse.data;
    return workshop;
}

export const getCarts = async (workshopId: number) => {
    attachAuthToken();
    const getResponse = await api.get("carts/workshop/" +workshopId+ "/");
    console.log(getResponse);
    const carts : Cart[] = getResponse.data;
    return carts;
};
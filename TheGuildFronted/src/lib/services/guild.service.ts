import {api, attachAuthToken} from "../api";
import type {Workshop} from "../types/Workshop";
import type {Character} from "../types/Character";

export const CreateWorkshop = async (workshop: Workshop) => {
    await api.post("workshop/", workshop);
}

export const CreateCharacter = async (character: Character) => {
    const postRepsonse = await api.post("character/", character);
    console.log(postRepsonse);
}

export const GetCharacters = async () => {
    attachAuthToken();
    const getResponse = await api.get("character/");

    const characters : Character[] = getResponse.data;
    console.log(characters);
    return characters;
}
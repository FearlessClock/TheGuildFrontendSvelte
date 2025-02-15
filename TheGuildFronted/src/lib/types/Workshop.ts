import type { Character } from "./Character"
import type { Profession } from "./Profession"

export type Workshop ={
    name: string,
    profession: Profession
    building: string
    character: Character
}

export type WorkshopCreation ={
    name: string,
    profession: Profession
    character: Character
}
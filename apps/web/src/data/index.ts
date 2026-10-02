import data from "./static-data.json";

export type NewsItem = (typeof data.news)[number];
export type TipItem = (typeof data.tips)[number];
export type VehicleItem = (typeof data.vehicles)[number];
export type CharacterItem = (typeof data.characters)[number];
export type LocationItem = (typeof data.locations)[number];
export type WeaponItem = (typeof data.weapons)[number];

export const NEWS: NewsItem[] = data.news as NewsItem[];
export const TIPS: TipItem[] = data.tips as TipItem[];
export const VEHICLES: VehicleItem[] = data.vehicles as VehicleItem[];
export const CHARACTERS: CharacterItem[] = data.characters as CharacterItem[];
export const LOCATIONS: LocationItem[] = data.locations as LocationItem[];
export const WEAPONS: WeaponItem[] = data.weapons as WeaponItem[];

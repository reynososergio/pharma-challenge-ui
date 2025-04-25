import { atom } from "jotai";

export const filtersAtom = atom<Record<string, string | boolean | Date>>({});

import { translateLang } from "./Constant";

export function translator(langPref, key) {
    return translateLang[langPref]?.[key] || key;
}

export const toastVisibilty = { closeOnClick: true, autoClose: 2000 };
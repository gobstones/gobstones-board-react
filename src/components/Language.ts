import i18n from "../i18n.js";

export type LanguageStringType = "en" | "es"

export function changeLenguage(lng : LanguageStringType) {
    if (lng !== i18n.language)
      i18n.changeLanguage(lng);
};
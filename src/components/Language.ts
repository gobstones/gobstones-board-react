import i18n from "i18next";

export type LanguageStringType = "en" | "es"

export function changeLenguage(lng : LanguageStringType) {
    if (lng !== i18n.language)
      i18n.changeLanguage(lng);
};
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './langs/en.json';

Vue.use(VueI18n);

const loadedLanguages = ['en'];

export const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {en},
});

/**
 * update a selected language
 * @param lang
 */
function setI18nLanguage(lang: string) {
    i18n.locale = lang;
    const htmlEl = document.querySelector('html');
    if (htmlEl) {
        htmlEl.setAttribute('lang', lang);
    }
}

/**
 * load dynamically an appropriate language json file
 * after the user changed a language
 * @param lang
 */
export async function loadLanguageAsync(lang: string) {
    if (i18n.locale === lang) {
        return Promise.resolve(lang);
    }
    if (loadedLanguages.indexOf(lang) > -1) {
        return Promise.resolve(setI18nLanguage(lang));
    }
    const msgs = await import(/* webpackChunkName: "lang-[request]" */ `@/assets/i18n/langs/${lang}.json`);
    i18n.setLocaleMessage(lang, msgs.default);
    loadedLanguages.push(lang);
    return Promise.resolve(setI18nLanguage(lang));
}

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import FlagIcon from 'vue-flag-icon'

Vue.use(VueI18n)
Vue.use(FlagIcon)

const messages = {
    'en': {
        buttons: {
            add: "Add",
        },
        siteName: "Library", 
        administration: "Administration",
        users: "Users",
        rbac: "RBAC",
        profile: "Profile",
        logout: "Logout",
        article: {
            settings: "settings",
            articles: "Articles",
            import: "Import",
            languages: "Languages"
        } 
    },
    'uk': {
        buttons: {
            add: "Додати",
        },
        siteName: "Бібліотека", 
        administration: "Управління",
        users: "Користувачі",
        rbac: "RBAC",
        profile: "Профіль",
        logout: "Вихід",
        article: {
            settings: "Налаштування",
            articles: "Статті",
            import: "Імпорт",
            languages: "Мови статтей"
        },
        errors: {
            
        }  
    },
}

const i18n = new VueI18n({
    locale: 'uk',
    fallbackLocale: 'en',
    messages
})

export default i18n
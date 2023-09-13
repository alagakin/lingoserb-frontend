import { createI18n } from 'vue-i18n';
import ru from "@/locales/ru.json";
import en from "@/locales/en.json";
const locale= localStorage.getItem('lang');
const i18n = createI18n({
  locale: locale,
  fallbackLocale: "en",
  messages: { ru, en },
});
export default i18n;
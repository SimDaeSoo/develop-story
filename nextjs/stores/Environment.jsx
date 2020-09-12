import { observable, action } from 'mobx';
import i18n from '../locales/i18n';
import moment from 'moment';

class Environment {
    @observable query = {};
    @observable size = 'default';

    hydrate = (initializeData) => {
        if (!initializeData) return;
        this.query = initializeData.query || {};
    }

    @action setLangauge(langauge) {
        i18n.changeLanguage(langauge);
        moment.locale(langauge);
    }
}

export default Environment;
import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';

import notifications from '@/store/modules/notifications';
import onlineOffline from '@/store/modules/onlineOffline';
import scrollLock from '@/store/modules/scrollLock';
import newValueModal from '@/store/modules/newValueModal';
import values from '@/store/modules/values';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
    modules: {
        notifications: notifications,
        onlineOffline: onlineOffline,
        scrollLock: scrollLock,
        newValueModal: newValueModal,
        values: values,
    }
});

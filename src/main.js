import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import ProjectList from './components/pages/ProjectList';
import ProjectCreate from './components/pages/ProjectCreate';
import ProjectEdit from './components/pages/ProjectEdit';
import ProjectShow from './components/pages/ProjectShow';

import SoldList from './components/pages/SoldList';

import ItemList from './components/pages/ItemList';
import ItemCreate from './components/pages/ItemCreate';
import ItemEdit from './components/pages/ItemEdit';
import ItemShow from './components/pages/ItemShow';

import ItemTypeList from './components/pages/ItemTypeList';
import ItemTypeCreate from './components/pages/ItemTypeCreate';
import ItemTypeEdit from './components/pages/ItemTypeEdit';
import ItemTypeShow from './components/pages/ItemTypeShow';
  
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = process.env.VUE_APP_API_KEY;
  return config;
});
  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ProjectList },
    { path: '/create', component: ProjectCreate },
    { path: '/edit/:id', component: ProjectEdit },
    { path: '/show/:id', component: ProjectShow },

    { path: '/items', component: ItemList },
    { path: '/items/create', component: ItemCreate },
    { path: '/items/edit/:id', component: ItemEdit },
    { path: '/items/show/:id', component: ItemShow },

    { path: '/item-types', component: ItemTypeList },
    { path: '/create-item-types', component: ItemTypeCreate },
    { path: '/item-types/edit/:id', component: ItemTypeEdit },
    { path: '/item-types/show/:id', component: ItemTypeShow },

    { path: '/transactions-sold', component: SoldList },
  ],
});

library.add(faPhone);
library.add(faSort);
  
createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app');
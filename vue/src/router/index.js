
import { createRouter, createWebHistory } from "vue-router";
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import Surveys from '../pages/Surveys.vue';

const router = createRouter({
    history:createWebHistory(),
    routes:[
        { path:'/register',name:'Register',component:Register},
        { path:'/login',name:'Login',component:Login},
        {
            path:'/',
            redirect:'/dashboard',
            component:DefaultLayout,
            children:[
                { path:'/dashboard',name:'Dashboard',component:Dashboard },
                { path:'/survey',name:'Survey',component:Surveys }
            ]
        }
    ],
});

export default router;
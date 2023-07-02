
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';
import Surveys from '../pages/Surveys.vue';
import store from "../store";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        
        {
            path:'/',
            redirect:'/dashboard',
            component:DefaultLayout,
            meta: {requiresAuth:true},
            children:[
                { path:'/dashboard',name:'Dashboard',component:Dashboard },
                { path:'/survey',name:'Survey',component:Surveys}
            ],
        },
        {
            path:'/auth',
            name:'Auth',
            redirect:'/login',
            component:AuthLayout,
            meta: {requiresAuth:false},
            children:[
                { path:'/register',name:'Register',component:Register},
                { path:'/login',name:'Login',component:Login},
            ]
        }
    ],
});

export default router;

router.beforeEach( (to,from,next)=>{
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name:'Login'});
    }else if( !to.meta.requiresAuth && store.state.user.token ){
        next({name:'Dashboard'});
    }else{
        next();
    }
})

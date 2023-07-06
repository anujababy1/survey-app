import { createStore } from 'vuex';
import axiosClient from "../axios";


const store = createStore({
    state(){
        return {
            user:{
                data:{
                    // name: 'Tom Cook',
                    // email: 'tom@example.com',
                    // imageUrl:
                    //   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                token:sessionStorage.getItem('token'),
            },
            surveys:{
              loading:false,
              data:[],
              links:[],
            },
            questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
            currentSurvey:{
              loading:false,
              data:{}
            }
        }
    },
    getters: {

    },
    mutations: { 
        logout(state){
            state.user.data ={};
            state.user.token =null;
            sessionStorage.clear();
        },
        setUser(state,obj){
            state.user.data = obj.user;
            state.user.token = obj.token;
            sessionStorage.setItem('token', obj.token);
        },
        saveSurvey(state,obj){
          state.surveys.data = [...state.surveys.data,obj.data];
        },
        // updateSurvey(state,obj){
        //   state.surveys = state.surveys.map((survey)=>{
        //     if(survey.id === obj.data.id){
        //       return obj.data
        //     }
        //     return survey;
        //   })
        // },
        setCurrentSurveyLoading(state,value){
          state.currentSurvey.loading = value;
        },
        setCurrentSurvey: (state, survey) => {
          state.currentSurvey.data = survey.data;
          //console.log(state.currentSurvey);
        },
        setSurveysLoading(state,value){
          state.surveys.loading = value;
        },
        getSurveys(state,surveys){
         
          state.surveys.data = surveys.data;
          state.surveys.links = surveys.meta.links;
        }
    },
    actions: { 
        // async register(context,user){
        // //     return fetch(`http://127.0.0.1:8000/api/register`, {
        // //     headers: {
        // //     'Content-Type': 'application/json',
        // //     'Accept': 'application/json'
        // //     },
        // //     method: 'POST',
        // //     body: JSON.stringify(user)
        // // }) .then(res => res.json())
        // //     .then(res => {
        // //         //console.log(res);
        // //         // if (!res.ok) {
        // //         //     alert();
        // //         // }
        // //         context.commit('setUser', res);
        // //         return res;
        // //     })

        // const response = await fetch('http://127.0.0.1:8000/api/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        //   });
      
        //   const res = await response.json(); 
        //   if (!response.ok) {
        //     const error = new Error(
        //       res.message || 'Failed to authenticate. Check your login data.'
        //     );
        //     throw error;
        //   }
        //     context.commit('setUser', res);
          
        // },
        async register(context,user){
            const response = await axiosClient.post('/register', user);
            context.commit('setUser', response.data);
        },
        async login(context,user){ 
            const response = await axiosClient.post('/login', user);
            context.commit('setUser', response.data);
        },
        async logout(context){ 
            const response = await axiosClient.post('/logout');
            context.commit('logout');
        },
        async saveSurvey(context,survey){
          delete survey.image_url;
          if(survey.id){
            const response = await axiosClient.put(`/survey/${survey.id}`,survey);
            context.commit('saveSurvey', response.data);
            return response;
          }else{
            const response = await axiosClient.post('/survey',survey);
            context.commit('saveSurvey', response.data);
            return response;
          }
          
        },
        async getSurvey(context,id){
          context.commit('setCurrentSurveyLoading',true);
          try{
            const response = await axiosClient.get(`/survey/${id}`);
            context.commit('setCurrentSurvey', response.data);
          }catch (err) {
        
          }
          context.commit('setCurrentSurveyLoading',false);
        },
        async deleteSurvey(context,id){
          const response = await axiosClient.delete(`/survey/${id}`);
          return response;
        },
        async getSurveys(context,url=null){
          
          url= url?url.url: '/survey';
          context.commit('setSurveysLoading',true);
          try{
            const response = await axiosClient.get(url);
            context.commit('getSurveys', response.data);
          }catch (err) {
        
          }
          context.commit('setSurveysLoading',false);
        }
    },
    
  });

  export default store;
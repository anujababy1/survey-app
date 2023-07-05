import { createStore } from 'vuex';
import axiosClient from "../axios";

const surveys= [
    {
      id: 1,
      title: "TheCodeholic YouTube channel content",
      slug: "thecodeholic-youtube-channel-content",
      status: "draft",
      image_url: 'https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png',
      description: "My name is Zura.<br>I am Web Developer with 9+ years of experience, free educational content creator, CTO, Lecturer and father of two wonderful daughters.<br><br>The purpose of the channel is to share my several years of experience with beginner developers.<br>Teach them what I know and make my experience as a lesson for others.",
      created_at: "2021-12-20 18:00:00",
      updated_at: "2021-12-20 18:00:00",
      expire_date: "2021-12-31 18:00:00",
      questions: [
        {
          id: 1,
          type: 'select',
          question: 'Select your country?',
          description: null,
          data: {
            multiple: false,
            options: [
              {uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA'},
              {uuid: '201c1ff5-23c9-42f9-bfb5-bbc850536440', text: 'Georgia'},
              {uuid: 'b5c09733-a49e-460a-ba8a-526863010729', text: 'Germany'},
              {uuid: '2abf1cee-f5fb-427c-a220-b5d159ad6513', text: 'India'},
              {uuid: '8d14341b-ec2b-4924-9aea-bda6a53b51fc', text: 'United Kingdom'},
            ]
          },
        },
        {
          id: 2,
          type: 'checkbox',
          question: 'Which language videos do you want to see on my channel?',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!',
          data: {
            options: [
              {uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'JavaScript'},
              {uuid: '201c1ff5-23c9-42f9-bfb5-bbc850536440', text: 'PHP'},
              {uuid: 'b5c09733-a49e-460a-ba8a-526863010729', text: 'HTML + CSS'},
              {uuid: 'b5c09733-a49e-460a-ba8a-526863010729', text: 'All of the above'},
              {uuid: '2abf1cee-f5fb-427c-a220-b5d159ad6513', text: 'Everything Zura thinks will be good'},
            ]
          },
        },
        {
          id: 3,
          type: 'checkbox',
          question: 'Which PHP framework videos do you want to see on my channel?',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!',
          data: {
            options: [
              {uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'Laravel'},
              {uuid: '201c1ff5-23c9-42f9-bfb5-bbc850536440', text: 'Yii2'},
              {uuid: 'b5c09733-a49e-460a-ba8a-526863010729', text: 'Codeigniter'},
              {uuid: '2abf1cee-f5fb-427c-a220-b5d159ad6513', text: 'Symfony'},
            ]
          },
        },
        {
          id: 4,
          type: 'radio',
          question: 'Which Laravel Framework do you love most?',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!',
          data: {
            options: [
              {uuid: '31132230-29e0-4857-84ed-417542c7c8dd', text: 'Laravel 5'},
              {uuid: '0ab85f86-15ee-4ec0-ba42-793daf243a5d', text: 'Laravel 6'},
              {uuid: '748fd679-d983-4d73-8d7b-7bb4abd22254', text: 'Laravel 7'},
              {uuid: 'f1864724-1009-4bed-94a1-3cfe93dfb82a', text: 'Laravel 8'},
            ]
          },
        },
        {
          id: 5,
          type: 'checkbox',
          question: 'What type of projects do you want to see on my channel built with Laravel?',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!',
          data: {
            options: [
              {uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'REST API'},
              {uuid: '201c1ff5-23c9-42f9-bfb5-bbc850536440', text: 'E-commerce'},
              {uuid: 'b5c09733-a49e-460a-ba8a-526863010729', text: 'Real Estate'},
              {uuid: '2abf1cee-f5fb-427c-a220-b5d159ad6513', text: 'All of the above'},
            ]
          },
        },
        {
          id: 6,
          type: 'text',
          question: 'What do you think about TheCodeholic channel?',
          description: 'Write your honest opinion. Everything is anonymous.',
          data: null
        },
      ]
    },
    {
      id: 2,
      title: "Laravel 8",
      slug: "laravel-8",
      status: "draft",
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png',
      description: `Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation — freeing you to create without sweating the small things.`,
      created_at: "2021-12-20 18:00:00",
      updated_at: "2021-12-20 18:00:00",
      expire_date: "2021-12-31 18:00:00",
    },
    {
      id: 2,
      id: 3,
      title: "Vue 3",
      slug: "vue-3",
      status: "active",
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png',
      description: `Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.`,
      created_at: "2021-12-21 17:00:00",
      updated_at: "2021-12-21 17:00:00",
      expire_date: "2021-12-31 00:00:00",
    },
    {
      id: 3,
      id: 4,
      title: "Tailwind 3",
      slug: "tailwind-3",
      status: "active",
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png',
      description: `A utility-first CSS framework packed with classes like <code>flex</code>, <code>pt-4</code>, <code>text-center</code> and <code>rotate-90</code> that can be composed to build any design, directly in your markup.`,
      created_at: "2021-12-21 14:00:00",
      updated_at: "2021-12-21 14:00:00",
      expire_date: "2021-12-31 00:00:00",
    },
  ];
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
            surveys:[...surveys],
            questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
            currentSurvey:{
              loadig:false,
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
          state.surveys = [...state.surveys,obj.data];
        },
        updateSurvey(state,obj){
          state.surveys = state.surveys.map((survey)=>{
            if(survey.id === obj.data.id){
              return obj.data
            }
            return survey;
          })
        },
        setCurrentSurveyLoading(state,value){
          state.currentSurvey.loadig = value;
        },
        setCurrentSurvey: (state, survey) => {
          state.currentSurvey.data = survey.data;
          //console.log(state.currentSurvey);
        },
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
            context.commit('updateSurvey', response.data);
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
        }
    },
    
  });

  export default store;
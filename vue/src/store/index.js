import { createStore } from 'vuex';
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
                token:localStorage.getItem('token'),
            }
        }
    },
    getters: {

    },
    mutations: { 
        logout(state){
            state.user.data ={};
            state.user.token =null;
        },
        setUser(state,obj){
            state.user.data = obj.user;
            state.user.token = obj.token;
            localStorage.setItem('token', obj.token);
        }
    },
    actions: { 
        async register(context,user){
        //     return fetch(`http://127.0.0.1:8000/api/register`, {
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        //     },
        //     method: 'POST',
        //     body: JSON.stringify(user)
        // }) .then(res => res.json())
        //     .then(res => {
        //         //console.log(res);
        //         // if (!res.ok) {
        //         //     alert();
        //         // }
        //         context.commit('setUser', res);
        //         return res;
        //     })

        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
          });
      
          const res = await response.json(); 
          if (!response.ok) {
            const error = new Error(
              res.message || 'Failed to authenticate. Check your login data.'
            );
            throw error;
          }
            context.commit('setUser', res);
          
        }
    },
    
  });

  export default store;
<template>
<div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login</h2>
   </div>

   <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit="login">
        <div v-if="error" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
        {{ error }}
        <span @click="clearError" class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </span>
      </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="remember-me" class="block text-sm font-medium leading-6 text-gray-900">Remember me</label>
          <input v-model="user.remember" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <router-link href="#" :to="{name:'Register'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register for free</router-link>
      </p>
    </div>
 </div>
</template>

<script>
  export default{
    data(){
      return{
        user:{
          email:null,
          password:null,
          remember:false
        },
        error:null
      }
    },
    methods:{
      async login(event){ 
        event.preventDefault();
        this.clearError();
        try{
          await this.$store.dispatch('login',this.user);
          this.$router.push({ name: 'Dashboard'});
        }catch (err) {
            this.error = err.response.data.error || err.response.data.message || 'Failed to authenticate, try later.';
        }
        
      },
      clearError(){
        this.error = null;
      }
    }
  }

</script>



<style scoped>
  .error-class{
    color: red;
  }
</style>

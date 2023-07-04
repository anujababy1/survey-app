<template>
<div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register for free</h2>
   </div>

   <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="register">
        <div v-if="error" class="error-class">{{error}}</div>
          <div>
          <label for="fullname" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input id="fullname" v-model="user.name" name="fullname" type="text" autocomplete="fullname" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" v-model="user.email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
            <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Password Confirmation</label>
          <div class="mt-2">
            <input id="password_confirmation" v-model="user.password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?
        {{ ' ' }}
        <router-link :to="{name:'Login'}" href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</router-link>
      </p>
    </div>
</div>
</template>

<script>
  export default{
    data(){
      return {
        user:{
          name:null,
          email:null, 
          password:null,
          password_confirmation:null
        },
        error:null
      }
    },
    methods:{
      //  async register(event){
      //   event.preventDefault();
      //   //console.log(this.user);
      //   //this.$store.dispatch('register',this.user).then(() => {this.$router.push({ name: 'Dashboard'})});
      //    try {
        
      //     await this.$store.dispatch('register', this.user);
      //     this.$router.push({ name: 'Dashboard'});
      // } catch (err) {
      //   this.error = err.message || 'Failed to authenticate, try later.';
      // }
      // }
      async register(event){
        event.preventDefault();
        this.error = null;
        try{
          await this.$store.dispatch('register',this.user);
          this.$router.push({ name: 'Dashboard'});
        }catch (err) {
            this.error = err.response.data.message || 'Failed to authenticate, try later.';
        }
        
      }
    }
  }
</script>



<style scoped>
  .error-class{
    color:red;
  }
</style>

<template>

 <div>
    <PageComponent>
      <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link :to="{name:'SurveyCreate'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          Add Surveys
        </router-link>
      </div>
    </template>
    <div v-if="loading" class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"> Loading ..........</div>
    <div v-else>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3" >
        <SurveyListItem  
        v-for="(survey,index) in surveys" 
        :key="survey.id" 
        :survey="survey" 
          @delete="deleteSurvey(survey)">
      </SurveyListItem>
      </div>

      <div class="flex justify-center mt-5">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a
            v-for="(link, i) in links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === links.length - 1 ? 'rounded-r-md' : '',
            ]"
            v-html="link.label"
          >
          </a>
        </nav>
      </div>

    </div>
    </PageComponent>
 </div>
</template>

<script>
 import PageComponent from '../components/PageComponent.vue'
 import SurveyListItem from '../components/survey/SurveyListItem.vue';
 export default {
  components:{
    PageComponent,SurveyListItem
  },
  data(){
    return {
      surveys: this.$store.state.surveys.data,
      error:null,
      loading:this.$store.state.surveys.loading,
      links: this.$store.state.surveys.links
    }
  },
  mounted(){
    this.getSurveys();
  },
  methods:{
    getForPage(event,link){
      event.preventDefault();
      if(!link.url){
        return;
      }
      this.getSurveys(link.url);
    },
    async getSurveys(url=null){
      this.loading = true;
      if(url){
        await this.$store.dispatch('getSurveys',{ url: url });
      }else{
        await this.$store.dispatch('getSurveys');
      }
      
      this.surveys = this.$store.state.surveys.data;
      this.loading = this.$store.state.surveys.loading;
      this.links    = this.$store.state.surveys.links;
    },
    async deleteSurvey(survey){
      if(confirm("Are you sure you want to delete this survey? Operation can't be done!!")){

        try{ 
          let data = await this.$store.dispatch('deleteSurvey',survey.id);
          this.getSurveys();
        }catch (err) {
            this.error = 'Something went wrong';
        }
        
      }
    }
  }
 }
</script>
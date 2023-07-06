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
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3" v-else>
      <SurveyListItem  
      v-for="(survey,index) in surveys" 
      :key="survey.id" 
      :survey="survey" 
        @delete="deleteSurvey(survey)">
    </SurveyListItem>
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
    }
  },
  mounted(){
    this.getSurveys();
  },
  methods:{
    async getSurveys(){
      this.loading = true;
      await this.$store.dispatch('getSurveys');
      this.surveys = this.$store.state.surveys.data;
      this.loading = this.$store.state.surveys.loading;
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
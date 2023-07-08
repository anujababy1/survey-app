<template>
<div class="py-5 px-8">
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <form @submit.prevent="submitSurvey" v-else class="container mx-auto">
        <div class="grid grid-cols-6 items-center">
            <div class="mr-4">
            <img :src="survey.image_url" alt="" />
            </div>
            <div class="col-span-5">
            <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
            <p class="text-gray-500 text-sm" v-html="survey.description"></p>
            </div>
        </div>

        <div v-if="surveyFinished" class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto">
        <div class="text-xl mb-3 font-semibold ">Thank you for participating in this survey.</div>
        <button @click="submitAnotherResponse" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit another response
        </button>
      </div>
      <div v-else>
        <hr class="my-3">
        <div v-for="(question, ind) of survey.questions" :key="question.id">
          <QuestionViewer
            v-model="answers[question.id]"
            :question="question"
            :index="ind"
          />
        </div>

        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
</div>

</template>
<script>
 import QuestionViewer from '../components/question/QuestionViewer.vue';
 import { mapState } from 'vuex'
export default {
    data(){
        return {
            surveyFinished:false,
            answers:{},
            loading :false,
            survey:{}
        }
    },
    components:{
        QuestionViewer
    },

    mounted(){
        this.getSurveyBySlug();
    },
    methods:{
        async getSurveyBySlug(){
            this.loading = true;
            try{
                let data = await this.$store.dispatch('getSurveyBySlug',this.$route.params.slug);
                this.survey = this.$store.state.currentSurvey.data;
                this.loading = false;
            }catch (err) {
                //this.error = err.response.data.message || 'Failed to authenticate, try later.';
            }
        },
        async submitSurvey(){
            try{
                let data = await this.$store.dispatch('saveSurveyAnswer',{surveyId:this.survey.id,answers:this.answers});
                this.surveyFinished = true;
            }catch (err) {
                //this.error = err.response.data.message || 'Failed to authenticate, try later.';
            }
        },
        submitAnotherResponse(){
            this.answers = {};
            this.surveyFinished = false;
        }

    }

}
</script>
<style>
</style>
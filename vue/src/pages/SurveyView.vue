<template>
    <PageComponent>
         <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                {{ this.$route.params.id ? model.title : "Create a Survey" }}
                </h1>
                <button @click="deleteSurvey" v-if="this.$route.params.id" type="button" class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600">
                  Delete Survey
                </button>
            </div>
        </template>
        <div v-if="model.loading">Loading ............</div>
         <form action="#" method="POST" @submit="saveSurvey" v-else>
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <!-- Survey Fields -->
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <!-- Image -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div class="mt-1 flex items-center">
                     <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                class="w-64 h-48 object-cover"
              />
              <span
                v-else
                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
                    <button
                      type="button"
                      class="
                        relative
                        overflow-hidden
                        ml-5
                        bg-white
                        py-2
                        px-3
                        border border-gray-300
                        rounded-md
                        shadow-sm
                        text-sm
                        leading-4
                        font-medium
                        text-gray-700
                        hover:bg-gray-50
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-indigo-500
                      "
                    >
                      <input
                        type="file"
                        @change="onImageChange"
                        class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                        />
                      Change
                    </button>
                  </div>
                </div>
                <!--/ Image -->

                <!-- Title -->
                <div>
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700"
                    >Title</label
                  >
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="
                      mt-1
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    v-model='model.title'
                  />
                </div>
                <!--/ Title -->

                <!-- Description -->
                <div>
                  <label
                    for="about"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      class="
                        shadow-sm
                        focus:ring-indigo-500 focus:border-indigo-500
                        mt-1
                        block
                        w-full
                        sm:text-sm
                        border border-gray-300
                        rounded-md
                      "
                      placeholder="Describe your survey"
                      v-model='model.description'
                    />
                  </div>
                </div>
                <!-- Description -->

                <!-- Expire Date -->
                <div>
                  <label
                    for="expire_date"
                    class="block text-sm font-medium text-gray-700"
                    >Expire Date</label
                  >
                  <input
                    type="date"
                    name="expire_date"
                    id="expire_date"
                    class="
                      mt-1
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    v-model='model.expire_date'
                  />
                </div>
                <!--/ Expire Date -->

                <!-- Status -->
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="status"
                      name="status"
                      type="checkbox"
                      class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                        rounded
                      "
                      v-model='model.status'
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="status" class="font-medium text-gray-700"
                      >Active</label
                    >
                    <p class="text-gray-500">
                      Active survey and make it public
                    </p>
                  </div>
                </div>
                <!--/ Status -->
              </div>
              <!--/ Survey Fields -->

              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">
            Questions

            <!-- Add new question -->
            <button
              type="button"
              @click="addQuestion()"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Question
            </button>
            <!--/ Add new question -->
          </h3>
          <div v-if="!model.questions && !model.questions.length" class="text-center text-gray-600">
            You don't have any questions created
          </div>
          <div v-else>
          <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div>
          </div>
        </div>

              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  class="
                    inline-flex
                    justify-center
                    py-2
                    px-4
                    border border-transparent
                    shadow-sm
                    text-sm
                    font-medium
                    rounded-md
                    text-white
                    bg-indigo-600
                    hover:bg-indigo-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-indigo-500
                  "
                >
                  Save
                </button>
              </div>
            </div>
          </form>
    </PageComponent>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import PageComponent from '../components/PageComponent.vue';
import QuestionEditor from '../components/question/QuestionEditor.vue';
import { mapState } from 'vuex';
    export default{
        components:{
            PageComponent,QuestionEditor
        },
        data(){
            return {
                model:{
                    id: null,
                    title:'',
                    status:false,
                    description:null,
                    image:null,
                    expire_date:null,
                    questions:[],
                    image_url:null,
                    loading:false
                },
                error:null
                
            }

        },
        mounted(){

            if(this.$route.params.id){
                this.getSurvey();
            }
        },
        computed: mapState(['currentSurvey']),
        methods:{
            async getSurvey(id=null){
              let survey_id = id??+this.$route.params.id;
                this.model.loading  = true;
                await this.$store.dispatch('getSurvey',survey_id);
                this.model = {...this.model,...this.currentSurvey.data};
                this.model.loading =  this.currentSurvey.loading;
            },
            addQuestion(index){
                const newQuestion = {
                    id: uuidv4(),
                    type: "text",
                    question: "",
                    description: null,
                    data: {},
                };

                this.model.questions.splice(index, 0, newQuestion);
            },
            questionChange(question){
                this.model.questions = this.model.questions.map((q) => {
                    if (q.id === question.id) {
                    return JSON.parse(JSON.stringify(question));
                    }
                    return q;
                });
            },
            onImageChange(ev){ 
                const file = ev.target.files[0];

                const reader = new FileReader();
                reader.onload = () => {
                    // The field to send on backend and apply validations
                    this.model.image = reader.result;

                    // The field to display here
                    this.model.image_url = reader.result;
                    ev.target.value = "";
                };
                reader.readAsDataURL(file);
            },
            deleteQuestion(question){
                this.model.questions = this.model.questions.filter((q) => q.id !== question.id);
            },
             async saveSurvey(event){
                event.preventDefault();
                try{ 
                    let data = await this.$store.dispatch('saveSurvey',this.model);
                    console.log(data);
                    this.getSurvey(data.data.data.id);
                    this.$router.push({ name: 'SurveyView',params:{id:data.data.data.id}});
                    
                }catch (err) {
                  console.log(err);
                    this.error = 'Something went wrong';
                }
            },
            async deleteSurvey(){
              if (confirm(`Are you sure you want to delete this survey? Operation can't be undone!!`)){
                  try{ 
                    let data = await this.$store.dispatch('deleteSurvey',this.model.id);
                    this.$router.push({ name: 'Surveys'});
                  }catch (err) {
                      this.error = 'Something went wrong';
                  }
              }
            }
        },
    }
</script>
<style scoped>

</style>




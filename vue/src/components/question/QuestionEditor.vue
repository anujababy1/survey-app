<template>
<div>
    <div class="flex items-center justify-between">
     <h3 class="text-lg font-bold">
        {{ index + 1 }}. {{ data.question }}
    </h3>
     <div class="flex items-center">
      <!-- Add new question -->
      <button
        type="button"
        @click="addNewQuestion()"
        class="
          flex
          items-center
          text-xs
          py-1
          px-3
          mr-2
          rounded-sm
          text-white
          bg-gray-600
          hover:bg-gray-700
        "
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
        Add
      </button>
      <!--/ Add new question -->

      <!-- Delete question -->
      <button
        type="button"
        @click="deleteQuestion()"
        class="
          flex
          items-center
          text-xs
          py-1
          px-3
          rounded-sm
          border border-transparent
          text-red-500
          hover:border-red-600
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Delete
      </button>
      <!--/ Delete question -->
    </div>
  </div>

  <!--/ Question index -->
  <div class="grid gap-3 grid-cols-12">
    <!-- Question -->
    <div class="mt-3 col-span-9">
      <label
        :for="'question_text_' + data.id"
        class="block text-sm font-medium text-gray-700"
        >Question Text</label
      >
      <input
        type="text"
        :name="'question_text_' + data.id"
        v-model="data.question"
        @change="dataChange"
        :id="'question_text_' + data.id"
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
      />
    </div>
     <!--/ Question -->

     <!-- Question Type -->
    <div class="mt-3 col-span-3">
      <label for="question_type" class="block text-sm font-medium text-gray-700"
        >Select Question Type</label
      >
      <select
        :id="'question_type'+ data.id"
        :name="'question_type'+data.id"
        v-model="data.type"
        @change="dataChange"
        class="
          mt-1
          block
          w-full
          py-2
          px-3
          border border-gray-300
          bg-white
          rounded-md
          shadow-sm
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          sm:text-sm
        "
      >
        <option v-for="type in questionTypes" :key="type" :value="type">
          {{ upperCaseFirst(type) }}
        </option>
      </select>
    </div>
    <!--/ Question Type -->

    <!-- Question Description -->
  <div class="mt-3 col-span-12">
    <label
      :for="'question_description_' + data.id"
      class="block text-sm font-medium text-gray-700"
      >Description</label
    >
    <textarea
      :name="'question_description_' + data.id"
      v-model="data.description"
      @change="dataChange"
      :id="'question_description_' + data.id"
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
    />
  </div>
  <!--/ Question Description -->

    <!-- Data -->
  <div class="mt-3 col-span-12">
    <div v-if="shouldHaveOptions()" class="mt-2">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Options

        <!-- Add new option -->
        <button
          type="button"
          @click="addOption()"
          class="
            flex
            items-center
            text-xs
            py-1
            px-2
            rounded-sm
            text-white
            bg-gray-600
            hover:bg-gray-700
          "
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
          Add Option
        </button>
        <!--/ Add new option -->
      </h4>

      <div
        v-if="!data.data || !data.data.options.length"
        class="text-xs text-gray-600 text-center py-3"
      >
        You don't have any options defined
      </div>
      <!-- Option list -->
      <div v-else >
      <div
        v-for="(option, index) in data.data.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-6 text-sm"> {{ index + 1 }}. </span>
        <input
          type="text"
          tabindex="1"
          v-model="option.text"
          @change="dataChange"
          class="
            w-full
            rounded-sm
            py-1
            px-2
            text-xs
            border border-gray-300
            focus:border-indigo-500
          "
        />
        <!-- Delete Option -->
        <button
          type="button"
          @click="removeOption(option)"
          class="
            h-6
            w-6
            rounded-full
            flex
            items-center
            justify-center
            border border-transparent
            transition-colors
            hover:border-red-100
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <!--/ Delete Option -->
      </div> </div>
      <!--/ Option list -->
    </div>
  </div>
  <!--/ Data -->
  
  </div>
  <!--/ Data -->
  <hr class="my-4" />
</div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
    export default{
        
        props:['index','question'],
        emit:['change','addQuestion','deleteQuestion'],
        data(){
            return {
                data:[],
                questionTypes:this.$store.state.questionTypes
            }
        },
        mounted(){
            if(this.question){
                this.data = JSON.parse(JSON.stringify(this.question));
            }
        },
        methods:{
            addNewQuestion(){
                this.$emit("addQuestion", this.index + 1);
            },
            deleteQuestion(){ 
                this.$emit("deleteQuestion", this.question);
            },
            shouldHaveOptions() {
                return ["select", "radio", "checkbox"].includes(this.data.type);
            },
            upperCaseFirst(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },
            dataChange(){
                
                if (!this.shouldHaveOptions()) {
                   this.data.data.options =[];
                }
                this.$emit("change", this.data);
            },
            
            addOption() {
                this.data.data.options = [...this.data.data.options, { uuid: uuidv4(), text: "" }];
                this.dataChange();
            },

            // Remove option
            removeOption(op) {
                let data = this.data.data.options.filter((option)=>{
                    return option.uuid !== op.uuid;
                });
                this.data.data.options = data;
                this.dataChange();
            }
        }
        
    }
</script>
<style scoped>

</style>

<template>
    <fieldset class="mb-4">
      <div>
        <legend class="text-base font-medium text-gray-900">
          {{ index + 1 }}. {{ question.question }}
        </legend>
        <p class="text-gray-500 text-sm">
          {{ question.description }}
        </p>
      </div>
      <div class="mt-3">
        <div v-if="question.type === 'select'">
          <select
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Please Select</option>
            <option v-for="option in question.data.options" :key="option.uuid" :value="option.text">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div v-else-if="question.type === 'radio'">
          <div
            v-for="(option, ind) of question.data.options"
            :key="option.uuid"
            class="flex items-center"
          >
            <input
              :id="option.uuid"
              :name="'question' + question.id"
              :value="option.text"
              @change="$emit('update:modelValue', $event.target.value)"
              type="radio"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
              :for="option.uuid"
              class="ml-3 block text-sm font-medium text-gray-700"
            >
              {{ option.text }}
            </label>
          </div>
        </div>
        <div v-else-if="question.type === 'checkbox'">
          <div
            v-for="(option, ind) of question.data.options"
            :key="option.uuid"
            class="flex items-center"
          >
            <input
              :id="option.uuid"
              v-model="model[option.text]"
              @change="onCheckboxChange($event)"
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label
              :for="option.uuid"
              class="ml-3 block text-sm font-medium text-gray-700"
            >
              {{ option.text }}
            </label>
          </div>
        </div>
        <div v-else-if="question.type === 'text'">
          <input
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div v-else-if="question.type === 'textarea'">
          <textarea
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
      </div>
    </fieldset>
    <hr class="mb-4" />
  </template>
  
<script>

export default {
    
    props:['question','index','modelValue'],
    emit:["update:modelValue"],
    data(){
        return {
            model :{},
        }
    },
    mounted(){
        if (this.question.type === "checkbox") {
            this.model = {};
        }
    },
    methods:{
        onCheckboxChange(event) {
            const selectedOptions = [];
            for (let option in this.model) {
                if (this.model[option]) {
                    selectedOptions.push(option);
                }
            }
            this.$emit("update:modelValue", selectedOptions);
        }
    }

}
</script>
<style>
</style>
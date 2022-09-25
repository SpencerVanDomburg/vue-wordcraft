<template>
  <form action="">
    <input 
      v-model="addQuestion" 
      type="text"
      placeholder="type question"  
    >
    <input 
      v-model="addAnswer" 
      type="text"
      placeholder="type answer"   
      v-on:keyup.enter="handleSubmit()" 
    >
    <button 
      @click="handleSubmit()"
      class="btn btn-success"  
    >submit</button>
  </form>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      language: {
        type: String,
        required: true
      },
      wordList: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        addQuestion: '',
        addAnswer: ''
      }
    },
    methods: {
      handleSubmit() {
        console.log('inside handleSubmit');
        const updatedList = [
          {
            question: this.addQuestion,
            answer: this.addAnswer
          }, 
          ...this.wordList 
        ];
        this.saveList(updatedList);
      },
      saveList(updatedList) {
        console.log('inside saveList');
        axios.post(`http://localhost:9080/api/list`,
          updatedList,
          {
          params: {
            language: this.language
          }        
           })
        .then((response) =>{
          console.log(response);
          this.saveListInParent();
        })
      },
      saveListInParent(){
        console.log('emit in add');
        this.$emit('save-wordList');
      }
    }
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: auto;
    
  }

  form input {
    margin: 0.75rem;
    border-radius: 10px;
    height: 2.5rem;
  }

  form button {
    margin: auto;
    width: 50%;
  }
</style>
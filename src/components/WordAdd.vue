<template>
  <form action="" class="word-add">
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
      @click.prevent="handleSubmit()"
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
        axios.put(`http://localhost:8082/api/list`,
        {
          language: this.language,
          name: "default",
          wordPairs: updatedList
        },
        {
          params: {
            language: this.language
          }        
        })
        .then((response) =>{
          console.log(response);
          this.saveListInParent(response.data.wordPairs);
        })
      },
      saveListInParent(updatedList){
        console.log('emit in add');
        this.$emit('save-wordList', updatedList);
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

  .word-add{
    padding: 1rem;
    border: 1px dotted white;
    border-radius: 5px;
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
<template>
  <h1>{{practiceList.length}} - <span style="color: red">{{totalAmountOfHints}}</span></h1>
  <div class="practiceForm">
    <input 
      type="text" 
      disabled 
      :value="randomWord.question"
    >
    <input 
      type="text" 
      v-model="givenAnswer" 
      v-on:keyup.enter="checkAnswer()" 
      v-on:keydown.shift="getHint()"
      :placeholder="hint"
    >
    <button 
      class="btn btn-success"
      @click="checkAnswer()" 
      >Submit (Enter)
    </button>
    <button 
    class="btn btn-info"
      @click="getHint()" 
      >Hint (Shift)
    </button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        givenAnswer: '',
        practiceList: this.wordList,
        hint: '',
        hintCount: 1,
        totalAmountOfHints: 0
      }
    },
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
    watch: {
      wordList() {
        this.practiceList = this.wordList
      }
    },
    computed: {
      randomWord(){
        return  this.practiceList[
          Math.floor(Math.random() * this.practiceList.length)
        ];
      }
    },
    methods: {
      checkAnswer() {
        if(this.randomWord.answer === this.givenAnswer) {
          alert('Correct!');
          this.practiceList = this.practiceList.filter((word) => word.answer !== this.givenAnswer);
          this.givenAnswer = '';
          this.hint = '';
          this.hintCount = 1;
        } else {
          alert('Incorrect!');
        }
      },
      getHint() {
        this.givenAnswer = '';
        axios.put(`http://localhost:9080/api/hint/${this.hintCount}`,
        {
          question: this.randomWord.question.toLowerCase(),
          answer: this.randomWord.answer.toLowerCase()
        },
        {
          params: {
            language: this.language
          }
        }).then((response) => {
          this.hint = response.data.hint;
          this.hintCount++;
          this.totalAmountOfHints++;
        })
      }
    }
  }
</script>

<style>
  .practiceForm {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: auto;
  }

  .practiceForm input {
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: 4rem;
    font-size: large;
    font-weight: bolder;
    border-radius: 4px;
    color: white;
    border-color: white;
    background-color: #212529;
  }

  .practiceForm button {
    width: 50%;
    margin: auto;
    margin-top: 0.5rem;
    border-radius: 4px;
  }

  .practiceForm button:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
</style>
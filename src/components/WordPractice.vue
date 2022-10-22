<template>
<popup
  v-if="popupIsVisible"
  :popupIsVisible = "popupIsVisible"
  :total = "wordList.length"
  :wrongAnswers = "totalAmountOfWrongAnswers"
  :usedHints = "totalAmountOfHints"
  @hide-popup = "hidePopup"
></popup>
<h1>{{practiceListLength}} - <span style="color: red">{{totalAmountOfHints}}</span></h1>
  <div class="practiceForm">
    <input 
      type="text" 
      disabled 
      :value="randomWordQuestion"
    >
    <input 
      type="text" 
      v-model="givenAnswer" 
      v-on:keyup.enter="checkAnswer()"  
      v-on:keydown.shift="getHint()"
      v-on:submit.prevent
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
        totalAmountOfWrongAnswers: 0,
        totalAmountOfHints: 0,
        popupIsVisible: false
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
      },
      practiceList(value) {
        if(value.length < 1) {
          this.popupIsVisible = true;
        }
      }
    },
    computed: {
      practiceListLength() {
        return this.practiceList ? this.practiceList.length : 0;
      },

      randomWord(){
        const word = this.practiceList ? 
        this.practiceList[
          Math.floor(Math.random() * this.practiceListLength)
        ]  
        : {
          "question": "placeholder",
          "answer": "placeholder"
          };
        return word;
      },
      randomWordQuestion() {
        return this.randomWord ? this.randomWord.question : "placeholder";
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
          this.totalAmountOfWrongAnswers++;
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
      },
      showPopup() {
        this.popupIsVisible = true;
      },
      hidePopup() {
        this.popupIsVisible = false;
        this.reset();
      },
    reset() {
      this.totalAmountOfWrongAnswers = 0;
      this.totalAmountOfHints = 0;
      this.practiceList = this.wordList;
      this.givenAnswer = '';
      this.hint = '';
      this.hintCount = 1;
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
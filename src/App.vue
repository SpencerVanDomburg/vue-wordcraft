<template>
  <div class="head">
    <h1><span style="color: #25cff2">Word</span>{{isPractice ? 'Practice' : 'Edit'}} - {{language}}</h1>
    <button @click="togglePractice()" class="btn btn-outline-light">{{isPractice ? 'Edit' : 'Practice'}}</button>
  </div>
  <word-practice 
    v-if="isPractice"
    :language="language"
    :wordList="wordList"
  ></word-practice>
  <word-edit 
    v-if="!isPractice"
    :language="language"
    :wordList="wordList"
    @save-wordList="fetchAndSetList"
    @update-wordList="updateAndSetList"
  ></word-edit>

  <div class="btn-group" role="group" aria-label="Basic outlined example">
  <button @click="changeLanguage('BA')" type="button" class="btn btn-outline-light">Bahasaa</button>
  <button @click="changeLanguage('FR')" type="button" class="btn btn-outline-light">French</button>
  <button @click="changeLanguage('DE')" type="button" class="btn btn-outline-light">Deutsch</button>
</div>
</template>

<script>
import WordEdit from './components/WordEdit.vue';
import WordPractice from './components/WordPractice.vue';
import axios from 'axios';

export default {
  data () {
    return {
      isPractice: false,
        language: 'BA',
        wordList: []
    }
  },
  methods: {
    togglePractice() {
      this.isPractice = !this.isPractice;
    },
    changeLanguage(language){
      this.language = language;
      this.fetchAndSetList();
    },
    fetchAndSetList(){
      console.log("fetchAndSetList");
       axios.get(`http://localhost:9080/api/list`,{
        params: {
          language: this.language
        }
      })
      .then((response) =>{
        console.log(response);
        this.wordList = response.data.wordPairList;
      })
    },
    updateAndSetList(updatedList) {
      console.log("updateAndSetList");
      axios.post(`http://localhost:9080/api/list`,
      updatedList,
      {
        params: {
          language : this.language
        }
      })
      .then((response) => {
        console.log(response);
        this.wordList = response.data;
      })
    }
  },
  beforeMount(){
    console.log('before mount');
    this.fetchAndSetList();
  },
  name: 'App',
  components: {
    WordEdit,
    WordPractice
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bakbak+One&display=swap');

.head {
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  
}

.head h1 {
  margin-bottom: 2rem;
  font-family: 'Bakbak One', cursive;
  font-size: 300%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #212529 ;
  color: white;
}

.btn-group {
  margin-top: 2rem;
  margin-bottom: 10rem;
  
}

</style>

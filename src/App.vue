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
    @save-wordList="setList"
    @update-wordList="updateAndSetList"
  ></word-edit>

  <div v-if="listNames" class="list-names">
    <ul>
      <li v-for="name in listNames" :key="name">
        <button @click="changeListName(name)">{{name}}</button>
      </li>
    </ul>
  </div>

  <div class="btn-group" role="group" aria-label="Basic outlined example">
  <button @click="changeLanguage('BA')" type="button" class="btn btn-outline-light" :style="{background: this.language === 'BA'? '#198754' : 'none'}">Bahasa</button>
  <button @click="changeLanguage('FR')" type="button" class="btn btn-outline-light" :style="{background: this.language === 'FR'? '#198754' : 'none'}">French</button>
  <button @click="changeLanguage('DE')" type="button" class="btn btn-outline-light" :style="{background: this.language === 'DE'? '#198754' : 'none'}">Deutsch</button>
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
      currentListName: 'default',
      wordList: [],
      listNames: []
    }
  },
  computed: {
    
  },
  methods: {
    activeButtonStyle(lang) {
      if(lang === this.language) {
        return 'green';
      }
      return 'none';
    },
    togglePractice() {
      this.isPractice = !this.isPractice;
    },
    changeLanguage(language){
      this.language = language;
      this.getListNames();
      this.fetchAndSetList();
    },
    changeListName(name){
      this.currentListName = name;
      this.fetchAndSetList(); 
    },
    getListNames(){
      console.log("getListNames");
      axios.get(`http://localhost:8082/api/list/names`,{
        params: {
          language: this.language
        }
      })
      .then((response) =>{
        console.log(response.data);
        this.listNames = response.data;
      })
    },

    fetchAndSetList(){
      console.log("fetchAndSetList");
       axios.get(`http://localhost:8082/api/list`,{
        params: {
          language: this.language,
          name: this.currentListName
        }
      })
      .then((response) =>{
        console.log(response);
        this.wordList = response.data.wordPairs;
      })
    },
    updateAndSetList(updatedList) {
      console.log("updateAndSetList");
      axios.put(`http://localhost:8082/api/list`,
      {
        language: this.language,
        name: this.currentListName,
        wordPairs: updatedList
      },
      {
        params: {
          language: this.language
       }        
      })
      .then((response) => {
        console.log(response);
        this.wordList = response.data.wordPairs;
      })
    },
    setList(updatedList){
      console.log("set List");
      this.wordList = updatedList;
    }
  },
  beforeMount(){
    console.log('before mount');
    this.getListNames();
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
  /* margin-top: 2rem; */
  margin-bottom: 10rem;
}

.container {
  margin-bottom: 2rem;
}

.list-names {
  text-align: center;
  width: 30%;
  margin: auto;
}

.list-names ul {
  display: flex;
  flex-direction: row;
  list-style: none;
}

.list-names ul button {
  all: unset;
  margin-right: 1rem;
  margin-left: 1rem;
  text-decoration: underline;
}

.list-names ul button:hover {
  cursor: pointer;
  text-decoration: none;
}


</style>

<template>
  <div class="container">
    <button class="btn btn-info" @click="toggleShowAddForm">{{showAddForm ? '-' : '+' }}</button>
    <word-add 
      :language="language" 
      :wordList="wordList"
      v-show="showAddForm">
    </word-add>
    <table class="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">Question</th>
          <th scope="col">Answer</th>
        </tr>
      </thead>
      <tbody>
        <word-pair
          v-for="word in wordList"
          :key="word.question"
          :question="word.question"
          :answer="word.answer"
          @save-wordList="saveListInParent"
        ></word-pair>
       </tbody>
    </table>
  </div>
</template>

<script>
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
        showAddForm: true
      }
    },
    methods: {
      toggleShowAddForm() {
        this.showAddForm = !this.showAddForm;
      },
      saveListInParent(){
        console.log('emit in edit');
        this.$emit('save-wordList');
      }
    }
  }
</script>

<style>
.btn {
  margin-bottom: 0.5rem;
}

table {
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

thead {
  min-width: 20%;
}

tbody {
  min-width: 20%;
}

tr {
  height: 2rem;
}

th {
  font-weight:900;
  text-align: left;
}
</style>
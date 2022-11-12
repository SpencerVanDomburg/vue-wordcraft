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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <word-pair
          v-for="word in wordList"
          :key="word.question"
          :question="word.question"
          :answer="word.answer"
          @save-wordList="saveListInParent"
          @delete-wordPair="deleteWordPair"
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
    emits: ['save-wordList', 'update-wordList'],
    methods: {
      toggleShowAddForm() {
        this.showAddForm = !this.showAddForm;
      },
      saveListInParent(updatedList){
        console.log('emit in edit');
        this.$emit('save-wordList', updatedList);
      },
      deleteWordPair(question) {
        console.log('delete word Pair');
        const updatedList = this.wordList.filter((item) => item.question !== question);
        this.$emit('update-wordList', updatedList);
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

td {
  min-width: 8rem;
}

td:last-child {
  text-align: center;
}

th {
  font-weight:900;
  min-width: 8rem;
}

</style>
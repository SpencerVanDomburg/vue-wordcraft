

<template>
  <tr>
    <td>{{question}}</td>
    <td>{{answer}}</td>
    <td>
      <font-awesome-icon 
        icon="fa-solid fa-trash-alt" 
        role="button"
        class="trash"
        @click.prevent="deleteWordPair()"
      />
    </td>
  </tr> 
</template>

<script>
  export default {
    props: {
      question: {
        type: String,
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    },
    emits:['delete-wordPair'],
    methods: {
      deleteWordPair() {
        console.log('emit from wordPair to delete');
        this.$emit('delete-wordPair', this.question);
      }
    }
  }
</script>

<style>

  td {
      font-size: large;
      text-align: left;
  }

  svg:hover {
    color: red;
  }
</style>
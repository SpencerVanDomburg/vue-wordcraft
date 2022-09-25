<template>
  <tr>
    <td>{{question}}</td>
    <td>{{answer}}</td>
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
    }
  }
</script>

<style>
  td {
      font-size: large;
      text-align: left;
  }
</style>
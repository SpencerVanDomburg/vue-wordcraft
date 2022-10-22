<template>
  <div class="popup-box">
    <div class="popup">
      <h1 class="popup-title">Score: {{score}}%</h1>
      <h2>Total:  {{total}} </h2>
      <h2>Wrong Answers: {{wrongAnswers}} </h2>
      <h2>Hints used: {{usedHints}}</h2>
      <button class="btn btn-danger" @click="hidePopup()">close</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      popupIsVisible: {
        type: Boolean,
        required: true
      },
      total: {
        type: Number,
        required: false
      },
      wrongAnswers: {
        type: Number,
        required: false
      },
      usedHints: {
        type: Number,
        required: false
      }
    },
    data () {
      return {
        
      }
    },
    methods: {
      hidePopup() {
        this.$emit('hide-popup');
      }
  },
  computed: {
      score(){
        return  Math.round(
          ((this.total - this.wrongAnswers) / this.total) * 100
        )
      }
    },
}
</script>

<style>
.popup-box {
  position: fixed;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
}

.popup {
  position: relative;
  width: 50%;
  min-height: 300px;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #999;
  border-radius: 4px;
  margin: 20px auto;
  padding: 20px;
  overflow: auto;
}

.popup-title{
  color:#0dcaf0;
  font-weight: bolder;
}

h2 {
  justify-content: space-around;
}

.btn {
  margin-top: 1.5rem;
}
</style>
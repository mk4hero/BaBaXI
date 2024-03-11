<template>
  <!-- 文字颜色跑马灯 -->
  <div>
      <span>C</span>
      <span>O</span>
      <span>L</span>
      <span>O</span>
      <span>R</span>
      <span>F</span>
      <span>U</span>
      <span>L</span>
    </div>
</template>

<script>
</script>
<style scoped lang="scss">
  span{
      color: #faebd7;
      animation: colorChange 1s infinite ease-in-out
      alternate;
  }

  @keyframes colorChange {
    to{
      color: #ff0266
    }
  }

  @for $i from 1 through 8{
    span:nth-child(#{$i}) {
      animation-delay: ($i - 1) * 0.1s;
    }
  }
</style>
  
  
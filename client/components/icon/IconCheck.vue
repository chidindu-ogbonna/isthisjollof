<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="run-animation"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#2c3e50"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="9" class="circle" />
    <path d="M9 12l2 2l4 -4" class="checkmark" />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  margin: auto;
  display: block;
  stroke: currentColor;
  stroke-miterlimit: 10;
  stroke-width: 2;
  fill: none;

  .circle {
    stroke-dasharray: 700;
    stroke-dashoffset: 700;
  }

  .checkmark {
    stroke-dasharray: 150;
    stroke-dashoffset: 150;
  }
}

.run-animation {
  .circle {
    animation: 4s circleDraw forwards;
    animation-delay: 0.85s;
  }

  .checkmark {
    animation: 2.5s checkmarkDraw forwards;
    animation-delay: 1.5s;
  }
}

// Animation

@keyframes circleDraw {
  from {
    stroke-dashoffset: 700;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes checkmarkDraw {
  from {
    stroke-dashoffset: 150;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>

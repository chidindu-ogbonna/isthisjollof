<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    class="run-animation"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#2c3e50"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="6" y1="6" x2="18" y2="18" class="first" />
    <line x1="18" y1="6" x2="6" y2="18" class="second" />
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

  line {
    stroke-dasharray: 150;
    stroke-dashoffset: 150;
  }
}

.run-animation {
  line {
    &.first {
      animation: 2.5s lineDraw forwards;
      animation-delay: 0.85s;
    }

    &.second {
      animation: 2.5s lineDraw forwards;
      animation-delay: 1.5s;
    }
  }
}

// Animation

@keyframes lineDraw {
  from {
    stroke-dashoffset: 150;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>

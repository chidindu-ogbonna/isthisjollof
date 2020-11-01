<template>
  <div>
    <transition name="top-slide">
      <app-navbar></app-navbar>
    </transition>
    <div>
      <Nuxt />
    </div>
    <app-notification></app-notification>
  </div>
</template>

<style></style>

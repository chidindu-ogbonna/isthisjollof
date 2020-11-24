<template>
  <div
    class="flex flex-col items-start justify-start max-w-screen-md min-h-screen px-6 py-16 mx-auto text-sm lg:py-20 md:text-base"
  >
    <div class="mb-4">
      <div class="mb-4 text-lg font-bold md:text-2xl text-primary">
        What is this ?
      </div>
      <p class="mb-4">
        This is an app that identifies if a plate of food is either Jollof Rice
        or not from a picture.
      </p>
      <p class="mb-4">
        Right now it's only able to identify jollof rice and due to the amount
        of data used in training may not be able to identify some edge cases,
        but you are welcome to push it to it's limits 😊.
      </p>
      <p class="mb-4">
        You can help get it better by uploading pictures of Jollof Rice
        <a class="link"> here </a>
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-4 text-lg font-bold md:text-2xl text-primary">
        How does it work ?
      </div>
      <p class="mb-4">
        It makes use of deep learning - which is a machine learning technique,
        to process an image and identify the properties of that image, if
        there's jollof rice in that image.
      </p>
      <p class="mb-4">
        For a breakdown of how it works,
        <a href="" class="link"> read the article </a>
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-4 text-lg font-bold md:text-2xl text-primary">
        Why did you do this ?
      </div>
      <p class="mb-4">
        Inspired by the TV Series - Silicon Valley, where they built a similar
        app but for hotdogs, called "NotHotDog". <br />
        I thought it would be cool to do something native to us here in Nigeria,
        with a local food. So I came up with "Is This Jollof"
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-4 text-lg font-bold md:text-2xl text-primary">
        Show me the code
      </div>
      <p class="mb-4">
        The code for both this web app and the ml model is on
        <a href="" class="link">GitHub </a>
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-4 text-lg font-bold md:text-2xl text-primary">
        Can we talk ?
      </div>
      <p class="mb-4">
        Sure. <br />
        You can reach me on
        <a href="" class="link">Twitter</a>
        or
        <a href="mailto:promise.bones@gmail.com" class="link">Email</a>
      </p>
    </div>

    <div class="mt-8">With ❤️ from Chidindu.</div>
  </div>
</template>

<script>
export default {
  name: 'About',

  head() {
    return {
      title: 'About - Is This Jollof?',
    }
  },
}
</script>

<style scoped>
.link {
  @apply transition-colors duration-300 ease-out border-b-2 border-dotted cursor-pointer border-primary;
}

.link:hover {
  @apply text-primary;
}
</style>

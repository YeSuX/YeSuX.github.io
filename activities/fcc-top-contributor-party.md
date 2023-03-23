<script setup>
    import {ffcImags} from '../assets/imgs.ts'
</script>
# freeCodeCamp Top Contributor Party

:tada: I am very happy to be invited by Miya to join the [freeCodeCamp](https://www.freecodecamp.org/) Top Contributor Party!

:star_struck: It was also great to meet [Quincy](https://twitter.com/ossia), the founder of freeCodeCamp

:hugs: At the same time, I hope you can actively join the FCC community construction.

<n-carousel
    direction="vertical"
    dot-placement="right"
    show-arrow
    style="width: 100%; height: 240px"
>
    <img
      class="carousel-img"
      style="width: 100%; height: 240px;object-fit: contain;"
      v-for="url in ffcImags"
      :src="url"/>
</n-carousel>

::: tip
- freeCodeCamp offical website：https://www.freecodecamp.org

- freeCodeCamp gitHub page：https://github.com/freeCodeCamp
:::
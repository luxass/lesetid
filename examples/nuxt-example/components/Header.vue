<script setup lang="ts">

</script>

<template>
  <header>
    <nav class="flex flex-wrap items-center justify-between">
      <NuxtLink href="/" class="transition-transform active:scale-95">
        Nuxt Example
      </NuxtLink>

      <!-- <div className="flex items-center gap-4 sm:gap-6">
        {posts.map((post) => (
          <NuxtLink class="transition-transform active:scale-95" href={`/${post.slug}`} key={post._id}>
          {post.shortTitle}
          </NuxtLink>
        ))}
      </div> -->
    </nav>
  </header>
</template>

<template>
  <div>
    <ContentDoc :path="contentPath" v-slot="{ doc }">
      <article class="prose prose-gray dark:prose-invert max-w-none">
        <h1>{{ doc.title }}</h1>
        <p v-if="doc.description" class="lead text-xl text-gray-600 dark:text-gray-400">
          {{ doc.description }}
        </p>
        <ContentRenderer :value="doc" />
      </article>

      <!-- Navigation -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div class="flex justify-between">
          <NuxtLink
            v-if="doc.prev"
            :to="localePath(doc.prev._path.replace(`/${locale}`, '/docs'))"
            class="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
          >
            <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ doc.prev.title }}
          </NuxtLink>
          <div v-else />
          <NuxtLink
            v-if="doc.next"
            :to="localePath(doc.next._path.replace(`/${locale}`, '/docs'))"
            class="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
          >
            {{ doc.next.title }}
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

// Build content path: /{locale}/{slug}
const contentPath = computed(() => {
  const slug = route.params.slug
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug
  return `/${locale.value}/${slugPath}`
})
</script>

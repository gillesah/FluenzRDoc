<template>
  <div v-if="toc && toc.links && toc.links.length > 0">
    <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
      Sur cette page
    </h4>
    <ul class="space-y-2 text-sm">
      <li v-for="link in toc.links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {{ link.text }}
        </a>
        <ul v-if="link.children && link.children.length" class="mt-2 ml-3 space-y-2">
          <li v-for="child in link.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              class="text-gray-500 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { toc } = useContent()
</script>

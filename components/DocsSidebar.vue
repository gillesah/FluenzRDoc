<template>
  <div class="space-y-6">
    <!-- Getting Started -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.gettingStarted') }}
      </h3>
      <ul class="space-y-1">
        <li>
          <NuxtLink :to="localePath('/docs/getting-started')" :class="linkClass('/docs/getting-started')">
            {{ $t('sidebar.introduction') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/getting-started/quick-start')" :class="linkClass('/docs/getting-started/quick-start')">
            {{ $t('sidebar.quickStart') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/getting-started/plans')" :class="linkClass('/docs/getting-started/plans')">
            {{ $t('sidebar.plansAndPricing') }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Email Accounts -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.emailAccounts') }}
      </h3>
      <ul class="space-y-1">
        <li>
          <NuxtLink :to="localePath('/docs/email-accounts/connect-gmail')" :class="linkClass('/docs/email-accounts/connect-gmail')">
            {{ $t('sidebar.connectGmail') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/email-accounts/connect-outlook')" :class="linkClass('/docs/email-accounts/connect-outlook')">
            {{ $t('sidebar.connectOutlook') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/email-accounts/smtp')" :class="linkClass('/docs/email-accounts/smtp')">
            {{ $t('sidebar.smtpConfig') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/email-accounts/warming')" :class="linkClass('/docs/email-accounts/warming')">
            {{ $t('sidebar.emailWarming') }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Contacts -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.contacts') }}
      </h3>
      <ul class="space-y-1">
        <li>
          <NuxtLink :to="localePath('/docs/contacts/create')" :class="linkClass('/docs/contacts/create')">
            {{ $t('sidebar.createContacts') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/contacts/import')" :class="linkClass('/docs/contacts/import')">
            {{ $t('sidebar.importCsv') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/contacts/groups')" :class="linkClass('/docs/contacts/groups')">
            {{ $t('sidebar.contactGroups') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/contacts/custom-fields')" :class="linkClass('/docs/contacts/custom-fields')">
            {{ $t('sidebar.customFields') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/contacts/pipeline')" :class="linkClass('/docs/contacts/pipeline')">
            {{ $t('sidebar.salesPipeline') }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Campaigns -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.campaigns') }}
      </h3>
      <ul class="space-y-1">
        <li>
          <NuxtLink :to="localePath('/docs/campaigns/create')" :class="linkClass('/docs/campaigns/create')">
            {{ $t('sidebar.createCampaign') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/campaigns/workflow')" :class="linkClass('/docs/campaigns/workflow')">
            {{ $t('sidebar.workflowEditor') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/campaigns/variables')" :class="linkClass('/docs/campaigns/variables')">
            {{ $t('sidebar.variablesPersonalization') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/campaigns/ab-testing')" :class="linkClass('/docs/campaigns/ab-testing')">
            {{ $t('sidebar.abTesting') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/campaigns/analytics')" :class="linkClass('/docs/campaigns/analytics')">
            {{ $t('sidebar.statistics') }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Inbox -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.inbox') }}
      </h3>
      <ul class="space-y-1">
        <li>
          <NuxtLink :to="localePath('/docs/inbox/overview')" :class="linkClass('/docs/inbox/overview')">
            {{ $t('sidebar.overview') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/inbox/replies')" :class="linkClass('/docs/inbox/replies')">
            {{ $t('sidebar.manageReplies') }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- API -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.api') }}
      </h3>
      <ul class="space-y-1">
        <li>
          <NuxtLink :to="localePath('/docs/api')" :class="linkClass('/docs/api')">
            {{ $t('sidebar.introduction') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/api/authentication')" :class="linkClass('/docs/api/authentication')">
            {{ $t('sidebar.authentication') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/api/contacts')" :class="linkClass('/docs/api/contacts')">
            {{ $t('sidebar.contacts') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/api/campaigns')" :class="linkClass('/docs/api/campaigns')">
            {{ $t('sidebar.campaigns') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/api/webhooks')" :class="linkClass('/docs/api/webhooks')">
            {{ $t('sidebar.webhooks') }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Help -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.help') }}
      </h3>
      <ul class="space-y-1">
        <li>
          <NuxtLink :to="localePath('/docs/faq')" :class="linkClass('/docs/faq')">
            {{ $t('sidebar.faq') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/troubleshooting')" :class="linkClass('/docs/troubleshooting')">
            {{ $t('sidebar.troubleshooting') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/deliverability')" :class="linkClass('/docs/deliverability')">
            {{ $t('sidebar.deliverability') }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()

function linkClass(path: string) {
  const localizedPath = localePath(path)
  const isActive = route.path === localizedPath || route.path.startsWith(localizedPath + '/')
  return [
    'sidebar-link',
    isActive ? 'sidebar-link-active' : ''
  ]
}
</script>

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
        <li v-if="hasNewDocs">
          <NuxtLink :to="localePath('/docs/getting-started/organization')" :class="linkClass('/docs/getting-started/organization')">
            {{ $t('sidebar.organization') }}
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
        <li v-if="hasNewDocs">
          <NuxtLink :to="localePath('/docs/contacts/find-emails')" :class="linkClass('/docs/contacts/find-emails')">
            {{ $t('sidebar.findEmails') }}
          </NuxtLink>
        </li>
        <li v-if="hasNewDocs">
          <NuxtLink :to="localePath('/docs/contacts/signals')" :class="linkClass('/docs/contacts/signals')">
            {{ $t('sidebar.signals') }}
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
        <li v-if="hasNewDocs">
          <NuxtLink :to="localePath('/docs/campaigns/calls-tasks')" :class="linkClass('/docs/campaigns/calls-tasks')">
            {{ $t('sidebar.callsTasks') }}
          </NuxtLink>
        </li>
        <li v-if="hasNewDocs">
          <NuxtLink :to="localePath('/docs/campaigns/edit-running')" :class="linkClass('/docs/campaigns/edit-running')">
            {{ $t('sidebar.editRunning') }}
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
          <NuxtLink :to="localePath('/docs/inbox')" :class="linkClass('/docs/inbox')">
            {{ $t('sidebar.overview') }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Calendar -->
    <div v-if="hasNewDocs">
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.calendar') }}
      </h3>
      <ul class="space-y-1">
        <li><NuxtLink :to="localePath('/docs/calendar')" :class="linkClass('/docs/calendar')">{{ $t('sidebar.calendarBooking') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/docs/calendar/agendas')" :class="linkClass('/docs/calendar/agendas')">{{ $t('sidebar.calendarAgendas') }}</NuxtLink></li>
      </ul>
    </div>

    <!-- LinkedIn -->
    <div>
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('sidebar.linkedin') }}
      </h3>
      <ul class="space-y-1">
        <li><NuxtLink :to="localePath('/docs/linkedin')" :class="linkClass('/docs/linkedin')">{{ $t('sidebar.linkedinConnect') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/docs/linkedin/sequences')" :class="linkClass('/docs/linkedin/sequences')">{{ $t('sidebar.linkedinSequences') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/docs/linkedin/search')" :class="linkClass('/docs/linkedin/search')">{{ $t('sidebar.linkedinSearch') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/docs/linkedin/invitations')" :class="linkClass('/docs/linkedin/invitations')">{{ $t('sidebar.linkedinInvitations') }}</NuxtLink></li>
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
        <li>
          <NuxtLink :to="localePath('/docs/api/mcp')" :class="linkClass('/docs/api/mcp')">
            {{ $t('sidebar.mcp') }}
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
          <NuxtLink :to="localePath('/docs/help/faq')" :class="linkClass('/docs/help/faq')">
            {{ $t('sidebar.faq') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/help/troubleshooting')" :class="linkClass('/docs/help/troubleshooting')">
            {{ $t('sidebar.troubleshooting') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/docs/help/deliverability')" :class="linkClass('/docs/help/deliverability')">
            {{ $t('sidebar.deliverability') }}
          </NuxtLink>
        </li>
        <li v-if="hasNewDocs">
          <NuxtLink :to="localePath('/docs/help/lena')" :class="linkClass('/docs/help/lena')">
            {{ $t('sidebar.lena') }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()

// Pages ajoutées le 26/10/2026 : disponibles en français et en anglais seulement.
const hasNewDocs = computed(() => ['fr', 'en'].includes(locale.value))

function linkClass(path: string) {
  const localizedPath = localePath(path)
  const isActive = route.path === localizedPath || route.path.startsWith(localizedPath + '/')
  return [
    'sidebar-link',
    isActive ? 'sidebar-link-active' : ''
  ]
}
</script>

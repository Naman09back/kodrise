import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'kodrise',
  api: {
    projectId: '5vojr174',
    dataset: 'production'
  },
  deployment: {
    appId: 'kfmxwh7oowxfsh2zd6ue43fr',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})

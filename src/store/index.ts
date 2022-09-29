
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
export default pinia
// import { createPinia } from 'pinia'
// import type { App } from 'vue'

// export function setupStore(app: App) {
//   app.use(createPinia())
// }

// export * from './modules'

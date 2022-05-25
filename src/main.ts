import { App, DefineComponent } from 'vue'
import components from './components'

const plugin = {
  install (Vue: App) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop as keyof typeof components]
        Vue.component(component.name, component)
      }
    }
  }
}

export default plugin
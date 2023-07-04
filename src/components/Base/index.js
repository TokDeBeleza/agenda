import _ from 'lodash'

export default function install(app) {
  const components = import.meta.glob('@/components/Base/**/*.vue', { eager: true })

  for (const name in components) {
    const componentName = _.upperFirst(
      _.camelCase(
        name
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    app.component(componentName, components[name].default)
  }
}

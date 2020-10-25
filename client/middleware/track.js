export default function ({ route, store }) {
  store.dispatch('log/navEvent', {
    action: `open_${route.name}`,
    label: '',
  })
}

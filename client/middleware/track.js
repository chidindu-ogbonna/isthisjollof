export default function ({ app, route, $gtag, store }) {
  store.dispatch('log/navEvent', {
    action: `open_${route.name}`,
    label: '',
  })
}

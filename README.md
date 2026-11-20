# aria-components-demo

Live examples of [`@jambotron/aria-components`](https://gitea.jambotron.com/jambotron_gang/-/packages/npm/@jambotron%2Faria-components) —
Angular UI components on Angular Aria and CDK, without Angular Material:

1. **Status badges** — tone by status, live / busy / alarm dot.
2. **Buttons, dialogs, toasts** — confirm with a typed name, a long action inside the dialog, an action that fails;
   success / info / error toasts, a quick action with a busy flag.
3. **Tabs, messages, states** — `<jt-tabs>` with `<ng-template jtTab>`, alerts, loading and empty states, password toggle.
4. **Icons** — all built-in SVG icons with a filter.

Theme switch — `<jt-theme-toggle>`.

## Run

```bash
npm ci
npx ng serve           # http://localhost:4200
```

## Deploy on Jambotron

Upload the repository (ZIP) as a project, pick `docker-compose.yml` in the deploy wizard, give the `web` service a domain,
port `80`.

License: [MIT](LICENSE) © Jambotron.

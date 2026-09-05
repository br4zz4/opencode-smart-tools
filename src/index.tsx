import { createSignal } from "solid-js"
import type { TuiPlugin } from "@opencode-ai/plugin/tui"

const KV_KEY = "auto-approve-enabled"

const tui: TuiPlugin = async (api) => {
  const [enabled, setEnabled] = createSignal<boolean>(api.kv.get<boolean>(KV_KEY, false))

  api.event.on("permission.asked", (event) => {
    if (!enabled()) return
    void api.client.permission
      .respond({
        sessionID: event.properties.sessionID,
        permissionID: event.properties.id,
        response: "once",
      })
      .catch(() => {})
  })

  api.event.on("permission.v2.asked", (event) => {
    if (!enabled()) return
    void api.client.permission
      .reply({ requestID: event.properties.id, reply: "once" })
      .catch(() => {})
  })

  api.command?.register(() => [
    {
      title: "Auto approve",
      value: "auto",
      description: "Toggle auto-approve permissions",
      category: "Smart Tools",
      slash: { name: "auto" },
      onSelect: () => {
        const next = !enabled()
        setEnabled(next)
        api.kv.set(KV_KEY, next)
        api.ui.toast({
          title: "Auto approve",
          message: next ? "ON — permissions will be auto-approved" : "OFF",
          variant: next ? "success" : "warning",
          duration: 3500,
        })
      },
    },
  ])
}

export default { id: "smart-tools", tui }
/**
 * Smart Tools: /auto — toggle auto-approve permissions.
 *
 * Migrated to the OpenCode v2 TUI plugin API:
 * `setup(context)` + `context.keymap.layer` with `slash` commands
 * (replaces the legacy `api.command.register` API, removed in v2).
 */

type CommandContext = {
  keymap: {
    layer: (cb: () => unknown) => () => void
    dispatch: (name: string, input?: string) => unknown
  }
  ui: {
    toast: {
      show: (input: {
        title?: string
        message: string
        variant?: string
        duration?: number
      }) => unknown
    }
  }
  app: { version: string }
}

const toggleAutoApprove = (context: CommandContext) => {
  try {
    context.keymap.dispatch("permission.mode")
  } catch (error) {
    context.ui.toast.show({
      title: "Auto approve",
      message: `Failed to toggle: ${String(error)}`,
      variant: "error",
      duration: 2500,
    })
    return
  }
  context.ui.toast.show({
    title: "Auto approve",
    message: "Auto-approve mode toggled",
    variant: "info",
    duration: 2500,
  })
}

const smartTools = {
  id: "smart-tools",
  setup(context: CommandContext) {
    context.keymap.layer(() => ({
      mode: "global",
      priority: 10,
      commands: [
        {
          id: "smart-tools.auto",
          title: "Auto approve",
          group: "Smart Tools",
          description: "Toggle auto-approve permissions (auto mode)",
          palette: true,
          slash: { name: "auto" },
          suggested: true,
          run: () => toggleAutoApprove(context),
        },
      ],
      bindings: ["smart-tools.auto"],
    }))
  },
}

export default smartTools

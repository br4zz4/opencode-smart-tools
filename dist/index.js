// src/index.tsx
import { appendFileSync } from "node:fs";
var log = (_context, message) => {
  try {
    appendFileSync(
      `${process.env.HOME}/.local/share/opencode/smart-trace.log`,
      `${(/* @__PURE__ */ new Date()).toISOString()} ${message}
`
    );
  } catch {
  }
};
log(null, "module evaluated");
var toggleAutoApprove = (context) => {
  log(context, "run() called");
  try {
    context.keymap.dispatch("permission.mode");
  } catch (error) {
    context.ui.toast.show({
      title: "Auto approve",
      message: `Failed to toggle: ${String(error)}`,
      variant: "error",
      duration: 2500
    });
    return;
  }
  context.ui.toast.show({
    title: "Auto approve",
    message: "Auto-approve mode toggled",
    variant: "info",
    duration: 2500
  });
};
var smartTools = {
  id: "smart-tools",
  setup(context) {
    log(context, `setup ok app=${context?.app?.version ?? "?"} keys=${Object.keys(context).join(",")}`);
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
          run: () => toggleAutoApprove(context)
        }
      ],
      bindings: ["smart-tools.auto"]
    }));
  }
};
var index_default = smartTools;
export {
  index_default as default
};

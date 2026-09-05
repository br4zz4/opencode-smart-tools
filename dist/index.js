// src/index.tsx
var tui = async (api) => {
  api.command?.register(() => [
    {
      title: "Auto approve",
      value: "auto",
      description: "Toggle auto-approve permissions (auto mode)",
      category: "Smart Tools",
      slash: { name: "auto" },
      onSelect: () => {
        api.command?.trigger("permission.mode");
        api.ui.toast({
          title: "Auto approve",
          message: "Auto-approve mode toggled",
          variant: "info",
          duration: 2500
        });
      }
    }
  ]);
};
var index_default = { id: "smart-tools", tui };
export {
  index_default as default
};

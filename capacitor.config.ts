import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kvaraglobal.group",
  appName: "Kvara Global Group",
  webDir: "dist",
  server: {
    url: "https://kvaraglobalgroup.kvaraglobal.workers.dev",
    cleartext: false
  }
};

export default config;

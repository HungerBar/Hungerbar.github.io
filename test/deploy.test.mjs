import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("pnpm workspace config declares the root package for Cloudflare installs", () => {
  const workspace = readFileSync("pnpm-workspace.yaml", "utf8");

  assert.match(workspace, /^packages:\n/m);
  assert.match(workspace, /^  - \.$/m);
});

test("wrangler config deploys the built static assets without Astro auto-configuration", () => {
  assert.equal(existsSync("wrangler.jsonc"), true);

  const config = readFileSync("wrangler.jsonc", "utf8");
  assert.match(config, /"compatibility_date": "2026-07-03"/);
  assert.match(config, /"assets": \{/);
  assert.match(config, /"directory": "\.\/dist"/);
});

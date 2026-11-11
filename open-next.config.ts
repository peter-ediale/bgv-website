import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Default settings. (A paid R2 cache isn't needed: almost every page is pre-built.)
export default defineCloudflareConfig({});

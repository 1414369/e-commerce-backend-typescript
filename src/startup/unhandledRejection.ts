import { logger } from '@/helpers'

export function unhandledRejection() {
  process.on('unhandledRejection', (ex) => {
    logger.error("unhandledRejection", ex);
    logger.waitForLogger().then(() => {
      process.exit(1);
    })
  });
}


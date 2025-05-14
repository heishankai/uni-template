// utils/eventBus.ts
import mitt from 'mitt'

export const eventBus = mitt<{
  stopAll: void
}>()

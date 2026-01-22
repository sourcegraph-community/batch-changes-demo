/**
 * Structured Logger
 *
 * This is the TARGET format for the batch change migration.
 * The batch change will transform console.log/error/warn calls into this structured format.
 *
 * BEFORE (current state):
 *   console.log('Fetching episodes, id:', id);
 *   console.error('Episode not found:', id);
 *   console.warn('Empty search query received');
 *
 * AFTER (target state):
 *   logger.info('Fetching episodes', { id });
 *   logger.error('Episode not found', { id });
 *   logger.warn('Empty search query received');
 *
 * This transformation requires AST-level understanding because:
 * 1. Variable interpolation must be extracted into metadata objects
 * 2. String concatenation must be converted to template + metadata
 * 3. console.log → logger.info (method name change)
 * 4. Multiple arguments must be restructured
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMetadata {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata?: LogMetadata;
}

function formatLogEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
  if (entry.metadata && Object.keys(entry.metadata).length > 0) {
    return `${base} ${JSON.stringify(entry.metadata)}`;
  }
  return base;
}

function createLogEntry(level: LogLevel, message: string, metadata?: LogMetadata): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    metadata,
  };
}

export const logger = {
  debug(message: string, metadata?: LogMetadata): void {
    const entry = createLogEntry('debug', message, metadata);
    console.debug(formatLogEntry(entry));
  },

  info(message: string, metadata?: LogMetadata): void {
    const entry = createLogEntry('info', message, metadata);
    console.info(formatLogEntry(entry));
  },

  warn(message: string, metadata?: LogMetadata): void {
    const entry = createLogEntry('warn', message, metadata);
    console.warn(formatLogEntry(entry));
  },

  error(message: string, metadata?: LogMetadata): void {
    const entry = createLogEntry('error', message, metadata);
    console.error(formatLogEntry(entry));
  },
};

export default logger;

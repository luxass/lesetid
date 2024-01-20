import { window } from "vscode"

const _log = window.createOutputChannel("Reading Time")
export const log = {
  info: (...args: any[]) => {
    console.warn(...args)
    const time = new Date().toLocaleTimeString()
    _log.appendLine(`[INFO ${time}] ${args.join(" ")}`)
  },
  error: (...args: any[]) => {
    console.error(...args)
    const time = new Date().toLocaleTimeString()
    for (let i = 0; i < args.length; i++) {
      if (args[i] instanceof Error) {
        const err = args[i] as Error
        args[i] = `[ERROR ${err.name}] ${err.message}\n${err.stack}`
      }
    }
    _log.appendLine(`[ERROR ${time}] ${args.join(" ")}`)
  },
  warn: (...args: any[]) => {
    console.warn(...args)
    const time = new Date().toLocaleTimeString()
    _log.appendLine(`[WARN ${time}] ${args.join(" ")}`)
  },
} as const

import { type JSX, createSignal, onCleanup } from "solid-js"

type CopyFn = (text: string) => Promise<boolean>

interface CopyToClipboardProps {
  id: string
}

export function CopyToClipboard(props: CopyToClipboardProps) {
  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.warn("Copy failed", error)
      return false
    }
  }

  const [isCopied, setIsCopied] = createSignal(false)

  let timeout: NodeJS.Timeout
  onCleanup(() => {
    if (timeout) clearTimeout(timeout)
  })

  const handleClick = async () => {
    // get the text from the dom element with the id
    const text = document.getElementById(props.id)?.textContent
    if (!text) {
      console.warn("No text to copy")
      throw new Error("No text to copy")
    }
    const isCopiedValue = await copy(text)
    setIsCopied(isCopiedValue)
    if (isCopiedValue) {
      timeout = setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <button
      class="absolute right-2 top-2 flex items-center justify-center rounded border border-gray-400/20 bg-[#ffffff] p-2 opacity-0 group-hover:opacity-100 dark:bg-[#121212]"
      onClick={handleClick}
    >
      {isCopied() ? <LucideClipboardCheck /> : <LucideClipboard />}
    </button>
  )
}

function LucideClipboard(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </g>
    </svg>
  )
}

function LucideClipboardCheck(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14l2 2l4-4" />
      </g>
    </svg>
  )
}

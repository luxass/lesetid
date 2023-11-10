// import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
// We cannot use this import atm, because it typescript will error.
// So we are just copying the types from the package.

import type { Estimation } from "remark-lesetid";
import type { LayoutKey } from "#build/types/layouts";

export interface ParsedContentInternalMeta {
  /**
   * Content id
   */
  _id: string
  /**
   * Content source
   */
  _source?: string
  /**
   * Content path, this path is source agnostic and it the content my live in any source
   */
  _path?: string
  /**
   * Content title
   */
  title?: string
  /**
   * Content draft status
   */
  _draft?: boolean
  /**
   * Content partial status
   */
  _partial?: boolean
  /**
   * Content locale
   */
  _locale?: string
  /**
   * File type of the content, i.e `markdown`
   */
  _type?: "markdown" | "yaml" | "json" | "csv"
  /**
   * Path to the file relative to the content directory
   */
  _file?: string
  /**
   * Extension of the file
   */
  _extension?: "md" | "yaml" | "yml" | "json" | "json5" | "csv"
}

export interface ParsedContentMeta extends ParsedContentInternalMeta {
  /**
   * Layout
   */
  layout?: LayoutKey

  [key: string]: any
}

export interface ParsedContent extends ParsedContentMeta {
  /**
   * Excerpt
   */
  excerpt?: MarkdownRoot
  /**
   * Content body
   */
  body: MarkdownRoot | null
}

export interface MarkdownNode {
  type: string
  tag?: string
  value?: string
  props?: Record<string, any>
  content?: any
  children?: MarkdownNode[]

  attributes?: Record<string, any>
  fmAttributes?: Record<string, any>
}

export interface MarkdownHtmlNode extends MarkdownNode {
  type: "html"
  value: string
}

export interface MarkdownRoot {
  type: "root"
  children: MarkdownNode[]
  props?: Record<string, any>
  toc?: Toc
}

export interface MarkdownPlugin extends Record<string, any> {}

export interface MarkdownOptions {
  /**
   * Enable/Disable MDC components.
   */
  mdc: boolean
  toc: {
    /**
     * Maximum heading depth to include in the table of contents.
     */
    depth: number
    searchDepth: number
  }
  tags: Record<string, string>
  remarkPlugins: Record<string, false | (MarkdownPlugin & { instance: any })>
  rehypePlugins: Record<string, false | (MarkdownPlugin & { instance: any })>
}

export interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

export interface Toc {
  title: string
  depth: number
  searchDepth: number
  links: TocLink[]
}

export interface MarkdownParsedContent extends ParsedContent {
  _type: "markdown"
  /**
   * Content is empty
   */
  _empty: boolean
  /**
   * Content description
   */
  description: string
  /**
   * Content excerpt, generated from content
   */
  excerpt?: MarkdownRoot
  /**
   * Parsed Markdown body with included table of contents.
   */
  body: MarkdownRoot & {
    toc?: Toc
  }
}

export interface CustomParsedContent extends ParsedContent {
  title: string
  description: string
  date: string
  published: boolean
  shortTitle: string
  estimation: Estimation
}

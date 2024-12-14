import type { PropsWithChildren } from "react";
import { cx } from "class-variance-authority";

export interface NotificationProps {
  type: "warning" | "note" | "tip" | "important" | "caution" | "custom";
  icon?: string;
  multiline?: boolean;
  printable?: boolean;
}

export function Notification({ printable, type, icon, multiline, children }: PropsWithChildren<NotificationProps>) {
  return (
    <div
      role="alert"
      className={cx("my-8 hidden items-center gap-2 rounded py-2 sm:flex", !printable && "!print:hidden", {
        "border-l-4 pl-4": type !== "custom",
        "bg-yellow-600 border-l-yellow-400": type === "warning",
        "bg-blue-900 border-l-blue-700": type === "note" || type === "tip",
        "bg-purple-900 border-l-purple-700": type === "important",
        "bg-rose-900 border-l-rose-700": type === "caution",
      })}
    >
      <span
        className={cx("text-2xl", {
          "text-yellow-100": type === "warning",
          "text-blue-400": type === "note" || type === "tip",
          "text-purple-400": type === "important",
          "text-rose-400": type === "caution",
          "icon-[octicon--alert-16]": !icon && type === "warning",
          "icon-[octicon--info-16]": !icon && (type === "note" || type === "tip"),
          "icon-[octicon--report-16]": !icon && type === "important",
          "icon-[octicon--shield-16]": !icon && type === "caution",
        })}
      >
        {icon}
      </span>
      {multiline && <br />}
      <p>
        {children}
      </p>
    </div>
  );
}

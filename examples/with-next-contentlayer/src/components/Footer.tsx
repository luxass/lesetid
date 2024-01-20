export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-8 border-t border-t-neutral-700 pt-8 text-center">
      ©
      {" "}
      {year}
    </footer>
  )
}

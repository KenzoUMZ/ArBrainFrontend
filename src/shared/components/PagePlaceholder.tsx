interface PagePlaceholderProps {
  title: string
  description: string
}

/** Shell temporário até a implementação visual das telas. */
export default function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="page-placeholder card">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

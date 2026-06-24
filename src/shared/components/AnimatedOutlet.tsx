import { useLocation, useOutlet } from 'react-router-dom'

export default function AnimatedOutlet() {
  const { pathname } = useLocation()
  const outlet = useOutlet()

  return (
    <div key={pathname} className="page-transition">
      {outlet}
    </div>
  )
}

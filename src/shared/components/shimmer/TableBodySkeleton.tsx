import ShimmerBlock from './ShimmerBlock'

interface TableBodySkeletonProps {
  columns: number
  rows?: number
  actionColumns?: number
}

export default function TableBodySkeleton({
  columns,
  rows = 5,
  actionColumns = 0,
}: TableBodySkeletonProps) {
  const dataColumns = Math.max(columns - actionColumns, 1)

  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
          {Array.from({ length: dataColumns }, (_, colIndex) => (
            <td key={`cell-${rowIndex}-${colIndex}`}>
              <ShimmerBlock
                width={`${colIndex === 0 ? 70 : 45 + (colIndex % 2) * 10}%`}
                height={colIndex === 0 ? '0.95rem' : '0.85rem'}
              />
            </td>
          ))}
          {actionColumns > 0 && (
            <td>
              <div className="row-actions">
                {Array.from({ length: actionColumns }, (_, actionIndex) => (
                  <ShimmerBlock
                    key={`action-${rowIndex}-${actionIndex}`}
                    width="4.5rem"
                    height="1.75rem"
                    shape="md"
                  />
                ))}
              </div>
            </td>
          )}
        </tr>
      ))}
    </>
  )
}

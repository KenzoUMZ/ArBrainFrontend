function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function StockBadge({ isLowStock, quantity }) {
  if (isLowStock) {
    return <span className="badge badge--danger">Baixo ({quantity})</span>
  }

  return <span className="badge badge--success">OK ({quantity})</span>
}

export default function BeerTable({ beers }) {
  if (!beers.length) {
    return (
      <div className="card state-message">
        Nenhuma cerveja cadastrada.
      </div>
    )
  }

  return (
    <div className="card data-table">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Estilo</th>
            <th>ABV</th>
            <th>Preço</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {beers.map((beer) => (
            <tr key={beer.id}>
              <td>{beer.name}</td>
              <td>
                <span className="badge badge--neutral">{beer.style}</span>
              </td>
              <td>{beer.abv}%</td>
              <td>{formatCurrency(beer.price)}</td>
              <td>
                <StockBadge
                  isLowStock={beer.isLowStock}
                  quantity={beer.stockQuantity}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

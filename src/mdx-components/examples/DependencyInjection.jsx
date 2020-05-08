import React from 'react'

function Table({ columns, data }) {
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th style={{ border: '1px solid', padding: '5px' }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr>
            {columns.map(col => (
              <td style={{ padding: '5px', border: '1px solid' }}>
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const response = [
  { make: 'Ford', model: 'Escort', registration: 'wm01txh' },
  { make: 'Peugot', model: '406', registration: 'ml06xdh' },
  { make: 'Honda', model: 'Civic', registration: 'p78dhe' },
  { make: 'Citreon', model: 'Picasso', registration: 'wf03iry' },
]

export default function DependencyInjection() {
  const columns = ['make', 'model', 'registration']
  const data = response.map(car => ({
    ...car,
    registration: (
      car.registration.slice(0, car.registration.length - 3) +
      ' ' +
      car.registration.slice(car.registration.length - 3)
    ).toUpperCase(),
  }))
  return <Table columns={columns} data={data} />
}

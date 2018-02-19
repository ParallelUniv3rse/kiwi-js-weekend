export const findFlightsQuery = `query FindFlights($fromLocation: String!, $toLocation: String!, $departDate: Date!){
  allFlights(search: {from: {location: $fromLocation}, to: {location: $toLocation}, date: {exact: $departDate}}) {
    edges {
      node {
        id
        departure {
          airport {
            locationId
            name
            city {
              name
            }
          }
          time
          localTime
        }
        arrival {
          airport {
            locationId
            name
            city {
              name
            }
          }
          time
          localTime
        }
        price {
          amount
          currency
        }
      }
    }
  }
}`;

var dice = 3;
var sides = 6;
var query = ` query GetRates {
   getUsers {
    id
   }
  }`;

fetch('http://localhost:8080/api/mch-back/graphql', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
	body: JSON.stringify({
		query,
		variables: { dice, sides },
	})
})
	.then(r => r.json())
	.then(data => console.log('data returned:', data));
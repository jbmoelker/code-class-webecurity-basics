const React = require('react');
const ReactDom = require('react-dom');
const {Card} = require('../components/card');

const matches = [
	{
		homeTeam: "Feyenoord",
		awayTeam: "PSV"
	},
	{
		homeTeam: "FC Utrecht",
		awayTeam: "FC Groningen"
	},
	{
		homeTeam: "NAC",
		awayTeam: "NEC"
	}
];

class App extends React.Component {
	render() {
		let cards = matches.map(match => {
			return <Card match={match} />;
		});

		return (
			<div>
				{cards}
			</div>
		);
	}
}

module.exports = {
	App
}

import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SignIn from './components/SignIn';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	request: operation => {
		const id_token = localStorage.getItem('authorization');
		return operation.setContext({
			headers: { authorization: id_token ? id_token : '' },
		});
	},
});

const App = () => (
	<ApolloProvider client={client}>
		<SignIn />
	</ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

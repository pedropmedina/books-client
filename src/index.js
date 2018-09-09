import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Signin from './components/Signin';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
});

const App = () => (
	<ApolloProvider client={client}>
		<Signin />
	</ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

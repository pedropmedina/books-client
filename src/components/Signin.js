import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// Graphql queries
const SIGNIN_USER = gql`
	mutation CreateSignIn($idToken: String) {
		signin(idToken: $idToken)
	}
`;

class Signin extends Component {
	componentDidMount() {
		this.handleOAuth2ClientLoad();
	}

	handleOAuth2ClientLoad = () => {
		window.gapi.load('auth2', this.init);
	};

	init = () => {
		window.gapi.auth2
			.init({
				clientId:
					'579012218555-5b5eq8atbcbkv7h6q8fafqj86od1ot5m.apps.googleusercontent.com',
				redirect_uri: 'http://localhost:4000/signin',
				scopes: [
					'https://www.googleapis.com/auth/userinfo.profile',
					'https://www.googleapis.com/auth/userinfo.email',
				],
			})
			.then(() => {
				/*
				const instance = window.gapi.auth2.getAuthInstance();
				// console.log(a);
				const user = instance.currentUser.get();
				// console.log(u);
				const profile = user.getBasicProfile();
				// console.log(profile);
				const extractProfile = {
					id: profile.getId(),
					name: profile.getName(),
					givenName: profile.getGivenName(),
					email: profile.getEmail(),
				};
				// console.log(extractProfile);
				const authRes = user.getAuthResponse({
					includeAuthorizationData: true,
				});
				console.log(authRes);
				*/

				window.gapi.auth2
					.getAuthInstance()
					.isSignedIn.listen(this.updateSigninStatus);

				this.updateSigninStatus(
					window.gapi.auth2.getAuthInstance().isSignedIn.get(),
				);
			});
	};

	updateSigninStatus = isSignedIn => {
		if (isSignedIn) {
			console.log('user is signed in');
		} else {
			console.log('user is signed out');
		}
	};

	handleSignIn = signInMutation => {
		window.gapi.auth2.getAuthInstance().signIn();

		const instance = window.gapi.auth2.getAuthInstance();
		const user = instance.currentUser.get();
		const profile = user.getBasicProfile();
		const extractProfile = {
			id: profile.getId(),
			name: profile.getName(),
			givenName: profile.getGivenName(),
			email: profile.getEmail(),
		};
		const authRes = user.getAuthResponse({
			includeAuthorizationData: true,
		});

		console.log(authRes);

		signInMutation({ variables: { idToken: authRes.id_token } });
	};

	handleSignOut = () => {
		window.gapi.auth2.getAuthInstance().signOut();
	};

	render() {
		return (
			<Mutation mutation={SIGNIN_USER}>
				{signInMutation => {
					return (
						<div>
							Hello there from react
							<button onClick={() => this.handleSignIn(signInMutation)}>
								Sign in
							</button>
							<button onClick={() => this.handleSignOut()}>Sign out</button>
						</div>
					);
				}}
			</Mutation>
		);
	}
}

export default Signin;

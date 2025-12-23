import axios from 'axios';
import dotenv from 'dotenv';

import {
	type IOpenSkyResponse,
	type IOpenSkyTokenResponse,
} from './opensky.types.js';

dotenv.config();

class OpenSkyService {
	private apiUrl: string;
	private apiTokenUrl: string;
	private token: string | null = null;
	private tokenExpiresAt: number = 0;

	constructor() {
		this.apiUrl = 'https://opensky-network.org/api';
		this.apiTokenUrl =
			'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token';
	}

	private async getToken() {
		if (this.token && Date.now() < this.tokenExpiresAt) {
			return this.token;
		}

		console.log('Fetching new token from OpenSky API');

		try {
			const params = new URLSearchParams({
				grant_type: 'client_credentials',
				client_id: process.env.OPENSKY_CLIENT_ID!,
				client_secret: process.env.OPENSKY_CLIENT_SECRET!,
			});

			const response = await axios.post<IOpenSkyTokenResponse>(
				this.apiTokenUrl,
				params,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			);

			this.token = response.data.access_token;
			// Refresh until 5 minutes before expiry
			this.tokenExpiresAt =
				Date.now() + (response.data.expires_in - 300) * 1000;

			console.log('Token successfully fetched from OpenSky API');

			return this.token;
		} catch (err) {
			console.error('Error fetching token from OpenSky API', err);
		}
	}

	async fetchLiveFlights() {
		try {
			const token = await this.getToken();

			console.log('Fetching live flights from OpenSky API');

			const response = await axios.get<IOpenSkyResponse>(
				`${this.apiUrl}/states/all`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			console.log('Live flights successfully fetched from OpenSky API');

			return response.data;
		} catch (err) {
			console.error('Error fetching live flights from OpenSky API', err);
			return { time: 0, states: [] };
		}
	}

	async fetchFlightByIcao(icao24: string) {
		try {
			const token = await this.getToken();

			console.log(
				`Fetching flight details for ICAO24: ${icao24} from OpenSky API`,
			);
			const response = await axios.get<IOpenSkyResponse>(
				`${this.apiUrl}/tracks/all`,
				{
					params: { icao24, time: 0 },
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			console.log(
				`Flight details for ICAO24: ${icao24} successfully fetched from OpenSky API`,
			);

			return response.data;
		} catch (err) {
			console.error(
				`Error fetching flight details for ICAO24: ${icao24} from OpenSky API`,
				err,
			);
			return { time: 0, states: [] };
		}
	}
}

export default new OpenSkyService();

import axios from 'axios';
import dotenv from 'dotenv';

import type {
	IFetchAllByMultipleIcaoParams,
	IFetchFlightsResponse,
} from './aviation.types.js';

dotenv.config();

class AviationService {
	private apiUrl: string;
	private token: string;

	constructor() {
		this.apiUrl = 'https://api.aviationstack.com/v1';
		this.token = process.env.AVIATIONSTACK_API_TOKEN!;
	}

	private get getFlightsUrl() {
		const url = new URL(`${this.apiUrl}/flights`);
		url.searchParams.append('access_key', this.token);
		return url;
	}

	private async fetchFlights(flightIcao?: string) {
		const url = this.getFlightsUrl;

		if (flightIcao) {
			url.searchParams.append('flight_icao', flightIcao);
		}

		try {
			console.log('Fetching flights from AviationStack API');
			const response = await axios.get<IFetchFlightsResponse>(url.toString());

			if (response.status !== 200) {
				throw new Error(`Error fetching flights: ${response.statusText}`);
			}

			console.log('Flights successfully fetched from AviationStack API');

			return response.data;
		} catch (err) {
			console.error('Error fetching flights from AviationStack API', err);
		}
	}

	async fetchAllByMultipleIcao({
		flightIcaos,
		airline,
		fromCountry,
		limit,
		offset,
	}: IFetchAllByMultipleIcaoParams) {
		const all = (await this.fetchFlights()) || { data: [] };
		let filtered = all.data.filter((flight) =>
			flightIcaos.includes(flight.flight.icao),
		);

		if (flightIcaos?.length) {
			filtered = filtered.filter((flight) =>
				flightIcaos.includes(flight.flight.icao),
			);
		}

		if (airline) {
			filtered = filtered.filter(
				(flight) =>
					flight.airline?.icao?.toLowerCase() === airline.toLowerCase(),
			);
		}

		if (fromCountry) {
			filtered = filtered.filter((flight) =>
				flight.departure?.airport
					?.toLowerCase()
					.includes(fromCountry.toLowerCase()),
			);
		}

		if (typeof offset === 'number' || typeof limit === 'number') {
			const start = offset ?? 0;
			const end = limit ? start + limit : undefined;
			filtered = filtered.slice(start, end);
		}

		return filtered;
	}

	async fetchFlightByIcao(flightIcao: string) {
		const data = (await this.fetchFlights(flightIcao)) || { data: [] };
		if (data.data.length === 0) {
			throw new Error(`Flight with ICAO ${flightIcao} not found`);
		}
		return data.data[0];
	}
}

export default new AviationService();

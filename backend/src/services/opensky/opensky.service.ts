import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Маппинг ICAO -> IATA кодов
const ICAO_TO_IATA_MAP: Record<string, string> = {
	AAL: 'AA', // American Airlines
	UAL: 'UA', // United Airlines
	DAL: 'DL', // Delta
	JAL: 'JL', // Japan Airlines
	ANA: 'NH', // All Nippon Airways
	BAW: 'BA', // British Airways
	DLH: 'LH', // Lufthansa
	AFR: 'AF', // Air France
	KLM: 'KL', // KLM
	FDX: 'FX', // FedEx
	UPS: '5X', // UPS
	SWA: 'WN', // Southwest
	JBU: 'B6', // JetBlue
	ASA: 'AS', // Alaska Airlines
	UAE: 'EK', // Emirates
	QTR: 'QR', // Qatar Airways
	SIA: 'SQ', // Singapore Airlines
	THY: 'TK', // Turkish Airlines
	CPA: 'CX', // Cathay Pacific
	AFL: 'SU', // Aeroflot
	RYR: 'FR', // Ryanair
	EZY: 'U2', // easyJet
	IBE: 'IB', // Iberia
	QFA: 'QF', // Qantas
	ANZ: 'NZ', // Air New Zealand
};

interface ICallsignValidation {
	callsign: string;
	found: boolean;
	data?: any;
	error?: string;
}

class AviationService {
	private apiUrl: string;
	private apiKey: string;
	private requestCache: Map<string, any> = new Map();

	constructor() {
		this.apiUrl =
			process.env.AVIATION_API_URL || 'https://api.aviationstack.com/v1';
		this.apiKey = process.env.AVIATION_API_KEY!;
	}

	async validateCallsign(callsign: string): Promise<ICallsignValidation> {
		try {
			// Проверяем кэш
			if (this.requestCache.has(callsign)) {
				const cached = this.requestCache.get(callsign);
				return {
					callsign,
					found: !!cached,
					data: cached,
				};
			}

			console.log(`🔍 Проверяем ${callsign} в Aviation Stack...`);

			// Извлекаем префикс и номер
			let prefix = '';
			let flightNumber = '';

			const match = callsign.match(/^([A-Z]+)(\d+)$/);
			if (match) {
				prefix = match[1];
				flightNumber = match[2];
			}

			// Пробуем разные варианты поиска
			const searchVariants = [];

			// 1. Оригинальный callsign
			searchVariants.push({
				params: { flight_icao: callsign },
				type: 'ICAO original',
			});

			// 2. Если есть маппинг ICAO->IATA
			if (prefix && ICAO_TO_IATA_MAP[prefix]) {
				const iataVersion = ICAO_TO_IATA_MAP[prefix] + flightNumber;
				searchVariants.push({
					params: { flight_iata: iataVersion },
					type: `IATA converted (${iataVersion})`,
				});
			}

			// 3. Для 2-буквенных кодов
			if (prefix.length === 2 && flightNumber) {
				searchVariants.push({
					params: { flight_iata: callsign },
					type: 'IATA format',
				});
			}

			// Пробуем все варианты
			for (const variant of searchVariants) {
				try {
					const response = await axios.get(`${this.apiUrl}/flights`, {
						params: {
							access_key: this.apiKey,
							...variant.params,
							limit: 1,
						},
					});

					if (response.data?.data?.length > 0) {
						const flight = response.data.data[0];
						this.requestCache.set(callsign, flight);
						console.log(`✅ ${callsign} найден через ${variant.type}`);
						return {
							callsign,
							found: true,
							data: flight,
						};
					}
				} catch (err) {
					continue;
				}
			}

			// Не нашли
			this.requestCache.set(callsign, null);
			console.log(`❌ ${callsign} НЕ найден`);
			return {
				callsign,
				found: false,
			};
		} catch (err: any) {
			console.error(`❌ Ошибка проверки ${callsign}:`, err.message);
			return {
				callsign,
				found: false,
				error: err.message,
			};
		}
	}

	// Проверяем несколько callsign
	async validateMultipleCallsigns(
		callsigns: string[],
	): Promise<ICallsignValidation[]> {
		console.log(`📋 Проверяем ${callsigns.length} callsigns...`);

		const results: ICallsignValidation[] = [];

		for (const callsign of callsigns) {
			const result = await this.validateCallsign(callsign);
			results.push(result);

			// Небольшая задержка чтобы не перегрузить API
			await new Promise((resolve) => setTimeout(resolve, 500));
		}

		const found = results.filter((r) => r.found).length;
		console.log(`📊 Найдено: ${found}/${callsigns.length}`);

		return results;
	}

	// Получаем полет по ICAO
	async getFlightByIcao(flightIcao: string) {
		const validation = await this.validateCallsign(flightIcao);
		return validation.data || null;
	}

	// Получаем только верифицированные полеты
	async getVerifiedFlights(callsigns: string[]) {
		const validations = await this.validateMultipleCallsigns(callsigns);
		return validations.filter((v) => v.found && v.data).map((v) => v.data);
	}
}

export default new AviationService();

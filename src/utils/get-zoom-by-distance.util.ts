export function getZoomByDistance(distanceKm: number): number {
	const MIN_ZOOM = 2.2; // самый дальний
	const MAX_ZOOM = 8.0; // самый ближний
	const MAX_DISTANCE = 10000; // примерно расстояние Лондон–Токио

	const ratio = Math.min(distanceKm / MAX_DISTANCE, 1);
	let zoom = MAX_ZOOM - ratio * (MAX_ZOOM - MIN_ZOOM);

	zoom += 0.4; // 👈 делает карту чуть ближе (на 0.8 уровня)
	zoom = Math.min(zoom, MAX_ZOOM); // не выходи за предел

	return parseFloat(zoom.toFixed(2));
}

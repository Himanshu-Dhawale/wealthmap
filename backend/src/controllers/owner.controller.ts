import { Context } from 'hono';
import { mockProperties } from '../mock/properties.mock';
import { formatISO } from 'date-fns';

export async function searchOwners(c: Context) {
	const query = c.req.query('query')?.toLowerCase();
	if (!query) {
		return c.json({ message: 'Missing search query' }, 400);
	}

	const ownerMap = new Map<
		string,
		{
			name: string;
			email: string;
			totalNetWorth: number;
			confidenceLevel: string;
			wealthSource: string;
			lastUpdated: string;
		}
	>();

	for (const property of mockProperties) {
		const ownerName = property.owner.names[0];
		const email = property.owner.email;

		if (!ownerName.toLowerCase().includes(query)) continue;

		if (!ownerMap.has(email)) {
			ownerMap.set(email, {
				name: ownerName,
				email,
				totalNetWorth: property.networth,
				confidenceLevel: property.owner.confidenceLevel ?? 'Medium',
				wealthSource: property.owner.wealthSource ?? 'Public Records',
				lastUpdated: property.owner.lastUpdated ?? formatISO(new Date()),
			});
		} else {
			const existing = ownerMap.get(email)!;
			existing.totalNetWorth += property.networth;
		}
	}

	return c.json(Array.from(ownerMap.values()), 200);
}

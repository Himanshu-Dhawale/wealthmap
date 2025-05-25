import { Context } from 'hono';
import { mockProperties } from '../mock/properties.mock';

export async function getAllProperties(c: Context) {
	return c.json({ properties: mockProperties }, 200);
}

export async function getPropertyById(c: Context) {
	const id = c.req.param('id');
	const property = mockProperties.find((p) => p.id === id);

	if (!property) {
		return c.json({ message: 'Property not found' }, 404);
	}

	return c.json({ property }, 200);
}

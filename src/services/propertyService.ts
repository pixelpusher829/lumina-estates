import { Property } from "../types/types";
import { YAML_DATA_SOURCE } from "../data/constants";
import yaml from "js-yaml";

// In a real app, this would fetch from an API endpoint serving the YAML file.
// We are simulating the API delay and parsing here.

export const propertyService = {
	getAllProperties: async (): Promise<Property[]> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					const data = yaml.load(YAML_DATA_SOURCE) as Property[];
					resolve(data);
				} catch (e) {
					reject(e);
				}
			}, 500); // Simulate network latency
		});
	},

	getPropertyById: async (id: string): Promise<Property | undefined> => {
		const properties = await propertyService.getAllProperties();
		return properties.find((p) => p.id === id);
	},
};

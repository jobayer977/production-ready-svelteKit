import { randomId } from '../utils/util-functions';
import { writable } from 'svelte/store';

interface IAlert {
	color: 'red' | 'green' | 'blue' | 'yellow' | 'gray';
	title: string;
	message: string;
	duration?: number;
}
export const alertStore = writable<IAlert[]>([]);
export const addAlert = (alert: IAlert) => {
	const id = randomId();
	const duration = alert.duration || 2000;
	alertStore.update((alerts) => {
		return [...alerts, { ...alert, id }];
	});
	setTimeout(() => {
		alertStore.update((alerts) => {
			return alerts.filter((alert: any) => alert?.id !== id);
		});
	}, duration);
};
// random id generator

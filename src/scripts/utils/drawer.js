import { store } from '../wp-notify';
import { clearNotices } from '../store/reducer';

export const wpNotifyHub = document.getElementById('wp-admin-bar-wp-notify');

/**
 * When the user clicks on the notification drawer, the drawer is disabled
 *
 * @callback {disableNotifyDrawer} disableNotifyDrawer
 */
export const disableNotifyDrawer = () => {
	wpNotifyHub.classList.remove('active');
	document.onkeydown = null;
	document.body.removeEventListener('click', disableNotifyDrawer);
};

/**
 * Enable the notification drawer
 * If the notification drawer is not active, add the active class to the notification drawer and add an event listener to the body to disable the notification drawer
 * The first thing we do is stop the propagation of the event. This is important because we don't want the event to bubble up to the body and trigger the disableNotifyDrawer function
 *
 * @callback {enableNotifyDrawer} enableNotifyDrawer
 * @param {Event} e - The event object.
 */
export const enableNotifyDrawer = (e) => {
	e.stopPropagation();
	if (!wpNotifyHub.classList.contains('active')) {
		wpNotifyHub.classList.add('active');
		document.body.addEventListener('click', disableNotifyDrawer);
		document.onkeydown = (ev) => {
			if ('key' in ev && (ev.key === 'Escape' || ev.key === 'Esc')) {
				disableNotifyDrawer();
			}
		};
	}
};

/**
 * Notification hub
 * Handle click on wp-admin bar bell icon that show the WP-Notify sidebar
 *
 * @member {HTMLElement} wpNotifyHub - the Notification Hub Controller
 * @event enableNotifyDrawer - by default on click
 */
wpNotifyHub.addEventListener('click', enableNotifyDrawer);

/**
 * It clears the notices in the selected location
 *
 * @param {string} location - The location of the notices. This is used to determine which notices to clear.
 */
export const clearNotifyDrawer = (location) => {
	store.dispatch(clearNotices(location || 'adminhub'));
};

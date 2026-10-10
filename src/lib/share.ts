import { toast } from "$lib/state/toastStore";
import { m } from "$lib/paraglide/messages";

export function share(title: string, url: string): Promise<void> {
	if (navigator?.canShare({ title, url }) === true) {
		return shareWithShareApi(title, url).catch(() => shareWithClipboardApi(url));
	}
	return shareWithClipboardApi(url);
}

function shareWithShareApi(title: string, url: string): Promise<void> {
	return navigator.share({ title, url });
}

async function shareWithClipboardApi(url: string): Promise<void> {
	return navigator.clipboard
		.writeText(url)
		.then(() => toast(m.copied_link_to_clipboard(), "green"))
		.catch(() => toast(m.share_failed(), "red"));
}

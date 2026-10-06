import { error, type NumericRange } from "@sveltejs/kit";
import type { HafasErrorCode } from "$lib/types";
import type { Locale } from "$lib/paraglide/runtime";
import type { LocalizedString } from "@inlang/paraglide-js";
import { m } from "$lib/paraglide/messages";
import { DEFAULT_LOCALE } from "$lib/constants";

export type VahrplanErrorType =
	| `HAFAS_${HafasErrorCode}`
	| "NOT_FOUND"
	| "ERROR"
	| "QUOTA_EXCEEDED";

export class VahrplanError extends Error {
	isError = true as const;
	message = m.error({}, { locale: DEFAULT_LOCALE });
	code: NumericRange<400, 599> = 500;
	type: VahrplanErrorType = "ERROR";

	constructor(type: VahrplanErrorType, lang: Locale) {
		const message = getDescriptionFromErrorType(type, lang);
		super(message);
		this.message = message;
		this.code = getErrorCodeFromErrorType(type);
		this.type = type;
	}

	throwIfError(): never {
		error(this.code, { ...this });
	}

	static withMessage(type: VahrplanErrorType, message: LocalizedString): VahrplanError {
		const error = new VahrplanError(type, DEFAULT_LOCALE);
		error.message = message;
		return error;
	}
}

function getErrorCodeFromErrorType(type: VahrplanErrorType): VahrplanError["code"] {
	switch (type) {
		case "HAFAS_INVALID_REQUEST":
			return 400;
		case "HAFAS_ACCESS_DENIED":
			return 403;
		case "HAFAS_NOT_FOUND":
		case "NOT_FOUND":
			return 404;
		case "QUOTA_EXCEEDED":
		case "HAFAS_QUOTA_EXCEEDED":
			return 429;
		case "ERROR":
		case "HAFAS_SERVER_ERROR":
			return 500;
	}
}

function getDescriptionFromErrorType(type: VahrplanErrorType, lang: Locale): LocalizedString {
	switch (type) {
		case "HAFAS_INVALID_REQUEST":
			return m.error_data_source_invalid_request({}, { locale: lang });
		case "HAFAS_ACCESS_DENIED":
			return m.error_data_source_access_denied({}, { locale: lang });
		case "HAFAS_NOT_FOUND":
			return m.error_data_source_not_found({}, { locale: lang });
		case "NOT_FOUND":
			return m.error_not_found({}, { locale: lang });
		case "QUOTA_EXCEEDED":
		case "HAFAS_QUOTA_EXCEEDED":
			return m.error_quota({}, { locale: lang });
		case "ERROR":
			return m.error_server({}, { locale: lang });
		case "HAFAS_SERVER_ERROR":
			return m.error_data_source_server({}, { locale: lang });
	}
}

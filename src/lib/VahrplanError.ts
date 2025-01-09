import type { NumericRange } from "@sveltejs/kit";
import type { HafasErrorCode } from "$lib/types";

export type VahrplanErrorType =
	| `HAFAS_${HafasErrorCode}`
	| "NOT_FOUND"
	| "ERROR"
	| "QUOTA_EXCEEDED";

export class VahrplanError extends Error {
	isError = true as const;
	message = "Fehler.";
	code: NumericRange<400, 599> = 500;
	type: VahrplanErrorType = "ERROR";

	constructor(type: VahrplanErrorType) {
		const message = getDescriptionFromErrorType(type);
		super(message);
		this.message = message;
		this.code = getErrorCodeFromErrorType(type);
		this.type = type;
	}

	static withMessage(type: VahrplanErrorType, message: string): VahrplanError {
		const error = new VahrplanError(type);
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

function getDescriptionFromErrorType(type: VahrplanErrorType): string {
	switch (type) {
		case "HAFAS_INVALID_REQUEST":
			return "Hafas: ungültige Anfrage.";
		case "HAFAS_ACCESS_DENIED":
			return "Hafas: Zugriff verweigert.";
		case "HAFAS_NOT_FOUND":
			return "Hafas: Ressource nicht gefunden.";
		case "NOT_FOUND":
			return "Ressource nicht gefunden.";
		case "QUOTA_EXCEEDED":
		case "HAFAS_QUOTA_EXCEEDED":
			return "Das Anfragelimit für Hafas ist überschritten. Versuche es später erneut.";
		case "ERROR":
			return "Server-Fehler.";
		case "HAFAS_SERVER_ERROR":
			return "Hafas: Server-Fehler.";
	}
}

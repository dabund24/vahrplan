import type { HafasError, ZugError, ZugErrorType, ZugSuccess } from "$lib/types";

export function getZugError(type: ZugErrorType, station1?: number, station2?: number): ZugError {
	return {
		isError: true,
		code: getErrorCodeFromErrorType(type),
		type,
		station1,
		station2,
		description: getDescriptionFromErrorType(type)
	};
}

export function getZugErrorFromHafasError(
	error: unknown,
	station1?: number,
	station2?: number
): ZugError {
	let errorType: ZugErrorType = "ERROR";
	let description: string = "Server-Fehler";
	if (isHafasError(error)) {
		if (error.code === "QUOTA_EXCEEDED") {
			// handle this in a special way since this error is not thrown by hafas/hafas-client!!!
			return getZugError("QUOTA_EXCEEDED");
		}
		description = `Hafas: ${error.hafasDescription ?? ""}`;
		errorType = `HAFAS_${error.code}`;
	}
	return {
		isError: true,
		code: getErrorCodeFromErrorType(errorType),
		type: errorType,
		station1,
		station2,
		description
	};
}

function isHafasError(error: unknown): error is HafasError {
	return (
		typeof error === "object" &&
		error !== null &&
		"isHafasError" in error &&
		error.isHafasError === true
	);
}

export function getSuccessResponse<T>(content: T): ZugSuccess<T> {
	return {
		isError: false,
		content
	};
}

function getErrorCodeFromErrorType(type: ZugErrorType): ZugError["code"] {
	return {
		HAFAS_ACCESS_DENIED: 403,
		HAFAS_INVALID_REQUEST: 400,
		HAFAS_NOT_FOUND: 404,
		HAFAS_SERVER_ERROR: 500,
		NOT_FOUND: 404,
		ERROR: 500,
		QUOTA_EXCEEDED: 429,
		HAFAS_QUOTA_EXCEEDED: 429
	}[type] as ZugError["code"];
}

function getDescriptionFromErrorType(type: ZugErrorType): string {
	return {
		HAFAS_ACCESS_DENIED: "Hafas: Zugriff verweigert.",
		HAFAS_INVALID_REQUEST: "Hafas: ungültige Anfrage.",
		HAFAS_NOT_FOUND: "Hafas: Ressource nicht gefunden.",
		HAFAS_SERVER_ERROR: "Hafas: Server-Fehler.",
		NOT_FOUND: "Ressource nicht gefunden.",
		ERROR: "Server-Fehler.",
		QUOTA_EXCEEDED: "Das Anfragelimit für Hafas ist überschritten. Versuche es später erneut.",
		HAFAS_QUOTA_EXCEEDED:
			"Das Anfragelimit für Hafas ist überschritten. Versuche es später erneut."
	}[type];
}

/**
 * throw a hafas quota error such that it can be handled as any other hafas-error
 * @throws HafasError
 */
export function throwHafasQuotaError(): never {
	throw {
		isHafasError: true,
		code: "QUOTA_EXCEEDED",
		isCausedByServer: true,
		hafasCode: "",
		hafasDescription: ""
	} as HafasError;
}

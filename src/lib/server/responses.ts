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
	let description = "Server-Fehler";
	if (isHafasError(error)) {
		if (error.code === "QUOTA_EXCEEDED") {
			// handle this in a special way since this error is not thrown by hafas/hafas-client!!!
			return getZugError("QUOTA_EXCEEDED");
		}
		description = `Hafas: ${error.hafasDescription ?? "Hafas-Fehler"}`;
		errorType = `HAFAS_${error.code ?? "SERVER_ERROR"}`;
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

function getDescriptionFromErrorType(type: ZugErrorType): string {
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

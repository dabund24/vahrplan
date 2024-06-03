import type { HafasError, ZugError, ZugErrorType, ZugSuccess } from "$lib/types";

export function getZugError(type: ZugErrorType, station1?: number, station2?: number): ZugError {
	return {
		isError: true,
		code: getErrorCodeFromErrorType(type),
		type,
		station1,
		station2
	};
}

export function getZugErrorFromHafasError(
	error: unknown,
	station1?: number,
	station2?: number
): ZugError {
	let errorType: ZugErrorType = "ERROR";
	if (isHafasError(error)) {
		errorType = `HAFAS_${error.code}`;
	}
	return {
		isError: true,
		code: getErrorCodeFromErrorType(errorType),
		type: errorType,
		station1,
		station2
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
		NO_CONNECTIONS: 404,
		MISSING_PROPERTY: 400,
		NETWORK_ERROR: 500,
		NOT_FOUND: 404,
		ERROR: 500
	}[type] as ZugError["code"];
}

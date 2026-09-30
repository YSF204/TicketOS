export const getDatabaseErrorCode = (error: unknown): string | undefined => {
  while (typeof error === "object" && error !== null) {
    if ("code" in error && typeof error.code === "string") return error.code;
    error = "cause" in error ? error.cause : undefined;
  }
};

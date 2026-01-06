import { ErrorHandler } from "../error-handler";
import { HttpError } from "../http-client";

describe("ErrorHandler", () => {
  it("should handle HttpError with message", () => {
    const error: HttpError = {
      message: "Not found",
      status: 404,
    };
    const result = ErrorHandler.processError(error);

    expect(result.message).toBe("Not found");
    expect(result.status).toBe(404);
  });

  it("should handle HttpError with validation errors", () => {
    const error: HttpError = {
      message: "Validation failed",
      status: 400,
      errors: {
        email: ["Email is required"],
        password: ["Password is too short"],
      },
    };
    const result = ErrorHandler.processError(error);

    // HttpError is returned as-is
    expect(result.message).toBe("Validation failed");
    expect(result.errors).toEqual({
      email: ["Email is required"],
      password: ["Password is too short"],
    });
  });

  it("should handle generic Error", () => {
    const error = new Error("Something went wrong");
    const result = ErrorHandler.processError(error);

    expect(result.message).toBe("Something went wrong");
    // Error instance is treated as backend error response, gets status 500
    expect(result.status).toBe(500);
  });

  it("should handle object with message property", () => {
    const error = { message: "Custom error" };
    const result = ErrorHandler.processError(error);

    expect(result.message).toBe("Custom error");
    expect(result.status).toBe(500);
  });

  it("should handle object with error property", () => {
    const error = { error: "Server error" };
    const result = ErrorHandler.processError(error);

    expect(result.message).toBe("Server error");
    expect(result.status).toBe(500);
  });

  it("should handle backend error with errors object", () => {
    const error = {
      message: "Validation failed",
      statusCode: 400,
      errors: {
        email: ["Email is required"],
        password: ["Password is too short"],
      },
    };
    const result = ErrorHandler.processError(error);

    expect(result.message).toBe("Validation failed");
    expect(result.status).toBe(400);
    expect(result.errors).toEqual({
      email: ["Email is required"],
      password: ["Password is too short"],
    });
  });

  it("should use default message for unknown errors", () => {
    const error = {};
    const result = ErrorHandler.processError(error, "Default error");

    expect(result.message).toBe("Ha ocurrido un error inesperado");
    expect(result.status).toBe(0);
  });
});

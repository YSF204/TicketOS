import assert from "node:assert/strict";
import { validateInputs, validateLoginInputs } from "../modules/auth/auth.validation.ts";

const registration = validateInputs({
    firstName: " Alex ",
    lastName: " Morgan ",
    email: " Alex@Example.COM ",
    confirmEmail: "alex@example.com",
    password: "password123",
});

assert.deepEqual(registration, {
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex@example.com",
    password: "password123",
});
assert.throws(() => validateInputs({ ...registration, confirmEmail: "other@example.com" }));
assert.throws(() => validateInputs({ ...registration, password: "short" }));
assert.deepEqual(validateLoginInputs({ email: " ALEX@EXAMPLE.COM ", password: "x" }), {
    email: "alex@example.com",
    password: "x",
});

/** Build-time switch for isolated engineering fixtures (never set for staging/production). */
export function includeTestFixtures(): boolean {
  return process.env.INCLUDE_TEST_FIXTURES === "1";
}

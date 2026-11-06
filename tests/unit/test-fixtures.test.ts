import { afterEach, describe, expect, it } from "vitest";
import { includeTestFixtures } from "../../src/lib/test-fixtures";
import { isPublicPublication, isRenderablePublication } from "../../src/lib/publications";
import { isPublicProject, isRenderableProject } from "../../src/lib/projects";

const fixturePub = {
  data: {
    published: true,
    metadata_verified: true,
    verification_status: "verified" as const,
    status: "accepted" as const,
    test_fixture: true,
  },
};

const publicPub = {
  data: {
    published: true,
    metadata_verified: true,
    verification_status: "verified" as const,
    status: "published" as const,
    test_fixture: false,
  },
};

const fixtureProject = {
  data: { published: true, test_fixture: true },
};

const publicProject = {
  data: { published: true, test_fixture: false },
};

describe("test fixture build gates", () => {
  afterEach(() => {
    delete process.env.INCLUDE_TEST_FIXTURES;
  });

  it("excludes fixtures from public helpers regardless of env", () => {
    process.env.INCLUDE_TEST_FIXTURES = "1";
    expect(isPublicPublication(fixturePub as never)).toBe(false);
    expect(isPublicProject(fixtureProject as never)).toBe(false);
    expect(isPublicPublication(publicPub as never)).toBe(true);
    expect(isPublicProject(publicProject as never)).toBe(true);
  });

  it("includes fixtures in renderable helpers only when INCLUDE_TEST_FIXTURES=1", () => {
    expect(includeTestFixtures()).toBe(false);
    expect(isRenderablePublication(fixturePub as never)).toBe(false);
    expect(isRenderableProject(fixtureProject as never)).toBe(false);

    process.env.INCLUDE_TEST_FIXTURES = "1";
    expect(includeTestFixtures()).toBe(true);
    expect(isRenderablePublication(fixturePub as never)).toBe(true);
    expect(isRenderableProject(fixtureProject as never)).toBe(true);
    expect(isRenderablePublication(publicPub as never)).toBe(true);
  });
});

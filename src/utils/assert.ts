const createAssert = (expectation: (actual: any, expected: any) => void) => <
  T
>({
  given,
  should,
  actual,
  expected,
}: {
  readonly given: string;
  readonly should: string;
  readonly actual: () => T;
  readonly expected: T;
}) =>
  test(`Given ${given}: should ${should}`, () =>
    expectation(actual(), expected));

export const assert = createAssert((actual, expected) =>
  expect(actual).toEqual(expected)
);

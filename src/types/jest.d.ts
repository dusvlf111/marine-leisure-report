/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toBeDisabled(): R;
    toHaveValue(value: any): R;
    toHaveClass(className: string): R;
    toBeVisible(): R;
  }
}

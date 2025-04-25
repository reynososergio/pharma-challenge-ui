/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "fast-text-encoding";
import "dotenv/config";
import "whatwg-fetch";
import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const localStorageMock: Storage = {
  length: 0,
  getItem: jest.fn<(key: string) => string | null>(),
  setItem: jest.fn<(key: string, value: string) => void>(),
  removeItem: jest.fn<(key: string) => void>(),
  clear: jest.fn<() => void>(),
  key: jest.fn<(index: number) => string | null>(),
};

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

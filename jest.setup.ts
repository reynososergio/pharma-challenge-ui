import "@testing-library/jest-dom";
import "fast-text-encoding";
import "dotenv/config";
import "whatwg-fetch";

import { TextEncoder, TextDecoder } from "util";

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

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
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
};

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

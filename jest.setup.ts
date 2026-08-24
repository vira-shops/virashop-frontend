import '@testing-library/jest-dom';

if (typeof URL.createObjectURL === 'undefined') {
  URL.createObjectURL = jest.fn(() => `blob:mock-${Math.random().toString(36).slice(2)}`);
}

if (typeof URL.revokeObjectURL === 'undefined') {
  URL.revokeObjectURL = jest.fn();
}

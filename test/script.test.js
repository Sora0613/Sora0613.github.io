const test = require('node:test');
const assert = require('node:assert/strict');
const { getNextTheme, resolveInitialTheme, getFooterYear } = require('../script.js');

test('getNextTheme toggles dark to light', () => {
    assert.equal(getNextTheme('dark'), 'light');
});

test('getNextTheme toggles light to dark', () => {
    assert.equal(getNextTheme('light'), 'dark');
});

test('resolveInitialTheme prefers saved theme over system preference', () => {
    assert.equal(resolveInitialTheme('dark', false), 'dark');
    assert.equal(resolveInitialTheme('light', true), 'light');
});

test('resolveInitialTheme falls back to system preference when no saved theme', () => {
    assert.equal(resolveInitialTheme(null, true), 'dark');
    assert.equal(resolveInitialTheme(null, false), 'light');
});

test('getFooterYear returns the year of a given date', () => {
    assert.equal(getFooterYear(new Date('2026-07-05')), 2026);
});

test('getFooterYear defaults to the current year when no date is given', () => {
    assert.equal(getFooterYear(), new Date().getFullYear());
});

import * as core from '@actions/core';
import run from '../index';
import fs from 'fs';
import yaml from 'js-yaml';

beforeEach(() => {
    jest.resetModules();
    const doc = yaml.safeLoad(fs.readFileSync(__dirname + '/../action.yml', 'utf8'));
    Object.keys(doc.inputs).forEach(name => {
        const envVar = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
        process.env[envVar] = doc.inputs[name]['default'];
    });
})

afterEach(() => {
    const doc = yaml.safeLoad(fs.readFileSync(__dirname + '/../action.yml', 'utf8'));
    Object.keys(doc.inputs).forEach(name => {
        const envVar = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
        delete process.env[envVar];
    });
})

describe('Test output', () => {
    
    test('Output gets called', () => {
        const noInputMock = jest.spyOn(core, 'setOutput');
        run()
        .then(() => {
            expect(noInputMock).toHaveBeenCalled();
        });
    });
});
import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';

const formatVersion = (tagName: string): Version => {
    const version: Version = {tag: "", major: 0, minor: 0, patch: 0, manifestSafeVersionString: ""};
    version.tag = tagName;

    const regex = /[^0-9.]/;
    const numbers = tagName.replace(regex, '').split('.');
    version.major = parseInt(numbers[0]);
    version.minor = parseInt(numbers[1]);
    version.patch = parseInt(numbers[2]);

    version.manifestSafeVersionString =
        version.major.toString().padStart(2, '0') +
        '.' +
        version.minor.toString().padStart(2, '0') +
        '.' +
        version.patch.toString().padStart(2, '0');
    
    return version;
};

const run = async(): Promise<void> => {
    // Inputs
    const owner = core.getInput('owner');
    const repoName = core.getInput('repo');
    
    console.log(owner, repoName);

    // Repository info
    const octokit = new Octokit({
        auth: '',
        userAgent: 'dnn-platform-get-version'
    });
    octokit.repos.getLatestRelease({
        owner: owner,
        repo: repoName
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((fullfilled: any) => {
        // Outputs
        const version: Version = formatVersion(fullfilled.data.tag_name);
        core.setOutput('tag', version.tag);
        core.setOutput('major', version.major);
        core.setOutput('minor', version.minor);
        core.setOutput('patch', version.patch);
        core.setOutput('manifestSafeVersionString', version.manifestSafeVersionString);
    })

}

run();

export interface Version {
    tag: string;
    major: number;
    minor: number;
    patch: number;
    manifestSafeVersionString: string;
}

export default run;
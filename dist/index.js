var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';
const formatVersion = (tagName) => {
    const version = { tag: "", major: 0, minor: 0, patch: 0, manifestSafeVersionString: "" };
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
const run = () => __awaiter(void 0, void 0, void 0, function* () {
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
        .then((fullfilled) => {
        // Outputs
        const version = formatVersion(fullfilled.data.tag_name);
        core.setOutput('version', version);
    });
});
run();
export default run;

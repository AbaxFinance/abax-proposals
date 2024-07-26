## Contributing

If you plan to add a new _Abax Improvement Proposal (AIP)_ follow this guide:

1. Fork [this repository](https://github.com/AbaxFinance/abax-proposals) by clicking 'Fork' in the top right.
2. Install the project dependencies: `npm install`. Note the repository works with `Node v16`.
3. Create a new aip folder with a following name `proposals/[PROPOSAL_NUMBER]_[Topic]/[Topic].md`. The topic shall follow snake case convention. For example, if you are creating a new AIP for a new feature, you would create a folder `proposals/05_some_new_aip/` and a file `proposals/05_some_new_aip/some_new_aip.md` following the [aip template](https://github.com/AbaxFinance/abax-proposals/blob/main/TEMPLATE-AIP.md).
4. If the proposal requires Proposal contract, the source code for Proposal Contract can be collocated with the AIP in the `proposals/` directory. The Proposal contract should be contained in a folder inside of the AIP's proposal directory. For example, `proposals/05_some_new_aip/proposal_[Topic]`.
5. Each Proposal that involves a Smart Contract shall contain a link to subscan to a deployed version of the Proposal SC build using verifiable option.

6. Submit a [Pull Request (PR)](https://github.com/AbaxFinance/abax-proposals/pulls) to the [main](https://github.com/AbaxFinance/abax-proposals/tree/main).

If your AIP requires images, the image files should be included in a subdirectory of the `assets` folder for that AIP as follow: `proposals/[PROPOSAL_NUMBER]_[Topic]/assets` (for AIP **some_new_aip** it would be `proposals/05_some_new_aip/assets`). When linking to an image in the AIP, you must use the full url for the raw content, for example `https://raw.githubusercontent.com/AbaxFinance/abax-proposals/main/proposals/05_some_new_aip/assets/image.png`.

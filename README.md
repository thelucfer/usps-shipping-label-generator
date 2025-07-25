# USPS shipping label generator

## Description
this is a generator for USPS shipping labels. it leverages google places API `searchText` to provide a simplified search UX in which the user can query and select an address with ease.
It also leverages `easyPost` API for verifying selected addresses and for generating the label.

## Running the project
we're using `bun` as package manager. to run the project, you'll need to setup your env variables (see `.env.sample` for reference). after that, just run `bun i` to install packages and `bun dev` to run

## Possible improvements
- add unit tests
- add integration/e2e tests
- improve form UX by adding error messages/error state to fields
- improve form UX with loading states
- better error handling for api calls such as `verifyAddress`
- figure out how to move google API calls to server-side in order not to expose env variable

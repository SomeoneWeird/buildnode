# buildnode
Node module for Buildkites API

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm-downloads-month](https://img.shields.io/npm/dm/buildnode.svg)](https://www.npmjs.com/package/buildnode)
[![npm-version](https://img.shields.io/npm/v/buildnode.svg)](https://www.npmjs.com/package/buildnode)

# Installation

```
npm install buildnode
```

# Instantiation

## buildnode(options)

You need to specify one of **accessToken** or **email and password**.

# Examples

## Rebuild latest build for a pipeline

```js
var Buildnode = require('buildnode')({
  accessToken: "abc123"
})

var organizationName = "myOrg"
var pipelineName = "myPipeline"

// Fetch the organization
Buildnode.getOrganization(organizationName, function (err, myOrg) {
  if (err) {
    throw err
  }
  // Check if we got anything
  if (!myOrg) {
    throw new Error('Error fetching organization')
  }
  // Fetch the pipeline
  myOrg.getPipeline(pipelineName, function (err, myPipeline) {
    if (err) {
      throw err
    }
    // Check we fetched the pipeline
    if (!myPipeline) {
      throw new Error('Invalid pipeline name')
    }
    myPipeline.listBuilds(function (err, builds) {
      if (err) {
        throw err
      }
      // First entry is latest build
      builds[0].rebuild()
    })
  })
})
```

## API

### Methods

#### listOrganizations(callback)

Lists all organizations that your credentials have access to.

#### getOrganization(name, callback)

Returns an organization class for `name`

## Organization

### Fields

* name: (string) The organization name

#### Methods

#### listPipelines(callback)

List all pipelines available under this organization.

#### getPipeline(name, callback)

Returns an instance of `pipeline` for `name`

#### createPipeline(data, callback)

Creates a new pipeline under this organization.

#### listAgents(callback)

List all available agents.

#### getAgent(id, callback)

Returns an instance of `agent` for `id`

## Agent

### Fields

* id: (string) ID of the agent
* name: (string) Name of the agent
* ip: (string) IP of the agent
* state: (string) Connection state for the agent
* version: (string) Agent version
* metaData: (object) Agent metadata

### Methods

#### stop(callback)

Stops the agent.

## Pipeline

### Fields

* id: (string) ID of the pipeline
* name: (string) Name of the pipeline
* slug: (string) Slug for the pipeline

### Methods

#### delete(callback)

Delete this pipeline.

#### update(data, callback)

Update the pipeline.

#### listBuilds(callback)

Returns an array of instances of `build` for this pipeline.

#### getBuild(number, callback)

Returns an instance of `build` for build `number`.

#### createBuild(data, callback)

Create a new build.

## Build

### Fields

* id: (string) ID of the build
* number: (number) Build number
* jobs: ([Job]) Jobs for this build
* state: (string) State of the build
* message: (string) Build message
* branch: (string) Build branch

### Methods

#### cancel(callback)

Cancel an in-progress build.

#### rebuild(callback)

Rebuild a build.

#### listArtifacts(callback)

Returns an array of instances of `artifact` for this build.

#### getArtifact(id, callback)

Return an instance of `artifact` for `id`

## Job

### Fields

* id: (string) ID of the job
* name: (string) Name of the job
* command: (string) Command for the job

### Methods

#### unblock(callback)

Unblocks this step.

#### getLog(callback)

Returns the command output for this step.

#### listArtifacts(callback)

Returns an array of instances of `artifact` for this job.

## Artifact

### Fields

* id: (string) ID of the artifact
* jobId: (string) ID of the job that uploaded this artifact
* path: (string) Path to the uploaded artifact
* size: (string) Size of the artifact
* hash: (string) Hash of the artifact

### Methods

#### download(callback)

Returns a stream for the artifact

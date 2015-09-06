# node-buildkite
Node module for Buildkite APIs

# Installation

```
npm install buildkite
```

# Instantiation

## buildkite(options)

## Organisation

#### organisation.name
#### organisation#listProjects(callback)
#### organisation#getProject(name, callback)
#### organisation#createProject(data, callback)
#### organisation#listAgents(callback)
#### organisation#getAgent(id, callback)
#### organisation#createAgent(name, callback)

## Agent

#### agent.id
#### agent.name
#### agent.connection_state
#### agent.ip_address
#### agent.version
#### agent.meta_data
#### agent#top(callback)

## Project

#### project.name
#### project#delete(callback)
#### project#listBuilds(callback)
#### project#getBuild(number, callback)
#### project#createBuild(data, callback)

## Build

#### build.id
#### build.number
#### build.jobs
#### build.state
#### build.message
#### build.branch
#### build#cancel(callback)
#### build#rebuild(callback)
#### build#listArtifacts(callback)
#### build#getArtifact(id, callback)

## Job

#### job.id
#### job#unblock(callback)
#### job#getLog(callback)
#### job#listArtifacts(callback)

## Artifact

#### artifact.id
#### artifact.job_id
#### artifact.path
#### artifact.file_size
#### artifact.sha1sum
#### artifact#download(callback)

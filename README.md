# node-buildkite
Node module for Buildkite APIs

# Installation

```
npm install buildkite
```

# Instatiation

## buildkite(options)



## Organisation

### Properties

#### name

### Methods

#### listProjects(callback)
#### getProject(name, callback)
#### createProject(data, callback)
#### listAgents(callback)
#### getAgent(id, callback)
#### createAgent(name, callback)

## Agent

### Properties

#### id
#### name
#### connection_state
#### ip_address
#### version
#### meta_data

### Methods

#### top(callback)

## Project

### Properties

#### name

### Methods

#### delete(callback)
#### listBuilds(callback)
#### getBuild(number, callback)
#### createBuild(data, callback)

## Build

### Properties

#### id
#### number
#### jobs
#### state
#### message
#### branch

### Methods

#### cancel(callback)
#### rebuild(callback)
#### listArtifacts(callback)
#### getArtifact(id, callback)

## Job

### Properties

#### id

### Methods

#### unblock(callback)
#### getLog(callback)
#### listArtifacts(callback)

## Artifact

### Properties

#### id
#### job_id
#### path
#### file_size
#### sha1sum

### Methods

#### download(callback)

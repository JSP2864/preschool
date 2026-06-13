# Tiny Bubble Chat API

The website is static on S3, so the Ollama API key must be stored in a backend.
`chat-lambda.js` is a dependency-free AWS Lambda handler for Node.js 20.

## Lambda

1. Create a Lambda function using the Node.js 20 runtime.
2. Zip `chat-lambda.js` at the root of the zip file and upload it.
3. Set the handler to `chat-lambda.handler`.
4. Set timeout to 30 seconds and memory to 256 MB or higher.
5. Add environment variables:

```text
OLLAMA_API_KEY=<new rotated Ollama API key>
OLLAMA_MODEL=gemma4:31b
ALLOWED_ORIGIN=https://www.tinybubble-preschool.in
```

Do not put `OLLAMA_API_KEY` in React code, S3, Git, or CloudFront.

## API Gateway

Create an HTTP API with:

```text
POST /api/chat
OPTIONS /api/chat
```

Both routes should invoke the Lambda. A `$default` route can also be used.
Configure API Gateway throttling to limit automated abuse. A practical starting
point for this small site is a rate of 2 requests/second with a burst of 5, then
adjust it from observed traffic and Ollama usage.

## CloudFront

Add API Gateway as a second origin and create a behavior:

```text
Path pattern: /api/*
Origin: API Gateway
Allowed methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
Cache policy: CachingDisabled
Origin request policy: AllViewerExceptHostHeader
Viewer protocol policy: Redirect HTTP to HTTPS
```

If the API Gateway URL has a stage such as `/prod`, set `/prod` as the
CloudFront origin path. The browser then calls the same-origin URL `/api/chat`.

After saving the behavior, invalidate CloudFront with `/*`.

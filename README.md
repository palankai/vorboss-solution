# Alice's Dashboard

## TL;DR
- Ensure a `dashboard/.env` file based on the [`dashboard/env-template.env` template](dashboard/env-template.env))
- Run the `make` command which builds the docker image and starts the service
- Open [http://localhost:3000](http://localhost:3000) (might take a few seconds to load the first time) to see the dashboard (if it doesn't open automatically)
- Run `make cleanup` to stop the service and remove the images

**Make alternative**

```shell
docker-compose build
docker-compose up -d
open http://localhost:3000
```

## Context

The "service" is part of an interview exercise.

> Alice has recently started a business selling 3D printed jewellery for cats.
> As you would expect business is booming and Alice wants to keep track of the success of the business with a metrics dashboard.
> She is currently managing her orders in a spreasheet in Airtable, and would like to continue to be able to do so.
>
> She would like her dashboard to contain some key figures, such as:
> - Total Orders
> - Total Orders this month
> - Number of orders in progress
> - Revenue
> - A list of the most recent few orders
> ..and anything else that you think that she may find useful.
>
> You can use any stack that you like; at Vorboss we tend to favour Node + React.
> Remember, whilst this is an internal tool for Alice and doesn't need to win any design awards,
> you should take pride in the detail and keep in mind clean and maintainable code.
> For ease of developement and deployment, we would like the application to be conatinerised using Docker.
> Documentation for the Airtable API can be found online.

## Related documents
- [SWAG - Initial thoughts on the project](docs/SWAG.md)
- [Architecture 360](docs/Architecture360.md)
- [`Operators.md` - key information for maintainers](Operators.md)

## Development

Make a `dashboard/.env` file based on [dashboard/env-template.env](dashboard/env-template.env)

_The code is written and tested on Apple M1, MacOS Monterey._

**Requirements:**

- `make` (4.4)
- `NodeJS` v18.12.1 (npm v8.19.2)
- `yarn` 1.22.19
- `Typescript` 4.9.3
- `NextJS` (13.0.6)
- `React` (18.2.0)
- Dependencies listed in `dashboard/package.json` and managed via `yarn`

**Important make commands:**

- `make build` Builds docker image(s)
- `make up` Start the service with all dependencies (In this case no dependency)
- `make cleanup` Stop the service and removes the debris
- `make precommit` Runs a couple of code checks (lint, prettier, tests, audit)

Consult the [`Makefile`](Makefile) for `make` commands

**Before each commit, run the `make precommit` command.**

**Local development:**

```shell
cd dashboard
yarn install
yarn dev
```

Open [localhost:3000](localhost:3000)

**Important yarn commands:**
- `yarn install` - installs dependencies
- `yarn dev` - starts dev server
- `yarn test` - runs the tests
- `yarn audit:fix` - checks and fixes vulnerabilities

Consult the [`package.json`](dashboard/package.json) `scripts` section for further commands

## Code Structure

- [`/docs`](/docs/) - for service-level documents
- [`/dashboard`](/dashboard/) - Service root (contains [`Dockerfile`](dashboard/Dockerfile) and [`package.json`](dashboard/package.json)
- [`/dashboard/tests`](/dashboard/tests/) - Unit tests
- [`/dashboard/src/frontend`](/dashboard/src/frontend/) - Components and Containers
- [`/dashboard/src/backend`](/dashboard/src/backend/) - Contains backend-related code

**Most important files**
- **[`/dashboard/pages/api/dashboard.ts`](dashboard/pages/api/dashboard.ts) API served on http://localhost:3000/api/dashboard**
- **[`/dashboard/pages/index.ts`](dashboard/pages/index.tsx) Rendered on http://localhost:3000/**
- **[`/dashboard/src/dashboard.ts`](dashboard/src/dashboard.ts) Commonly used and shared interfaces**

## Testing

I use _Jest_ to test the core functionalities.
I put the tests under the [`dashboard/tests`](dashboard/tests) folder.

Run `yarn test` to run all the tests.

## Deployment

Deployment instructions would be here and in the [`Operators.md`](Operators.md)


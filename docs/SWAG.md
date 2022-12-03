# Alice Dashboard SWAG

The presented problem is part of an interview exercise.

The following slightly overplayed paragraphs follow the way how I'd approach real-life problem, usually more complex than this.
I will make lots of assumptions, however for real projects those should be questioned and answered before the project starts.

## Vision

We need to build a dashboard for Alice to show vital business metrics.

### The ideal solution

The ideal solution is a quickly and easily accessible dashboard,
that gives just the right amount of information.

### Facts and assumptions

Yearly seen order number is less than 1000.
The orders evenly distributed throughout the year and within the months.
I don't expect exponential growth of sale, due to the 3D printing time,
without business extension there is an upper bound of the number of items can be printed.


If those assumptions turn out to be not true, I'd revise the decision made.

## Constraints & Quality Attributes

### Quality attributes

Most important -illities.

#### Modifiability

It is expected that I'll need to add more fields, aggregations to the dashboard.

#### Maintainability

On the other hand, clean and simple, documented solution is expected.
There is a possibility, that we won't need to add new features, yet I have to
keep it running, keeping it secure, rebuild and redeploy it time to time.

### Risks considerations

- The tool is internal, I have to ensure that's only internally accessible
- The tool doesn't store sensitive data (such as PII, credit card), but it will access order details
- A prolonged downtime, inaccessibility won't stop the business for making money.
- Downtime or data loss of Airtable

## Possible solutions & alternatives

The most obvious alternative solution would be to find a dashboard extension on the Airtable platform or build one.
Given the nature of this exercise, that solution is ruled out.

## High Level Decisions

I've decided I'll use Typescript as that provides cohesion between frontend and backend,
furthermore less context switching for developers.
The language is also known by the development team.
At this stage I won't store data in database, I'll fetch the data upon request.

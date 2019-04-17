# Train train go

A simplified way to find train departure times in Melbourne, Australia.

## Contributing

Fork this repo and make a pull request. Some points to consider:

- Tests must be _passing_ and updated for any breaking changes
- Please test this on some real world browsers
- Consider the feature you are adding and if they add any value

## Developing

Install npm packages in `client` and also `api`.

`cd client && npm i`
`cd api && npm i`

### Requirements:

Requires your own PTV dev api key and secret. [https://www.ptv.vic.gov.au/footer/data-and-reporting/datasets/](https://www.ptv.vic.gov.au/footer/data-and-reporting/datasets/)

Once you have this put your env vars in:

The below files are `.gitignored`.

`api/now.json`

```

{
  "env": {
    "DEV_ID": "@secret-ptv-dev-id",
    "DEV_KEY": "@secret-ptv-dev-key",
    "API_BASE_URL": "https://timetableapi.ptv.vic.gov.au",
    "IS_DEBUG": "true"
  }
}

```

`api/no-secrets.json`

```

{
  "@secret-ptv-dev-id": "1111111",
  "@secret-ptv-dev-key": "11111111-1111-1111-1111-111111111111"
}

```

### Start dev environments:

Will require you to leave terminal windows open for both api and client.

#### Client:

`npm run start:dev`

#### API:

`npm run start:dev`

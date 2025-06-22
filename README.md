# ProcurementAutomation

This repository contains an ASP.NET Core 7 backend with an Angular front end.

The backend exposes a simple weather forecast API and serves the Angular SPA located in the `ClientApp` folder.

## Prerequisites

- .NET 7 SDK
- Node.js with npm

## Running the application

1. Restore and build the .NET project:
   ```bash
   dotnet run
   ```
   The application will start on `https://localhost:5001` by default.
2. In development, the Angular client is served via the SPA proxy. If you open the project in Visual Studio or run `dotnet run`, the proxy will automatically start `npm start` inside `ClientApp`.

## Angular client

The active client application is `ClientApp` (generated with Angular CLI 20). To run it independently:

```bash
cd ClientApp
npm install
npm start
```

This starts the dev server on `https://localhost:44451` and proxies API calls to the ASP.NET backend.

The legacy `ClientApp2` folder contains an older Angular 15 implementation and is not used by default.

# Backend Co-Emplettes

## Steps:
```bash
npm install
```

## Local Configuration Files:
Add the database password: create a file `credentials.ts` in the `src` directory containing the following code:

```typescript
export const db_password = "[DATABASE PASSWORD]";
# Replace [DATABASE PASSWORD] with the actual password
```

## Test the Code:
Navigate to the `/backend` directory and run `npm run dev`.
This starts a Node process that refreshes every time you make a modification in the code.
This avoids the need to restart the process each time.

## View the Diagram:
Visit [DrawIO](https://draw.io) and open the file `BDD-API-diagram.drawio`.


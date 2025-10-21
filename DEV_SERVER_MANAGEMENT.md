# Development Server Management

## Starting Dev Servers
```bash
npm run dev
```

## If Port Conflict Occurs

```bash
npm run kill-ports  # Kill processes on ports 3000 and 5173
npm run dev         # Start fresh servers
```

Or use the combined command:

```bash
npm run dev:fresh   # Kills ports + starts dev servers
```

## Checking What's Running

```powershell
netstat -ano | Select-String ":5173|:3000"
```

## Manual Process Kill

```powershell
Stop-Process -Id <PID> -Force
```

## Key Rules

- Don't run `npm run dev` multiple times
- Always kill previous processes before restarting
- Use `npm run dev:fresh` for a clean restart

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development servers |
| `npm run kill-ports` | Kill processes on ports 3000 and 5173 |
| `npm run dev:fresh` | Kill ports and start fresh dev servers |
| `npm run build` | Build for production |
| `npm run lint` | Run linting checks |

## Troubleshooting

### Port Already in Use
1. Check what's running: `netstat -ano | Select-String ":5173|:3000"`
2. Kill the processes: `npm run kill-ports`
3. Start fresh: `npm run dev:fresh`

### Dev Servers Not Starting
1. Ensure ports are free: `npm run kill-ports`
2. Check for other Node processes: `tasklist | findstr node`
3. Restart with fresh servers: `npm run dev:fresh`

### Frontend Not Loading
- Check if Vite is running on port 5173
- Verify no firewall blocking the port
- Try accessing `http://localhost:5173/` directly

### Backend API Errors
- Expected Clerk key errors are normal without real API keys
- Check middleware configuration
- Verify environment variables are set

## Development Workflow

1. **Start Development:**
   ```bash
   npm run dev
   ```

2. **Access Applications:**
   - Frontend: `http://localhost:5173/`
   - Backend: `http://localhost:3000`

3. **If Issues Occur:**
   ```bash
   npm run dev:fresh
   ```

4. **Stop Development:**
   - Press `Ctrl+C` in the terminal
   - Or run: `npm run kill-ports`

## Best Practices

- Always use `npm run dev:fresh` when restarting
- Don't run multiple `npm run dev` commands
- Check port status before starting new servers
- Use the helper scripts for port management

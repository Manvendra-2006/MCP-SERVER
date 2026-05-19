# 🌤️ Weather MCP Server

A simple MCP (Model Context Protocol) server that fetches weather data by city name. This server integrates with AI tools like Cursor and Claude Desktop.

---

## 📁 Project Structure

```
weather-mcp/
├── index.js        # Main MCP server file
├── package.json    # Dependencies
└── README.md       # This file
```

---

## ⚙️ Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

---

## 📦 Installation

```bash
# 1. Navigate to the project folder
cd weather-mcp

# 2. Install dependencies
npm install @modelcontextprotocol/sdk zod
```

---

## 🚀 Running the Server

```bash
node index.js
```

You should see this message in the terminal:

```
MCP SERVER STARTED
```

The server communicates via **stdio transport** — meaning AI tools (Cursor, Claude Desktop) launch and talk to this server directly through the terminal.

---

## 🛠️ Available Tool

### `getWeatherDataByCityName`

Returns weather information for a given city name.

**Input:**

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `city`    | string | Name of the city   |

**Output (JSON):**

| Field      | Type   | Description                              |
|------------|--------|------------------------------------------|
| `temp`     | string | Temperature (e.g., `"30C"`)              |
| `forecast` | string | Weather condition                        |
| `error`    | string | Returned if city data is unavailable     |

**Supported Cities:**

| City    | Temp | Forecast                    |
|---------|------|-----------------------------|
| Patiala | 30C  | Chance of high rain         |
| Delhi   | 50C  | Chance of high warm winds   |

**Example Response (Patiala):**

```json
{
  "temp": "30C",
  "forecast": "chance of high rain"
}
```

**Example Response (Unknown City):**

```json
{
  "temp": null,
  "error": "Unable to get data"
}
```

---

## 🔗 Cursor Integration (MCP Config)

Add the following to your `.cursor/mcp.json` or global MCP config file:

```json
{
  "mcpServers": {
    "weather-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/your/index.js"]
    }
  }
}
```

> ⚠️ **Note:** Replace `/absolute/path/to/your/index.js` with the actual path on your system.

Restart Cursor after saving the config. The AI will now automatically call `getWeatherDataByCityName` whenever a weather-related query is made.

---

## 🧠 How It Works

```
User (Cursor/Claude) ──► MCP Client ──► stdio ──► MCP Server (index.js)
                                                         │
                                              getWeatherByCity(city)
                                                         │
                                              JSON response returned
```

1. **McpServer** — Creates a server instance following the MCP protocol.
2. **StdioServerTransport** — Allows the server to communicate via terminal (stdin/stdout).
3. **server.tool()** — Registers a tool that the AI can call when needed.
4. **Zod Validation** — Validates input parameters before processing.

---

## 🔮 Future Improvements

- [ ] Integrate a real weather API (e.g., OpenWeatherMap)
- [ ] Add support for more cities
- [ ] Add temperature unit options (Celsius / Fahrenheit)
- [ ] Improve error handling and logging


import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const server = new McpServer({ name: 'Weather Data Fetch', version: '1.0.0' });
async function getWeatherByCity(city) {
    if (city.toLowerCase() === "patiala") {
        return { temp: "30C", forecast: "chance of high rain" }
    }
    if (city.toLowerCase() === "delhi") {
        return { temp: '50c', forecast: "chance of high warm winds" }
    }
    return { temp: null, error: "Unable to get data" }
}
server.tool("getWeatherDataByCityName", {
    city: z.string(),

}, async ({ city }) => {
    return { content: [{ type: "text", text: JSON.stringify(await getWeatherByCity(city)) }] }
})
async function int() {
    console.log("MCP SERVER STARTED")
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
int()
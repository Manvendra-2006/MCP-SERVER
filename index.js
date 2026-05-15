import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";  // Ye MCP Server class mcp server create krne ke liye 
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";  // It used for telling that MCP server communicate by terminal 
import { z } from "zod"; // validation library
// Creating a MCP server
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
// Here in MCP server tool is register so that ai can call this tool when required 
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
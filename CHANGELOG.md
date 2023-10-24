# Changelogs
Changelogs will posted here

## **v1.2.6**

### CogManager [Added]
Added a new CogManager, with wich you can easily manage Cogs to your discord bot.
Example:
```js
const { Client, Message } = require('discord.js');
const { CogLoader, Intents } = require('discord-utilies'); // Import the Class

const client = new Client({ intents: [Intents.Guilds] });
const cogLoader = new CogLoader(client);

client.once('ready', () => {
  console.log('Bot is ready');

  // Load all Cogs from a folder
  cogLoader.loadCogsFromFolder('Cogs');

  // Execute once when a Cog is executed successfully
  cogLoader.once('cogExecuted', (cogName) => {
    console.log(`Cog ${cogName} was executed successfully. This event triggers only once.`);
  });
});

// Add a Cog and execute it
client.on('message', (message) => {
  if (message.content === '!executeMyCog') {
    // Add the Cog (this should typically be in a separate file)
    const myCogCode = `
      console.log('MyCog was executed!');
    `;
    cogLoader.addCog({ cogName: 'MyCog', cogFolder: 'Cogs' }, myCogCode);

    // Execute the Cog
    cogLoader.executeCog('MyCog', message);
  }
});

client.login('YOUR_BOT_TOKEN');

```
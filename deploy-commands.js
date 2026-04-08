const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log('Bot online!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'painel') {
    await interaction.reply('FUNCIONANDO ✅');
  }
});

client.login("MTQ5MDkwNzMwNjMxNjEzNjQ1OA.GaIDdc.aZW8mm9TD7xVE1RfrJGmdjsOu_D3hzzeOYOGlg");
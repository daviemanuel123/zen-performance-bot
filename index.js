const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ChannelType,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = "MTQ5MDkwNzMwNjMxNjEzNjQ1OA.GTiSKc.nVrpwr8QE-lpGeC3vMvG__7fSO-j886yWrgeCE";

client.once('ready', () => {
  console.log('Zen Performance PRO Online 🚀');
});

client.on('interactionCreate', async interaction => {
  try {

    // COMANDO
    if (interaction.isChatInputCommand()) {

      if (interaction.commandName === 'painel') {

        const embed = new EmbedBuilder()
          .setTitle('🚀 Zen Performance')
          .setDescription('Escolha seu plano e leve seu PC ao máximo desempenho!')
          .addFields(
            { name: '💰 Básico', value: 'Otimização leve + limpeza', inline: true },
            { name: '⚡ Intermediário', value: 'Otimização completa + tweaks', inline: true },
            { name: '🔥 Avançado', value: 'Otimização extrema + PRO', inline: true }
          )
          .setColor(0x00ffcc);

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('basico')
            .setLabel('💰 Básico - R$10')
            .setStyle(ButtonStyle.Success),

          new ButtonBuilder()
            .setCustomId('intermediario')
            .setLabel('⚡ Intermediário - R$20')
            .setStyle(ButtonStyle.Primary),

          new ButtonBuilder()
            .setCustomId('avancado')
            .setLabel('🔥 Avançado - R$30')
            .setStyle(ButtonStyle.Danger)
        );

        await interaction.reply({
          embeds: [embed],
          components: [row]
        });
      }

      if (interaction.commandName === 'fechar') {
        await interaction.reply('🔒 Fechando ticket...');
        setTimeout(() => {
          interaction.channel.delete();
        }, 3000);
      }
    }

    // BOTÕES
    if (interaction.isButton()) {

      let plano = "";

      if (interaction.customId === "basico") plano = "Básico";
      if (interaction.customId === "intermediario") plano = "Intermediário";
      if (interaction.customId === "avancado") plano = "Avançado";

      if (plano !== "") {

        await interaction.reply({
  content: '⏳ Criando seu ticket...',
  ephemeral: true
});

        const canal = await interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ['ViewChannel']
            },
            {
              id: interaction.user.id,
              allow: ['ViewChannel', 'SendMessages']
            }
          ]
        });

await interaction.editReply({
  content: '✅ Ticket criado com sucesso!'
});
        await canal.send(`🚀 **Zen Performance**

Olá ${interaction.user}

📦 Plano: ${plano}

💰 Envie o pagamento via PIX  
📸 Depois envie o comprovante

⚡ Atendimento começará em breve`);

        await interaction.editReply({
          content: '✅ Ticket criado com sucesso!'
        });
      }
    }

  } catch (error) {
    console.error(error);
  }
});

client.login("MTQ5MDkwNzMwNjMxNjEzNjQ1OA.GTiSKc.nVrpwr8QE-lpGeC3vMvG__7fSO-j886yWrgeCE");

process.on('unhandledRejection', error => {
  console.error('Erro não tratado:', error);
});

process.on('uncaughtException', error => {
  console.error('Erro crítico:', error);
});

permissionOverwrites: [
  {
    id: interaction.guild.id,
    deny: ['ViewChannel']
  },
  {
    id: interaction.user.id,
    allow: ['ViewChannel', 'SendMessages']
  }
]
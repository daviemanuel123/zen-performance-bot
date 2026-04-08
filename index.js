require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;

client.once('ready', () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {

  // COMANDO /painel
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'painel') {

      const embed = new EmbedBuilder()
        .setTitle('🚀 Zen Performance')
        .setDescription('Escolha um plano:')
        .addFields(
          { name: '💰 Básico - R$20', value: 'Otimização leve', inline: true },
          { name: '⚡ Intermediário - R$40', value: 'Otimização completa', inline: true },
          { name: '🔥 Avançado - R$80', value: 'Máximo desempenho', inline: true }
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('basico').setLabel('💰 Básico').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('intermediario').setLabel('⚡ Intermediário').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('avancado').setLabel('🔥 Avançado').setStyle(ButtonStyle.Danger)
      );

      await interaction.reply({ embeds: [embed], components: [row] });
    }
  }

 // BOTÕES
if (interaction.isButton()) {

  // ===== ABRIR TICKET (SÓ ESSES CRIAM TICKET) =====
  if (['basico', 'intermediario', 'avancado'].includes(interaction.customId)) {

    let plano = '';
    if (interaction.customId === 'basico') plano = '💰 Básico - R$20';
    if (interaction.customId === 'intermediario') plano = '⚡ Intermediário - R$40';
    if (interaction.customId === 'avancado') plano = '🔥 Avançado - R$80';

    const canal = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    });

    const botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('paguei')
        .setLabel('💰 Já paguei')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('fechar')
        .setLabel('🔒 Fechar')
        .setStyle(ButtonStyle.Danger)
    );

    await canal.send({
      content: `🚀 ${interaction.user}, seu ticket foi criado!

Plano: ${plano}

💰 Envie o comprovante para iniciar.`,
      components: [botoes]
    });

    await interaction.reply({
      content: `✅ Ticket criado: ${canal}`,
      ephemeral: true
    });
  }

  // ===== BOTÃO "JÁ PAGUEI" =====
  if (interaction.customId === 'paguei') {
    await interaction.reply({
      content: '✅ Cliente informou pagamento!',
      ephemeral: true
    });

    interaction.channel.send('💰 Pagamento informado pelo cliente!');
  }

  // ===== BOTÃO FECHAR (SÓ SUPORTE) =====
  if (interaction.customId === 'fechar') {

    // 👇 MUDA AQUI PRO NOME DO CARGO
    const cargoSuporte = interaction.guild.roles.cache.find(r => r.name === 'Suporte');

    if (!interaction.member.roles.cache.has(cargoSuporte?.id)) {
      return interaction.reply({
        content: '❌ Apenas a equipe de suporte pode fechar o ticket.',
        ephemeral: true
      });
    }

    await interaction.reply({
      content: '🔒 Fechando ticket...',
      ephemeral: true
    });

    setTimeout(() => {
      interaction.channel.delete();
    }, 3000);
  }
}

});

client.login(TOKEN);

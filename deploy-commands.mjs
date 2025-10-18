import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

// Define your slash commands
const commands = [
  new SlashCommandBuilder()
    .setName('claimvip')
    .setDescription('Claim your Discord VIP role after 5 referrals')
    .addStringOption(option =>
      option
        .setName('code')
        .setDescription('Your referral code (e.g., DS-ABC123)')
        .setRequired(true)
    )
    .toJSON(),
];

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID; // Application (client) ID from the Dev Portal
const guildId = process.env.GUILD_ID;   // Your test server ID (only needed for guild scope)
const scope = (process.env.COMMAND_SCOPE || 'guild').toLowerCase(); // 'guild' or 'global'

if (!token || !clientId) {
  console.error('Missing DISCORD_TOKEN or CLIENT_ID in .env');
  process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Registering ${commands.length} command(s) as ${scope}…`);
    let data;

    if (scope === 'global') {
      // Global commands (appear in all servers where your app is installed; can take up to an hour to show)
      data = await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
      );
    } else {
      // Guild commands (instant, for a specific server — best for testing)
      if (!guildId) {
        console.error('GUILD_ID is required when COMMAND_SCOPE=guild');
        process.exit(1);
      }
      data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );
    }

    console.log(`✅ Successfully registered ${data.length} command(s).`);
  } catch (err) {
    console.error('❌ Error registering commands:', err);
    process.exit(1);
  }
})();

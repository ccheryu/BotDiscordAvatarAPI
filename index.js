const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config({ silent: true });
const chalkImport = require('chalk');
const chalk = chalkImport.default || chalkImport;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

defineCommands();

client.once('clientReady', () => {
    console.log(chalk.green.bold('✓ Bot is online!') + ' ' + chalk.cyan(`(${client.user.tag})`));
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
            console.error(chalk.red('Error:'), error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);

function defineCommands() {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const commands = [];
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }
    if (process.env.TOKEN && process.env.CLIENT_ID) {
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        (async () => {
            try {
                await rest.put(
                    Routes.applicationCommands(process.env.CLIENT_ID),
                    { body: commands },
                );
                    console.log(chalk.blueBright('Slash commands registered successfully.'));
            } catch (error) {
                    console.error(chalk.red('Error registering slash commands:'), error);
            }
        })();
    }
}


require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder, Routes } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const APP_ID = process.env.DISCORD_APP_ID;

module.exports = {
    owner: true,
    data: new SlashCommandBuilder()
        .setName('botlogo')
        .setDescription('Change the bot logo (icon)')
        .addAttachmentOption(option => option.setName('logo').setDescription('The image for the logo').setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const logo = options.getAttachment('logo');

        await interaction.deferReply({ ephemeral: true });

        const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(logo.contentType)) {
                    const embed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setDescription('Please use a jpg, jpeg, png, gif, or webp image.');
                    return await interaction.editReply({ embeds: [embed] });
        }

        let error;
        try {
            const res = await fetch(logo.url);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString('base64');
            const mime = logo.contentType;
            await interaction.client.user.setAvatar(Buffer.from(base64, 'base64'));
        } catch (err) {
            error = true;
                    const embed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setDescription(`Error: \`${err.toString()}\``);
                    await interaction.editReply({ embeds: [embed] });
        }

        if (error) return;

                const embed = new EmbedBuilder()
                    .setColor('#00ff00')
                    .setDescription('Logo updated successfully!');
                await interaction.editReply({ embeds: [embed] });
    }
};

const { SlashCommandBuilder, EmbedBuilder, Routes } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

module.exports = {
    owner: true,
    data: new SlashCommandBuilder()
        .setName('botbanner')
        .setDescription('Add a banner to your bot')
        .addAttachmentOption(option => option.setName('banner').setDescription('The banner to add').setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const banner = options.getAttachment('banner');

        await interaction.deferReply({ ephemeral: true });

        const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(banner.contentType)) {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setDescription('Please use a jpg, jpeg, png, gif, or webp image');
            return await interaction.editReply({ embeds: [embed] });
        }

        let error;
        try {
            // Descargar la imagen y convertir a base64 usando arrayBuffer
            const res = await fetch(banner.url);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString('base64');
            const mime = banner.contentType;
            await interaction.client.rest.patch(Routes.user(), {
                body: { banner: `data:${mime};base64,${base64}` }
            });
        } catch (err) {
            error = true;
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setDescription(`Error : \`${err.toString()}\``);
            await interaction.editReply({ embeds: [embed] });
        }

        if (error) return;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription('Banner updated successfully!');
        await interaction.editReply({ embeds: [embed] });
    }
};

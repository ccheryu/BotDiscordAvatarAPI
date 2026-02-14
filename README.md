# Slash Command Bot

A simple Discord bot using slash commands, built with discord.js v14+.

## Features
- Register and handle slash commands
- Change the bot's logo (icon) via a command
- Add a banner to your bot (custom command)
- Modern, aesthetic console output

## Requirements
- Node.js v18 or higher
- A Discord bot token and application/client ID

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/slashcommand-bot.git
   cd slashcommand-bot
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following content:
   ```env
   TOKEN=your-bot-token-here
   CLIENT_ID=your-client-id-here
   APP_ID=your-app-id-here
   ```

4. **Start the bot:**
   ```sh
   npm start
   ```

## Usage
- Use `/botlogo` to change the bot's icon. Attach an image (jpg, png, gif, webp).
- Use `/botbanner` to add a banner (if implemented).

## Customization
- Add more commands by creating new files in the `commands/` folder.
- Each command should export a `data` (SlashCommandBuilder) and an `execute` function.

## Troubleshooting
- Make sure your bot token and client ID are correct in the `.env` file.
- If you see deprecation warnings, ensure you are using the correct discord.js version.
- For colored console output, the bot uses [chalk](https://www.npmjs.com/package/chalk).

## License
MIT

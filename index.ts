import discordjs, { Client, Intents, Message } from 'discord.js'
import dotenv from "dotenv"
dotenv.config()

const client = new discordjs.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('Armed.')
    client.user?.setActivity("for commands", {type: "WATCHING"})
    
    const guildId = process.env.GUILDID
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Returns pong',
        options: [
            {
                name: 'pingNumber',
                description: 'Returns the number you entered',
                required: true,
                type: discordjs.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    
    const { commandName, options } = interaction
    if (commandName === 'ping') {
        const pingNumber = options.getNumber('pingNumber')!
        interaction.reply({
            content: `Pong \n ${pingNumber}`
        })
    }
})

client.login(process.env.TOKEN)
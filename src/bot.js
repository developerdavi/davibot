const Discord = require('discord.js')
const fs = require('fs')

const client = new Discord.Client()

const state = {
  isAboutToSendDelicinha: false
}

async function handleCommand(msg) {
  const args = msg.content.split(/\s+/)

  const [command] = args

  if (command === '!spawn') {
    const sent = await msg.channel.send('Aqui estou mais um dia, sob o olhar sanguinário do marquim :sunglasses:')

    setTimeout(() => {
      sent.edit('Aqui estou mais um dia, sob o olhar sanguinário do vigia :sunglasses:')
    }, 3000)
  }

  if (command === '!play' && msg.channel.name.toLowerCase() === 'geral') {
    msg.reply('cara, não manda isso NO GERAL, VEI!!!')
  }
}

client.on('message', async (msg) => {
  if (msg.author.bot) {
    return
  }

  if (msg.content.startsWith('!')) {
    return handleCommand(msg)
  }

  const content = msg.content.toLowerCase()

  if (content.includes('delicinha')) {
    await msg.reply('Eu ouvi delicinha??? :thinking:')
    state.isAboutToSendDelicinha = true
    return
  }

  if (content.includes('sim') && state.isAboutToSendDelicinha) {
    state.isAboutToSendDelicinha = false
    return await msg.channel.send('AAAAAAAH, QUE DELICINHA!!', {
      allowedMentions: false
    })
  }

  if (content.includes('planning')) {
    const sent = await msg.channel.send(':rofl::rofl::rofl::rofl:')

    setTimeout(() => {
      sent.delete()
    }, 1000)
  }

  if (content.includes('merda')) {
    msg.channel.send(':poop:')

    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join()
      connection.play(fs.createReadStream(`${__dirname}/static/vaidarmerda.mp3`), {
        volume: 0.5
      }).on('finish', () => {
        connection.disconnect()
      })
    }
  }
})

const Bot = {
  start: async () => {
    try {
      await client.login(process.env.secretToken)
      console.log('Successfully connected!')
    } catch (e) {
      console.log('Failed to login')
      console.error(e.message)
    }
  }
}

module.exports = Bot

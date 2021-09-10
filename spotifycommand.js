const Canvas = require("canvas")
const Jimp = require("jimp")
const canvas = Canvas.createCanvas(720, 280)
const ctx = canvas.getContext("2d")
const { locale } = require("moment")
locale("pt-br")

async exec(message, { member }) {
    
    let info = message.guild.members.cache.get(member.user.id).presence
      .activities[0];
    let start = info.timestamps.start,
    end = info.timestamps.end,
    time = (new Date() -start) / (end - start) * 100;
    let music = info.details.length < 20 ? info.details : info.details.substr(0, 20)
    
    let bg = await Jimp.read(info.assets.largeImageURL());
    bg.blur(12);
    bg.getBuffer(Jimp.MIME_PNG, async (e, blured) => {
      let barra = await Canvas.loadImage("https://media.discordapp.net/attachments/683449027446046761/884670589158170675/progress.png"),
       img = await Canvas.loadImage(info.assets.largeImageURL()),
       image = await Canvas.loadImage(blured),
       icon = await Canvas.loadImage("https://media.discordapp.net/attachments/683449027446046761/884550203582087198/icon_sptf.png")
  
      
      ctx.drawImage(image, 281, 0, 720, 320);
      ctx.drawImage(img, 0, 0, 283, 280);
      ctx.drawImage(icon, 292, 6, 45, 45)
      
      ctx.fillStyle = "#00ff11"
      ctx.fillRect(312, 240, time*3, 6)
      
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "28px serif"
      ctx.fillText(music.substr(0, 10)+"...", 289, 147)
      
      ctx.font = "18px serif"
      ctx.fillText(moment(new Date() - start).format("LTS"), 287, 235)
      
      message.channel.send({
        files: [
          {
            name: "spotify.png",
            attachment: canvas.toBuffer()
          }
        ]
      });
    });
  } 

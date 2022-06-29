module.exports = {
    name: "ready",
    emiter: "once",
    run: (bot) => {
        console.log("—————————————————————————————————");
        console.log("Bot activo :D");
        console.log("—————————————————————————————————");
         console.log(bot.uptime)
    }
}
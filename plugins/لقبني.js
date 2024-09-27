import { createHash } from 'crypto'
let Reg = /\|?(.*)( *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `✳️ أنت ملقب بالفعل يا حب`
  if (!Reg.test(text)) throw `⚠️ تنسيق غير صحيح\n\n✳️ استخدم هذا الأمر: *${usedPrefix + command} القب*\n📌 مثال: *${usedPrefix + command}* لقبك واسم النقابه\n📌 مثال: *${usedPrefix + command}* كيلوا كلاود`
  let [_, name] = text.match(Reg)
  if (!name) throw ' *تنسيق غير صحيح مثال: .لقبني كيلوا كلاود*'
  if (name.length >= 30) throw '✳️ اللقب طويل جدًا'
  user.name = name.trim()
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
┌─「 *ملقب* 」─
▢ *القب:* ${name}
▢ *الرقم* : ${m.sender.split`@`[0]}
└──────────────

 *${usedPrefix}اوامر* لعرض القائمة
`.trim())
}

handler.help = ['لقبني'].map(v => v + ' <الاسم>')
handler.tags = ['rg']
handler.command = ['لقبني']

export default handler

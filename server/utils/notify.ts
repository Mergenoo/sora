/** Sends a message to Telegram when configured, otherwise logs it. Returns true when Telegram accepted it. */
export async function notify(text: string): Promise<boolean> {
  const config = useRuntimeConfig()
  const token = config.telegramBotToken as string
  const chat = config.telegramChatId as string
  if (!token || !chat) {
    console.log('[notify] Telegram is not configured. Message:\n' + text)
    return false
  }
  try {
    await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', body: { chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true } })
    return true
  } catch (e) {
    console.error('[notify] Telegram failed', (e as Error).message)
    return false
  }
}

export const esc = (s: string) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string)

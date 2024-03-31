import NextAuth from "next-auth"
import DiscordAuthProvider from "next-auth/providers/discord"

const handler =  NextAuth({
    providers: [
        DiscordAuthProvider({
          clientId: process.env.DISCORD_CLIENT_ID!,
          clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
      ],
})

export { handler as GET, handler as POST }


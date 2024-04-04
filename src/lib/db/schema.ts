import {integer, pgEnum, pgTable, serial, text, timestamp, varchar,
    uniqueIndex,
    index,
    boolean,} from 'drizzle-orm/pg-core'
  import { vector } from 'pgvector/drizzle-orm';


  
  export const accounts = pgTable(
    'accounts',
    {
      id: varchar('id', { length: 191 }).primaryKey().notNull(),
      userId: varchar('userId', { length: 191 }).notNull(),
      type: varchar('type', { length: 191 }).notNull(),
      provider: varchar('provider', { length: 191 }).notNull(),
      providerAccountId: varchar('providerAccountId', { length: 191 }).notNull(),
      access_token: text('access_token'),
      expires_in: integer('expires_in'),
      id_token: text('id_token'),
      refresh_token: text('refresh_token'),
      refresh_token_expires_in: integer('refresh_token_expires_in'),
      scope: varchar('scope', { length: 191 }),
      token_type: varchar('token_type', { length: 191 }),
      createdAt: timestamp('createdAt').defaultNow().notNull(),
      updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    },
    account => ({
      providerProviderAccountIdIndex: uniqueIndex(
        'accounts__provider__providerAccountId__idx'
      ).on(account.provider, account.providerAccountId),
      userIdIndex: index('accounts__userId__idx').on(account.userId),
    })
  );
  
  export const sessions = pgTable(
    'sessions',
    {
      id: varchar('id', { length: 191 }).primaryKey().notNull(),
      sessionToken: varchar('sessionToken', { length: 191 }).notNull(),
      userId: varchar('userId', { length: 191 }).notNull(),
      expires: timestamp('expires').notNull(),
      created_at: timestamp('created_at').defaultNow().notNull(),
      updated_at: timestamp('updated_at').defaultNow().notNull(),
    },
    session => ({
      sessionTokenIndex: uniqueIndex('sessions__sessionToken__idx').on(
        session.sessionToken
      ),
      userIdIndex: index('sessions__userId__idx').on(session.userId),
    })
  );
  
  export const users = pgTable(
    'users',
    {
      id: varchar('id', { length: 191 }).primaryKey().notNull(),
      name: varchar('name', { length: 191 }),
      email: varchar('email', { length: 191 }).notNull(),
      emailVerified: timestamp('emailVerified'),
      image: varchar('image', { length: 191 }),
      created_at: timestamp('created_at').defaultNow().notNull(),
      updated_at: timestamp('updated_at').defaultNow().notNull(),
    },
    user => ({
      emailIndex: uniqueIndex('users__email__idx').on(user.email),
    })
  );
  
  export const verificationTokens = pgTable(
    'verification_tokens',
    {
      identifier: varchar('identifier', { length: 191 }).primaryKey().notNull(),
      token: varchar('token', { length: 191 }).notNull(),
      expires: timestamp('expires').notNull(),
      created_at: timestamp('created_at').defaultNow().notNull(),
      updated_at: timestamp('updated_at').defaultNow().notNull(),
    },
    verificationToken => ({
      tokenIndex: uniqueIndex('verification_tokens__token__idx').on(
        verificationToken.token
      ),
    })
  );
  


export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])


export const sourcebooks = pgTable('sourcebooks', {
    hash: text('hash').primaryKey(),
    dateUploaded: timestamp('dateUploaded').notNull().defaultNow(),
    link: text('link').notNull(),
    isIndexed: boolean('isIndexed').default(false).notNull(),
});

export const sourcebookEmbedings = pgTable('sourcebook_embedings', {
    id: serial('id').primaryKey(),
    sourcebookHash: text('sourcebook_hash').references(()=>sourcebooks.hash).notNull(),
    vector: vector('vector', {dimensions: 1536}).notNull(),
    content: text('content').notNull(),
    pageNumber: integer('page_number').notNull(),   
})

export const campaigns = pgTable('campaign', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    image: text('image'),
});

export const campaignMembers = pgTable('campaign_members', {
    id: serial('id').primaryKey(),
    campaignId: serial('campaign_id').references(()=>campaigns.id).notNull(),
    userId: text('user_id').references(() =>users.id).notNull(),
    role: userSystemEnum('role').notNull(),
});

export const campaignSourcebooks = pgTable('campaign_sourcebooks', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    campaignId: integer('campaign_id').references(()=>campaigns.id).notNull(),
    sourcebookHash: text('sourcebook_hash').references(()=>sourcebooks.hash).notNull(),
});



export const sourcebook_chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    campaignId: integer('campaign_id').references(()=>campaigns.id).notNull(),
})

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(()=>sourcebook_chats.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    role: userSystemEnum('role').notNull(),
})

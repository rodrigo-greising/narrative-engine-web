import {integer, pgEnum, pgTable, serial, text, timestamp, varchar,
    uniqueIndex,
    index,
    boolean,} from 'drizzle-orm/pg-core'
  import { vector } from 'pgvector/drizzle-orm';


  


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
    userId: text('user_id').notNull(),
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

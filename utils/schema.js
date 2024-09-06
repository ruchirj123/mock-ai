import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    mockId: varchar('mockId').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt')
})

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: text('mockId').notNull(),
    question: text('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    createdAt: varchar('createdAt'),
    reting: varchar('rating'),
    userEmail: varchar('userEmail')
})
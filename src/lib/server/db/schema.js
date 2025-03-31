import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, check } from 'drizzle-orm/sqlite-core';

export const usuarios = sqliteTable('usuarios', {
	id: integer().primaryKey({ autoIncrement: true }),
	nome_usuario: text().notNull(),
	email: text().notNull().unique(),
	data_nascimento: text(),
	pontos: integer().default(0),
	criado_em: text().default(sql`CURRENT_TIMESTAMP`),
});

export const posts = sqliteTable('posts', {
	id: integer().primaryKey({ autoIncrement: true }),
	titulo: text().notNull(),
	conteudo: text().notNull(),
	usuario_id: integer().notNull().references(() => usuarios.id),
	criado_em: text().default(sql`CURRENT_TIMESTAMP`),
	atualizado_em: text().default(sql`CURRENT_TIMESTAMP`)
}, posts => [
	check('atualizado_em_chk', sql`${posts.atualizado_em} >= ${posts.criado_em}`)
]);
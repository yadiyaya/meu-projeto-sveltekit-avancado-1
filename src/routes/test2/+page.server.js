import { db } from '$lib/server/db';
import * as tabela from '$lib/server/db/schema.js';
import { sql } from 'drizzle-orm';

export const actions = {
    test: async () => {
        try {
            const nome = 'francisca';
            const result = await db.run(
                sql`
                SELECT ${tabela.posts.titulo}
                FROM ${tabela.usuarios}
                INNER JOIN ${tabela.posts}
                ON ${tabela.usuarios.id} = ${tabela.posts.usuario_id}
                WHERE ${tabela.usuarios.nome} LIKE ${nome + '%'}
              `
            );
            console.log(result);
            return {
                sql: `insert`, mensagem: result
            };
        } catch (e) {
            return {
                sql: `insert`, mensagem: e.message
            };
        }
    }
}
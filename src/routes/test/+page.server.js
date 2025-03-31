import { db } from '$lib/server/db';
import { posts, usuarios } from '$lib/server/db/schema.js';
import { asc, count, desc, eq, max, min, sql, sum } from 'drizzle-orm';

export const actions = {
  insert: async () => {
    try {
      await db.insert(usuarios)
        .values({ nome_usuario: 'maria_silva', email: 'maria@silva.com.br' });

      return {
        sql: `INSERT INTO usuarios (nome_usuario, email)
VALUES ('maria_silva', 'maria@silva.com.br');`, mensagem: 'inserido com sucesso!'
      };
    } catch (e) {
      return {
        sql: `INSERT INTO usuarios (nome_usuario, email)
VALUES ('maria_silva', 'maria@silva.com.br');`, mensagem: e.message
      };
    }
  },
  insertseveral: async () => {
    try {

      await db.insert(usuarios).values([
        { nome_usuario: 'francisca_pereira', email: 'francisca@pereira.com', data_nascimento: '2002-11-05' },
        { nome_usuario: 'jose_santos', email: 'jose@santos.com', data_nascimento: '2004-02-29' },
        { nome_usuario: 'joao_souza', email: 'joao@souza.com', data_nascimento: '2001-12-31' },
        { nome_usuario: 'ana_oliveira', email: 'ana@oliveira.com', data_nascimento: '2002-11-05' }
      ]);

      await db.insert(posts).values([
        { titulo: 'primeiro artigo', conteudo: 'conteúdo do primeiro artigo', usuario_id: 1 },
        { titulo: 'segundo artigo', conteudo: 'conteúdo do segundo artigo', usuario_id: 2 },
        { titulo: 'terceiro artigo', conteudo: 'conteúdo do terceiro artigo', usuario_id: 2 },
        { titulo: 'quarto artigo', conteudo: 'conteúdo do quarto artigo', usuario_id: 1 },
        { titulo: 'quinto artigo', conteudo: 'conteúdo do quinto artigo', usuario_id: 2 }
      ]);

      return {
        sql: `INSERT INTO usuarios (nome_usuario, email, data_nascimento)
VALUES
    ('francisca_pereira', 'francisca@pereira.com', '2002-11-05'),
    ('jose_santos', 'jose@santos.com', '2004-02-29'),
    ('joao_souza', 'joao@souza.com', '2001-12-31'),
    ('ana_oliveira', 'ana@oliveira.com', '2002-11-05');

INSERT INTO posts (titulo, conteudo, usuario_id)
VALUES
    ('primeiro artigo', 'conteúdo do primeiro artigo', 1),
    ('segundo artigo', 'conteúdo do segundo artigo', 2),
    ('terceiro artigo', 'conteúdo do terceiro artigo', 2),
    ('quarto artigo', 'conteúdo do quarto artigo', 1),
    ('quinto artigo', 'conteúdo do quinto artigo', 2);`, mensagem: 'inserido com sucesso!'
      };
    } catch (e) {
      return {
        sql: `INSERT INTO usuarios (nome_usuario, email, data_nascimento)
VALUES
    ('francisca_pereira', 'francisca@pereira.com', '2002-11-05'),
    ('jose_santos', 'jose@santos.com', '2004-02-29'),
    ('joao_souza', 'joao@souza.com', '2001-12-31'),
    ('ana_oliveira', 'ana@oliveira.com', '2002-11-05');

INSERT INTO posts (titulo, conteudo, usuario_id)
VALUES
    ('primeiro artigo', 'conteúdo do primeiro artigo', 1),
    ('segundo artigo', 'conteúdo do segundo artigo', 2),
    ('terceiro artigo', 'conteúdo do terceiro artigo', 2),
    ('quarto artigo', 'conteúdo do quarto artigo', 1),
    ('quinto artigo', 'conteúdo do quinto artigo', 2);`, mensagem: e.message
      };
    }
  },
  update: async () => {
    await db.update(usuarios).set({ pontos: 100 }).where(eq(usuarios.nome_usuario, 'jose_santos'));
    return {
      sql: `UPDATE usuarios SET pontos = 100 WHERE nome_usuario = 'jose_santos';`, mensagem: 'atualizado com sucesso!'
    };
  },
  del: async () => {
    try {
      await db.delete(usuarios).where(eq(usuarios.nome_usuario, 'maria_silva'));
      return {
        sql: `DELETE FROM usuarios WHERE nome_usuario = 'maria_silva';`, mensagem: 'excluído com sucesso!'
      };
    } catch (e) {
      return {
        sql: `DELETE FROM usuarios WHERE nome_usuario = 'maria_silva';`, mensagem: e.message
      };
    }
  },
  select: async () => {
    const todosUsuarios = await db.select().from(usuarios);
    console.log(todosUsuarios)
    return {
      sql: `SELECT * FROM usuarios;`, mensagem: todosUsuarios
    };
  },
  selectcolumn: async () => {

    const nomesEmails = await db
      .select({ nome_usuario: usuarios.nome_usuario, email: usuarios.email })
      .from(usuarios);
    console.log(nomesEmails)
    return {
      sql: `SELECT nome_usuario, email FROM usuarios;`, mensagem: nomesEmails
    };
  },
  where: async () => {

    const usuario = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.nome_usuario, 'maria_silva'));

    console.log(usuario)
    return {
      sql: `SELECT * FROM usuarios WHERE nome_usuario = 'maria_silva';`, mensagem: usuario
    };
  },
  orderby: async () => {
    const ordenadosPorNome = await db.select().from(usuarios).orderBy(usuarios.nome_usuario);
    console.log(ordenadosPorNome)
    return {
      sql: `SELECT * FROM usuarios ORDER BY nome_usuario;`, mensagem: ordenadosPorNome
    };
  },
  orderbydesc: async () => {
    const ordenadosPorNascimento = await db.select().from(usuarios).orderBy(desc(usuarios.data_nascimento));
    console.log(ordenadosPorNascimento)
    return {
      sql: `SELECT * FROM usuarios ORDER BY data_nascimento DESC;`, mensagem: ordenadosPorNascimento
    };
  },
  orderbyseveral: async () => {
    const ordenadosPorNascimentoEmail = await db.select().from(usuarios).orderBy(desc(usuarios.data_nascimento), usuarios.email);

    console.log(ordenadosPorNascimentoEmail)
    return {
      sql: `SELECT * FROM usuarios ORDER BY data_nascimento DESC, email ASC;`, mensagem: ordenadosPorNascimentoEmail
    };
  },
  limit: async () => {
    const primeiros3 = await db.select().from(usuarios).limit(3);
    console.log(primeiros3)
    return {
      sql: `SELECT * FROM usuarios LIMIT 3;`, mensagem: primeiros3
    };
  },
  offset: async () => {
    const segundos3 = await db.select().from(usuarios).limit(3).offset(3);
    console.log(segundos3)
    return {
      sql: `SELECT * FROM usuarios LIMIT 3 OFFSET 3;`, mensagem: segundos3
    };
  },
  orderbylimit: async () => {
    const primeirosUsuarios = await db.select().from(usuarios).orderBy(asc(usuarios.nome_usuario)).limit(3);
    console.log(primeirosUsuarios)
    return {
      sql: `SELECT * FROM usuarios ORDER BY nome_usuario ASC LIMIT 3;`, mensagem: primeirosUsuarios
    };
  },
  paginacao: async () => {
    const pagina1 = await db.select().from(usuarios).orderBy(usuarios.nome_usuario).limit(3).offset(0);

    const pagina2 = await db.select().from(usuarios).orderBy(usuarios.nome_usuario).limit(3).offset(3);

    const pagina3 = await db.select().from(usuarios).orderBy(usuarios.nome_usuario).limit(3).offset(6);

    console.log([pagina1, pagina2, pagina3])
    return {
      sql: `-- Página 1
SELECT * FROM usuarios ORDER BY nome_usuario LIMIT 3 OFFSET 0;

-- Página 2
SELECT * FROM usuarios ORDER BY nome_usuario LIMIT 3 OFFSET 3;

-- Página 3
SELECT * FROM usuarios ORDER BY nome_usuario LIMIT 3 OFFSET 6;`, mensagem: [pagina1, pagina2, pagina3]
    };
  },
  innerjoin: async () => {
    const usuariosComPosts = await db
      .select({ nome_usuario: usuarios.nome_usuario, titulo: posts.titulo })
      .from(usuarios)
      .innerJoin(posts, eq(usuarios.id, posts.usuario_id));
    console.log(usuariosComPosts)
    return {
      sql: `SELECT usuarios.nome_usuario, posts.titulo
FROM usuarios
INNER JOIN posts ON usuarios.id = posts.usuario_id;`, mensagem: usuariosComPosts
    };
  },
  leftjoin: async () => {

    const usuariosEPosts = await db
      .select({ nome_usuario: usuarios.nome_usuario, titulo: posts.titulo })
      .from(usuarios)
      .leftJoin(posts, eq(usuarios.id, posts.usuario_id));
    console.log(usuariosEPosts)
    return {
      sql: `SELECT usuarios.nome_usuario, posts.titulo
FROM usuarios
LEFT JOIN posts ON usuarios.id = posts.usuario_id;`, mensagem: usuariosEPosts
    };
  },
  rightjoin: async () => {

    const postsEUsuarios = await db
      .select({ tituloPost: posts.titulo, nome_usuario: usuarios.nome_usuario })
      .from(posts)
      .leftJoin(usuarios, eq(posts.usuario_id, usuarios.id));

    console.log(postsEUsuarios)
    return {
      sql: `SELECT posts.titulo, usuarios.nome_usuario
FROM posts
LEFT JOIN usuarios ON posts.usuario_id = usuarios.id;`, mensagem: postsEUsuarios
    };
  },
  count: async () => {
    const totalUsuarios = await db.select({ count: count() }).from(usuarios);
    console.log(totalUsuarios)
    return {
      sql: `SELECT COUNT(*) FROM usuarios;`, mensagem: totalUsuarios
    };
  },
  groupby: async () => {
    const postsPorUsuario = await db
      .select({ usuario_id: posts.usuario_id, count: count() })
      .from(posts)
      .groupBy(posts.usuario_id);
    console.log(postsPorUsuario)
    return {
      sql: `SELECT usuario_id, COUNT(*) FROM posts GROUP BY usuario_id;`, mensagem: postsPorUsuario
    };
  },
  sum: async () => {
    const pontos = await db.select({ pontos: sum(usuarios.pontos) }).from(usuarios);
    console.log(pontos)
    return {
      sql: `SELECT SUM(pontos) FROM usuarios;`, mensagem: pontos
    };
  },
  minmax: async () => {
    const cacula = await db.select({ nascimento: max(usuarios.data_nascimento) }).from(usuarios);

    const primogenito = await db
      .select({ nascimento: min(usuarios.data_nascimento) })
      .from(usuarios);

    console.log([cacula, primogenito])
    return {
      sql: `SELECT MAX(data_nascimento) FROM usuarios;
SELECT MIN(data_nascimento) FROM usuarios;`, mensagem: [cacula, primogenito]
    };
  },
  transacoes: async () => {
    try {
      await db.transaction(async (tx) => {
        // Seleciona o usuário 'jose_santos' para verificar os pontos
        const [usuario] = await tx
          .select()
          .from(usuarios)
          .where(eq(usuarios.nome_usuario, 'jose_santos'));

        // Se os pontos forem menores que 100, faz rollback
        if (usuario.pontos < 100) tx.rollback();

        // Subtrai 100 pontos de 'jose_santos'
        await tx
          .update(usuarios)
          .set({ pontos: sql`${usuarios.pontos} - 100` })
          .where(eq(usuarios.nome_usuario, 'jose_santos'));

        // Adiciona 100 pontos para 'ana_oliveira'
        await tx
          .update(usuarios)
          .set({ pontos: sql`${usuarios.pontos} + 100` })
          .where(eq(usuarios.nome_usuario, 'ana_oliveira'));
      });
      return {
        sql: `BEGIN TRANSACTION;

SELECT pontos INTO @pontos FROM usuarios WHERE nome_usuario = 'jose_santos';

SELECT CASE 
    WHEN @pontos < 100 THEN ROLLBACK 
END;

UPDATE usuarios 
SET pontos = pontos - 100 
WHERE nome_usuario = 'jose_santos';

UPDATE usuarios 
SET pontos = pontos + 100 
WHERE nome_usuario = 'ana_oliveira';

COMMIT;`, mensagem: 'transacionado com sucesso!'
      };
    } catch (e) {
      return {
        sql: `BEGIN TRANSACTION;

SELECT pontos INTO @pontos FROM usuarios WHERE nome_usuario = 'jose_santos';

SELECT CASE 
    WHEN @pontos < 100 THEN ROLLBACK 
END;

UPDATE usuarios 
SET pontos = pontos - 100 
WHERE nome_usuario = 'jose_santos';

UPDATE usuarios 
SET pontos = pontos + 100 
WHERE nome_usuario = 'ana_oliveira';

COMMIT;`, mensagem: e.message
      };
    }
  }
}
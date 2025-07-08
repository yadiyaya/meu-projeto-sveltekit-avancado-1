export async function load() {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
    const usuarios = await resposta.json();
    return { usuarios };
}

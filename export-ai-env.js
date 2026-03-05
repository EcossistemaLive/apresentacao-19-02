const fs = require('fs');
const path = require('path');

// Verifica argumento do caminho de destino
const targetProject = process.argv[2];

if (!targetProject) {
    console.error('❌ Erro: Por favor, forneça o caminho do projeto de destino.');
    console.log('💡 Uso: node export-ai-env.js "C:\\caminho\\para\\outro\\projeto"');
    process.exit(1);
}

const targetPath = path.resolve(targetProject);

// Verifica se o destino existe
if (!fs.existsSync(targetPath)) {
    console.error(`❌ Erro: O diretório de destino não existe: ${targetPath}`);
    process.exit(1);
}

console.log(`\n🚀 Iniciando exportação do ecossistema AI para: ${targetPath}\n`);

// Itens a serem copiados
const itemsToExport = [
    { source: '.aios-core', type: 'dir' },
    { source: 'squads', type: 'dir' },
    { source: 'AGENTS.md', type: 'file' }
];

// Função recursiva para copiar diretórios
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

let hasErrors = false;

itemsToExport.forEach(item => {
    const sourcePath = path.join(__dirname, item.source);
    const destPath = path.join(targetPath, item.source);

    if (fs.existsSync(sourcePath)) {
        try {
            if (item.type === 'dir') {
                console.log(`📦 Copiando diretório: ${item.source}...`);
                copyRecursiveSync(sourcePath, destPath);
            } else {
                console.log(`📄 Copiando arquivo: ${item.source}...`);
                fs.copyFileSync(sourcePath, destPath);
            }
            console.log(`   ✅ Sucesso!`);
        } catch (err) {
            hasErrors = true;
            console.error(`   ❌ Falha ao copiar ${item.source}:`, err.message);
        }
    } else {
        console.warn(`   ⚠️ Aviso: Item de origem não encontrado: ${item.source}`);
    }
});

if (hasErrors) {
    console.log('\n⚠️ Exportação concluída com alguns erros. Verifique os logs.');
} else {
    console.log('\n✨ Exportação concluída com sucesso! Seu outro projeto agora tem a mesma inteligência.');
}

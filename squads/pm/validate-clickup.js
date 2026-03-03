require('dotenv').config();
const https = require('https');

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;

if (!CLICKUP_API_KEY || CLICKUP_API_KEY === 'YOUR_CLICKUP_PAT') {
    console.error('❌ Erro: CLICKUP_API_KEY não configurada no arquivo .env');
    console.error('Por favor, edite .env e adicione seu Personal Access Token.');
    process.exit(1);
}

const options = {
    hostname: 'api.clickup.com',
    path: '/api/v2/user',
    method: 'GET',
    headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json'
    }
};

console.log('🔄 Tentando conectar ao ClickUp...');

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            const response = JSON.parse(data);
            const user = response.user;
            console.log(`✅ Conexão bem-sucedida!`);
            console.log(`👤 Usuário: ${user.username} (ID: ${user.id})`);
        } else {
            console.error(`❌ Falha na conexão. Status: ${res.statusCode}`);
            console.error(`Resposta: ${data}`);
            process.exit(1);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ Erro na requisição: ${e.message}`);
    process.exit(1);
});

req.end();

require('dotenv').config();
const https = require('https');

// ============================================
// Create ClickUp Space for New Consulting Client
// Usage: node squads/pm/create-client-space.js
// ============================================

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;

if (!CLICKUP_API_KEY || CLICKUP_API_KEY === 'YOUR_CLICKUP_PAT') {
    console.error('❌ Erro: CLICKUP_API_KEY não configurada no arquivo .env');
    process.exit(1);
}

// === Configuration ===
const CLIENT_NAME = 'Eduardo';
const SPACE_NAME = `Consultoria — ${CLIENT_NAME}`;

const LISTS = [
    {
        name: '📋 Planejamento Estratégico',
        tasks: [
            { name: 'Diagnóstico Organizacional (AS-IS)', due_offset_weeks: 2 },
            { name: 'Definir Missão, Visão e Valores', due_offset_weeks: 2 },
            { name: 'Objetivos Estratégicos 12 meses', due_offset_weeks: 4 },
            { name: 'KPIs por departamento', due_offset_weeks: 4 },
            { name: 'Roadmap Trimestral (Q1-Q4)', due_offset_weeks: 4 },
            { name: 'Canvas de Modelo de Negócio', due_offset_weeks: 4 },
            { name: 'Organograma TO-BE', due_offset_weeks: 6 },
            { name: 'Mapeamento de Processos', due_offset_weeks: 6 },
            { name: 'Matriz RACI', due_offset_weeks: 6 },
            { name: 'Projeção Financeira 12 meses', due_offset_weeks: 10 },
            { name: 'Funil de Vendas', due_offset_weeks: 10 },
            { name: 'Plano de Negócios Consolidado', due_offset_weeks: 12 },
            { name: 'Dashboard de Acompanhamento', due_offset_weeks: 12 },
        ]
    },
    {
        name: '👥 RH — Gestor Operacional',
        tasks: [
            { name: 'Elaborar JD do Gestor Operacional', due_offset_weeks: 2 },
            { name: 'Definir Plano de Carreira (Partner Track)', due_offset_weeks: 4 },
            { name: 'Validar JD com cliente', due_offset_weeks: 8 },
            { name: 'Publicar vaga', due_offset_weeks: 8 },
            { name: 'Triagem de CVs', due_offset_weeks: 9 },
            { name: 'Entrevistas iniciais', due_offset_weeks: 10 },
            { name: 'Case prático + Painel final', due_offset_weeks: 11 },
            { name: 'Oferta e contratação', due_offset_weeks: 12 },
        ]
    },
    {
        name: '📅 Encontros Presenciais',
        tasks: [
            { name: 'Encontro 1 — Discovery e Diagnóstico', due_offset_weeks: 2 },
            { name: 'Encontro 2 — Planejamento Estratégico', due_offset_weeks: 4 },
            { name: 'Encontro 3 — Estruturação Departamental', due_offset_weeks: 6 },
            { name: 'Encontro 4 — RH e Contratação', due_offset_weeks: 8 },
            { name: 'Encontro 5 — Operação e Financeiro', due_offset_weeks: 10 },
            { name: 'Encontro 6 — Revisão Final e Plano de Ação', due_offset_weeks: 12 },
        ]
    }
];

// === API Helper ===
function clickupRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.clickup.com',
            path: `/api/v2${path}`,
            method,
            headers: {
                'Authorization': CLICKUP_API_KEY,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsed);
                    } else {
                        reject(new Error(`API Error ${res.statusCode}: ${JSON.stringify(parsed)}`));
                    }
                } catch (e) {
                    reject(new Error(`Parse Error: ${data}`));
                }
            });
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDueDate(offsetWeeks) {
    const date = new Date();
    date.setDate(date.getDate() + (offsetWeeks * 7));
    return date.getTime(); // ClickUp expects unix timestamp in ms
}

// === Main ===
async function main() {
    try {
        // Step 1: Get teams (workspaces)
        console.log('🔄 Buscando workspaces...');
        const teamsRes = await clickupRequest('GET', '/team');
        const teams = teamsRes.teams;

        if (!teams || teams.length === 0) {
            console.error('❌ Nenhum workspace encontrado.');
            process.exit(1);
        }

        const teamId = teams[0].id;
        console.log(`✅ Workspace: ${teams[0].name} (ID: ${teamId})`);

        // Step 2: Create Space
        console.log(`\n🔄 Criando Space "${SPACE_NAME}"...`);
        const space = await clickupRequest('POST', `/team/${teamId}/space`, {
            name: SPACE_NAME,
            multiple_assignees: true,
            features: {
                due_dates: { enabled: true },
                time_tracking: { enabled: false },
                tags: { enabled: true },
                checklists: { enabled: true }
            }
        });
        console.log(`✅ Space criado: ${space.name} (ID: ${space.id})`);

        // Step 3: Create Folder
        console.log('\n🔄 Criando Folder "Projeto Consultoria"...');
        const folder = await clickupRequest('POST', `/space/${space.id}/folder`, {
            name: 'Projeto Consultoria'
        });
        console.log(`✅ Folder criado: ${folder.name} (ID: ${folder.id})`);

        // Step 4: Create Lists and Tasks
        for (const listConfig of LISTS) {
            await sleep(500); // Rate limiting

            console.log(`\n🔄 Criando Lista "${listConfig.name}"...`);
            const list = await clickupRequest('POST', `/folder/${folder.id}/list`, {
                name: listConfig.name
            });
            console.log(`✅ Lista criada: ${list.name} (ID: ${list.id})`);

            // Create tasks in list
            for (const taskConfig of listConfig.tasks) {
                await sleep(300); // Rate limiting

                const task = await clickupRequest('POST', `/list/${list.id}/task`, {
                    name: taskConfig.name,
                    due_date: getDueDate(taskConfig.due_offset_weeks),
                    status: 'to do'
                });
                console.log(`   📌 Task: ${task.name}`);
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('🎉 WORKSPACE CRIADO COM SUCESSO!');
        console.log('='.repeat(50));
        console.log(`\n📁 Space: ${SPACE_NAME}`);
        console.log(`📋 Listas: ${LISTS.length}`);
        console.log(`📌 Tasks: ${LISTS.reduce((sum, l) => sum + l.tasks.length, 0)}`);
        console.log('\n🔗 Acesse: https://app.clickup.com');

    } catch (error) {
        console.error(`\n❌ Erro: ${error.message}`);
        process.exit(1);
    }
}

main();

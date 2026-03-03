require('dotenv').config();
const https = require('https');

function req(m, p, b) {
    return new Promise((res, rej) => {
        const o = {
            hostname: 'api.clickup.com',
            path: '/api/v2' + p,
            method: m,
            headers: {
                'Authorization': process.env.CLICKUP_API_KEY,
                'Content-Type': 'application/json'
            }
        };
        const r = https.request(o, r => {
            let d = '';
            r.on('data', c => d += c);
            r.on('end', () => res({ status: r.statusCode, data: JSON.parse(d) }));
        });
        r.on('error', rej);
        if (b) r.write(JSON.stringify(b));
        r.end();
    });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
    // 1. List all teams and find the Consultoria space
    const teams = await req('GET', '/team');
    let oldSpaceId = null;
    let oldTeamName = '';
    let ecoTeamId = null;

    console.log('=== TEAMS AND SPACES ===');
    for (const team of teams.data.teams) {
        console.log(`\nTEAM: ${team.name} (ID: ${team.id})`);
        const spaces = await req('GET', `/team/${team.id}/space?archived=false`);
        for (const s of spaces.data.spaces) {
            const marker = s.name.includes('Consultoria') ? ' <<<< TARGET' : '';
            console.log(`  SPACE: ${s.name} (ID: ${s.id})${marker}`);
            if (s.name.includes('Consultoria')) {
                oldSpaceId = s.id;
                oldTeamName = team.name;
            }
        }
        if (team.name.includes('Ecossistema')) {
            ecoTeamId = team.id;
        }
    }

    console.log(`\n=== DIAGNOSIS ===`);
    console.log(`Old space ID: ${oldSpaceId} (in team: ${oldTeamName})`);
    console.log(`Ecossistema Live team ID: ${ecoTeamId}`);

    if (!ecoTeamId) {
        console.error('Could not find Ecossistema Live team!');
        process.exit(1);
    }

    // 2. Delete the old space
    if (oldSpaceId) {
        console.log(`\n=== DELETING OLD SPACE ${oldSpaceId} ===`);
        const del = await req('DELETE', `/space/${oldSpaceId}`);
        console.log(`Delete status: ${del.status}`);
        await sleep(2000);
    }

    // 3. Create new space in Ecossistema Live
    console.log(`\n=== CREATING NEW SPACE IN ECOSSISTEMA LIVE ===`);
    const space = await req('POST', `/team/${ecoTeamId}/space`, {
        name: 'Consultoria — Eduardo',
        multiple_assignees: true,
        features: {
            due_dates: { enabled: true },
            time_tracking: { enabled: false },
            tags: { enabled: true },
            checklists: { enabled: true }
        }
    });
    console.log(`New space: ${space.data.name} (ID: ${space.data.id})`);
    await sleep(1000);

    // 4. Create Folder
    const folder = await req('POST', `/space/${space.data.id}/folder`, {
        name: 'Projeto Consultoria'
    });
    console.log(`Folder: ${folder.data.name} (ID: ${folder.data.id})`);

    // 5. Create Lists and Tasks
    const LISTS = [
        {
            name: '📋 Planejamento Estratégico',
            tasks: [
                { name: 'Diagnóstico Organizacional (AS-IS)', w: 2 },
                { name: 'Definir Missão, Visão e Valores', w: 2 },
                { name: 'Objetivos Estratégicos 12 meses', w: 4 },
                { name: 'KPIs por departamento', w: 4 },
                { name: 'Roadmap Trimestral (Q1-Q4)', w: 4 },
                { name: 'Canvas de Modelo de Negócio', w: 4 },
                { name: 'Organograma TO-BE', w: 6 },
                { name: 'Mapeamento de Processos', w: 6 },
                { name: 'Matriz RACI', w: 6 },
                { name: 'Projeção Financeira 12 meses', w: 10 },
                { name: 'Funil de Vendas', w: 10 },
                { name: 'Plano de Negócios Consolidado', w: 12 },
                { name: 'Dashboard de Acompanhamento', w: 12 },
            ]
        },
        {
            name: '👥 RH — Gestor Operacional',
            tasks: [
                { name: 'Elaborar JD do Gestor Operacional', w: 2 },
                { name: 'Definir Plano de Carreira (Partner Track)', w: 4 },
                { name: 'Validar JD com cliente', w: 8 },
                { name: 'Publicar vaga', w: 8 },
                { name: 'Triagem de CVs', w: 9 },
                { name: 'Entrevistas iniciais', w: 10 },
                { name: 'Case prático + Painel final', w: 11 },
                { name: 'Oferta e contratação', w: 12 },
            ]
        },
        {
            name: '📅 Encontros Presenciais',
            tasks: [
                { name: 'Encontro 1 — Discovery e Diagnóstico', w: 2 },
                { name: 'Encontro 2 — Planejamento Estratégico', w: 4 },
                { name: 'Encontro 3 — Estruturação Departamental', w: 6 },
                { name: 'Encontro 4 — RH e Contratação', w: 8 },
                { name: 'Encontro 5 — Operação e Financeiro', w: 10 },
                { name: 'Encontro 6 — Revisão Final e Plano de Ação', w: 12 },
            ]
        }
    ];

    for (const lc of LISTS) {
        await sleep(500);
        const list = await req('POST', `/folder/${folder.data.id}/list`, { name: lc.name });
        console.log(`List: ${list.data.name} (ID: ${list.data.id})`);

        for (const tc of lc.tasks) {
            await sleep(300);
            const due = new Date();
            due.setDate(due.getDate() + (tc.w * 7));
            await req('POST', `/list/${list.data.id}/task`, {
                name: tc.name,
                due_date: due.getTime(),
                status: 'to do'
            });
            console.log(`  Task: ${tc.name}`);
        }
    }

    console.log('\n=== DONE ===');
    console.log('Space recreated in Ecossistema Live successfully!');
}

main().catch(e => { console.error(e); process.exit(1); });

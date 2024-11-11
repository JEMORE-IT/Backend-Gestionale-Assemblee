module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Router name:',
        },
        ],
        actions: [
        {
            type: 'add',
            path: 'src/routes/{{name}}.ts',
            templateFile: 'plop/templates/CRUDrouter.hbs',
        },
    ],
}
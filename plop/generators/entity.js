module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Entity name:',
        },
        ],
        actions: [
        {
            type: 'add',
            path: 'src/database/entities/{{name}}/{{name}}.entity.ts',
            templateFile: 'plop/templates/entity/entity.hbs',
        },
        {
            type: 'add',
            path: 'src/database/entities/{{name}}/{{name}}.repository.ts',
            templateFile: 'plop/templates/entity/repository.hbs',
        },
    ],
}
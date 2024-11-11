const router_generator = require('./plop/generators/router')
const CRUDrouter_generator = require('./plop/generators/CRUDrouter')
const entity_generator = require('./plop/generators/entity')

module.exports = function(plop) {
    plop.setGenerator('router', router_generator)
    plop.setGenerator('CRUDrouter', CRUDrouter_generator)
    plop.setGenerator('TypeORM entity', entity_generator)
}
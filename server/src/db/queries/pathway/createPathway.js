const Query = require('../../core/Query')
const Model = require('../../core/Model')

const convertToProp = (step) => {
    let prop = {
        ...step,
        stepDataId: Model.generateId('StepData')
    }
    if (!step.isPathway) {
        prop.stepContentId = Model.generateId('StepContent')
    } 

    delete step.isPathway

    return prop
}

const createPathway = ({name, steps}) => {

    console.log("Function ran")
    const props = {
        pathwayProps: [],
        contentProps: []
    }

    steps.forEach((step) => {
        step.isPathway ? props.pathwayProps.push(convertToProp(step))
                       : props.contentProps.push(convertToProp(step))
    })


    console.log(props)

    return new Query({
        statement: `
        CREATE (p:Pathway {id: $pathwayId, name: $name})
            FOREACH (prop IN $contentProps | 
                CREATE (sd:Step {id: prop.stepDataId, name: prop.name, difficulty: prop.difficulty, index: prop.index, isPathway: false})
                CREATE (sc:Content {id: prop.stepContentId, content: prop.content})
                MERGE (p)<-[:HAS_PARENT_PATHWAY]-(sd)-[:HAS_CONTENT]->(sc)
            )
        WITH p
            FOREACH (prop IN $pathwayProps | 
                CREATE (sd:Step {id: prop.stepDataId, name: prop.name, difficulty: prop.difficulty, index: prop.index, isPathway: true})
                MERGE (p1:Pathway {id: prop.pathwayId})
                MERGE (p)<-[:HAS_PARENT_PATHWAY]-(sd)-[:INCLUDES]->(p1)
            )
        RETURN p
        `,
        params: {
            props: steps,
            pathwayProps: props.pathwayProps,
            contentProps: props.contentProps,
            pathwayId: Model.generateId('Pathway'),
            name: name
        }
    })
}

module.exports = createPathway
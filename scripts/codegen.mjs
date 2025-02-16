import { generateOutput, generateSchema } from '@gql.tada/cli-utils'

await generateSchema({
	input: 'http://localhost:5280/graphql',
	output: './src/graphql/schema.graphql',
	headers: undefined,
	tsconfig: undefined,
})

await generateOutput({
	output: './src/graphql/graphql-env.d.ts',
	disablePreprocessing: false,
	tsconfig: undefined,
})
